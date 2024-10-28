export const useRouterQuery = (query: any) => {
    const router = useRouter()
    const route = useRoute()

    const filter = ref<any>(useIsNotEmpty(query) ? useNotEmpty(query) : useNotEmpty(route?.query))

    watch(filter, () => {
        router.push({
            query: useNotEmpty(filter.value)
        })
    }, { deep: true })

    return filter
}
