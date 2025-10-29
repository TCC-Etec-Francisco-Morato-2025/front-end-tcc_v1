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
        id: '1',
        nome: 'Fisíca',
        icon: 'fisicaIcon',
        cor: 'rgba(0, 128, 255, 1)',
        path: 'fisica',
        textColor: 'white',
      },
      {
        id: '2',
        nome: 'Química',
        icon: 'quimicaIcon',
        cor: '#9cdd82',
        path: 'quimica',
        textColor: 'white',
      },
      {
        id: '3',
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


        const existMateriasId = new Set(this.materias.map((a) => a.id));
        const novasMateriasAdd = response.data.data.materias.filter(
          (materia) => !existMateriasId.has(materia.id),
        );
        this.materias.push(...novasMateriasAdd);

      } catch (error) {
        console.error('Erro ao buscar Matérias:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async addMateria(nome: string, icon: File, cor: string, textColor: string) {
      const formData = new FormData();
      try {
        const operations = {
          query: `
            mutation AddMateria(
              $nome: String!,
              $cor: String!,
              $textcolor: String!,
              $path: String!,
              $icon: Upload
              ){
                addMateria(
                  nome: $nome,
                  cor: $cor,
                  textcolor: $textcolor,
                  path: $path,
                  icon: $icon
                ){
                  id
                  nome
                }
              }
            `,
          variables: {
            nome: nome,
            icon: null,
            cor: cor,
            textcolor: textColor,
            path: nome
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/\s+/g, '')
                    .trim()
                    .toLowerCase()
          },
        };

        formData.append('operations', JSON.stringify(operations));
        formData.append('map', JSON.stringify({ 0: ['variables.icon'] }));
        formData.append('0', icon);

        await api.post('', formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

      } catch (error) {
        console.error('Erro ao adicionar questões:', error);
        return false;
      }
    },
  }
});
export default useMateriasStore;
