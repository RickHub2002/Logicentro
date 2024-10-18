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
      <option value="veiculo">Histórico de Veículos</option>
      <option value="motorista">Histórico de Motoristas</option>
      <option value="empresa">Histórico de empresas</option>
      <option value="usuario">Cadastro de usuários</option>
    </select>
    <!--selecao-->

  <Card>
    <div v-if="tipoSelecionado" id="cadastro-card">
      <h2 id="titulo-selecionado" >{{ tituloCard }}</h2>
      <div class="input-group" v-if="tipoSelecionado === 'veiculo'">
        <label for="placa">Placa do Veículo:</label>
        <input type="text" id="placa" v-model="dadosCadastro.placa" placeholder="Digite a placa do veículo" />
        
        <label for="marca">Marca do Veículo:</label>
        <input type="text" id="marca" v-model="dadosCadastro.marca" placeholder="Digite a marca do veículo" />

        <label for="modelo">Modelo do Veículo:</label>
        <input type="text" id="modelo" v-model="dadosCadastro.modelo" placeholder="Digite o modelo do veículo" />

        <label for="ano">Ano do Veículo:</label>
        <input type="number" @input="validarAno" id="ano" v-model="dadosCadastro.ano" placeholder="Digite o ano do veículo" />
        
        <label for="tipo">Tipo do veículo:</label>
        <input type="text" id="tipo" v-model="dadosCadastro.tipo" placeholder="Digite o tipo do véiculo" />
        
        <label for="situacao">Situação do véiculo (A/I):</label>
        <select class="situacao">
          <option value="" disabled>Selecione a situação que o veículo se encontra(Ativo/Inativo)</option>
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </select>
        <p v-if="erroAno" style="color: red;">{{ erroAno }}</p>
      </div>

      <div class="input-group" v-if="tipoSelecionado === 'motorista'">
        <label for="nomeMotorista">Nome do Motorista:</label>
        <input type="text" id="nomeMotorista" v-model="dadosCadastro.nomeMotorista" placeholder="Digite o nome do motorista" />

        <label for="cnh">CNH:</label>
        <input type="text" id="cnh" v-model="dadosCadastro.cnh" placeholder="Digite a CNH" />
        
        <label for="cpf">Cpf do motorista:</label>
        <input type="text" id="cpf" v-model="dadosCadastro.cpf" placeholder="Digite o cpf do motorista" />

        <label for="telefone">Telefone do motorista</label>
        <input type="text" id="telefone" v-model="dadosCadastro.telefone" placeholder="Digite o telefone do motorista" />
        
        <select class="situacao">
          <option value="" disabled>Selecione a situação que o veículo se encontra(Ativo/Inativo)</option>
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </select>
      </div>

      <div class="input-group" v-if="tipoSelecionado === 'empresa'">
        <label for="nomeEmpresa">Nome da Empresa:</label>
        <input type="text" id="nomeEmpresa" v-model="dadosCadastro.nomeEmpresa" placeholder="Digite o nome da empresa" />

        <label for="cnpj">CNPJ:</label>
        <input type="text" id="cnpj" v-model="dadosCadastro.cnpj" placeholder="Digite o CNPJ" />
        
        <label for="logradouro">Logradouro:</label>
        <input type="text" id="logradouro" v-model="dadosCadastro.logradouro" placeholder="Digite o logradouro da empresa" />

        <label for="cidade">Cidade: </label>
        <input type="text" id="cidade" v-model="dadosCadastro.cidade" placeholder="Digite a cidade da empresa" />

        <label for="estado">Estado: </label>
        <input type="text" id="estado" v-model="dadosCadastro.estado" placeholder="Digite o estado da empresa" />
              
        <select class="situacao">
          <option value="" disabled>Selecione a situação que o veículo se encontra(Ativo/Inativo)</option>
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </select>
      </div>

      <div class="input-group" v-if="tipoSelecionado === 'usuario'">
        <label for="nomeRealUsuario">Nome completo do usuário:</label>
        <input type="text" id="nomeRealUsuario" v-model="dadosCadastro.nomeRealUsuario" placeholder="Digite o nome completo do usuário" />

        <label for="email">Email do usuário:</label>
        <input type="text" id="email" v-model="dadosCadastro.email" placeholder="Digite o email do usuário" />
        
        <label for="nomeUsuario">Nome do usuário</label>
        <input type="text" id="nomeUsuario" v-model="dadosCadastro.senhaUsuario" placeholder="Digite o nome do usuário" />
        
        <label for="senha">Senha do usuário:</label>
        <input type="text" id="senhaUsuario" v-model="dadosCadastro.senhaUsuario" placeholder="Digite a senha do usuário" />
        
        <label for="cargo">Cargo do usuário:</label>
        <input type="text" id="cargo" v-model="dadosCadastro.cargo" placeholder="Digite o cargo do usuário" />
                     
        <select class="situacao">
          <option value="" disabled>Selecione a situação que o veículo se encontra(Ativo/Inativo)</option>
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </select>
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
        marca: '',
        modelo: '',
        ano: '',
        tipo: '',
        situacao: '',

        nomeMotorista: '',
        cnh: '',
        cpf: '',
        telefone: '',
        situacao: '',

        nomeEmpresa: '',
        cnpj: '',
        logradouro: '',
        cidade: '',
        estado: '',
        situacao: '',

        nomeRealUsuario: '',
        email: '',
        senha: '',
        nomeUsuario: '',
        cargo: '',
        situacao: '',
      },
      erroAno: '',
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
    validarAno() {
      // Garantir que apenas números sejam inseridos e limitar a 4 dígitos
      this.dadosCadastro.ano = this.dadosCadastro.ano.toString().slice(0, 4);
      
      // Validar se o ano está dentro do intervalo permitido (1900-2024)
      if (this.dadosCadastro.ano >= 1970 && this.dadosCadastro.ano <= 2024) {
        print("Brabo")
      }
      else {
        this.dadosCadastro.ano = 's'
      }
    }
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
