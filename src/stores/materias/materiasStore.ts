import { defineStore } from 'pinia';
import type { Materia } from 'src/types';

interface MateriasStore {
  materias: Materia[];
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
  }),
});
export default useMateriasStore;
