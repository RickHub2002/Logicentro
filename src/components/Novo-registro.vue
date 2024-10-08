<template>
    <Layout>
        <Card>
            <h2 class="titulo">Informações do veículo</h2>
            <form id="form-container">
                <div class="input-group">
                    <label for="tipo-selecao">Selecione uma Opção:</label>
                    <select id="tipo-selecao">
                        <option value="" disabled selected>Selecione uma opção...</option>
                        <option value="saída">Saída</option>
                        <option value="recebimento">Recebimento</option>
                    </select>
                </div>
                <div class="input-group">
                    <label for="lacre1">Número do lacre:</label>
                    <input type="number" id="lacre1" placeholder="Ex: 005940.." />
                </div>
                <div class="input-group">
                    <label for="placa">Número da placa:</label>
                    <input type="text" id="placa" placeholder="Ex: ABC-4321" />
                </div>
                <div class="input-group">
                    <label for="lacre2">Número do lacre:</label>
                    <input type="number" id="lacre2" placeholder="0005930" />
                </div>
            </form>
            <!--form-container-->
        </Card>
        <Card>
            <h2 class="titulo">Informações do motorista e viagem</h2>
            <form id="form-container">
                <div class="input-group">
                    <label for="tipo-selecao">Nome do motorista:</label>
                    <select id="tipo-selecao">
                        <option value="" disabled selected>Selecione uma opção...</option>
                        <option value="opcao1">opcao1</option>
                        <option value="opcao2">opcao2</option>
                        <option value="opcao3">opcao3</option>
                        <option value="opcao4">opcao4</option>
                    </select>
                </div>
                <div class="input-group">
                    <label for="cnh">Documento do motorista (CNH):</label>
                    <input type="number" id="cnh" placeholder="Ex: 00002944665" />
                </div>
                <div class="input-group">
                    <label for="tipo-selecao">Empresa de origem:</label>
                    <select id="tipo-selecao">
                        <option value="" disabled selected>Selecione uma opção...</option>
                        <option value="cd-saida">CD</option>
                        <option value="filial1-saida">filial1</option>
                        <option value="filial2-saida">filial2</option>
                        <option value="filial3-saida">filial3</option>
                    </select>
                </div>
                <div class="input-group">
                    <label for="tipo-selecao">Empresa de destino:</label>
                    <select id="tipo-selecao">
                        <option value="" disabled selected>Selecione uma opção...</option>
                        <option value="cd-recebimento">CD</option>
                        <option value="filial1-recebimento">filial1</option>
                        <option value="filial2-recebimento">filial2</option>
                        <option value="filial3-recebimento">filial3</option>
                    </select>
                </div>
            </form>
            <!--form-container-->
        </Card>
        <Card>
            <h2 class="titulo">Informações da carga e observações</h2>
            <form id="form-container">
                <div class="input-group">
                    <label for="peso">Peso da carga (kg):</label>
                    <input type="number" id="peso" placeholder="Ex: 600..." />
                </div>
                <div class="input-group">
                    <label for="carga">Tipo de carga:</label>
                    <input type="text" id="carga" placeholder="Ex: Tomate" />
                </div>
                <div class="input-group">
                    <label for="mensagem">Observações adicionais:</label>
                    <textarea id="mensagem" rows="4" placeholder="Escreva qualquer observação.."></textarea>
                    <button id="cadastrar" type="submit">Cadastrar</button>
                </div>
            </form>
            <!--form-container-->
        </Card>
    </Layout>
</template>

<script>
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
            mensagem: 'Ola'
        };
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