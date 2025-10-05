import { defineStore } from 'pinia';
import type { Atividade } from 'src/types';

interface AtividadesState {
  atividades: Atividade[];
}

const useAtividadesStore = defineStore('atividades', {
  state: (): AtividadesState => ({
    atividades: [
      {
        id: 1,
        titulo: 'Lei da Inércia I',
        estrelas: 3,
        descricao:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
        assunto: 1,
        materia: 1,
      },
      {
        id: 2,
        titulo: 'Lei da Inércia II',
        estrelas: 3,
        descricao:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
        assunto: 1,
        materia: 1,
      },
      {
        id: 3,
        titulo: 'Lei da Inércia III',
        estrelas: 1,
        descricao:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
        assunto: 1,
        materia: 1,
      },
      {
        id: 4,
        titulo: 'Princípio Fundamental da Dinâmica I',
        estrelas: 2,
        descricao:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
        assunto: 1,
        materia: 1,
      },
      {
        id: 5,
        titulo: 'Princípio Fundamental da Dinâmica II',
        estrelas: 3,
        descricao:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
        assunto: 1,
        materia: 1,
      },
      {
        id: 6,
        titulo: 'Princípio Fundamental da Dinâmica III',
        estrelas: 1,
        descricao:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
        assunto: 1,
        materia: 1,
      },
      {
        id: 7,
        titulo: 'Lei da Ação e Reação I',
        estrelas: 2,
        descricao:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
        assunto: 1,
        materia: 1,
      },
      {
        id: 8,
        titulo: 'Lei da Ação e Reação II',
        estrelas: 0,
        descricao:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
        assunto: 1,
        materia: 1,
      },
      {
        id: 1,
        titulo: 'Quimica Orgânica I',
        estrelas: 3,
        descricao:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
        assunto: 1,
        materia: 2,
      },
      {
        id: 2,
        titulo: 'Quimica Orgânica II',
        estrelas: 1,
        descricao:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
        assunto: 1,
        materia: 2,
      },
      {
        id: 3,
        titulo: 'Quimica Orgânica III',
        estrelas: 0,
        descricao:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
        assunto: 1,
        materia: 2,
      },
      {
        id: 1,
        titulo: 'Verbo To Be I',
        estrelas: 1,
        descricao:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
        assunto: 1,
        materia: 3,
      },
      {
        id: 2,
        titulo: 'Verbo To Be II',
        estrelas: 3,
        descricao:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
        assunto: 1,
        materia: 3,
      },
      {
        id: 3,
        titulo: 'Verbo To Be III',
        estrelas: 2,
        descricao:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
        assunto: 1,
        materia: 3,
      },
    ],
  }),
});

export default useAtividadesStore;
