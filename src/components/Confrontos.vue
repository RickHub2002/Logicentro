<template>
  <Layout>
    <div id="historico-confrontos">
      <Card v-for="confronto in confrontos" :key="confronto.id_confronto">
        <ul id="card-info">
          <li class="card-info-itens">
              <h2>ID</h2>
              <h2>Placa da Operação</h2>
              <h2>Origem</h2>
              <h2>Destino</h2>
              <h2>Status</h2>
              <h2>Ação</h2>
          </li>
        </ul>
        <ul id="card-valores">
          <li class="card-info-itens">
            <h2>{{ confronto.id_confronto }}</h2>
            <h2>{{  }}</h2>
            <h2>{{  }}</h2>
            <h2>{{  }}</h2>
            <h2>{{ confronto.status }}</h2>
            <button class="btn-detalhes" @click="abrirConfronto(confronto.id)">Abrir Confronto</button>     
          </li>
        </ul>
      </Card>
    </div>

    <!-- Exibição do Card Condicional -->
    <div id="card-container" v-if="confrontoSelecionado">
      <Card>
        <!--form-container-->
        <form id="form-container">
          <h2 class="titulo">Registro de recebimento</h2>
          <div class="input-group">
            <label for="placa-recebimento">Placa do veículo:</label>
            <input type="number" id="placa-recebimento" placeholder="Valor" />
          </div>
          <div class="input-group">
            <label for="lacre1-recebimento">Número do 1º lacre:</label>
            <input type="text" id="lacre1-recebimento" placeholder="Valor" />
          </div>
          <div class="input-group">
            <label for="lacre2-recebimento">Número do 2º lacre (opcional):</label>
            <input type="text" id="lacre2-recebimento" placeholder="Valor" />
          </div>
          <div class="input-group">
            <label for="motorista-recebimento">Nome do motorista:</label>
            <input type="number" id="motorista-recebimento" placeholder="Valor" />
          </div>
          <div class="input-group">
            <label for="data-recebimento">Data de recebimento:</label>
            <input type="number" id="data-recebimento" placeholder="Valor" />
          </div>
          <!--card-container-->
          <h2 id="comentario-titulo">Comentários:</h2>
          <Card class="comentario-card">
              <div id="input-comentario" class="input-group">
                <textarea id="comentario" rows="4" placeholder="Insira suas observações.."></textarea>
                <button id="concluir" type="submit">Concluir confronto</button>
              </div>
          </Card>
        </form>
      </Card>
    </div>
  </Layout>
</template>


<script>
import Layout from "@/components/Layout.vue";
import Card from "@/components/Card.vue";

export default {
  name: "Confrontos",
  components: {
    Layout,
    Card,
  },
  data() {
    return {
      confrontos: [], // Lista de confrontos carregada do banco
      confrontoSelecionado: null, // Confronto atual exibido no card
    };
  },
  methods: {
    async carregarConfrontos() {
      // Simulação de chamada para API - Substitua com sua rota real
      const response = await fetch("http://localhost:8000/api/confrontos?status=Inconsistente");
      this.confrontos = await response.json();
    },
    abrirConfronto(id) {
      // Busca o confronto selecionado na lista
      this.confrontoSelecionado = this.confrontos.find(
        (confronto) => confronto.id === id
      );
    },
    async salvarConfronto() {
      if (!this.confrontoSelecionado) return;

      // Enviar dados atualizados para a API
      const response = await fetch(`/api/confrontos/${this.confrontoSelecionado.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.confrontoSelecionado),
      });

      if (response.ok) {
        alert("Confronto atualizado com sucesso!");
        this.confrontoSelecionado = null; // Fecha o card
        this.carregarConfrontos(); // Atualiza a lista
      } else {
        alert("Erro ao salvar confronto!");
      }
    },
  },
  mounted() {
    // Carregar lista de confrontos ao montar o componente
    this.carregarConfrontos();
  },
};
</script>

<style lang="sass" scoped>
@import '@/assets/sass/main.sass' // Usando o alias definido
#historico-confrontos
  ul
    list-style-type: none

  #card
    margin-bottom: 50px
  #card-info,
  #card-valores
    display: grid
    grid-template-columns: repeat(6, 1fr) // Alinha 5 colunas com mesmo tamanho
    padding: 1rem 0 // Espaçamento vertical
    justify-items: center
    gap: 1rem

    text-align: center
                
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

// Estilos para os cards de registro/recebimento
#card-container
  display: grid
  grid-template-columns: 1fr 1fr
  gap: 6.25rem

  margin-bottom: 3.75rem

  .titulo
    @include titulo-styles

  .input-group
    display: flex
    flex-direction: column
    gap: 0.625rem
    flex: 1 0 calc(50% - 1rem)

    margin-top: 0.625rem

    label
      @include label-styles

    input, select
      height: 40px

      border: 0.4px solid #000000
      border-radius: 0.313rem

      padding-left: 0.313rem

      &::placeholder
        @include placeholder-styles

.comentario-card
  margin-bottom: 3.75rem

#comentario-titulo
  @include titulo-styles

  color: $branco

  margin-bottom: 0.625rem

#input-comentario
  display: flex
  flex-direction: column

  #comentario
    height: 200px

    padding-left: 0.313rem
    margin-bottom: 1.375rem

    resize: none

    &::placeholder
      @include placeholder-styles

  #concluir
    cursor: pointer

    width: 134px
    height: 24px

    background-color: $verde1
    color: $branco

    border: 0
    border-radius: 0.313rem

  // Media queries para responsividade
  @media screen and (max-width: 1024px)
    #main-content
      ul
        list-style-type: none
  
      #card
        margin-bottom: 60px
      #card-info,
      #card-valores
        display: flex
        flex-direction: column
        padding: 1rem 0 // Espaçamento vertical
        align-items: center
        gap: 1rem
  
        text-align: center
                    
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
</style>
