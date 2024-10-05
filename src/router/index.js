// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// Importando suas páginas ou componentes
import Login from '@/components/Login.vue';
import RegistrosPendentes from '@/components/Registros-pendentes.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/registros',
    name: 'Registros-pendentes',
    component: RegistrosPendentes,
  },
  // Adicione outras rotas aqui
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
