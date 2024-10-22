import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store'; // Importa o store para verificar a autenticação
import Login from '@/components/Login.vue';
import RegistrosPendentes from '@/components/Registros-pendentes.vue';
import NovoRegistro from '@/components/Novo-registro.vue';
import Confrontos from '@/components/Confrontos.vue';
import SemConfrontos from '@/components/Sem-Confrontos.vue';
import Historico from '@/components/Historico.vue';
import Cadastro from '@/components/Cadastro.vue';
import Perfil from '@/components/Perfil.vue';
// ... outras importações de páginas

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/registros-pendentes',
    name: 'RegistrosPendentes',
    component: RegistrosPendentes,
    meta: { requiresAuth: true, breadcrumb: 'Registros pendentes', category: 'Registros' }, // Requer autenticação
  },
  {
    path: '/novo-registro',
    name: 'NovoRegistro',
    component: NovoRegistro,
    meta: { requiresAuth: true, breadcrumb: 'Novo registro', category: 'Registros' },
  },
  {
    path: '/confrontos',
    name: 'Confrontos',
    component: Confrontos,
    meta: { requiresAuth: true, breadcrumb: 'Confrontos', category: 'Menu de controle' },
  },
  {
    path: '/sem-confrontos',
    name: 'SemConfrontos',
    component: SemConfrontos,
    meta: { requiresAuth: true, breadcrumb: 'Sem confrontos', category: 'Menu de controle' },
  },
  {
    path: '/historico',
    name: 'Historico',
    component: Historico,
    meta: { requiresAuth: true, breadcrumb: 'Historico', category: 'Menu de controle' },
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: Cadastro,
    meta: { requiresAuth: true, breadcrumb: 'Cadastro', category: 'Menu de controle' },
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil,
    meta: { requiresAuth: true, breadcrumb: 'Perfil', category: 'Menu de controle' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Proteção de rotas
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated; // Verifica se o usuário está autenticado no Vuex

  // Verifica se a rota exige autenticação
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/'); // Redireciona para o login se o usuário não estiver logado
    } else {
      next(); // Se estiver logado, prossegue para a rota
    } 
  } else {
    next(); // Se a rota não exigir autenticação, continua normalmente
  }
});

export default router;
