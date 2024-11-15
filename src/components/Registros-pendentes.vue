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
          <li class="card-info-item">
            <span>Ações</span>
            <a><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.2499 3.66665H16.4083C15.9697 1.53411 14.0937 0.00275 11.9166 0H10.0832C7.90602 0.00275 6.0301 1.53411 5.59156 3.66665H2.7499C2.24365 3.66665 1.83325 4.07705 1.83325 4.5833C1.83325 5.08956 2.24365 5.5 2.7499 5.5H3.66656V17.4167C3.66961 19.9467 5.71986 21.997 8.2499 22H13.7499C16.2799 21.997 18.3302 19.9467 18.3333 17.4167V5.5H19.2499C19.7562 5.5 20.1666 5.08961 20.1666 4.58335C20.1666 4.07709 19.7562 3.66665 19.2499 3.66665ZM10.0833 15.5833C10.0833 16.0896 9.67286 16.5 9.1666 16.5C8.6603 16.5 8.2499 16.0896 8.2499 15.5833V10.0833C8.2499 9.57709 8.6603 9.1667 9.16656 9.1667C9.67281 9.1667 10.0832 9.57709 10.0832 10.0833V15.5833H10.0833ZM13.7499 15.5833C13.7499 16.0896 13.3395 16.5 12.8333 16.5C12.327 16.5 11.9166 16.0896 11.9166 15.5833V10.0833C11.9166 9.57709 12.327 9.1667 12.8333 9.1667C13.3395 9.1667 13.7499 9.57709 13.7499 10.0833V15.5833ZM7.49 3.66665C7.8799 2.56876 8.9182 1.83472 10.0833 1.8333H11.9166C13.0817 1.83472 14.12 2.56876 14.5099 3.66665H7.49Z" fill="#1E1E2F"/></svg></a>
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
        const motorista = this.motoristas.find(m => m.id_motorista === op.torista_saida);
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

    border-right: 1px solid #000


  #icons
    display: flex
    gap: 1rem

@media screen and (max-width: 512px)
</style>