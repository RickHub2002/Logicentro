<!-- src/components/Breadcrumb.vue -->
<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li v-for="(route, index) in breadcrumbRoutes" :key="index" class="breadcrumb-item">
        <router-link v-if="index !== breadcrumbRoutes.length - 1" :to="route.path">{{ route.meta.breadcrumb }}</router-link>
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

    const breadcrumbRoutes = computed(() => {
      // Obtém todas as rotas aninhadas até a rota atual
      const routes = [];
      let currentRoute = route;

      while (currentRoute) {
        routes.unshift(currentRoute);
        currentRoute = currentRoute.matched[0] ? currentRoute.matched[0] : null;
      }

      return routes.filter(route => route.meta.breadcrumb); // Filtra apenas as rotas com breadcrumb
    });

    return {
      breadcrumbRoutes,
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
