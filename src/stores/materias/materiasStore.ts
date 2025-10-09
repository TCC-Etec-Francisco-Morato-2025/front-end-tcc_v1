import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import type { Materia } from 'src/types';

interface MateriasStore {
  materias: Materia[];
  loading: boolean;
}

const useMateriasStore = defineStore('materias', {
  state: (): MateriasStore => ({
    materias: [
      {
        id: 1,
        nome: 'Fisíca',
        icon: 'fisicaIcon',
        cor: 'rgba(0, 128, 255, 1)',
        path: 'fisica',
        textColor: 'white',
      },
      {
        id: 2,
        nome: 'Química',
        icon: 'quimicaIcon',
        cor: '#9cdd82',
        path: 'quimica',
        textColor: 'white',
      },
      {
        id: 3,
        nome: 'Inglês',
        icon: 'inglesIcon',
        cor: '#ffffff',
        path: 'ingles',
        textColor: 'black',
      },
    ],
    loading: false,
  }),
  actions: {
    async getMaterias() {
      this.loading = true;
      const query = `
        query{
          materias{
            id
            nome
            icon
            cor
            path
            textColor
          }
        }
      `;

      try {
        const response = await api.post<{ data: { materias: Materia[] } }>('', {
          query,
        });

        this.materias = response.data.data.materias;

      } catch (error) {
        console.error('Erro ao buscar aulas:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
export default useMateriasStore;
