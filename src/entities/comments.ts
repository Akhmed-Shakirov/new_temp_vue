import { TSConfig } from '@type/TSConfig'
import { defineStore } from 'pinia'

export const apiComments = defineStore('comments', () => {
    const config: TSConfig = {

    }

    const comments = ref(useFetch('/comments', config))

    return { comments }
})
