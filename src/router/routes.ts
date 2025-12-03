import type { RouteRecordRaw } from 'vue-router';
import { defineAsyncComponent } from 'vue';
import inicioLoading from 'pages/loading/inicioLoading.vue';
import materiasLoading from 'src/pages/loading/materiasLoading.vue';
import configLoading from 'src/pages/loading/configLoading.vue';
import materiaConteudoLoading from 'src/pages/loading/materiaConteudoLoading.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/inicioLayout.vue'),
    children: [
      {
        path: '',
        name: 'inicio',
        component: defineAsyncComponent({
          loader: () => import('pages/InicioPage.vue'),
          loadingComponent: inicioLoading,
          delay: 100, // espera 100ms antes de mostrar o skeleton (evita piscar em loads rápidos)
          timeout: 10000, // tempo máximo de espera antes de erro
        }),
      },
      {
        path: 'materias',
        name: 'materias',
        component: defineAsyncComponent({
          loader: () => import('pages/MateriasPage.vue'),
          loadingComponent: materiasLoading,
          delay: 100, // espera 100ms antes de mostrar o skeleton (evita piscar em loads rápidos)
          timeout: 10000, // tempo máximo de espera antes de erro
        }),
      },
      {
        path: 'config',
        name: 'config',
        component: defineAsyncComponent({
          loader: () => import('pages/ConfigPage.vue'),
          loadingComponent: configLoading,
          delay: 100, // espera 100ms antes de mostrar o skeleton (evita piscar em loads rápidos)
          timeout: 10000, // tempo máximo de espera antes de erro
        }),
      },
      {
        path: `materias/:nomeMateria`,
        name: `materia-conteudo`,
        component: defineAsyncComponent({
          loader: () => import('pages/MateriaConteudoPage.vue'),
          loadingComponent: materiaConteudoLoading,
          delay: 100, // espera 100ms antes de mostrar o skeleton (evita piscar em loads rápidos)
          timeout: 10000, // tempo máximo de espera antes de erro
        }),
      },
      // {
      //   path: 'para-voce',
      //   name: 'para-voce',
      //   component: () => import('pages/ParaVcPage.vue'),
      // },
      {
        path: 'historico',
        name: 'historico',
        component: () => import('src/pages/historicoPage.vue'),
      },
    ],
  },
  {
    // path: `:nomeMateria/:nomeConteudo/:nomeAtividade`,
    path: '/atividade',
    name: 'atividade',
    component: () => import('layouts/atividadeLayout.vue'),
    children: [
      {
        path: `/atividade/introducao`,
        name: 'introducao-atividade',
        component: () => import('pages/atividade/introPage.vue'),
      },
      {
        path: `/atividade/video`,
        name: 'video-atividade',
        component: () => import('pages/atividade/videoPage.vue'),
      },
    ],
  },
  // {
  //   // path: `:nomeMateria/:nomeConteudo/:nomeAtividade`,
  //   path: '/tour',
  //   name: 'tour',
  //   component: () => import('src/layouts/tourLayout.vue'),
  //   children: [
  //     {
  //       path: `/tour/apresentacao`,
  //       name: 'apresentacao',
  //       component: () => import('pages/apresentacaoPage.vue'),
  //     },
  //   ],
  // },
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
  },
  // {
  //   path: '/create/materia',
  //   component: () => import('pages/create/createMateriaPage.vue'),
  // },
  // {
  //   path: '/create/atividade',
  //   component: () => import('pages/create/createAtividade.vue'),
  // },
  // {
  //   path: '/create/item',
  //   component: () => import('pages/create/createItemPage.vue'),
  // },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
