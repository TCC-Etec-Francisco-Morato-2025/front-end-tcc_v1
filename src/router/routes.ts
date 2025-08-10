import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/LayoutIncial.vue'),
    children: [
      { path: '', name: 'inicio', component: () => import('pages/InicioPage.vue') },
      {
        path: 'materias',
        name: 'materias',
        component: () => import('pages/MateriasPage.vue'),
      },
      { path: 'config', name: 'config', component: () => import('pages/ConfigPage.vue') },
      {
        path: `materias/:nomeMateria`,
        name: `materia-conteudo`,
        component: () => import('pages/MateriaConteudoPage.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: ()=>import('pages/LoginPage.vue')
  },
  {
    path: `/adicionar`,
    name: `addAula`,
    component: () => import('pages/AdicionarAula.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
