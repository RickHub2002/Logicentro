<template>
    <Layout>
        <Card>
            <h2 class="titulo">Informações do veículo</h2>
            <form id="form-container">
                <div class="input-group">
                    <label for="tipo-selecao">Selecione uma Opção:</label>
                    <select id="tipo-selecao" v-model="operacao">
                        <option value="" disabled selected>Selecione uma opção...</option>
                        <option value="saída">Saída</option>
                        <option value="recebimento">Recebimento</option>
                    </select>
                </div>
                <div class="input-group">
                    <label for="lacre1">Número do lacre:</label>
                    <input type="number" id="lacre1" placeholder="Ex: 005940.." v-model="lacre_1"/>
                </div>
                <div class="input-group">
                    <label for="placa">Número da placa:</label>
                    <input type="text" id="placa" placeholder="Ex: ABC-4321" v-model="placa" @blur="buscarDados"/>
                </div>
                <div class="input-group">
                    <label for="lacre2">Número do 2º lacre (opcional):</label>
                    <input type="number" id="lacre2" placeholder="0005930" v-model="lacre_2"/>
                </div>
                <div class="input-group">
                    <label for="placa">Tipo do veículo:</label>
                    <input type="text" id="tipo" placeholder="Ex: Caminhão Leve" readonly v-model="this.tipo_veiculo"/>
                </div>
                <div class="input-group">
                    <label for="placa">Modelo do veículo:</label>
                    <input type="text" id="modelo" placeholder="Ex: Delivery Express" v-model="this.modelo" readonly/>
                </div>
            </form>
            <!--form-container-->
        </Card>
        <Card>
            <h2 class="titulo">Informações do motorista e viagem</h2>
            <form id="form-container">
                <div class="input-group">
                    <label for="tipo-selecao">Nome do motorista:</label>
                    <select id="tipo-selecao" v-model="motoristaSelecionado" @change="atualizarCNH">
                        <option value="" disabled selected>Selecione uma opção...</option>
                        <option v-for="motorista in motoristas" :value="motorista.id_motorista" :key="motorista.id_motorista">{{motorista.nome}}</option>
                    </select>
                </div>
                <div class="input-group">
                    <label for="cnh">Documento do motorista (CNH):</label>
                    <input type="text" id="cnh" placeholder="Ex: 00002944665" v-model="cnhMotorista" readonly/>
                </div>
                <div class="input-group">
                    <label for="tipo-selecao">Empresa de origem:</label>
                    <select id="tipo-selecao" v-model="origemSelecionada">
                        <option value="" disabled selected>Selecione uma opção...</option>
                        <option v-for="empresa in empresas" :value="empresa.id_empresa" :key="empresa.id_empresa">{{empresa.nome}}</option>
                    </select>
                </div>
                <div class="input-group">
                    <label for="tipo-selecao">Empresa de destino:</label>
                    <select id="tipo-selecao" v-model="destinoSelecionado" @my-event="origem_destino">
                        <option value="" disabled selected>Selecione uma opção...</option>
                        <option v-for="empresa in destinosFiltrados" :value="empresa.id_empresa" :key="empresa.id_empresa">{{empresa.nome}}</option>
                    </select>
                </div>
            </form>
            <!--form-container-->
        </Card>
        <Card>
            <h2 class="titulo">Informações da carga e observações</h2>
            <form id="form-container">
                <div class="input-group">
                    <label for="mdfe">N° da mdfe:</label>
                    <input type="number" id="mdfe" placeholder="Ex: 148503" v-model="mdfe"/>
                </div>
                <div class="input-group">
                    <label for="notaFiscal">N° da nota fiscal:</label>
                    <input type="number" id="notaFiscal" placeholder="Ex: AVBDAUDBu03281381" v-model="nota_f"/>
                </div>
                <div class="input-group">
                    <label for="mensagem">Observações adicionais:</label>
                    <textarea id="mensagem" rows="4" placeholder="Escreva qualquer observação.."></textarea>
                    <button id="cadastrar" type="button" @click="handleSubmit">Cadastrar</button>
                </div>
            </form>
            <!--form-container-->
        </Card>
    </Layout>
</template>

<script>
import axios from 'axios';
import Layout from '@/components/Layout.vue';
import Card from '@/components/Card.vue';
import { Value } from 'sass';
export default {
    name: 'Novo-registro',
    components: {
        Layout,
        Card,
    },
    data() {
        return {
            mensagem: 'Ola',
            motoristas: [],
            motoristaSelecionado: "",
            cnhMotorista: "",

            user_saida: "",
            user_entrada: "",

            empresas: [],
            origemSelecionada: "",
            destinoSelecionado: "",

            veiculo: [],
            id_veiculo: "",
            placa: "",
            modelo: "",
            tipo_veiculo: "",
            lacre1_saida: "",
            lacre2_saida: null,
            lacre1_entrada: "",
            lacre2_entrada: null,
            lacre_1: "",
            lacre_2: "",

            operacao: "",
            data_saida: "",
            data_recebimento: "",
            mdfe_saida: "",
            nota_fiscal_saida: "",
            mdfe_entrada: "",
            nota_fiscal_entrada: "",
            nota_f: "",
            mdfe: "",
        };
    },
    computed: {
        destinosFiltrados(){
            return this.empresas.filter(empresa => empresa.id_empresa!==this.origemSelecionada)
        }
    },
    mounted(){
        this.buscarDados();
    },
    methods:{
        async buscarDados() {
            try {
                const [responseMotoristas, responseEmpresas] = await Promise.all([
                    fetch('http://localhost:8000/api/motoristas/'),
                    fetch('http://localhost:8000/api/empresas/')
                ]);

                if (responseMotoristas.ok) {
                    console.log("Motorista selecionado:", this.motoristaSelecionado);
                    this.motoristas = await responseMotoristas.json();
                } else {
                    console.error('Erro ao buscar motoristas');
                }

                if (responseEmpresas.ok) {
                    this.empresas = await responseEmpresas.json();
                } else {
                    console.error('Erro ao buscar empresas');
                }

                // Verifique se a placa está definida antes de fazer a requisição
                if (this.placa) {
                    const responseVeiculo = await fetch(`http://localhost:8000/api/veiculos/${this.placa}`);
                    console.log('Placa digitada: ', this.placa);
                    if (responseVeiculo.ok) {
                        this.veiculo = await responseVeiculo.json();
                        console.log("Veículo selecionado:", this.veiculo.id_veiculo);
                        this.id_veiculo=this.veiculo.id_veiculo;
                        this.tipo_veiculo=this.veiculo.tipo_veiculo;
                        this.modelo=this.veiculo.modelo;
                    } else {
                        console.error('Erro ao buscar veículos');
                        this.veiculo = null;  // Resetar veiculo em caso de erro
                    }
                }else{
                    alert('Digite a placa do veículo.')
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
            }
        },
        async handleSubmit(){
            if (this.operacao==='saída' && this.verificarCampos()){
                this.data_saida=this.obterDataAtual();

                const operacaoData={
                    veiculo: this.id_veiculo,
                    placa: this.placa,
                    motorista: this.motoristaSelecionado,
                    empresa_origem: this.origemSelecionada,
                    user_saida: this.user_saida,
                    dta_saida: this.data_saida,
                    empresa_destino: this.destinoSelecionado,
                    status: 'Pendente',
                    nro_mdfe_saida: this.mdfe_saida,
                    nro_notafiscal_saida: this.nota_fiscal_saida,
                    nro_lacre1_saida: this.lacre1_saida,
                    nro_lacre2_saida: this.lacre2_saida
                };

                const response=await axios.post('http://localhost:8000/api/operacoes/', operacaoData);

                if(response.status===200 || response.status===201){
                    console.log('Registro feito com sucesso: ', response.data);
                    console.log({
                    motorista: this.motoristaSelecionado,
                    nro_lacre1_saida: this.lacre1_saida,
                    nro_lacre2_saida: this.lacre2_saida,
                    nro_mdfe_saida: this.mdfe_saida,
                    nro_notafiscal_saida: this.nota_fiscal_saida,
                    empresa_origem: this.origemSelecionada,
                    empresa_destino: this.destinoSelecionado,
                    placa: this.placa,
                    status: this.status,
                    user_saida: this.user_saida,
                    dta_saida: this.data_saida,
                    veiculo: this.id_veiculo
                    });
                    alert('Registro bem sucedido!');
                    this.motoristaSelecionado='',
                    this.cnhMotorista='',
                    this.user_saida='',
                    this.origemSelecionada='',
                    this.destinoSelecionado='',
                    this.placa='',
                    this.modelo='',
                    this.tipo_veiculo='',
                    this.lacre1_saida='',
                    this.lacre2_saida='',
                    this.operacao='',
                    this.data_saida='',
                    this.mdfe_saida='',
                    this.nota_fiscal_saida=''
                    this.mdfe='',
                    this.nota_f='',
                    this.lacre_1='',
                    this.lacre_2=''
                }
            }
        },
        atualizarCNH() {
            console.log("Motorista selecionado:", this.motoristaSelecionado);
            const motorista = this.motoristas.find(m => m.id_motorista === this.motoristaSelecionado);
            if (motorista) {
                this.cnhMotorista = motorista.cnh;
            }else{
                this.cnhMotorista='';
            }
        },
        origem_destino(){
            if(this.origemSelecionada){
                console.log("Origem selecionada:", this.origemSelecionada);
            }
            if(this.destinoSelecionado){
                console.log("Destino selecionado:", this.destinoSelecionado);
            }
        },
        obterDataAtual() {
            const data = new Date();
            
            // Formatar data como "dd/mm/yyyy hh:mm:ss"
            const dia = String(data.getDate()).padStart(2, '0');
            const mes = String(data.getMonth() + 1).padStart(2, '0'); // Meses começam do 0
            const ano = data.getFullYear();
            
            return `${ano}-${mes}-${dia}`;
        },
        verificarCampos(){
            if(!this.lacre_1){
                alert('Digite o número do 1º lacre!');
                return false;
            }else{
                if(this.operacao==='saída'){
                    this.lacre1_saida=this.lacre_1;
                }else{
                    this.lacre1_entrada=this.lacre_1;
                }
            }

            if(this.lacre_2){
                if(this.operacao==='saída'){
                    this.lacre2_saida=this.lacre_2;
                }else{
                    this.lacre2_entrada=this.lacre_2;
                }
                
            }

            if(!this.motoristaSelecionado){
                alert('Selecione o motorista designado!');
                return false;
            }

            if(!this.origemSelecionada){
                alert('Selecione a empresa de origem!');
                return false;
            }

            if(!this.destinoSelecionado){
                alert('Selecione a empresa de destino!');
                return false;
            }

            if(!this.mdfe){
                alert('Digite o número do MDF-e!');
                return false;
            }else{
                if(this.operacao==='saída'){
                    this.mdfe_saida=this.mdfe;
                }else{
                    this.mdfe_entrada=this.mdfe;
                }
            }

            if(!this.nota_f){
                alert('Digite o número da nota fiscal!');
                return false;
            }else{
                if(this.operacao==='saída'){
                    this.nota_fiscal_saida=this.nota_f;
                }else{
                    this.nota_fiscal_entrada=this.nota_f;
                }
            }

            return true;
        }
    },    
    watch: {
        origemSelecionada(newVal) {
            this.origem_destino(); // Chama a função auxiliar, se necessário
        },
        destinoSelecionado(newVal) {
            this.origem_destino(); // Chama a função auxiliar, se necessário
        }
    }
};
</script>

<style lang="sass" scoped>
@import '@/assets/sass/main.sass' // Usando o alias definido
#card
  margin-bottom: 3.75rem
    
  .titulo
    @include titulo-styles
  #form-container
    @include centralizar()
    justify-content: space-between
    flex-wrap: wrap
    gap: 1rem

    margin-top: 0.625rem
    
    .input-group
        display: flex
        flex-direction: column
        gap: 0.625rem

        flex: 1 0 calc(50% - 1rem)

        label
          @include label-styles

        input, select, textarea
            height: 40px

            border: 0.4px solid #000000
            border-radius: 0.313rem

            padding-left: 0.313rem

            &::placeholder
                @include placeholder-styles

        textarea
          height: 90px
          resize: none

        #cadastrar
          cursor: pointer
          
          align-self: flex-end

          background: $branco2

          width: 110px
          text-align: center

          border: $borda-04
          border-radius: 0.313rem

          transition: 0.2s ease-in-out

          &:hover
            background: $azul3
            color: $branco2
    
</style>