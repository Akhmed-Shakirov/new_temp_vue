<template>
    <div class="validator" ref="validator">
        <slot />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    name?: string
}>()

const emit = defineEmits(['submit', 'error'])

const validator = ref<any>()

const toggle = () => {
    let valid = true

    if (props.name) console.log(props.name)

    if (!validator.value.querySelectorAll('.invalid-field')?.length) {
        emit('submit')
    } else {
        emit('error')
    }
}

defineExpose({
    toggle
})
</script>

<style scoped lang="scss">
.validator {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 12px;
}
</style>
