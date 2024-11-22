<template>
  <Layout>
    <section id="main-content">
      <Card v-for="registro in registros" :key="registro.id">
        <ul id="card-info">
          <li class="card-info-itens">
            <h2>Id do registro</h2>
            <h2>Placa</h2>
            <h2>Motorista</h2>
            <h2>Data de saída</h2>
            <h2>Data de recebimento</h2>
            <h2>Ação</h2>
          </li>
        </ul>
        <!--card-info-->
        <ul id="card-valores">
          <li class="card-info-itens">
            <h2>{{ registro.id }}</h2>
            <h2>{{ registro.placa }}</h2>
            <h2>{{ registro.motorista }}</h2>
            <h2>{{ registro.data_saida }}</h2>
            <h2>{{ registro.data_entrada }}</h2>
            <button id="visualizar" type="submit">Visualizar</button>
          </li>
        </ul>
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
      mensagem: 'Ola',
      registros: [],
      motoristas: [],
      empresas: [],
      veiculos: [],
      operacoes: []
    };
  },
  mounted(){
    this.buscarDados();
  },
  methods: {
    async buscarDados() {
      try {
        const [responseMotoristas, responseEmpresas, responseVeiculos, responseOperacoes] = await Promise.all([
          fetch('http://localhost:8000/api/motoristas/'),
          fetch('http://localhost:8000/api/empresas/'),
          fetch('http://localhost:8000/api/veiculos/'),
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

        if (responseVeiculos.ok) {
          this.veiculos = await responseVeiculos.json();
          console.log('Veículos:', this.veiculos);
        } else {
          console.error('Erro ao buscar veículos');
        }

        if (responseOperacoes.ok) {
          const operacoesData = await responseOperacoes.json();
          this.operacoes=Array.isArray(operacoesData) ? operacoesData : [];
          console.log('Operações:', this.operacoes);
          this.atualizarRegistros();
        } else {
          console.error('Erro ao buscar operações');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    },
    atualizarRegistros() {
      //segunda verificação da lista de operacoes que tem causado erros
      if (!Array.isArray(this.operacoes) || this.operacoes.length === 0) {
        console.warn("Nenhuma operação encontrada para atualizar registros.");
        return;
      }

      this.registros = this.operacoes.filter(op => op.status === 'Concluído').map(op => {
        const motorista = this.motoristas.find(m => m.id_motorista === op.motorista_saida);
        const empresaOrigem = this.empresas.find(e => e.id_empresa === op.empresa_origem);
        const empresaDestino = this.empresas.find(e => e.id_empresa === op.empresa_destino);
        const veiculo = this.veiculos.find(v => v.id_veiculo === op.veiculo);

        return {
          id: op.id_operacao,
          placa: veiculo ? veiculo.placa : 'Desconhecido',
          lacre1: op.nro_lacre1_saida,
          lacre2: op.nro_lacre2_saida ? op.nro_lacre2_saida : 'Não utilizado',
          origem: empresaOrigem ? empresaOrigem.nome : 'Desconhecida',
          destino: empresaDestino ? empresaDestino.nome : 'Desconhecida',
          motorista: motorista ? motorista.nome : 'Desconhecido',
          data_saida: op.dta_saida || 'Data indisponível',
          data_entrada: op.dta_entrada || 'Data indisponível'
        };
      });
      console.log('Registros: ', this.registros);
    }
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