import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import type { Questao, Resposta } from 'src/types';

interface QuestoesState{
  questoes: Questao[],
  respostas: Resposta[],
}

interface QuestaoInput{
  pergunta: string;
  perguntaFacil: string;
  tempo: number;
}

interface RespostaInput{
  resposta: string;
  certa: boolean;
}

const useQuestoesStore = defineStore('questoes', {
  state: ():QuestoesState => ({
    questoes: [
      // { id: '1', pergunta: 'Pergunta 1?', perguntaFacil: 'Pergunta', tempo: 2, tempoCronometro: 10000 },
      // { id: '2', pergunta: 'Pergunta 2?', perguntaFacil: 'Pergunta', tempo: 60, tempoCronometro: 10 },
      // { id: '3', pergunta: 'Pergunta 3?', perguntaFacil: 'Pergunta', tempo: 120, tempoCronometro: 15 },
      // { id: '4', pergunta: 'Pergunta 4?', perguntaFacil: 'Pergunta', tempo: 180, tempoCronometro: 20 },
      // { id: '5', pergunta: 'Pergunta 5?', perguntaFacil: 'Pergunta', tempo: 200, tempoCronometro: 5 },
      // { id: '6', pergunta: 'Pergunta 6?', perguntaFacil: 'Pergunta', tempo: 240, tempoCronometro: 30 },
    ],
    respostas: [
      // { id_pergunta: '1', resposta: 'resposta 1?', certa: true },
      // { id_pergunta: '1', resposta: 'resposta 2?', certa: false },
      // { id_pergunta: '1', resposta: 'resposta 3?', certa: false },
      // { id_pergunta: '2', resposta: 'resposta 1?', certa: true },
      // { id_pergunta: '2', resposta: 'resposta 2?', certa: false },
      // { id_pergunta: '2', resposta: 'resposta 3?', certa: false },
      // { id_pergunta: '2', resposta: 'resposta 4?', certa: false },
      // { id_pergunta: '3', resposta: 'resposta 1?', certa: true },
      // { id_pergunta: '3', resposta: 'resposta 2?', certa: false },
      // { id_pergunta: '4', resposta: 'resposta 1?', certa: true },
      // { id_pergunta: '4', resposta: 'resposta 2?', certa: false },
      // { id_pergunta: '4', resposta: 'resposta 3?', certa: false },
      // { id_pergunta: '4', resposta: 'resposta 4?', certa: false },
      // { id_pergunta: '5', resposta: 'resposta 1?', certa: true },
      // { id_pergunta: '5', resposta: 'resposta 2?', certa: false },
      // { id_pergunta: '5', resposta: 'resposta 3?', certa: false },
      // { id_pergunta: '6', resposta: 'resposta 1?', certa: true },
      // { id_pergunta: '6', resposta: 'resposta 2?', certa: false },
    ],
  }),
  actions:{
    async addQuestoes(questoes: QuestaoInput[], id_atividade: number, respostas: RespostaInput[]): Promise<boolean> {
      const formData = new FormData();
      try {
        for (const q of questoes) {

          const operations = {
            query: `
              mutation AddQuestao(
                $idAtividade: ID!
                $enunciado: String!
                $aparecer: Int!
                $respostas: [RespostaInput!]!
              ) {
                addQuestao(
                  input: {
                    id_atividade: $idAtividade
                    enunciado: $enunciado
                    aparecer: $aparecer
                    respostas: $respostas
                  }
                ){
                  id
                }
              }
            `,
            variables: {
              idAtividade: id_atividade,
              enunciado: q.pergunta,
              aparecer: q.tempo,
              respostas: respostas.map(r => ({
                resposta: r.resposta,
                certa: r.certa
              }))
            },
          };

          formData.append('operations', JSON.stringify(operations));
          formData.append('map', JSON.stringify({}));

          const response = await api.post('', formData, {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          // ⚠️ Evite fazer login aqui — parece ser código copiado de outra função.
          // Provavelmente você só precisa verificar o retorno da mutation:
          console.log('Questão criada:', response);
        }

        return true;
      } catch (error) {
        console.error('Erro ao adicionar questões:', error);
        return false;
      }
    }
  }
});
export default useQuestoesStore;
