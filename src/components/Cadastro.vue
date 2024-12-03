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
  <Card class="historico">
    <h2 id="titulo-selecionado">Histórico</h2>
    <ul id="card-info">
      <li class="card-info-itens">
          <h2>Placa</h2>
      </li>
      <li class="card-info-itens">
          <h2>Marca</h2>
      </li>
      <li class="card-info-itens">
          <h2>Modelo</h2>
      </li>
      <li class="card-info-itens">
          <h2>Ano</h2>
      </li>
      <li class="card-info-itens">
          <h2>Tipo</h2>
      </li>
      <li class="card-info-itens">
          <h2>Situação</h2>
      </li>
      <li class="card-info-itens">
          <h2>Ações</h2>
      </li>
    </ul>
    <div v-for="veiculo in veiculos" :key="veiculo.id" v-if="tipoSelecionado">
        <ul id="card-valores">
          <li class="card-info-itens">
              <h2>{{ veiculo.placa }}</h2>
          </li>
          <li class="card-info-itens">
              <h2>{{ veiculo.marca }}</h2>
          </li>
          <li class="card-info-itens">
              <h2>{{ veiculo.modelo }}</h2>
          </li>
          <li class="card-info-itens">
              <h2>{{ veiculo.ano }}</h2>
          </li>
          <li class="card-info-itens">
              <h2>{{ veiculo.tipo_veiculo }}</h2>
          </li>
          <li class="card-info-itens">
              <h2>{{ veiculo.situacao }}</h2>
          </li>
          <li class="card-info-itens">
            <a><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_128_208)">
<path d="M1.07433 17.5254C0.386652 18.2128 0.00020767 19.1453 0 20.1177L0 21.9996H1.88192C2.8543 21.9994 3.78678 21.613 4.47425 20.9253L16.7053 8.69422L13.3054 5.29431L1.07433 17.5254Z" fill="#1E1E2F"/>
<path d="M21.216 0.783834C20.9928 0.560383 20.7277 0.383119 20.4359 0.262175C20.1442 0.141231 19.8314 0.0789795 19.5156 0.0789795C19.1997 0.0789795 18.887 0.141231 18.5952 0.262175C18.3034 0.383119 18.0384 0.560383 17.8152 0.783834L14.6013 3.99858L18.0012 7.3985L21.216 4.18467C21.4394 3.96145 21.6167 3.69638 21.7376 3.40461C21.8586 3.11284 21.9208 2.80009 21.9208 2.48425C21.9208 2.16841 21.8586 1.85566 21.7376 1.56389C21.6167 1.27212 21.4394 1.00705 21.216 0.783834V0.783834Z" fill="#1E1E2F"/>
</g>
<defs>
<clipPath id="clip0_128_208">
<rect width="22" height="22" fill="white"/>
</clipPath>
</defs>
            </svg>
            </a>
          </li>
        </ul>
      <div v-if="tipoSelecionado === 'motorista'" v-for="motorista in motoristas" :key="motorista.id">
        <ul id="card-info">
          <li class="card-info-item">
              <h2>Nome</h2>
          </li>
          <li class="card-info-item">
              <h2>CPF</h2>
          </li>
          <li class="card-info-item">
              <h2>CNH</h2>
          </li>
          <li class="card-info-item">
              <h2>Telefone</h2>
          </li>
          <li class="card-info-item">
              <h2>Situação</h2>
          </li>
          <li class="card-info-item">
              <h2>Ações</h2>
          </li>
        </ul>
        <ul id="card-valores">
          <li class="card-info-itens">
              <h2>{{ motorista.nome }}</h2>
          </li>
          <li class="card-info-itens">
              <h2>{{ motorista.cpf }}</h2>
          </li>
          <li class="card-info-itens">
              <h2>{{ motorista.cnh }}</h2>
          </li>
          <li class="card-info-itens">
              <h2>{{ motorista.telefone }}</h2>
          </li>
          <li class="card-info-itens">
              <h2>{{ motorista.situacao }}</h2>
          </li>
          <li class="card-info-itens">
            <a><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_128_208)">
<path d="M1.07433 17.5254C0.386652 18.2128 0.00020767 19.1453 0 20.1177L0 21.9996H1.88192C2.8543 21.9994 3.78678 21.613 4.47425 20.9253L16.7053 8.69422L13.3054 5.29431L1.07433 17.5254Z" fill="#1E1E2F"/>
<path d="M21.216 0.783834C20.9928 0.560383 20.7277 0.383119 20.4359 0.262175C20.1442 0.141231 19.8314 0.0789795 19.5156 0.0789795C19.1997 0.0789795 18.887 0.141231 18.5952 0.262175C18.3034 0.383119 18.0384 0.560383 17.8152 0.783834L14.6013 3.99858L18.0012 7.3985L21.216 4.18467C21.4394 3.96145 21.6167 3.69638 21.7376 3.40461C21.8586 3.11284 21.9208 2.80009 21.9208 2.48425C21.9208 2.16841 21.8586 1.85566 21.7376 1.56389C21.6167 1.27212 21.4394 1.00705 21.216 0.783834V0.783834Z" fill="#1E1E2F"/>
</g>
<defs>
<clipPath id="clip0_128_208">
<rect width="22" height="22" fill="white"/>
</clipPath>
</defs>
            </svg>
            </a>
          </li>
        </ul>
      </div>
      <div v-if="tipoSelecionado === 'empresa'" v-for="empresa in empresas" :key="empresa.id">
        <ul id="card-info">
          <li class="card-info-item">
              <span>Empresa</span>
              <span>{{ empresa.nome }}</span>
          </li>
          <li class="card-info-item">
              <span>CNPJ</span>
              <span>{{ empresa.cnpj }}</span>
          </li>
          <li class="card-info-item">
              <span>Logradouro</span>
              <span>{{ empresa.logradouro }}</span>
          </li>
          <li class="card-info-item">
              <span>Cidade</span>
              <span>{{ empresa.cidade }}</span>
          </li>
          <li class="card-info-item">
              <span>Estado</span>
              <span>{{ empresa.estado }}</span>
          </li>
          <li class="card-info-item">
              <span>Situação</span>
              <span>{{ empresa.situacao }}</span>
          </li>
          <li class="card-info-item">
              <span>Ações</span>
              <a><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.2499 3.66665H16.4083C15.9697 1.53411 14.0937 0.00275 11.9166 0H10.0832C7.90602 0.00275 6.0301 1.53411 5.59156 3.66665H2.7499C2.24365 3.66665 1.83325 4.07705 1.83325 4.5833C1.83325 5.08956 2.24365 5.5 2.7499 5.5H3.66656V17.4167C3.66961 19.9467 5.71986 21.997 8.2499 22H13.7499C16.2799 21.997 18.3302 19.9467 18.3333 17.4167V5.5H19.2499C19.7562 5.5 20.1666 5.08961 20.1666 4.58335C20.1666 4.07709 19.7562 3.66665 19.2499 3.66665ZM10.0833 15.5833C10.0833 16.0896 9.67286 16.5 9.1666 16.5C8.6603 16.5 8.2499 16.0896 8.2499 15.5833V10.0833C8.2499 9.57709 8.6603 9.1667 9.16656 9.1667C9.67281 9.1667 10.0832 9.57709 10.0832 10.0833V15.5833H10.0833ZM13.7499 15.5833C13.7499 16.0896 13.3395 16.5 12.8333 16.5C12.327 16.5 11.9166 16.0896 11.9166 15.5833V10.0833C11.9166 9.57709 12.327 9.1667 12.8333 9.1667C13.3395 9.1667 13.7499 9.57709 13.7499 10.0833V15.5833ZM7.49 3.66665C7.8799 2.56876 8.9182 1.83472 10.0833 1.8333H11.9166C13.0817 1.83472 14.12 2.56876 14.5099 3.66665H7.49Z" fill="#1E1E2F"/></svg></a>
          </li>
        </ul>
      </div>
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
      veiculos: [],
      motoristas: [],
      empresas: [],
    };
  },
  mounted(){
    this.buscarDados();
  },
  methods: {
    async buscarDados() {
      try {
          const [responseMotoristas, responseEmpresas, responseVeiculos] = await Promise.all([
              fetch('http://localhost:8000/api/motoristas/'),
              fetch('http://localhost:8000/api/empresas/'),
              fetch('http://localhost:8000/api/veiculos/')
          ]);

          if (responseMotoristas.ok) {
              this.motoristas = await responseMotoristas.json();
          } else {
              console.error('Erro ao buscar motoristas');
          }

          if (responseEmpresas.ok) {
              this.empresas = await responseEmpresas.json();
          } else {
              console.error('Erro ao buscar empresas');
          }

          if (responseVeiculos.ok){
              this.veiculos=await responseVeiculos.json();
          }else{
              console.error('Erro ao buscar veículos');
          }

      } catch (error) {
          console.error('Erro na requisição:', error);
      }
    },
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

  background: $branco

  width: 110px
  text-align: center

  margin-top: 1.875rem

  border: $borda-04
  border-radius: 0.313rem

  transition: 0.2s ease-in-out

  &:hover
    background: $azul3
    color: $branco2

#card-info
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)) // Faz o grid ser responsivo
  gap: 1rem
  padding: 10px

.card-info-item
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  gap: .5rem

  border-right: 1px solid #000


.historico
  margin-top: 40px

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

@media screen and (max-width: 520px)
  .input-group
    max-width: 300px

@media screen and (max-width: 440px)
    .input-group
      max-width: 200px

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
