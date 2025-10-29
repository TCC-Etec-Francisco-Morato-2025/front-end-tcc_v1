import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import type { Fala } from "src/types";

interface FalasState {
  falas: Fala[];
}

interface FalaInput {
  fala: string;
  id_personagem: string;
}


const useFalasPersonagensStore = defineStore('falas', {
  state: (): FalasState => ({
    falas: [
      // { id: '1', id_personagem: '1', id_atividade: '1', fala: 'Vamos matar um dragão?'},
      // { id: '2', id_personagem: '2', id_atividade: '1', fala: 'Por quê?'},
      // { id: '3', id_personagem: '3', id_atividade: '1', fala: 'Porque ele roubou minha...'},
      // { id: '4', id_personagem: '1', id_atividade: '1', fala: 'Sinta-se mal por isso.'},
      // { id: '5', id_personagem: '2', id_atividade: '1', fala: 'Tá bom, que horas?'},
      // { id: '6', id_personagem: '4', id_atividade: '1', fala: 'Amanhã às 9?'},
      // { id: '7', id_personagem: '2', id_atividade: '1', fala: 'É pode ser'},
      // { id: '8', id_personagem: '2', id_atividade: '1', fala: 'Blz, flw!!'},
    ]
  }),
  actions: {
    async addFala(falas: FalaInput[], id_atividade: string): Promise<boolean> {
      const formData = new FormData();
      try {
        for (const f of falas) {

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
                ) {
                  id
                }
              }
            `,
            variables: {
              idAtividade: id_atividade,
              fala: f.fala,
              idPersonagem: f.id_personagem,
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
export default useFalasPersonagensStore;
