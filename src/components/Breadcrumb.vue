<!-- src/components/Breadcrumb.vue -->
<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li v-if="category" class="breadcrumb-item">
        {{ category }} <!-- Exibe a categoria -->
      </li>
      <li v-for="(route, index) in routes" :key="index" class="breadcrumb-item">
        <router-link v-if="index < routes.length - 1" :to="route.path">
          {{ route.meta.breadcrumb }}
        </router-link>
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

    const routes = computed(() => {
      const routes = [];
      let currentRoute = route;

      // Obtém todas as rotas aninhadas até a rota atual
      while (currentRoute) {
        routes.unshift(currentRoute);
        currentRoute = currentRoute.matched && currentRoute.matched.length > 0 ? currentRoute.matched[0] : null;
      }

      // Filtra apenas as rotas com breadcrumb
      return routes.filter(route => route.meta.breadcrumb);
    });

    const category = computed(() => {
      // Retorna a categoria, que é a penúltima rota na lista, se existir
      return routes.value.length > 1 ? routes.value[routes.value.length - 2].meta.breadcrumb : '';
    });

    return {
      category,
      routes,
    };
  },
};
</script>

<style scoped>
.breadcrumb {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: '>';
  margin: 0 0.5rem;
}
</style>
