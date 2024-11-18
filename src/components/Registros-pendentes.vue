<template>
  <Layout>
    <section id="main-content">
      <Card class="teste" v-for="registro in registros" :key="registro.id">
        <ul id="card-info">
          <li class="card-info-item">
            <span>Placa</span>
            <span>{{ registro.placa }}</span>
          </li>
          <li class="card-info-item">
            <span>Lacre 1</span>
            <span>{{ registro.lacre1 }}</span>
          </li>
          <li class="card-info-item">
            <span>Lacre 2</span>
            <span>{{ registro.lacre2 }}</span>
          </li>
          <li class="card-info-item">
            <span>Empresa origem</span>
            <span>{{ registro.origem }}</span>
          </li>
          <li class="card-info-item">
            <span>Empresa destino</span>
            <span>{{ registro.destino }}</span>
          </li>
          <li class="card-info-item">
            <span>Motorista</span>
            <span>{{ registro.motorista }}</span>
          </li>
          <li class="card-info-item">
            <span>Data</span>
            <span>
              {{ registro.data.split(' ')[0] }}<br>{{ registro.data.split(' ')[1] }}
            </span>
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
  name: 'Registros-pendentes',
  components: {
    Layout,
    Card,
  },
  data() {
    return {
      motoristas: [],
      empresas: [],
      veiculos: [],
      operacoes: [],
      registros: [],
    };
  },
  mounted() {
    this.buscarDados(); // Executa a busca quando o componente é montado
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

      this.registros = this.operacoes.filter(op => op.status === 'Pendente').map(op => {
        const motorista = this.motoristas.find(m => m.id_motorista === op.motorista);
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
          data: op.dta_saida || 'Data indisponível'
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
  #card
    margin-bottom: 5px

  #card-info
    display: grid
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)) // Faz o grid ser responsivo
    gap: 1rem
    padding: 1rem

  .card-info-item
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    gap: .5rem

    border: 1px solid #000

    padding: .8rem

    transition: .2s

    cursor: default

    &:hover
      background-color: $azul2

      border: 0

  #icons
    display: flex
    gap: 1rem

@media screen and (max-width: 512px)
</style>