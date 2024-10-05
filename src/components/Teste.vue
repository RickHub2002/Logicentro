<template>
  <div id="cadastro-container">
    <h1>Escolha o Tipo de Cadastro</h1>
    
    <!-- Input de seleção -->
    <select v-model="tipoSelecionado" @change="mostrarCadastro">
      <option value="" disabled>Selecione o tipo de cadastro</option>
      <option value="veiculo">Cadastro de Veículo</option>
      <option value="motorista">Cadastro de Motorista</option>
      <option value="empresa">Cadastro de Empresa</option>
    </select>
    
    <!-- Exibir o card de cadastro correspondente -->
    <div v-if="tipoSelecionado" id="cadastro-card">
      <h2>{{ tituloCard }}</h2>
      <div v-if="tipoSelecionado === 'veiculo'">
        <label for="placa">Placa do Veículo:</label>
        <input type="text" id="placa" v-model="dadosCadastro.placa" placeholder="Digite a placa do veículo" />
        
        <label for="modelo">Modelo do Veículo:</label>
        <input type="text" id="modelo" v-model="dadosCadastro.modelo" placeholder="Digite o modelo do veículo" />
      </div>

      <div v-if="tipoSelecionado === 'motorista'">
        <label for="nomeMotorista">Nome do Motorista:</label>
        <input type="text" id="nomeMotorista" v-model="dadosCadastro.nomeMotorista" placeholder="Digite o nome do motorista" />

        <label for="cnh">CNH:</label>
        <input type="text" id="cnh" v-model="dadosCadastro.cnh" placeholder="Digite a CNH" />
      </div>

      <div v-if="tipoSelecionado === 'empresa'">
        <label for="nomeEmpresa">Nome da Empresa:</label>
        <input type="text" id="nomeEmpresa" v-model="dadosCadastro.nomeEmpresa" placeholder="Digite o nome da empresa" />

        <label for="cnpj">CNPJ:</label>
        <input type="text" id="cnpj" v-model="dadosCadastro.cnpj" placeholder="Digite o CNPJ" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cadastro',
  data() {
    return {
      tipoSelecionado: '', // Para armazenar o tipo de cadastro selecionado
      dadosCadastro: {
        placa: '',
        modelo: '',
        nomeMotorista: '',
        cnh: '',
        nomeEmpresa: '',
        cnpj: '',
      },
      tituloCard: '', // Para armazenar o título do card
    };
  },
  methods: {
    mostrarCadastro() {
      if (this.tipoSelecionado === 'veiculo') {
        this.tituloCard = 'Cadastro de Veículo';
      } else if (this.tipoSelecionado === 'motorista') {
        this.tituloCard = 'Cadastro de Motorista';
      } else if (this.tipoSelecionado === 'empresa') {
        this.tituloCard = 'Cadastro de Empresa';
      }
    },
  },
};
</script>

<style scoped lang="sass">
#cadastro-container
  display: flex
  flex-direction: column
  align-items: center
  margin: 2rem

  select
    margin-bottom: 1rem
    padding: 0.5rem
    width: 100%
    max-width: 400px

#cadastro-card
  background-color: #f5f5f5
  padding: 1.5rem
  border-radius: 10px
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1)
  width: 100%
  max-width: 500px

  label
    display: block
    margin-bottom: 0.5rem
    font-weight: bold

  input
    width: 100%
    padding: 0.5rem
    margin-bottom: 1rem
    border-radius: 5px
    border: 1px solid #ccc
</style>
