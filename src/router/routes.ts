import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/LayoutIncial.vue'),
    children: [
      { path: '', name: 'inicio', component: () => import('pages/InicioPage.vue') },
      {
        path: '/materias',
        name: 'materias',
        component: () => import('pages/MateriasPage.vue'),
      },
      { path: '/config', name: 'config', component: () => import('pages/ConfigPage.vue') },
      {
        path: `/materias/:nomeMateria`,
        name: `materia-conteudo`,
        component: () => import('pages/MateriaConteudoPage.vue'),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
