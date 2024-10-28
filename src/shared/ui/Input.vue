<template>
    <div class="input" :class="{ 'invalid-field': isError }">
        <label>{{ $t(label ?? '') }}</label>

        <input
            v-model="modelValue"
            type="text"
            @input="isError = false"
        >
    </div>

    <input
        :value="modelValue"
        style="display: none"
        class="check-validator"
        @input="validator"
    >
</template>

<script setup lang="ts">
const modelValue = defineModel<any>()
const isError = ref(false)

const props = defineProps<{
    type?: string
    label?: string
    isRequired?: boolean
    isEmail?: boolean
    minlength?: string
    maxlength?: string
}>()

const validator = () => {
    if (
        props.isRequired && !modelValue.value ||
        props.isEmail && !modelValue.value?.includes('@') ||
        props.minlength && props.minlength > modelValue.value?.length ||
        props.maxlength && props.maxlength < modelValue.value?.length
    ) {
        isError.value = true
    }
}
</script>

<style scoped lang="scss">
.input {
    display: flex;
    flex-direction: column;
    align-items: start;

    &.invalid-field {
        input {
            border-color: red;
        }
    }
}
</style>
