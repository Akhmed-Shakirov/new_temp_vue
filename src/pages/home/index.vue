<template>
    <section class="pages">
        <h1>Validator</h1>

        <Validator
            name="Forma1"
            @submit="submit('Forma1 submit')"
            ref="validator1"
        >
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
                isRequired
                minlength="6"
            />

            <Button
                value="Save"
                @click="validator1.toggle()"
            />
        </Validator>

        <br><br>

        <Validator
            name="Forma2"
            @submit="submit('Forma2 submit')"
            ref="validator2"
        >
            <Input
                label="email"
                v-model="item2.email"
                isRequired
                isEmail
                minlength="6"
            />

            <Input
                label="login"
                v-model="item2.login"
                isRequired
                minlength="6"
            />

            <Input
                label="password"
                v-model="item2.password"
                isRequired
                minlength="6"
            />

            <Button
                value="Save"
                @click="validator2.toggle()"
            />
        </Validator>
    </section>
</template>

<script setup lang="ts">

const validator1 = ref<any>()
const validator2 = ref<any>()

const submit = (event: any) => {
    console.log(event)
}

const item = ref({
    email: '',
    login: '',
    password: ''
})

const item2 = ref({
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
