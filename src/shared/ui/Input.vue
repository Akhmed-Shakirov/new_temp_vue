<template>
    <div class="input">
        <label>{{ $t(label ?? '') }}</label>
        <input v-model="modelValue" type="text">
    </div>
</template>

<script setup lang="ts">
const modelValue = defineModel<any>()

const props = defineProps<{
    label?: string
}>()
</script>

<style scoped lang="scss">
.input {
    display: flex;
    flex-direction: column;
    align-items: start;
}
</style>
