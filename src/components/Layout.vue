<template>
  <div id="layout-container">
    <Sidebar />
    <div id="main-content">
      <p id="breadcrumb">Breadcrumbs/registros-pendentes</p>
      <h1 id="titulo">Registros Pendentes (Aguardando recebimento)</h1>
      <slot></slot>
    </div>
    <!--main-content-->
  </div>
  <!--layout-container-->
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';

export default {
  name: 'Layout',
  components: {
    Sidebar,
    Breadcrumb,
  }
};
</script>

<style lang="sass" scoped>
@import '@/assets/sass/main.sass' // Usando o alias definido

#layout-container
  display: flex

  #main-content
    height: 100%
    flex: 1

    margin-left: 400px

    background-color: $azul3

    padding: 6.875rem 8rem 0 3.75rem

    #breadcrumb
      @include trilha-styles
      color: $branco

      margin-bottom: 1.25rem
    #titulo
      @include titulo-styles
      color: $branco

      margin-bottom: 1rem
</style>