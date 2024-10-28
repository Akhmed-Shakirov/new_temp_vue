<template>
    <button
        class="button"
        :type="isSubmit ? 'submit' : 'button'"
    >
        {{ $t(value ?? '') }}
    </button>
</template>

<script setup lang="ts">
const props = defineProps<{
    value: string
    isSubmit?: boolean
}>()
props
</script>

<style scoped lang="scss">
.button {
    padding: 4px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
