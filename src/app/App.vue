<template>
    <component :is="layout">
        <router-view />
    </component>
</template>

<script setup lang="ts">
const route = useRoute()
const layout = computed(() => route?.meta?.layout)
onMounted(() => useStartApp())
</script>
