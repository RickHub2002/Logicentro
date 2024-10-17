<template>
  <Layout>
    <section id="main-content">
      <Card>
        <ul id="card-info">
          <li class="card-info-itens">
            <h2>Id do registro</h2>
            <h2>Placa</h2>
            <h2>Motorista</h2>
            <h2>Data de saída</h2>
            <h2>Data de recebimento</h2>
            <h2>Status</h2>
            <h2>Ação</h2>
          </li>
        </ul>
        <!--card-info-->
        <ul id="card-valores">
          <li class="card-info-itens">
            <h2>1</h2>
            <h2>ABC-1234</h2>
            <h2>João Silva</h2>
            <h2>07/09/2024 17:45:00</h2>
            <h2>07/09/2024 19:35:00</h2>
            <h2>Concluído</h2>
            <button id="visualizar" type="submit">Visualizar</button>
          </li>
        </ul>
        <!--card-info-->
        <!--card-info-->
        <ul id="card-valores">
          <li class="card-info-itens">
            <h2>1</h2>
            <h2>ABC-1234</h2>
            <h2>João Silva</h2>
            <h2>07/09/2024 17:45:00</h2>
            <h2>07/09/2024 19:35:00</h2>
            <h2>Concluído</h2>
            <button id="visualizar" type="submit">Visualizar</button>
          </li>
        </ul>
        <!--card-info-->
      </Card>
    </section>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue';
import Card from '@/components/Card.vue';
export default {
  name: 'Historico',
  components: {
    Layout,
    Card,
  },
  data() {
    return {
      mensagem: 'Ola'
    };
  }
};
</script>

<style lang="sass" scoped>
@import '@/assets/sass/main.sass' // Usando o alias definido
#main-content
  ul
    list-style-type: none

  #card
    margin-bottom: 60px
  #card-info,
  #card-valores
    display: grid
    grid-template-columns: repeat(7, 1fr) // Alinha 7 colunas com mesmo tamanho
    padding: 1rem 0 // Espaçamento vertical
    gap: 1rem
                
    h2
      @include titulo-styles

  #card-valores
    border-top: 1px solid #000

    margin-top: 0.75rem

    h2
      @include card-itens-styles

  .card-info-itens
    display: contents // Para que o grid funcione corretamente

  #visualizar
    cursor: pointer

    width: 100px
    height: 24px

    background-color: $verde1
    color: $branco

    border: 0
    border-radius: 0.313rem

// Media queries para responsividade
@media screen and (max-width: 1400px)
  #card-info, #card-valores
    background: blue

    display: flex
    justify-content: center
    flex-direction: column
</style>