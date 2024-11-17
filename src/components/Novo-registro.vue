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
                    <input type="number" id="lacre1" placeholder="Ex: 005940.." v-model="lacre1" :disabled="camposHabilitados()"/>
                </div>
                <div class="input-group">
                    <label for="placa">Número da placa:</label>
                    <input type="text" id="placa" placeholder="Ex: ABC-4321" v-model="placa" @change="procurarPlaca" @blur="buscarDados" :disabled="camposHabilitados()"/>
                </div>
                <div class="input-group">
                    <label for="lacre2">Número do 2º lacre (opcional):</label>
                    <input type="number" id="lacre2" placeholder="0005930" v-model="lacre2" :disabled="camposHabilitados()"/>
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
                    <select id="tipo-selecao" v-model="motoristaSelecionado" :disabled="camposHabilitados()" @change="buscarCNH">
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
                    <template v-if="this.operacao==='saída'">
                        <select id="tipo-selecao" v-model="origemSelecionada" :disabled="camposHabilitados('origem')">
                            <option value="" disabled selected>Selecione uma opção...</option>
                            <option v-for="empresa in empresas" :value="empresa.id_empresa" :key="empresa.id_empresa">{{empresa.nome}}</option>
                        </select>
                    </template>
                    <template v-else>
                        <input type="text" :value="this.origemSelecionada" readonly />
                    </template> 
                </div>
                <div class="input-group">
                    <label for="tipo-selecao">Empresa de destino:</label>
                    <template v-if="this.operacao==='saída'">
                        <select id="tipo-selecao" v-model="destinoSelecionado" @my-event="origem_destino" :disabled="camposHabilitados('destino')">
                            <option value="" disabled selected>Selecione uma opção...</option>
                            <option v-for="empresa in destinosFiltrados" :value="empresa.id_empresa" :key="empresa.id_empresa">{{empresa.nome}}</option>
                        </select>
                    </template>
                    <template v-else>
                        <input type="text" :value="this.destinoSelecionado" readonly />
                    </template>
                </div>
            </form>
            <!--form-container-->
        </Card>
        <Card>
            <h2 class="titulo">Informações da carga e observações</h2>
            <form id="form-container">
                <div class="input-group">
                    <label for="mdfe">N° da mdfe:</label>
                    <input type="number" id="mdfe" placeholder="Ex: 148503" v-model="mdfe" :disabled="camposHabilitados()"/>
                </div>
                <div class="input-group">
                    <label for="notaFiscal">N° da nota fiscal:</label>
                    <input type="number" id="notaFiscal" placeholder="Ex: AVBDAUDBu03281381" v-model="nota_fiscal" :disabled="camposHabilitados()"/>
                </div>
                <div class="input-group">
                    <label for="mensagem">Observações adicionais:</label>
                    <textarea id="mensagem" rows="4" placeholder="Escreva qualquer observação.." v-model="observacao" :disabled="camposHabilitados()"></textarea>
                    <button id="cadastrar" type="button" @click="handleSubmit" :disabled="camposHabilitados()">Cadastrar</button>
                </div>
            </form>
            <!--form-container-->
        </Card>
    </Layout>
</template>

<script>
import axios, { Axios } from 'axios';
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
            id_op: "",
            motoristas: [],
            motoristaSelecionado: "",
            cnhMotorista: "",
            empresas: [],
            origemSelecionada: "",
            destinoSelecionado: "",
            veiculo: {},
            placa: "",
            modelo: "",
            tipo_veiculo: "",
            lacre1_saida: "",
            lacre2_saida: null,
            lacre1_entrada: "",
            lacre2_entrada: null,
            operacao: "",
            data_saida: "",
            data_recebimento: "",
            mdfe_saida: "",
            nota_fiscal_saida: "",
            mdfe_entrada: "",
            nota_fiscal_entrada: "",
            operacoesPendentes: [],
            placasEmUso: [],
            observacao: "",
            lacre1: "",
            lacre2: null,
            mdfe: "",
            nota_fiscal: "",
            motorista_saida: ""
        };
    },
    computed: {
        destinosFiltrados() {
            return this.empresas.filter(empresa => empresa.id_empresa !== this.origemSelecionada);
        },
    },
    watch: {
        placa(newVal) {
            this.placa = this.formatarPlaca(newVal);
            if (newVal.length === 7) {
                if (this.operacao === 'saída' && this.placasEmUso.includes(newVal)) {
                    alert("A placa digitada já está em uma operação pendente!");
                    this.resetPlaca();
                } else if (this.operacao === 'recebimento') {
                    this.placasEmUso.includes(newVal) ? this.procurarPlaca() : this.alertarPlacaNaoEncontrada();
                }
            }
        },
        operacao(newVal){
            if(newVal==='recebimento'){
                this.origemSelecionada='';
                this.destinoSelecionado='';
            }
        }
    },
    mounted() {
        this.buscarDados();
        this.buscarOperacoesPendentes();
    },
    methods: {
        camposHabilitados(campo = null) {
            // Verifica se a operação é 'recebimento'
            if (this.operacao === 'recebimento') {
                // Desabilita apenas os selects 'origem' e 'destino'
                if (campo === 'origem' || campo === 'destino') {
                    return true;
                }
                // Habilita os demais campos
                return false;
            }

            // Se 'this.operacao' não for definido, habilita todos os campos
            if (!this.operacao) {
                return true;
            }
        },
        async buscarOperacoesPendentes() {
            try {
                const response = await axios.get('http://localhost:8000/api/operacoes/');
                this.operacoesPendentes = response.data.filter(op => op.status === 'Pendente');
                this.placasEmUso = this.operacoesPendentes.map(op => op.placa);
            } catch (error) {
                console.error('Erro ao buscar operações pendentes', error);
            }
        },
        async procurarPlaca() {
            if(this.operacao==='recebimento'){
                try {
                    const response = await axios.get(`http://localhost:8000/api/operacoes/pendente/${this.placa}/`);

                    if (response.status === 200) {
                        const data = response.data;
                        console.log("Dados da API:", response.data);
                        this.carregarDadosSaida(data);

                        return response;
                    }else{
                        return null;
                    }

                } catch (error) {
                    console.error("Erro ao buscar operação pendente:", error);
                    if (error.response) {
                        console.error("Erro resposta: ", error.response.data);
                        console.log("Resposta completa:", error.response);
                    }
                    alert("Não foi possível buscar a operação. Verifique a conexão com o servidor.");
                    return null;
                }
            }
        },
        carregarDadosSaida(data) {
            this.id_op=data.id_operacao;
            this.motorista_saida=data.motorista_saida;

            // Atribuindo os IDs primeiro
            const origemId = data.empresa_origem;
            const destinoId = data.empresa_destino;

            // Chamando a função para buscar os nomes
            this.carregarNomesEmpresas(origemId, destinoId);

            this.lacre1_saida = data.nro_lacre1_saida;
            this.lacre2_saida = data.nro_lacre2_saida;
            this.mdfe_saida = data.nro_mdfe_saida;
            console.log(data.nro_mdfe_saida)
            this.nota_fiscal_saida = data.nro_notafiscal_saida;
        },
        async carregarNomesEmpresas(origemId, destinoId) {
            try {
                // Fazendo requisições para obter os nomes das empresas
                const origemResponse = await axios.get(`http://localhost:8000/api/empresas/${origemId}/`);
                const destinoResponse = await axios.get(`http://localhost:8000/api/empresas/${destinoId}/`);

                this.origemSelecionada=origemResponse.data.nome;
                this.destinoSelecionado=destinoResponse.data.nome;
            } catch (error) {
                console.error("Erro ao buscar os nomes das empresas:", error);
            }
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
            if (this.verificarCampos()) {
                const dataOperacao = this.operacao === 'saída' ? this.dadosSaida() : this.dadosRecebimento();
                console.log("Post do recebimento: ", dataOperacao);

                try {
                    if (this.operacao === 'recebimento') {
                        // Chamando a função 'procurarPlaca' para verificar a operação pendente
                        console.log('Placa enviada para procurarPlaca:', this.placa);
                        const responseBuscar = await this.procurarPlaca();
                        console.log('Retorno de procurarPlaca:', responseBuscar);

                        if (responseBuscar && responseBuscar.status === 200) {
                            // Enviando os dados para atualizar a operação existente
                            const responseAtualizar = await axios.post(`http://localhost:8000/api/operacoes/pendente/${this.placa}/`, dataOperacao);
                            if (responseAtualizar.status === 200) {
                                alert('Recebimento registrado com sucesso!');
                                this.resetForm();
                            }
                        } else {
                            alert('Operação pendente não encontrada!');
                        }
                    } else {
                        // Caso seja uma operação de saída, cria uma nova operação
                        const responseCriar = await axios.post('http://localhost:8000/api/operacoes/', dataOperacao);
                        if (responseCriar.status === 201) {
                            alert('Registro de saída bem-sucedido!');
                            this.resetForm();
                        }
                    }
                } catch (error) {
                    console.error('Erro ao registrar operação:', error);
                }
            }
        },
        dadosSaida() {
            this.data_saida = this.obterDataAtual();
            return {
                veiculo: this.veiculo.id_veiculo,
                placa: this.placa,
                motorista_saida: this.motoristaSelecionado,
                motorista_recebimento: "",
                empresa_origem: this.origemSelecionada,
                user_saida: this.user_saida,
                dta_saida: this.data_saida,
                empresa_destino: this.destinoSelecionado,
                status: 'Pendente',
                nro_mdfe_saida: this.mdfe,
                nro_notafiscal_saida: this.nota_fiscal,
                nro_lacre1_saida: this.lacre1,
                nro_lacre2_saida: this.lacre2,
                observacao: this.observacao
            };
        },
        dadosRecebimento() {
            this.data_recebimento = this.obterDataAtual();
            
            const dados={
                user_entrada: this.user_entrada,
                motorista_recebimento: this.motoristaSelecionado,
                nro_mdfe_entrada: this.mdfe,
                nro_notafiscal_entrada: this.nota_fiscal,
                nro_lacre1_entrada: this.lacre1,
                nro_lacre2_entrada: this.lacre2,
                dta_entrada: this.data_recebimento,
                status: ''

            };
        
            const confronto = this.verificarConfronto(dados);
            dados.status = confronto ? 'Confronto' : 'Concluído';

            if (confronto) {
                console.log(confronto);
                this.registrarConfronto(dados);
            }

            console.log('Dados de recebimento: ', dados);
            return dados;
        },
        verificarConfronto(dados) {
            console.log('Comparando motorista:', this.motorista_saida, '!==', dados.motorista_recebimento, '->', this.motorista_saida !== dados.motorista_recebimento);
            console.log('Comparando lacre 1:', this.lacre1_saida, '!==', dados.nro_lacre1_entrada, '->', this.lacre1_saida !== dados.nro_lacre1_entrada);
            console.log('Comparando lacre 2:', this.lacre2_saida, '!==', dados.nro_lacre2_entrada, '->', this.lacre2_saida !== dados.nro_lacre2_entrada);
            console.log('Comparando MDF-e:', this.mdfe_saida, '!==', dados.nro_mdfe_entrada, '->', this.mdfe_saida !== dados.nro_mdfe_entrada);
            console.log('Comparando Nota Fiscal:', this.nota_fiscal_saida, '!==', dados.nro_notafiscal_entrada, '->', this.nota_fiscal_saida !== dados.nro_notafiscal_entrada);

            return (
                this.motorista_saida !== dados.motorista_recebimento ||
                this.lacre1_saida !== dados.nro_lacre1_entrada ||
                this.lacre2_saida !== dados.nro_lacre2_entrada ||
                this.mdfe_saida !== dados.nro_mdfe_entrada ||
                this.nota_fiscal_saida !== dados.nro_notafiscal_entrada
            );
        },
        async registrarConfronto(dados) {
            const dadosConfronto = {
                id_operacao: this.id_op, // Certifique-se de passar o ID correto
                dta_confronto: dados.dta_entrada,
                status: 'Inconsistente',
                comentario: ''
            };

            try {
                const response = await axios.post('http://localhost:8000/api/confrontos/', dadosConfronto);
                if (response.status === 201) {
                    console.log("Confronto gerado!");
                }
            } catch (error) {
                console.error("Erro ao registrar confronto:", error);
            }
        },
                formatarPlaca(placa) {
            return placa.toUpperCase();
        },
        resetPlaca() {
            this.placa = "";
            this.modelo = "";
            this.tipo_veiculo = "";
        },
        resetForm() {
            this.motoristaSelecionado = "";
            this.origemSelecionada = "";
            this.destinoSelecionado = "";
            this.resetPlaca();
            this.operacao = "";
            this.data_saida = "";
            this.data_recebimento = "";
            this.mdfe = "";
            this.nota_fiscal = "";
            this.lacre1 = "";
            this.lacre2 = "";
            this.cnhMotorista="";
            this.observacao="";
        },
        alertarPlacaNaoEncontrada() {
            alert("A placa não está associada a nenhuma operação em andamento!");
            this.resetPlaca();
        },
        obterDataAtual() {
            const data = new Date();
            const dia = String(data.getDate()).padStart(2, '0');
            const mes = String(data.getMonth() + 1).padStart(2, '0');
            const ano = data.getFullYear();
            return `${ano}-${mes}-${dia}`;
        },
        buscarCNH() {
            console.log("Motorista selecionado ID:", this.motoristaSelecionado);
            console.log("Lista de motoristas:", this.motoristas);

            const motorista = this.motoristas.find(m => m.id_motorista === this.motoristaSelecionado);
            console.log("Motorista encontrado:", motorista);

            this.cnhMotorista = motorista ? motorista.cnh : '';
            console.log("CNH do motorista:", this.cnhMotorista);
        },
        verificarCampos() {
            if (!this.motoristaSelecionado) return alert('Selecione o motorista!');
            if (!this.origemSelecionada) return alert('Selecione a empresa de origem!');
            if (!this.destinoSelecionado) return alert('Selecione a empresa de destino!');
            if (!this.placa) return alert('Digite a placa do veículo.');
            if (!this.placa || !this.mdfe) {
                alert("Os campos de placa e MDFE são obrigatórios.");
                return false;
            }
            return true;
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