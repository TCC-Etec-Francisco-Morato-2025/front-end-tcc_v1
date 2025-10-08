import { defineStore } from 'pinia';
import type { Aula } from 'src/types';
import { api } from 'src/boot/axios';

interface AulasState {
  aulas: Aula[];
  loading: boolean;
}

const useAulasStore = defineStore('aulas', {
  state: (): AulasState => ({
    aulas: [{ id: 1, id_materia: 1, titulo: 'verbo to be' },{ id: 2, id_materia: 1, titulo: 'verbo to be' },{ id: 3, id_materia: 2, titulo: 'verbo to be' },{ id: 4, id_materia: 3, titulo: 'verbo to be' }],
    loading: false,
  }),
  actions: {
    async getaulas(idMateria: string) {
      this.loading = true;
      const query = `
        query pegarAulas($idMateria: ID!){
          aulas(id_materia:$idMateria){
            id
            id_materia
            titulo
          }
        }
      `;

      const variables = {
        idMateria: idMateria,
      };

      const response = await api.post<{ data: { aulas: Aula[] } }>('', { query, variables });

      try {
        this.aulas.push(...response.data.data.aulas);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
});

export default useAulasStore;
