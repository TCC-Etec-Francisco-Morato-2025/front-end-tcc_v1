import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import type { Atividade } from 'src/types';

interface AssuntoBanco {
  id: string;
  id_aula: string;
  nome: string;
  descricao: string;
  pontuacao: number;
}

interface AtividadesState {
  atividades: Atividade[];
  loading: boolean;
}

const useAtividadesStore = defineStore('atividades', {
  state: (): AtividadesState => ({
    atividades: [
      // {
      //   id: '1',
      //   titulo: 'Lei da Inércia I',
      //   estrelas: 3,
      //   descricao:
      //     'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
      //   id_aula: '1',
      //   vida: 3,
      //   video: '',
      // },
      // {
      //   id: '2',
      //   titulo: 'Lei da Inércia II',
      //   estrelas: 3,
      //   descricao:
      //     'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
      //   id_aula: '1',
      //   vida: 3,
      //   video: '',
      // },
      // {
      //   id: '3',
      //   titulo: 'Lei da Inércia III',
      //   estrelas: 1,
      //   descricao:
      //     'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
      //   id_aula: '1',
      //   vida: 3,
      //   video: '',
      // },
      // {
      //   id: '4',
      //   titulo: 'Princípio Fundamental da Dinâmica I',
      //   estrelas: 2,
      //   descricao:
      //     'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
      //   id_aula: '1',
      //   vida: 3,
      //   video: '',
      // },
      // {
      //   id: '5',
      //   titulo: 'Princípio Fundamental da Dinâmica II',
      //   estrelas: 3,
      //   descricao:
      //     'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
      //   id_aula: '1',
      //   vida: 3,
      //   video: '',
      // },
      // {
      //   id: '6',
      //   titulo: 'Princípio Fundamental da Dinâmica III',
      //   estrelas: 1,
      //   descricao:
      //     'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
      //   id_aula: '1',
      //   vida: 3,
      //   video: '',
      // },
      // {
      //   id: '7',
      //   titulo: 'Lei da Ação e Reação I',
      //   estrelas: 2,
      //   descricao:
      //     'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
      //   id_aula: '1',
      //   vida: 3,
      //   video: '',
      // },
      // {
      //   id: '8',
      //   titulo: 'Lei da Ação e Reação II',
      //   estrelas: 0,
      //   descricao:
      //     'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
      //   id_aula: '1',
      //   vida: 3,
      //   video: '',
      // },
      // {
      //   id: '1',
      //   titulo: 'Quimica Orgânica I',
      //   estrelas: 3,
      //   descricao:
      //     'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
      //   id_aula: '1',
      //   vida: 3,
      //   video: '',
      // },
      // {
      //   id: '2',
      //   titulo: 'Quimica Orgânica II',
      //   estrelas: 1,
      //   descricao:
      //     'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
      //   id_aula: '1',
      //   vida: 3,
      //   video: '',
      // },
      // {
      //   id: '3',
      //   titulo: 'Quimica Orgânica III',
      //   estrelas: 0,
      //   descricao:
      //     'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
      //   id_aula: '1',
      //   vida: 3,
      //   video: '',
      // },
      // {
      //   id: '1',
      //   titulo: 'Verbo To Be I',
      //   estrelas: 1,
      //   descricao:
      //     'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
      //   id_aula: '1',
      //   vida: 2,
      //   video: '',
      // },
      // {
      //   id: '2',
      //   titulo: 'Verbo To Be II',
      //   estrelas: 3,
      //   descricao:
      //     'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
      //   id_aula: '1',
      //   vida: 2,
      //   video: '',
      // },
      // {
      //   id: '3',
      //   titulo: 'Verbo To Be III',
      //   estrelas: 2,
      //   descricao:
      //     'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem quae laudantium illo perferendis non.',
      //   id_aula: '1',
      //   vida: 2,
      //   video: '',
      // },
    ],
    loading: false,
  }),
  actions: {
    async getAtividades(idAula: string, token?: string, editMode?: boolean) {

      if (editMode) {
        console.info('Pegando todas as Atividades...')
      } else {
        this.atividades = [];
      }

      const query = `
      query pegarAtividades($id_aula: ID!){
        assuntos(id_aula:$id_aula){
          items{
            id
            id_aula
            nome
            descricao
            pontuacao
          }
        }
      }
      `;

      const variables = {
        id_aula: idAula,
      };

      try {
        this.loading = true;

        const response = await api.post<{ data: { assuntos: { items: AssuntoBanco[] } } }>(
          '',
          {
            query,
            variables,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        response.data.data.assuntos.items.forEach((a) => {
          const newAtividade: Atividade = {
            id: a.id,
            id_aula: a.id_aula,
            titulo: a.nome,
            descricao: a.descricao,
            estrelas: a.pontuacao,
            vida: 0,
            video: '',
          };
          this.atividades.push(newAtividade)
        });
      } catch (error) {
        console.error('Erro ao buscar aulas:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});

export default useAtividadesStore;
