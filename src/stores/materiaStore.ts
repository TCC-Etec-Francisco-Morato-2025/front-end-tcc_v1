import { defineStore } from 'pinia';

const useMateriaStore = defineStore('materia', {
  state: () => ({
    ativo: false,
    nome: 'Matemática',
    icon: '/public/icons/icon-materia.png',
    cor: 'rgb(0,68,136)',
  }),

  getters: {
    materiaStatus: (state) => state.ativo,
  },

  actions: {
    toggleMeteria() {
      this.ativo = !this.ativo;
    },
    mudarNome(novoNome: string) {
      this.nome = novoNome;
    },
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
