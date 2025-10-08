import { defineStore } from 'pinia';
import { Materia } from 'src/types';

const useMateriaStore = defineStore('materia', {
  state: () => ({
    ativo: false,
    id: 0,
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
    // 1. Armazenamento: por padrão é localStorage, mas pode ser sessionStorage
    storage: sessionStorage, // Persiste apenas durante a sessão do navegador

    // 2. Chave: nome da chave no armazenamento local/sessão (opcional, padrão é o ID do store)
    // key: 'materia-atual',

    // 3. Paths: quais partes do estado você quer persistir (opcional, por padrão persiste tudo)
    // Isso é útil para excluir dados sensíveis ou que não precisam ser persistidos
    // paths: ['lastVisitedPage'], // Apenas 'lastVisitedPage' será salvo
  },
});

export default useMateriaStore;
