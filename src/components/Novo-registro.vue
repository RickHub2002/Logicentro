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
                    <input type="number" id="lacre1" placeholder="Ex: 005940.." v-model="lacre_1" :disabled="!camposHabilitados"/>
                </div>
                <div class="input-group">
                    <label for="placa">Número da placa:</label>
                    <input type="text" id="placa" placeholder="Ex: ABC-4321" v-model="placa" @blur="buscarDados" :disabled="!camposHabilitados"/>
                </div>
                <div class="input-group">
                    <label for="lacre2">Número do 2º lacre (opcional):</label>
                    <input type="number" id="lacre2" placeholder="0005930" v-model="lacre_2" :disabled="!camposHabilitados"/>
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
                    <select id="tipo-selecao" v-model="motoristaSelecionado" @change="atualizarCNH" :disabled="!camposHabilitados">
                        <option value="" disabled selected>Selecione uma opção...</option>
                        <option v-for="motorista in motoristasDisponiveis" :value="motorista.id_motorista" :key="motorista.id_motorista">{{motorista.nome}}</option>
                    </select>
                </div>
                <div class="input-group">
                    <label for="cnh">Documento do motorista (CNH):</label>
                    <input type="text" id="cnh" placeholder="Ex: 00002944665" v-model="cnhMotorista" readonly/>
                </div>
                <div class="input-group">
                    <label for="tipo-selecao">Empresa de origem:</label>
                    <select id="tipo-selecao" v-model="origemSelecionada" :disabled="!camposHabilitados">
                        <option value="" disabled selected>Selecione uma opção...</option>
                        <option v-for="empresa in empresas" :value="empresa.id_empresa" :key="empresa.id_empresa">{{empresa.nome}}</option>
                    </select>
                </div>
                <div class="input-group">
                    <label for="tipo-selecao">Empresa de destino:</label>
                    <select id="tipo-selecao" v-model="destinoSelecionado" @my-event="origem_destino" :disabled="!camposHabilitados">
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
                    <input type="number" id="mdfe" placeholder="Ex: 148503" v-model="mdfe" :disabled="!camposHabilitados"/>
                </div>
                <div class="input-group">
                    <label for="notaFiscal">N° da nota fiscal:</label>
                    <input type="number" id="notaFiscal" placeholder="Ex: AVBDAUDBu03281381" v-model="nota_f" :disabled="!camposHabilitados"/>
                </div>
                <div class="input-group">
                    <label for="mensagem">Observações adicionais:</label>
                    <textarea id="mensagem" rows="4" placeholder="Escreva qualquer observação.."></textarea :disabled="!camposHabilitados">
                    <button id="cadastrar" type="button" @click="handleSubmit" :disabled="!camposHabilitados">Cadastrar</button>
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

            veiculo: {},
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

            operacoesPendentes: [],
            motoristasDisponiveis: [],
            placasEmUso: [],
        };
    },
    computed: {
        destinosFiltrados() {
            return this.empresas.filter(empresa => empresa.id_empresa !== this.origemSelecionada);
        },
        camposHabilitados(){
            return this.operacao;
        }
    },
    watch: {
        placa(newVal) {
            this.placa = this.formatarPlaca(newVal);
            
            if(newVal.length===7){
                if (this.placasEmUso.includes(newVal) && this.operacao==='saída') {
                    alert("A placa digitada já está em uma operação pendente!");
                    this.placa = "";
                    this.modelo= "";
                    this.tipo_veiculo="";
                }else if(this.operacao==='recebimento' && this.placasEmUso.includes(newVal)){
                    this.procurarPlaca();
                }
                else if (!this.placasEmUso.includes(newVal) && this.operacao==='recebimento') {
                    alert("A placa não está associada a nenhuma operação em andamento!");
                    this.placa = "";
                    this.modelo= "";
                    this.tipo_veiculo="";
                }
            }
        }
    },
    mounted() {
        this.buscarDados();
        this.buscarOperacoesPendentes();
    },
    methods: {
        async buscarOperacoesPendentes() {
            try {
                const response = await fetch('http://localhost:8000/api/operacoes');
                const operacoes = await response.json();
                this.operacoesPendentes = operacoes.filter(op => op.status === 'Pendente');
                this.atualizarPlacasDisponiveis();
            } catch (error) {
                console.error('Erro ao buscar operações pendentes', error);
            }
        },
        async procurarPlaca() {
            this.placa = this.placa.toUpperCase();

            if (this.operacao === 'recebimento' && this.placa.length === 7) {
                try {
                    const response = await fetch(`/api/operacoes/pendente/${this.placa}/`);
                    
                    if (response.ok) {
                        // Tenta obter o JSON apenas se a resposta for bem-sucedida
                        const data = await response.json();
                        this.origemSelecionada = data.empresa_origem;
                        console.log('Origem selecionada:', this.origemSelecionada);
                        this.destinoSelecionado = data.empresa_destino;
                        console.log('Destino recuperado:', this.destinoSelecionado);
                        this.lacre1_saida = data.nro_lacre1_saida;
                        console.log('Lacre 1 saída:', this.lacre1_saida);
                        this.lacre2_saida = data.nro_lacre2_saida;
                        console.log('Lacre 2 saída:', this.lacre2_saida);
                        this.mdfe_saida = data.nro_mdfe_saida;
                        console.log('Mdfe_saida:', this.mdfe_saida);
                        this.nota_fiscal_saida = data.nro_notafiscal_saida;
                        console.log('Nota Fiscal_saida:', this.nota_fiscal_saida);
                        // Preenche outros campos necessários para a operação pendente
                    } else {
                        // Tenta obter a mensagem de erro, caso exista
                        const errorData = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
                        alert(errorData.error || 'Erro ao buscar operação pendente.');
                    }
                } catch (error) {
                    console.error('Erro ao buscar operação pendente:', error);
                    alert('Não foi possível buscar a operação. Verifique a conexão com o servidor.');
                }
            }
        },
        atualizarPlacasDisponiveis() {
            this.placasEmUso = this.operacoesPendentes.map(op => op.placa);
            console.log("Placas em uso", this.placasEmUso);
        },
        async buscarDados() {
            try {
                const [responseMotoristas, responseEmpresas, responseVeiculos] = await Promise.all([
                    fetch('http://localhost:8000/api/motoristas/'),
                    fetch('http://localhost:8000/api/empresas/'),
                    fetch('http://localhost:8000/api/veiculos/')
                ]);

                if (responseMotoristas.ok) {
                    this.motoristas = await responseMotoristas.json();
                }

                if (responseEmpresas.ok) {
                    this.empresas = await responseEmpresas.json();
                }

                if (responseVeiculos.ok) {
                    this.veiculo = await responseVeiculos.json();
                }

                if (this.placa) {
                    const responseVeiculo = await fetch(`http://localhost:8000/api/veiculos/${this.placa}`);
                    if (responseVeiculo.ok) {
                        this.veiculo = await responseVeiculo.json();
                        this.id_veiculo = this.veiculo.id_veiculo;
                        this.tipo_veiculo = this.veiculo.tipo_veiculo;
                        this.modelo = this.veiculo.modelo;
                    }


                }

            } catch (error) {
                console.error('Erro na requisição:', error);
            }
        },
        async handleSubmit() {
            if (this.operacao === 'saída' && this.verificarCampos()) {
                this.data_saida = this.obterDataAtual();

                const operacaoData = {
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

                try {
                    const response = await axios.post('http://localhost:8000/api/operacoes/', operacaoData);
                    if (response.status === 200 || response.status === 201) {
                        alert('Registro bem sucedido!');
                        this.resetForm();
                    }
                } catch (error) {
                    console.error('Erro ao registrar operação:', error);
                }
            } else if (this.operacao === 'recebimento' && this.verificarCampos()) {
                this.data_recebimento = this.obterDataAtual();

                const operacaoData = {
                    user_entrada: this.user_entrada,
                    nro_mdfe_entrada: this.mdfe_entrada,
                    nro_notafiscal_entrada: this.nota_fiscal_entrada,
                    nro_lacre1_entrada: this.lacre1_entrada,
                    nro_lacre2_entrada: this.lacre2_entrada
                };

                // Aqui você pode enviar os dados para a API
            }
        },
        formatarPlaca(placa) {
            // Garante que a placa esteja em letras maiúsculas
            return placa.toUpperCase();
        },
        atualizarCNH() {
            const motorista = this.motoristas.find(m => m.id_motorista === this.motoristaSelecionado);
            this.cnhMotorista = motorista ? motorista.cnh : '';
        },
        obterDataAtual() {
            const data = new Date();
            const dia = String(data.getDate()).padStart(2, '0');
            const mes = String(data.getMonth() + 1).padStart(2, '0');
            const ano = data.getFullYear();
            return `${ano}-${mes}-${dia}`;
        },
        verificarCampos() {
            if (!this.motoristaSelecionado) return alert('Selecione o motorista designado!');
            if (!this.origemSelecionada) return alert('Selecione a empresa de origem!');
            if (!this.destinoSelecionado) return alert('Selecione a empresa de destino!');
            if (!this.placa) return alert('Digite a placa do veículo.');

            this.lacre1_saida = this.operacao === 'saída' ? this.lacre_1 : '';
            this.mdfe_saida = this.operacao === 'saída' ? this.mdfe : '';
            this.nota_fiscal_saida = this.operacao === 'saída' ? this.nota_f : '';

            return true;
        },
        resetForm() {
            this.motoristaSelecionado = '';
            this.cnhMotorista = '';
            this.user_saida = '';
            this.origemSelecionada = '';
            this.destinoSelecionado = '';
            this.placa = '';
            this.modelo = '';
            this.tipo_veiculo = '';
            this.lacre1_saida = '';
            this.lacre2_saida = '';
            this.operacao = '';
            this.data_saida = '';
            this.mdfe_saida = '';
            this.nota_fiscal_saida = '';
            this.lacre_1 = '';
            this.lacre_2 = '';
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