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
            <h2>{{ confronto.operacao.placa }}</h2>
            <h2>{{ getEmpresaNome(confronto.operacao.empresa_origem) }}</h2>
            <h2>{{ getEmpresaNome(confronto.operacao.empresa_destino) }}</h2>
            <h2>{{ confronto.status }}</h2>
            <button class="btn-detalhes" @click="abrirConfronto(confronto.id_confronto)">Abrir Confronto</button>     
          </li>
        </ul>
      </Card>
    </div>
    <!-- Exibição do Card Condicional -->
    <div @click="fecharConfronto" id="modal-overlay" v-if="confrontoSelecionado">
      <div id="modal-content" @click.stop>
        <Card id="card-container">
          <section id="form-container">
            <h2 class="titulo">Registro de saída</h2>
            <div class="input-group">
              <label for="placa-saida">Placa do veículo:</label>
              <input type="text" id="placa-saida" :value="confrontoSelecionado.operacao.placa" readonly />
            </div>
            <div class="input-group">
              <label for="lacre1-saida">Número do 1º lacre:</label>
              <input type="text" id="lacre1-saida" :value="confrontoSelecionado.operacao.nro_lacre1_saida" readonly />
            </div>
            <div class="input-group">
              <label for="lacre2-saida">Número do 2º lacre (opcional):</label>
              <input type="text" id="lacre2-saida" :value="confrontoSelecionado.operacao.nro_lacre2_saida" readonly />
            </div>
            <div class="input-group">
              <label for="motorista-saida">Nome do motorista:</label>
              <input type="text" id="motorista-saida" :value="getMotoristaNome(confrontoSelecionado.operacao.motorista_saida)" readonly />
            </div>
            <div class="input-group">
              <label for="data-saida">Data da saída:</label>
              <input type="date" id="data-saida" :value="confrontoSelecionado.operacao.dta_saida" readonly />
            </div>
          </section>
          <section id="form-container">
            <h2 class="titulo">Registro de recebimento</h2>
            <div class="input-group">
              <label for="placa-recebimento">Placa do veículo:</label>
              <input type="text" id="placa-recebimento" :value="confrontoSelecionado.operacao.placa" readonly />
            </div>
            <div class="input-group">
              <label for="lacre1-recebimento">Número do 1º lacre:</label>
              <input type="text" id="lacre1-recebimento" :value="confrontoSelecionado.operacao.nro_lacre1_entrada" readonly />
            </div>
            <div class="input-group">
              <label for="lacre2-recebimento">Número do 2º lacre (opcional):</label>
              <input type="text" id="lacre2-recebimento" :value="confrontoSelecionado.operacao.nro_lacre2_entrada" readonly />
            </div>
            <div class="input-group">
              <label for="motorista-recebimento">Nome do motorista:</label>
              <input type="text" id="motorista-recebimento" :value="getMotoristaNome(confrontoSelecionado.operacao.motorista_recebimento)" readonly />
            </div>
            <div class="input-group">
              <label for="data-recebimento">Data de recebimento:</label>
              <input type="date" id="data-recebimento" :value="confrontoSelecionado.operacao.dta_entrada" readonly />
            </div>
          </section>
          <section class="comentario-card">
            <h2 id="comentario-titulo">Comentários:</h2>
            <div id="input-comentario" class="input-group">
              <textarea id="comentario" rows="4" placeholder="Insira suas observações.." v-model="confrontoSelecionado.comentario"></textarea>
              <button id="concluir" type="submit" @click="salvarConfronto">Concluir confronto</button>
              <button id="fechar-modal" @click="fecharConfronto">Fechar janela</button>
            </div>
          </section>
        </Card>
      </div>
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
      opList: [],
      motoristas: [],
      empresas: [],
      operacoes: [], //carrega as operacoes com o status 'Confronto'
      placa: null,
      origem: null
    };
  },
  methods: {
    async buscarDados() {
      try {
        const [responseMotoristas, responseEmpresas, responseOperacoes] = await Promise.all([
          fetch('http://localhost:8000/api/motoristas/'),
          fetch('http://localhost:8000/api/empresas/'),
          fetch('http://localhost:8000/api/operacoes/')
        ]);

        if (responseMotoristas.ok) {
          this.motoristas = await responseMotoristas.json();
          console.log('Motoristas:', this.motoristas);
        } else {
          console.error('Erro ao buscar motoristas');
        }

        if (responseEmpresas.ok) {
          this.empresas = await responseEmpresas.json();
          console.log('Empresas:', this.empresas);
        } else {
          console.error('Erro ao buscar empresas');
        }

        if (responseOperacoes.ok) {
          const operacoesData = await responseOperacoes.json();
          this.opList = Array.isArray(operacoesData) ? operacoesData : [];
          console.log('Operações:', this.opList);
        } else {
          console.error('Erro ao buscar operações');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    },
    async carregarConfrontos() {
      // Carrega todos os confrontos, sem filtro no back-end
      const response = await fetch("http://localhost:8000/api/confrontos");
      const confrontos = await response.json();
      console.log('Todos os confrontos: ', confrontos);

      // Filtra confrontos com status 'Inconsistente'
      const confrontosInconsistentes = confrontos.filter(confronto => confronto.status === 'Inconsistente');
      console.log('Confrontos inconsistentes: ', confrontosInconsistentes);
    
      // Atualiza o estado com os confrontos filtrados
      this.confrontos = confrontosInconsistentes;
    },
    // Função para obter o nome do motorista
    getMotoristaNome(motoristaId) {
      const motorista = this.motoristas.find(m => m.id_motorista === motoristaId);
      return motorista ? motorista.nome : 'Desconhecido';
    },

    // Função para obter o nome da empresa
    getEmpresaNome(empresaId) {
      const empresa = this.empresas.find(e => e.id_empresa === empresaId);
      return empresa ? empresa.nome : 'Desconhecida';
    },

    abrirConfronto(id) {
      // Busca o confronto selecionado na lista
      this.confrontoSelecionado = this.confrontos.find(
        (confronto) => confronto.id_confronto === id
      );
    },
    fecharConfronto() {
      this.confrontoSelecionado = null;
    },
    async salvarConfronto() {
      if (!this.confrontoSelecionado) return;

      // Verificar se o campo de comentário está preenchido
      if (!this.confrontoSelecionado.comentario || this.confrontoSelecionado.comentario.trim() === "") {
        alert("Comentário é obrigatório!");
        return;
      }

      // Atualizar o status do confronto para 'Concluído'
      this.confrontoSelecionado.status = "Concluído";

      // Enviar dados atualizados para a API
      const response = await fetch(`http://localhost:8000/api/confrontos/${this.confrontoSelecionado.id_confronto}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.confrontoSelecionado),
      });

      if (response.ok) {
        alert("Confronto concluído com sucesso!");
        this.confrontoSelecionado = null; // Fecha o card
        this.carregarConfrontos(); // Atualiza a lista
      } else {
        alert("Erro ao salvar confronto!");
      }
    }
  },
  mounted() {
    // Carregar lista de confrontos ao montar o componente
    this.carregarConfrontos();
    this.buscarDados();
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

#confronto-selecionado
  position: fixed
  padding: 2rem
  top: 50%
  left: 50%
  transform: translate(-50%, -50%) // Centraliza o modal no eixo X e Y
  width: 45vw
  max-height: 80vh // Impede que o modal ultrapasse a altura visível
  overflow-y: auto // Permite rolagem se o conteúdo exceder o tamanho
  width: 45vw
  display: flex
  align-items: center
  justify-content: center
  z-index: 1000
  background: $branco2
  padding: 30px
  border-radius: 0.625rem

// Estilos para os cards de registro/recebimento
#card-container
  display: grid
  grid-template-columns: 1fr 1fr
  gap: 6.25rem

  margin-bottom: 1rem

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

  color: $preto

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

#modal-overlay
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  background-color: rgba(0, 0, 0, 0.5)
  display: flex
  align-items: center
  justify-content: center
  z-index: 1000

#modal-content
  background-color: $branco
  padding: 40px
  border-radius: 10px
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3)
  position: relative
  width: 50%
  max-height: 90%
  overflow-y: auto

#fechar-modal
  width: 134px
  height: 24px
  border: 0
  border-radius: 0.313rem
  box-shadow: 1px 1px 1px 
  font-family: 'Roboto', sans-serif
  background: $branco2
  font-size: 0.875rem
  font-weight: 400
  cursor: pointer
  color: $preto

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
