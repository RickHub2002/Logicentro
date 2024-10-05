<template>
  <Layout>
    <div id="card-container">
      <Card>
        <form id="form-container">
          <h2 class="titulo">Registro de saída</h2>
          <div class="input-group">
            <label for="placa-saida">Placa do veículo:</label>
            <input type="number" id="placa-saida" placeholder="Valor" />
          </div>
          <div class="input-group">
            <label for="lacre-saida">Número do lacre:</label>
            <input type="text" id="lacre-saida" placeholder="Valor" />
          </div>
          <div class="input-group">
            <label for="motorista-saida">Nome do motorista:</label>
            <input type="number" id="motorista-saida" placeholder="Valor" />
          </div>
          <div class="input-group">
            <label for="data-saida">Data da saída:</label>
            <input type="number" id="data-saida" placeholder="Valor" />
          </div>
        </form>
        <!--form-container-->
      </Card>

      <Card>
        <form id="form-container">
          <h2 class="titulo">Registro de recebimento</h2>
          <div class="input-group">
            <label for="placa-recebimento">Placa do veículo:</label>
            <input type="number" id="placa-recebimento" placeholder="Valor" />
          </div>
          <div class="input-group">
            <label for="lacre-recebimento">Número do lacre:</label>
            <input type="text" id="lacre-recebimento" placeholder="Valor" />
          </div>
          <div class="input-group">
            <label for="motorista-recebimento">Nome do motorista:</label>
            <input type="number" id="motorista-recebimento" placeholder="Valor" />
          </div>
          <div class="input-group">
            <label for="data-recebimento">Data de recebimento:</label>
            <input type="number" id="data-recebimento" placeholder="Valor" />
          </div>
        </form>
        <!--form-container-->
      </Card>
    </div>
    <!--card-container-->
    <h2 id="comentario-titulo">Comentários:</h2>
    <Card class="comentario-card">
        <div id="input-comentario" class="input-group">
          <textarea id="comentario" rows="4" placeholder="Insira suas observações.."></textarea>
          <button id="concluir" type="submit">Concluir confronto</button>
        </div>
    </Card>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue';
import Card from '@/components/Card.vue';
export default {
  name: 'Confrontos',
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

#card-container
  display: grid
  grid-template-columns: 1fr 1fr
  gap: 6.25rem

  margin-bottom: 3.75rem

  .titulo
    @include titulo-styles

  .input-group
      display: flex
      flex-direction: column
      gap: 0.625rem
      flex: 1 0 calc(50% - 1rem)

      margin-top: 0.625rem

      label
        @include label-styles

      input, select
          height: 40px

          border: 0.4px solid #000000
          border-radius: 0.313rem

          padding-left: 0.313rem

          &::placeholder
              @include placeholder-styles

.comentario-card
  margin-bottom: 3.75rem

#comentario-titulo
  @include titulo-styles

  color: $branco

  margin-bottom: 0.625rem

#input-comentario
  display: flex
  flex-direction: column

  #comentario
    height: 200px

    padding-left: 0.313rem
    margin-bottom: 1.375rem

    resize: none

    &::placeholder
      @include placeholder-styles

  #concluir
    cursor: pointer

    width: 134px
    height: 24px

    background-color: $verde1
    color: $branco

    border: 0
    border-radius: 0.313rem

@media screen and (max-width: 968px)
  #card-container
    grid-template-columns: 1fr
</style>