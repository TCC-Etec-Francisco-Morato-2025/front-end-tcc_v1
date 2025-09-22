import { defineStore } from "pinia";

const useQuestoesStore = defineStore('questoes', {
  state: () => ({
    questoes: [
      { id: 1, pergunta: 'Pergunta 1?', tempo: 30, conometro: 20 },
      { id: 2, pergunta: 'Pergunta 1?', tempo: 60, conometro: 10 },
      { id: 3, pergunta: 'Pergunta 1?', tempo: 120, conometro: 15 },
      { id: 4, pergunta: 'Pergunta 1?', tempo: 180, conometro: 20 },
      { id: 5, pergunta: 'Pergunta 1?', tempo: 200, conometro: 5 },
      { id: 6, pergunta: 'Pergunta 1?', tempo: 240, conometro: 30 },
    ],
    resposta: [
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
    ]
  })
});
export default useQuestoesStore;
