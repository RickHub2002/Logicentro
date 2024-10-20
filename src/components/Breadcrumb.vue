<template>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <!-- Exibe a categoria como o primeiro item do breadcrumb -->
        <li v-if="category" class="breadcrumb-item">
          {{ category }}
        </li>
        <li v-for="(route, index) in routes" :key="index" class="breadcrumb-item">
          <!-- Links para as páginas anteriores -->
          <router-link v-if="index < routes.length - 1" :to="route.path">
            {{ route.meta.breadcrumb }}
          </router-link>
          <!-- Página atual sem link -->
          <span v-else>{{ route.meta.breadcrumb }}</span>
        </li>
      </ol>
    </nav>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'Breadcrumb',
  setup() {
    const route = useRoute();

    // Pega as rotas correspondentes e retorna somente aquelas que têm breadcrumb definido
    const routes = computed(() => {
      return route.matched.filter(route => route.meta && route.meta.breadcrumb);
    });

    // Obtém a categoria da rota atual, a partir do meta.category
    const category = computed(() => {
      // Retorna a categoria da primeira rota válida
      return routes.value.length > 0 ? routes.value[0].meta.category : '';
    });

    return {
      routes,
      category,
    };
  },
};
</script>

<style lang="sass" scoped>
.breadcrumb
  display: flex
  list-style: none
  padding: 0
  margin: 1rem 0
  
  color: #fff

.breadcrumb-item+.breadcrumb-item::before
  content: '>'
  margin: 0 0.5rem

@media screen and (max-width: 768px)
  .breadcrumb
    text-align: center
    justify-content: center
    align-items: center

</style>
