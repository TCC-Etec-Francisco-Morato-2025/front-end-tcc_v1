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
        id_aula: 1,
        id_materia: 1,
        vida: 3,
        video: '',
      },
      {
        id: 2,
        titulo: 'Lei da Inércia II',
        estrelas: 3,
        descricao:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
        id_aula: 1,
        id_materia: 1,
        vida: 3,
        video: '',
      },
      {
        id: 3,
        titulo: 'Lei da Inércia III',
        estrelas: 1,
        descricao:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
        id_aula: 1,
        id_materia: 1,
        vida: 3,
        video: '',
      },
      {
        id: 4,
        titulo: 'Princípio Fundamental da Dinâmica I',
        estrelas: 2,
        descricao:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
        id_aula: 1,
        id_materia: 1,
        vida: 3,
        video: '',
      },
      {
        id: 5,
        titulo: 'Princípio Fundamental da Dinâmica II',
        estrelas: 3,
        descricao:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
        id_aula: 1,
        id_materia: 1,
        vida: 3,
        video: '',
      },
      {
        id: 6,
        titulo: 'Princípio Fundamental da Dinâmica III',
        estrelas: 1,
        descricao:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
        id_aula: 1,
        id_materia: 1,
        vida: 3,
        video: '',
      },
      {
        id: 7,
        titulo: 'Lei da Ação e Reação I',
        estrelas: 2,
        descricao:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
        id_aula: 1,
        id_materia: 1,
        vida: 3,
        video: '',
      },
      {
        id: 8,
        titulo: 'Lei da Ação e Reação II',
        estrelas: 0,
        descricao:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
        id_aula: 1,
        id_materia: 1,
        vida: 3,
        video: '',
      },
      {
        id: 1,
        titulo: 'Quimica Orgânica I',
        estrelas: 3,
        descricao:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
        id_aula: 1,
        id_materia: 2,
        vida: 3,
        video: '',
      },
      {
        id: 2,
        titulo: 'Quimica Orgânica II',
        estrelas: 1,
        descricao:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
        id_aula: 1,
        id_materia: 2,
        vida: 3,
        video: '',
      },
      {
        id: 3,
        titulo: 'Quimica Orgânica III',
        estrelas: 0,
        descricao:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
        id_aula: 1,
        id_materia: 2,
        vida: 3,
        video: '',
      },
      {
        id: 1,
        titulo: 'Verbo To Be I',
        estrelas: 1,
        descricao:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
        id_aula: 1,
        id_materia: 3,
        vida: 2,
        video: '',
      },
      {
        id: 2,
        titulo: 'Verbo To Be II',
        estrelas: 3,
        descricao:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
        id_aula: 1,
        id_materia: 3,
        vida: 2,
        video: '',
      },
      {
        id: 3,
        titulo: 'Verbo To Be III',
        estrelas: 2,
        descricao:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
        id_aula: 1,
        id_materia: 3,
        vida: 2,
        video: '',
      },
    ],
  }),
});

export default useAtividadesStore;
