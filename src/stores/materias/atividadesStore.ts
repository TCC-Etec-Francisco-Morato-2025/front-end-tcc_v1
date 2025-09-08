import { defineStore } from 'pinia';

const useAtividadesStore = defineStore('atividades', {
  state: () => ({
    atividades: [
      { id: 1, nome: 'Lei da Inércia I', estrelas: 3, descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.', assunto: 1, materia: 1 },
      { id: 2, nome: 'Lei da Inércia II', estrelas: 3, descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.', assunto: 1, materia: 1 },
      { id: 3, nome: 'Lei da Inércia III', estrelas: 1, descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.', assunto: 1, materia: 1 },
      {
        id: 4,
        nome: 'Princípio Fundamental da Dinâmica I',
        estrelas: 2, descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
        assunto: 1,
        materia: 1,
      },
      {
        id: 5,
        nome: 'Princípio Fundamental da Dinâmica II',
        estrelas: 3, descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
        assunto: 1,
        materia: 1,
      },
      {
        id: 6,
        nome: 'Princípio Fundamental da Dinâmica III',
        estrelas: 1, descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
        assunto: 1,
        materia: 1,
      },
      { id: 7, nome: 'Lei da Ação e Reação I', estrelas: 2, descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.', assunto: 1, materia: 1 },
      { id: 1, nome: 'Lei da Ação e Reação II', estrelas: 0, descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.', assunto: 1, materia: 1 },
      { id: 1, nome: 'Quimica Orgânica I', estrelas: 3, descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.', assunto: 1, materia: 2 },
      { id: 2, nome: 'Quimica Orgânica II', estrelas: 1, descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.', assunto: 1, materia: 2 },
      { id: 3, nome: 'Quimica Orgânica III', estrelas: 0, descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.', assunto: 1, materia: 2 },
      { id: 1, nome: 'Verbo To Be I', estrelas: 1, descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.', assunto: 1, materia: 3 },
      { id: 2, nome: 'Verbo To Be II', estrelas: 3, descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.', assunto: 1, materia: 3 },
      { id: 3, nome: 'Verbo To Be III', estrelas: 2, descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.', assunto: 1, materia: 3 },
    ],
  }),
});

export default useAtividadesStore;
