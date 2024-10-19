<template>
    <main class="main">
        <slot />
    </main>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useTitle } from '@vueuse/core'

const route = useRoute()
const { t } = useI18n()

useTitle(t(String(route?.meta?.title || 'Template')))
</script>

