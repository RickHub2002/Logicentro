<template>
  <Layout>
    <h1 id="titulo">Escolha o Tipo de Cadastro</h1>
    
    <!-- Input de seleção -->
    <select id="selecao" v-model="tipoSelecionado" @change="mostrarCadastro">
      <option value="" disabled>Selecione o tipo de cadastro</option>
      <option value="veiculo">Cadastro de Veículo</option>
      <option value="motorista">Cadastro de Motorista</option>
      <option value="empresa">Cadastro de Empresa</option>
      <option value="usuario">Cadastro de Usuário</option>
    </select>
    <!--selecao-->

  <Card>
    <div v-if="tipoSelecionado" id="cadastro-card">
      <h2 id="titulo-selecionado" >{{ tituloCard }}</h2>
      <div class="input-group" v-if="tipoSelecionado === 'veiculo'">
        <label for="placa">Placa do Veículo:</label>
        <input type="text" id="placa" v-model="dadosCadastro.placa" placeholder="Digite a placa do veículo" />
        
        <label for="modelo">Modelo do Veículo:</label>
        <input type="text" id="modelo" v-model="dadosCadastro.modelo" placeholder="Digite o modelo do veículo" />
      </div>

      <div class="input-group" v-if="tipoSelecionado === 'motorista'">
        <label for="nomeMotorista">Nome do Motorista:</label>
        <input type="text" id="nomeMotorista" v-model="dadosCadastro.nomeMotorista" placeholder="Digite o nome do motorista" />

        <label for="cnh">CNH:</label>
        <input type="text" id="cnh" v-model="dadosCadastro.cnh" placeholder="Digite a CNH" />
      </div>

      <div class="input-group" v-if="tipoSelecionado === 'empresa'">
        <label for="nomeEmpresa">Nome da Empresa:</label>
        <input type="text" id="nomeEmpresa" v-model="dadosCadastro.nomeEmpresa" placeholder="Digite o nome da empresa" />

        <label for="cnpj">CNPJ:</label>
        <input type="text" id="cnpj" v-model="dadosCadastro.cnpj" placeholder="Digite o CNPJ" />
      </div>

      <div class="input-group" v-if="tipoSelecionado === 'usuario'">
        <label for="nomeUsuario">Nome do usuário:</label>
        <input type="text" id="nomeUsuario" v-model="dadosCadastro.nomeUsuario" placeholder="Digite o nome do usuário" />

        <label for="senhaUsuario">Senha do usuário</label>
        <input type="text" id="senhaUsuario" v-model="dadosCadastro.senhaUsuario" placeholder="Digite a senha do usuário" />
      </div>

      <button id="cadastrar" type="submit">Cadastrar</button>
    </div>
  </Card>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue';
import Card from '@/components/Card.vue';
export default {
  name: 'Cadastro',
  components: {
    Layout,
    Card,
  },
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
        nomeUsuario: '',
        senhaUsuario: '',
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
@import '@/assets/sass/main.sass' // Usando o alias definido

#titulo
  @include titulo-styles

  color: $branco
  margin: 2.25rem 0 0.625rem 0

#selecao
  @include placeholder-styles

  border: 0.4px solid $branco

  background: inherit
  border-radius: 0.313rem

  color: $branco2

  width: 100%
  max-width: 545px
  height: 30px

  margin-bottom:  78px

  option
    color: $branco2

  placeholder: red

.input-group
      display: flex
      flex-direction: column
      gap: 0.625rem

      flex: 1 0 calc(50% - 1rem)

      label
        @include label-styles

      input
          height: 40px

          border: 0.4px solid #000000
          border-radius: 0.313rem

          padding-left: 0.313rem

          &::placeholder
              @include placeholder-styles

#titulo-selecionado
  margin-bottom: 1.25rem

#cadastrar
  cursor: pointer
          
  align-self: flex-end

  background: $branco2

  width: 110px
  text-align: center

  margin-top: 1.875rem

  border: $borda-04
  border-radius: 0.313rem

  transition: 0.2s ease-in-out

  &:hover
    background: $azul3
    color: $branco2


</style>
