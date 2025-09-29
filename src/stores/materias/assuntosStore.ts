import { defineStore } from 'pinia';
import type { Assunto } from 'src/types';

interface AssuntosState {
  assuntos: Assunto[];
}

const useAssuntosStore = defineStore('assuntos', {
  state: (): AssuntosState => ({
    assuntos: [
      { id: 1, nome: 'Leis de Newton', materia: 1 },
      { id: 1, nome: 'Quimica Orgânica', materia: 2 },
      { id: 1, nome: 'Verbo To Be', materia: 3 },
    ],
  }),
});

export default useAssuntosStore;
