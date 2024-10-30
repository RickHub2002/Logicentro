<script setup lang="ts">
import Layout from './Layout.vue';
</script>

<template>
  <Layout>
    <section id="homepage">
      <div id="boas-vindas">
        <h1>Bem-vindo, {{ this.username }}!</h1>
      </div>
      <div id="card">
        <p>Sem registros pendentes</p>
      </div>
    </section>
  </Layout>
</template>

<style lang="sass" scoped>
@import '@/assets/sass/main.sass' // Usando o alias definido
    
</style>