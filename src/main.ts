import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import router from '@/app/router'
import i18n from '@/app/plugins/i18n'
import App from '@/app/App.vue'
import '@/app/assets/scss/main.scss'

import { Default, Empty } from '@/app/layouts'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app
    .use(router)
    .use(pinia)
    .use(i18n)

    .component('default', Default)
    .component('empty', Empty)


app.mount('body')
