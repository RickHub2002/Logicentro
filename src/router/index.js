import { createRouter, createWebHistory } from 'vue-router';
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
    name: '/',
    component: Login,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/registros-pendentes',
    name: 'RegistrosPendentes',
    component: RegistrosPendentes,
    meta: { breadcrumb: 'Registros pendentes', category: 'Registros' },
  },
  {
    path: '/novo-registro',
    name: 'NovoRegistro',
    component: NovoRegistro,
    meta: { breadcrumb: 'Novo registro', category: 'Registros' },
  },
  {
    path: '/confrontos',
    name: 'Confrontos',
    component: Confrontos,
    meta: { breadcrumb: 'Confrontos', category: 'Menu de controle' },
  },
  {
    path: '/sem-confrontos',
    name: 'SemConfrontos',
    component: SemConfrontos,
    meta: { breadcrumb: 'Sem confrontos', category: 'Menu de controle' },
  },
  {
    path: '/historico',
    name: 'Historico',
    component: Historico,
    meta: { breadcrumb: 'Historico', category: 'Menu de controle' },
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: Cadastro,
    meta: { breadcrumb: 'Cadastro', category: 'Menu de controle' },
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil,
    meta: { breadcrumb: 'Perfil', category: 'Menu de controle' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
