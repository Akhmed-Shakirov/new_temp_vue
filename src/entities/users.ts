import { TSConfig } from '@type/TSConfig'
import { defineStore } from 'pinia'

export const apiUsers = defineStore('users', () => {
    const config: TSConfig = {

    }

    const users = ref(useFetch('/users', config))

    return { users }
})
