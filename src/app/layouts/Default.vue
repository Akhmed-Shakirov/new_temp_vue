<template>
    <Header />

    <main class="main">
        <slot />
    </main>

    <!-- <Footer /> -->
</template>

<script setup lang="ts">
import { Header, Footer } from '@/widgets/index'
import { useI18n } from 'vue-i18n'
import { useTitle } from '@vueuse/core'

const route = useRoute()
const { t } = useI18n()

useTitle(t(String(route?.meta?.title || 'Template')))
</script>
