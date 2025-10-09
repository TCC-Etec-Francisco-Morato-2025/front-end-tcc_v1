import { defineStore } from 'pinia';
import type { Aula } from 'src/types';
import { api } from 'src/boot/axios';

interface AulasState {
  aulas: Aula[];
  loading: boolean;
}

const useAulasStore = defineStore('aulas', {
  state: ():AulasState => ({
    aulas: [
      // { id: 1, id_materia: 1, titulo: 'verbo to be' },
      // { id: 2, id_materia: 1, titulo: 'verbo to be' },
      // { id: 3, id_materia: 2, titulo: 'verbo to be' },
      // { id: 4, id_materia: 3, titulo: 'verbo to be' },
    ],
    loading: false,
  }),
  actions: {
    async getAulas(idMateria: number) {
      this.loading = true;

      const query = `
      query pegarAulas($id_materia: Int!){
        aulas(id_materia:$id_materia){
          items{
            id
            id_materia
            titulo
          }
        }
      }
      `;

      const variables = {
        id_materia: idMateria,
      };

      try {
        const response = await api.post<{ data: { aulas: { items: Aula[] } } }>('', {
          query,
          variables,
        });

        this.aulas = response.data.data.aulas.items;

      } catch (error) {
        console.error('Erro ao buscar aulas:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});

export default useAulasStore;
