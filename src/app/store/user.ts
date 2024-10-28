import { defineStore } from 'pinia'
// import { jwtDecode } from 'jwt-decode'

export const useUser = defineStore('user', () => {
    const router = useRouter()

    const user = ref<any>({})
    const access_token = ref<string>('')
    const refresh_token = ref<string>('')
    const is_auth = ref<boolean>(false)

    const setData = (access: string, refresh: string, isAuth: boolean) => {
        access_token.value = access
        refresh_token.value = refresh
        is_auth.value = isAuth

        if (isAuth) {
            // user.value = jwtDecode(access_token.value)
            router.push('/')
        } else {
            router.push('/login')
        }
    }

    return {
        user,
        access_token,
        refresh_token,
        is_auth,
        setData,
    }
}, { persist: true })
