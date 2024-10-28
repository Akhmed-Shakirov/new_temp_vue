<template>
    <Header />

    <main class="main">
        <slot />
    </main>

    <!-- <Footer /> -->
</template>

<script setup lang="ts">
import { Header, Footer } from '@/widgets/index'
getTitle()
</script>
