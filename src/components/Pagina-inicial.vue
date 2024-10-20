<script setup lang="ts">
import Layout from './Layout.vue';
import { useUserStore } from './user.js';

// Acessando a store diretamente no setup
const userStore = useUserStore();
const username = userStore.username;
</script>

<template>
  <Layout>
    <section id="homepage">
      <div id="boas-vindas">
        <h1>Bem-vindo, {{ username }}!</h1>
      </div>
    </section>
  </Layout>
</template>

<style lang="sass" scoped>
@import '@/assets/sass/main.sass' // Usando o alias definido
    
</style>