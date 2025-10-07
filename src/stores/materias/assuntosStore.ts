import { defineStore } from 'pinia';
import type { Assunto } from 'src/types';
import { api } from 'src/boot/axios';

interface AssuntosState {
  assuntos: Assunto[];
  loading: boolean;
}

const useAssuntosStore = defineStore('assuntos', {
  state: (): AssuntosState => ({
    assuntos: [
      { id: 1, nome: 'Leis de Newton', materia: 1 },
      { id: 1, nome: 'Quimica Orgânica', materia: 2 },
      { id: 1, nome: 'Verbo To Be', materia: 3 },
    ],
    loading: false,
  }),
  actions: {
    async getAssuntos(idMateria:string) {
      this.loading = true;
      const query = `
        query pegarAssuntos($idMateria: ID!){
          assuntos(materia:$idMateria){
            id
            nome
            materia
          }
        }
      `;

      const variables = {
        idMateria: idMateria,
      };

      const response = await api.post< { data: { assuntos: Assunto[] } }>('', { query, variables });

      try {
        this.assuntos.push(...response.data.data.assuntos);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    }
  },
});

export default useAssuntosStore;
