import { defineStore } from 'pinia';
import type { Materia } from 'src/types';

const useMateriaStore = defineStore('materia', {
  state: () => ({
    ativo: false,
    id: '',
    nome: '',
    icon: '',
    cor: '',
    textColor: '',
    path: ''
  }),

  getters: {
    materiaStatus: (state) => state.ativo,
  },

  actions: {
    mudarMateria(materia:Materia){
      this.ativo=true
      this.id = materia.id
      this.nome = materia.nome
      this.icon = materia.icon
      this.cor = materia.cor
      this.textColor = materia.textColor
      this.path = materia.path
    }
  },
  persist: {
    storage: localStorage,
  },
});

export default useMateriaStore;
