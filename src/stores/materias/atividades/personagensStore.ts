import { defineStore } from 'pinia';
import type { Personagem } from 'src/types';

interface PersonagensState {
  personagens: Personagem[];
}

const usePersonagensStore = defineStore('personagens', {
  state: (): PersonagensState => ({
    personagens: [
      { id: 1, nome: 'Carlos', materia: 'Fisíca', cor: 'rgb(30, 26, 107)', personagem: 'K' },
      { id: 2, nome: 'Janja', materia: 'Inglês', cor: '#ffdefb', personagem: 'B' },
      { id: 3, nome: 'Ricardão', materia: 'Biologia', cor: '#046d6d', personagem: 'A' },
      { id: 4, nome: 'Marcia', materia: 'Geografia', cor: '#ffdd90', personagem: 'C' },
    ],
  }),
});
export default usePersonagensStore;
