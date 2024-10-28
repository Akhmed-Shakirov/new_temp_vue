import { TSConfig } from '@type/TSConfig'
import { defineStore } from 'pinia'

export const apiTodos = defineStore('todos', () => {
    const config: TSConfig = {
        
    }

    const todos = ref(useFetch('/todos', config))

    return { todos }
})
