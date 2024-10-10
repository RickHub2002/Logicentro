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
    name: 'Login',
    component: Login,
    meta: { breadcrumb: 'Login' },
  },
  {
    path: '/registros-pendentes',
    name: 'RegistrosPendentes',
    component: RegistrosPendentes,
    meta: { breadcrumb: 'Registros pendentes' },
  },
  {
    path: '/confrontos',
    name: 'Confrontos',
    component: Confrontos,
    meta: { breadcrumb: 'Confrontos' },
  },
  {
    path: '/novo-registro',
    name: 'NovoRegistro',
    component: NovoRegistro,
    meta: { breadcrumb: 'Novo registro' },
  },
  {
    path: '/sem-confrontos',
    name: 'SemConfrontos',
    component: SemConfrontos,
    meta: { breadcrumb: 'Sem confrontos' },
  },
  {
    path: '/historico',
    name: 'Historico',
    component: Historico,
    meta: { breadcrumb: 'Historico' },
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: Cadastro,
    meta: { breadcrumb: 'Cadasatro' },
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil,
    meta: { breadcrumb: 'Perfil' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
