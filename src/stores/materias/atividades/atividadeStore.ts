import { defineStore } from 'pinia';

const useAtividadeStore = defineStore('atividade', {
  state: () => ({
    id: 0,
    assunto: 0,
    materia: 0,
    titulo: '',
    estrelas: 0,
    descricao:'',
  }),

  actions: {
    mudarAtividade(id: number, assunto: number, materia: number, titulo: string, estrelas: number, descricao: string) {
      this.id = id;
      this.assunto = assunto;
      this.materia = materia;
      this.titulo = titulo;
      this.descricao = descricao;
      this.estrelas = estrelas;
    },
  },
  persist:{
    storage: localStorage,
  }
});

export default useAtividadeStore;
