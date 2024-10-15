<template>
  <Layout>
    <section id="main-content">
      <Card v-for="registro in registros" :key="registro.id">
        <ul id="card-info">
          <li class="card-info-item">
            <span>Placa</span>
            <span>{{ registro.placa }}</span>
          </li>
          <li class="card-info-item">
            <span>Lacre</span>
            <span>{{ registro.lacre }}</span>
          </li>
          <li class="card-info-item">
            <span>Empresa origem</span>
            <span>{{ registro.origem }}</span>
          </li>
          <li class="card-info-item">
            <span>Empresa destino</span>
            <span>{{ registro.destino }}</span>
          </li>
          <li class="card-info-item">
            <span>Motorista</span>
            <span>{{ registro.motorista }}</span>
          </li>
          <li class="card-info-item">
            <span>Data</span>
            <span>
              {{ registro.data.split(' ')[0] }}<br>{{ registro.data.split(' ')[1] }}
            </span>
          </li>
          <li class="card-info-item">
            <span>Ações</span>
            <div id="icons">
              <!-- SVGs de ações -->
            </div>
          </li>
        </ul>
      </Card>
    </section>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue';
import Card from '@/components/Card.vue';
export default {
  name: 'Registros-pendentes',
  components: {
    Layout,
    Card,
  },
  data() {
    return {
      registros: [
        {
          id: 1,
          placa: '#43934B',
          lacre: '0001459',
          origem: 'MATRIZ',
          destino: 'CD',
          motorista: 'ARMANDO',
          data: '12/09/2024 20:50:15',
        },
        {
          id: 2,
          placa: '#43934C',
          lacre: '0001459',
          origem: 'MATRIZ',
          destino: 'CD',
          motorista: 'ARMANDO',
          data: '12/09/2024 20:50:12',
        },
        {
          id: 3,
          placa: '#43934C',
          lacre: '0001459',
          origem: 'MATRIZ',
          destino: 'CD',
          motorista: 'ARMANDO',
          data: '12/09/2024 20:50:10',
        },
        // Adicione outros registros aqui
      ],
    };
  }
};
</script>

<style lang="sass" scoped>
@import '@/assets/sass/main.sass' // Usando o alias definido

#main-content
  #card
    margin-bottom: 5px

  #card-info
    display: grid
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)) // Faz o grid ser responsivo
    gap: 1rem
    padding: 1rem
    margin-bottom: 2.5rem

  .card-info-item
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center


  #icons
    display: flex
    gap: 1rem
</style>