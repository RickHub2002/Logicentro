<template>
  <div id="layout-container">
    <Sidebar />
    <div id="main-content">
      <p id="breadcrumb">Breadcrumbs/registros-pendentes</p>
      <h1 id="titulo">Nenhum confronto selecionado</h1>
      <p>Por favor, selecione um confronto no histórico para visualizar os detalhes.</p>
      <button id="historico" type="submit">Voltar ao histórico</button>
    </div>
    <!--main-content-->
  </div>
  <!--layout-container-->
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'Sem-confrontos',
  components: {
    Sidebar,
  }
};
</script>

<style lang="sass" scoped>
@import '@/assets/sass/main.sass' // Usando o alias definido

#layout-container
  display: flex

  #main-content
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center

    height: 100vh
    flex: 1

    background-color: $azul3

    padding: 6.875rem 8rem 0 3.75rem
    margin-left: 400px

    text-align: center

    p
      font-size: 0.875rem
      color: $branco2

      margin-bottom: 1.25rem

    #breadcrumb
      @include trilha-styles
      color: $branco

      margin-bottom: 1.25rem
    #titulo
      @include titulo-styles
      color: $branco

      margin-bottom: 1rem

    #historico
      cursor: pointer

      background: $branco2

      width: 134px
      height: 24px
      text-align: center

      border: $borda-04
      border-radius: 0.313rem

      transition: 0.2s ease-in-out

      &:hover
        background: $azul3
        color: $branco2

@media screen and (max-width: 768px)
  #layout-container
    display: flex

    #main-content
      margin-left: 80px
</style>