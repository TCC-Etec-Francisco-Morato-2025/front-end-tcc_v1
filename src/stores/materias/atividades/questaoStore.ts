import { defineStore } from 'pinia';
import type { Questao } from 'src/types';

const useQuestaoStore = defineStore('questao', {
  state: () => ({
    id: '0',
    pergunta: '',
    perguntaFacil: '',
    tempo: 0,
    cronometro: 0,
    tempoCronometro: 0,
    url_morte: '',
    url_quase_morte: ''
  }),
  actions: {
    mudarQuestao(q: Questao) {
      this.id = q.id;
      this.pergunta = q.pergunta;
      this.perguntaFacil = q.perguntaFacil;
      this.tempo = q.tempo;
      this.tempoCronometro = q.tempoCronometro;
      this.cronometro = q.tempoCronometro;
      this.url_morte=q.url_morte;
      this.url_quase_morte=q.url_quase_morte;
    }
  },
});
export default useQuestaoStore;
