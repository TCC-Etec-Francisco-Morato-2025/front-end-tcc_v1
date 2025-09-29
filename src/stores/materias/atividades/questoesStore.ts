import { defineStore } from 'pinia';
import type { Questao, Resposta } from 'src/types';

interface QuestoesState{
  questoes: Questao[],
  respostas: Resposta[],
}

const useQuestoesStore = defineStore('questoes', {
  state: ():QuestoesState => ({
    questoes: [
      { id: 1, pergunta: 'Pergunta 1?', perguntaFacil: 'Pergunta', tempo: 2, tempoCronometro: 10000 },
      { id: 2, pergunta: 'Pergunta 2?', perguntaFacil: 'Pergunta', tempo: 60, tempoCronometro: 10 },
      { id: 3, pergunta: 'Pergunta 3?', perguntaFacil: 'Pergunta', tempo: 120, tempoCronometro: 15 },
      { id: 4, pergunta: 'Pergunta 4?', perguntaFacil: 'Pergunta', tempo: 180, tempoCronometro: 20 },
      { id: 5, pergunta: 'Pergunta 5?', perguntaFacil: 'Pergunta', tempo: 200, tempoCronometro: 5 },
      { id: 6, pergunta: 'Pergunta 6?', perguntaFacil: 'Pergunta', tempo: 240, tempoCronometro: 30 },
    ],
    respostas: [
      { perguntaId: 1, resposta: 'resposta 1?', certa: true },
      { perguntaId: 1, resposta: 'resposta 2?', certa: false },
      { perguntaId: 1, resposta: 'resposta 3?', certa: false },
      { perguntaId: 2, resposta: 'resposta 1?', certa: true },
      { perguntaId: 2, resposta: 'resposta 2?', certa: false },
      { perguntaId: 2, resposta: 'resposta 3?', certa: false },
      { perguntaId: 2, resposta: 'resposta 4?', certa: false },
      { perguntaId: 3, resposta: 'resposta 1?', certa: true },
      { perguntaId: 3, resposta: 'resposta 2?', certa: false },
      { perguntaId: 4, resposta: 'resposta 1?', certa: true },
      { perguntaId: 4, resposta: 'resposta 2?', certa: false },
      { perguntaId: 4, resposta: 'resposta 3?', certa: false },
      { perguntaId: 4, resposta: 'resposta 4?', certa: false },
      { perguntaId: 5, resposta: 'resposta 1?', certa: true },
      { perguntaId: 5, resposta: 'resposta 2?', certa: false },
      { perguntaId: 5, resposta: 'resposta 3?', certa: false },
      { perguntaId: 6, resposta: 'resposta 1?', certa: true },
      { perguntaId: 6, resposta: 'resposta 2?', certa: false },
    ],
  }),
});
export default useQuestoesStore;
