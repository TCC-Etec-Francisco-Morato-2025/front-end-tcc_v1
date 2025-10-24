import { defineStore } from 'pinia';

const useQuestaoStore = defineStore('questao', {
  state: () => ({
    id: '0',
    pergunta: '',
    perguntaFacil: '',
    tempo: 0,
    cronometro: 0,
    tempoCronometro: 0,
  }),
  actions: {
    mudarQuestao(
      id: number,
      pergunta: string,
      perguntaFacil: string,
      tempo: number,
      tempoCronometro: number,
    ) {
      this.id = id;
      this.pergunta = pergunta;
      this.perguntaFacil = perguntaFacil;
      this.tempo = tempo;
      this.tempoCronometro = tempoCronometro;
      this.cronometro = tempoCronometro;
    },
  },
});
export default useQuestaoStore;
