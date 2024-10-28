import { TSConfig } from '@type/TSConfig'
import { defineStore } from 'pinia'

export const apiPosts = defineStore('posts', () => {
    const config: TSConfig = {

    }
    
    const posts = ref(useFetch('/posts', config))

    return { posts }
})
