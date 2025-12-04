import { defineStore } from 'pinia';
import type { Personagem } from 'src/types';

interface PersonagensState {
  personagens: Personagem[];
}

const usePersonagensStore = defineStore('personagens', {
  state: (): PersonagensState => ({
    personagens: [
      // { id: '1', nome: 'Carlos', materia: 'Fisíca', cor: 'rgb(30, 26, 107)', img: '/src/assets/personagens/K.png' },
      // { id: '2', nome: 'Janja', materia: 'Inglês', cor: '#ffdefb', img: '/src/assets/personagens/B.png' },
      // { id: '3', nome: 'Ricardão', materia: 'Biologia', cor: '#046d6d', img: '/src/assets/personagens/A.png' },
      // { id: '4', nome: 'Marcia', materia: 'Geografia', cor: '#ffdd90', img: '/src/assets/personagens/C.png' },
    ],
  }),
});
export default usePersonagensStore;
