<template>
    <section class="pages">
        <h1>Validator</h1>

        <Validator @submit="submit">
            <Input
                label="email"
                v-model="item.email"
                isRequired
                isEmail
                minlength="6"
            />

            <Input
                label="login"
                v-model="item.login"
                isRequired
                minlength="6"
            />

            <Input
                label="password"
                v-model="item.password"
                type="number"
                isRequired
                minlength="6"
            />

            <Button value="Save" isSubmit />
        </Validator>
    </section>
</template>

<script setup lang="ts">
const submit = (event: any) => {

}

const item = ref({
    email: '',
    login: '',
    password: ''
})
</script>

<style scoped lang="scss">
.pages {
    display: flex;
    align-items: center;
    flex-direction: column;
}
</style>
