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
        
        <label for="marca">Marca do Veículo:</label>
        <input type="text" id="marca" v-model="dadosCadastro.marca" placeholder="Digite a marca do veículo" />

        <label for="modelo">Modelo do Veículo:</label>
        <input type="text" id="modelo" v-model="dadosCadastro.modelo" placeholder="Digite o modelo do veículo" />

        <label for="ano">Ano do Veículo:</label>
        <input type="number" @blur="validarDados" id="ano" v-model="dadosCadastro.ano" placeholder="Digite o ano do veículo" />
        
        <label for="tipo">Tipo do veículo:</label>
        <input type="text" id="tipo" v-model="dadosCadastro.tipo_veiculo" placeholder="Digite o tipo do véiculo" />
        
        <label for="situacao">Situação do véiculo (A/I):</label>
        <select class="situacao" v-model="dadosCadastro.situacao">
          <option value="" disabled>Selecione a situação que o veículo se encontra(Ativo/Inativo)</option>
          <option value="A">Ativo</option>
          <option value="I">Inativo</option>
        </select>
      </div>

      <div class="input-group" v-if="tipoSelecionado === 'motorista'">
        <label for="nomeMotorista">Nome do Motorista:</label>
        <input type="text" id="nomeMotorista" v-model="dadosCadastro.nomeMotorista" placeholder="Digite o nome do motorista" />

        <label for="cnh">CNH:</label>
        <input type="text" id="cnh" @blur="validarDados" v-model="dadosCadastro.cnh" placeholder="Digite a CNH" />
        
        <label for="cpf">CPF do motorista:</label>
        <input type="text" id="cpf" @blur="validarDados" v-model="dadosCadastro.cpf" placeholder="Digite o CPF do motorista" />

        <label for="telefone">Telefone do motorista</label>
        <input type="text" id="telefone" @blur="validarDados" v-model="dadosCadastro.telefone" placeholder="Digite o telefone do motorista" />
        
        <select class="situacao" v-model="dadosCadastro.situacao">
          <option value="" disabled>Selecione a situação que o motorista se encontra(Ativo/Inativo)</option>
          <option value="A">Ativo</option>
          <option value="I">Inativo</option>
        </select>
      </div>

      <div class="input-group" v-if="tipoSelecionado === 'empresa'">
        <label for="nomeEmpresa">Nome da Empresa:</label>
        <input type="text" id="nomeEmpresa" v-model="dadosCadastro.nomeEmpresa" placeholder="Digite o nome da empresa" />

        <label for="cnpj">CNPJ:</label>
        <input type="text" @blur="validarDados" id="cnpj" v-model="dadosCadastro.cnpj" placeholder="Digite o CNPJ" />
        
        <label for="logradouro">Logradouro:</label>
        <input type="text" id="logradouro" v-model="dadosCadastro.logradouro" placeholder="Digite o logradouro da empresa" />

        <label for="cidade">Cidade: </label>
        <input type="text" id="cidade" v-model="dadosCadastro.cidade" placeholder="Digite a cidade da empresa" />

        <label for="estado">Estado: </label>
        <input type="text" id="estado" v-model="dadosCadastro.estado" placeholder="Digite o estado da empresa" />
              
        <select class="situacao" v-model="dadosCadastro.situacao">
          <option value="" disabled>Selecione a situação que o veículo se encontra(Ativo/Inativo)</option>
          <option value="A">Ativo</option>
          <option value="I">Inativo</option>
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

      <button id="cadastrar" type="button" @click="handleSubmit">Cadastrar</button>
    </div>
  </Card>
  </Layout>
</template>

<script>
import axios from 'axios';
import Layout from '@/components/Layout.vue';
import Card from '@/components/Card.vue';
import * as validadores from '@/components/user.js'
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
        tipo_veiculo: '',
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
      historicoCard: '',
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
      } else if (this.tipoSelecionado === 'usuario') {
        this.tituloCard = 'Cadastro de usuário';
      }
    },
    mostrarHistorico() {
      if (this.tipoSelecionado === 'veiculo') {
        this.historicoCard = 'Histórico de Veículo';
      } else if (this.tipoSelecionado === 'motorista') {
        this.historicoCard = 'Histórico de Motorista';
      } else if (this.tipoSelecionado === 'empresa') {
        this.historicoCard = 'Histórico de Empresa';
      } else if (this.tipoSelecionado === 'usuario') {
        this.historicoCard = 'Histórico de usuário';
      }
    },
    validarDados(){
      if(this.tipoSelecionado==='veiculo'){
        const validacao=validadores.validarAno(this.dadosCadastro.ano)
        const anoAtual = new Date().getFullYear();

        if(validacao){
          console.log("Ano compatível");
        }else if(validacao===false){
          ano = ''; // Limpa o campo se o ano for inválido
          alert("Ano inválido. Por favor, insira um ano entre 1970 e "+anoAtual+"!");
        }
      }else if(this.tipoSelecionado==='motorista'){
        const validacao=validadores.validarCPF(this.dadosCadastro.cpf)
        const validacao2=validadores.validarCNH(this.dadosCadastro.cnh)
        const validacao3=validadores.validarTel(this.dadosCadastro.telefone)

        if(this.dadosCadastro.cpf){
          if(validacao){
            console.log("CPF válido!");
          }else if(validacao===false){
            this.dadosCadastro.cpf='';
            alert("CPF inválido! Tente novamente.")
          }
        }

        if(this.dadosCadastro.cnh){
          if(validacao2){
            console.log("CNH válido!");
          }else if(validacao2===false){
            this.dadosCadastro.cnh='';
            alert("CNH inválido! Tente novamente.")
          }   
        }
        
        if(this.dadosCadastro.telefone){
          if(validacao3){
            console.log("Telefone válido!");
          }else if(validacao3===false){
            this.dadosCadastro.telefone='';
            alert("Telefone inválido! Tente novamente.")
          }   
        }

      }else if(this.tipoSelecionado==='empresa'){
        const validacao4=validadores.validarCNPJ(this.dadosCadastro.cnpj);

        if(validacao4){
          console.log("CNPJ válido!");
        }else if(validacao4===false){
          this.dadosCadastro.cnpj='';
          alert("CNPJ inválido! Tente novamente.")
        }   
      }
    },
    async handleSubmit() {
      try {
        if (this.tipoSelecionado==='veiculo'){
          // Cria um objeto com os dados do formulário
          const vehicleData = {
            placa: this.dadosCadastro.placa,
            marca: this.dadosCadastro.marca,
            modelo: this.dadosCadastro.modelo,
            ano: this.dadosCadastro.ano,
            tipo_veiculo: this.dadosCadastro.tipo_veiculo,
            situacao: this.dadosCadastro.situacao
          };

          // Envia os dados para o backend
          const response = await axios.post('http://localhost:8000/api/veiculos/', vehicleData);

          // Verifica se a requisição foi bem-sucedida
          if (response.status === 200 || response.status === 201) {
            console.log('Veículo cadastrado com sucesso:', response.data);
            alert('Veículo cadastrado com sucesso!');
            // Limpa os campos do 'formulário' após o envio
            this.dadosCadastro.placa = '';
            this.dadosCadastro.marca = '';
            this.dadosCadastro.modelo = '';
            this.dadosCadastro.ano = '';
            this.dadosCadastro.tipo_veiculo = '';
            this.dadosCadastro.situacao= '';
          }
        }else if (this.tipoSelecionado==='motorista'){
          const motoristaProfile = {
            nome: this.dadosCadastro.nomeMotorista,
            cpf: this.dadosCadastro.cpf,
            cnh: this.dadosCadastro.cnh,
            telefone: this.dadosCadastro.telefone,
            situacao: this.dadosCadastro.situacao
          };

          const response = await axios.post('http://localhost:8000/api/motoristas/', motoristaProfile);

          if (response.status === 200 || response.status === 201){
            console.log('Motorista cadastrado com sucesso:', response.data);
            alert('Motorista cadastrado com sucesso!');
            this.dadosCadastro.nomeMotorista='';
            this.dadosCadastro.cpf='';
            this.dadosCadastro.cnh='';
            this.dadosCadastro.telefone='';
            this.dadosCadastro.situacao='';
          }
        }else if (this.tipoSelecionado==='empresa'){
          const empresaProfile = {
            nome: this.dadosCadastro.nomeEmpresa,
            cnpj: this.dadosCadastro.cnpj,
            logradouro: this.dadosCadastro.logradouro,
            cidade: this.dadosCadastro.cidade,
            estado: this.dadosCadastro.estado,
            situacao: this.dadosCadastro.situacao
          };

          const response = await axios.post('http://localhost:8000/api/empresas/', empresaProfile);

          if (response.status === 200 || response.status === 201){
            console.log('Empresa cadastrada com sucesso:', response.data);
            alert('Empresa cadastrada com sucesso!');
            this.dadosCadastro.nomeEmpresa='';
            this.dadosCadastro.cnpj='';
            this.dadosCadastro.logradouro='';
            this.dadosCadastro.cidade='';
            this.dadosCadastro.estado='';
            this.dadosCadastro.situacao='';
          }
        }
      } catch (error) {
        console.error('Erro ao cadastrar: ', error);
        alert('Erro ao cadastrar! Tente novamente.');
      }
    }
  }
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

#historico-dados, #topicos
  list-style-type: none
  display: flex
  gap: 2rem
  @include titulo-styles

  #topicos
    padding: 5px
    background-color: $cinza1

@media screen and (max-width: 520px)
  .input-group
    max-width: 300px

@media screen and (max-width: 440px)
    .input-group
      max-width: 200px
</style>
