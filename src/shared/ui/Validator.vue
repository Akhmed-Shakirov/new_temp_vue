<template>
    <form @submit.prevent="submit" class="validator" ref="validator">
        <slot />
    </form>
</template>

<script setup lang="ts">
const props = defineProps<{
    // name?: string
}>()
props

const emit = defineEmits(['submit', 'error'])

const validator = ref<any>()

const submit = async () => {
    const inputs = validator.value.querySelectorAll('input')

    await inputs.forEach((input: any) => {
        const inputEvent = new Event('input', {
            bubbles: true,
            cancelable: true
        })

        input.dispatchEvent(inputEvent)
    })

    if (!validator.value.querySelectorAll('.invalid-field')?.length) {
        emit('submit')
    } else {
        emit('error')
    }
}
</script>

<style scoped lang="scss">
.validator {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 12px;
}
</style>
