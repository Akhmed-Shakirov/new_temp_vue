import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { watchDebounced, useStorage } from '@vueuse/core'
import { TSConfig } from '@type/TSConfig'
import { useUser } from '@store/index'

export default function useFetch(apiURL: string, config?: TSConfig) {
    const { access_token, refresh_token } = storeToRefs(useUser())

    const urlConfig: any = {
        main: 'https://jsonplaceholder.typicode.com',
        auth: 'https://192.168.90.150.50:8000',
        news: 'https://192.168.90.150.50:8001'
    }

    const dataFilter = useStorage<any>('dataFilter', {})

    const data = ref<any>(null)
    const pagination = ref<any>({})
    const item = ref<any>({})
    const error = ref<any>(null)
    const isLoading = ref(false)
    const filter = ref<any>(dataFilter.value[apiURL] || {})

    const api = axios.create({
        baseURL: urlConfig[config?.baseURL || 'main'],
        headers: {
            'Content-Type': 'application/json',
        },
    })

    // Функция для получения нового access token с помощью refresh token
    const refreshAccessToken = async (): Promise<string | null> => {
        try {
            if (!refresh_token.value) {
                throw new Error('Refresh token не найден')
            }

            const response = await axios.post('/auth/refresh-token', { token: refresh_token.value })
            access_token.value = response.data.access_token

            return access_token.value
        } catch (err) {
            console.error('Ошибка при обновлении токена:', err)
            return null
        }
    }

    // Перехватчик для установки токена в каждый запрос
    api.interceptors.request.use(
        (config) => {
            if (access_token.value) {
                config.headers.Authorization = `Bearer ${access_token.value}`
            }
            return config
        },
        (err) => Promise.reject(err)
    )

    // Основная функция для выполнения запроса
    const makeRequest = async (
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
        url: string,
        body: any = null,
        config: AxiosRequestConfig = {}
    ): Promise<void> => {
        isLoading.value = true
        error.value = null
        const field = useIsNotEmpty(body) ? body : item.value

        try {
            if (['POST', 'DELETE', 'GET'].includes(method)) {
                const response: AxiosResponse = await api({
                    method,
                    url: `${url}${method !== 'GET' ? (url.at(-1) == '/' ? '' : '/') + field?.id : ''}`,
                    data: field,
                    ...config,
                })
                if (method == 'POST') {
                    delete field?.id
                    data.value.push(response)
                }
                if (method == 'GET') {
                    if (response.data?.results?.length) {
                        data.value = response.data.results
                        pagination.value = response.data
                        delete pagination.value.results
                    } else {
                        data.value = response.data
                    }
                }
                if (method == 'DELETE') {
                    data.value = data.value.filter((el: any) => el?.id !== field?.id)
                }
                if (['POST', 'DELETE'].includes(method)) {
                    item.value = {}
                }
            }


            if (['PUT', 'PATCH'].includes(method)) {
                let newItem: any
                const index = data.value.findIndex((el: any) => el?.id == field?.id)
                const old = data.value.find((el: any) => el?.id == field?.id)

                if (method == 'PATCH') {
                    newItem = useDifferences(useNotEmpty(field), old)
                } else {
                    newItem = useCopy(field)
                    delete newItem?.id
                }

                const response: AxiosResponse = await api({
                    method,
                    url: `${url}${url.at(-1) == '/' ? '' : '/'}${field?.id}`,
                    data: newItem,
                    ...config,
                })

                data.value.splice(index, 1, response.data)
            }
        } catch (err: any) {
            // Если ошибка 401 (Unauthorized), пробуем обновить токен
            if (err.response && err.response.status === 401) {
                try {
                    const newAccessToken = await refreshAccessToken()
                    if (newAccessToken) {
                        // Повторяем запрос с новым токеном
                        const retryResponse: AxiosResponse = await api({
                            method,
                            url,
                            data: body,
                            ...config,
                        })

                        if (retryResponse.data?.results?.length) {
                            data.value = retryResponse.data.results
                            pagination.value = retryResponse.data
                            delete pagination.value.results
                        } else {
                            data.value = retryResponse.data
                        }
                    } else {
                        throw new Error('Не удалось обновить токен')
                    }
                } catch (retryErr) {
                    error.value = retryErr
                    throw retryErr
                }
            } else {
                error.value = err
                throw err
            }
        } finally {
            isLoading.value = false
        }
    }

    // Функции для выполнения различных методов HTTP
    const get = (url: string = apiURL, config: AxiosRequestConfig = {}) => makeRequest('GET', url, null, config)
    const post = (url: string = apiURL, body: any = {}, config: AxiosRequestConfig = {}) => makeRequest('POST', url, body, config)
    const put = (url: string = apiURL, body: any = {}, config: AxiosRequestConfig = {}) => makeRequest('PUT', url, body, config)
    const patch = (url: string = apiURL, body: any = {}, config: AxiosRequestConfig = {}) => makeRequest('PATCH', url, body, config)
    const del = (url: string = apiURL, config: AxiosRequestConfig = {}) => makeRequest('DELETE', url, null, config)


    watchDebounced(() => filter.value, (old: any, item: any) => {
        if (JSON.stringify(item) !== JSON.stringify(old)) {
            get(apiURL, { params: filter.value })
            if (config?.isСacheFilter) {
                dataFilter.value[apiURL] = filter.value
            }
        }
    }, { debounce: 500, maxWait: 5000, deep: true })

    if (!config?.isStopRead) {
        get(apiURL, { params: filter.value })
    }

    return { data, item, filter, pagination, error, isLoading, get, post, put, patch, del }
}
