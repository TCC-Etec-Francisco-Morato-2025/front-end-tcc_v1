import { defineStore } from 'pinia';
import type { Personagem } from 'src/types';

interface PersonagensState {
  personagens: Personagem[];
}

const usePersonagensStore = defineStore('personagens', {
  state: (): PersonagensState => ({
    personagens: [
      { id: '1', nome: 'Carlos', materia: 'Fisíca', cor: 'rgb(30, 26, 107)', img: 'K' },
      { id: '2', nome: 'Janja', materia: 'Inglês', cor: '#ffdefb', img: 'B' },
      { id: '3', nome: 'Ricardão', materia: 'Biologia', cor: '#046d6d', img: 'A' },
      { id: '4', nome: 'Marcia', materia: 'Geografia', cor: '#ffdd90', img: 'C' },
    ],
  }),
});
export default usePersonagensStore;
