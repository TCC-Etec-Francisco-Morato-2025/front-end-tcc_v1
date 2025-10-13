import { defineStore } from 'pinia';
import type { Aula } from 'src/types';
import { api } from 'src/boot/axios';

interface AulasState {
  aulas: Aula[];
  loading: boolean;
}

const useAulasStore = defineStore('aulas', {
  state: (): AulasState => ({
    aulas: [
      // { id: '1', id_materia: '1', titulo: 'a' },
      // { id: '2', id_materia: '1', titulo: 'b' },
      // { id: '3', id_materia: '2', titulo: 'c' },
      // { id: '4', id_materia: '3', titulo: 'd' },
    ],
    loading: false,
  }),
  actions: {
    async getAulas(idMateria: string) {
      this.loading = true;

      const query = `
      query pegarAulas($id_materia: ID!){
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

        console.log(response.data)

        // adicionar apenas as que não existem
        const existAulasId = new Set(this.aulas.map((a) => a.id));
        const novasAulasAdd = response.data.data.aulas.items.filter(
          (aula) => !existAulasId.has(aula.id),
        );
        this.aulas.push(...novasAulasAdd);


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
