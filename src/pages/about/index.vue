<template>
    <div>
        <button @click="todos.get()">Загрузить данные</button>
        <button @click="todos.patch()">Обновить данные</button>
        <button @click="todos.del()">Удалить данные</button>
        <button @click="todos.filter = { completed: false }">Фильтр</button>
        <button @click="todos.filter = {}">Отчистить фильтр</button>

        <div v-if="todos.isLoading">Загрузка...</div>
        <div v-if="todos.error">Ошибка: {{ todos.error.message }}</div>
        <div v-if="todos.data" style="height: 500px; overflow-y: scroll;">Ответ: {{ todos.data }}</div>
    </div>

    <br><br><br>

    <div>
        <button @click="users.get()">Загрузить данные</button>
        <button @click="users.patch()">Обновить данные</button>
        <button @click="users.del()">Удалить данные</button>
        <button @click="users.filter = { email: 'Sincere@april.biz' }">Фильтр</button>
        <button @click="users.filter = {}">Отчистить фильтр</button>

        <div v-if="users.isLoading">Загрузка...</div>
        <div v-if="users.error">Ошибка: {{ users.error.message }}</div>
        <div v-if="users.data" style="height: 500px; overflow-y: scroll;">Ответ: {{ users.data }}</div>
    </div>
</template>

<script setup lang="ts">
import { apiTodos, apiUsers } from '@entities/index'

const { todos } = storeToRefs(apiTodos())
const { users } = storeToRefs(apiUsers())
</script>
