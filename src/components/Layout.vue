<template>
  <div id="layout-container">
    <Sidebar />
    <div id="main-content">
      <Breadcrumb />
      <h1 id="titulo">{{titulo}}</h1>
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
  },
  computed: {
    titulo(){
      if (this.$route.name==='PaginaInicial'){
        return 'Página Inicial'
      } else if (this.$route.name==='NovoRegistro'){
        return 'Criar novo registro'
      } else if (this.$route.name==='Perfil'){
        return 'Perfil'
      } else if(this.$route.name==='RegistrosPendentes'){
        return 'Registros pendentes'
      } else if(this.$route.name==='Confrontos' || this.$route.name==='SemConfrontos'){
        return 'Confrontos'
      } else if (this.$route.name==='Historico'){
        return 'Histórico'
      } else if(this.$route.name==='Cadastro'){
        return 'Cadastro'
      } else {
        return 'Página Desconhecida'
      }
    }
  }
};
</script>

<style lang="sass" scoped>
@import '@/assets/sass/main.sass' // Usando o alias definido

#layout-container
  display: flex

  #main-content
    min-height: 100vh
    flex: 1

    margin-left: 84px

    background-color: $azul3

    padding: 5rem 7rem 5rem 4rem

    #breadcrumb
      @include trilha-styles
      color: $branco

      margin-bottom: 1.25rem
    #titulo
      @include titulo-styles
      color: $branco

      margin-bottom: 1rem
</style>