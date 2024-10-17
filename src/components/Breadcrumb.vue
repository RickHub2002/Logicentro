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
      const matchedRoutes = route.matched;

      // Retorna apenas as rotas que têm o meta.breadcrumb definido
      return matchedRoutes.filter(route => route.meta && route.meta.breadcrumb);
    });

    const category = computed(() => {
      // Retorna a categoria da penúltima rota, se ela existir
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

