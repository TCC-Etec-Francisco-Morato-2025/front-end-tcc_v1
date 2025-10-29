import { defineStore } from 'pinia';
import type { Atividade, Fala, Personagem, Questao, Resposta } from 'src/types';
// import type { Atividade, Fala, Personagem, Questao } from 'src/types';
import usePopUpStore from 'src/stores/popUp';
import { api } from 'src/boot/axios';
import useFalasPersonagensStore from './falasPersonagensStore';
import useQuestoesStore from './questoesStore';
import usePersonagensStore from './personagensStore';
import useUserStore from 'src/stores/userStore';
// import { api } from 'src/boot/axios';
// import useFalasPersonagensStore from './falasPersonagensStore';
// import useQuestaoStore from './questaoStore';
// import usePersonagensStore from './personagensStore';

const popUpStore = usePopUpStore();

interface PersonagemResponse {
  id: string;
  imagem: string;
  cor: string;
  materia: string;
  nome: string;
}

interface FalaResponse {
  id: string;
  id_atividade: string;
  fala: string;
  personagem: PersonagemResponse[];
}

interface RespostaResponse {
  id_questao: string;
  resposta: string;
  certa: boolean;
}

interface QuestaoResponse {
  id: string;
  id_atividade: string;
  enunciado: string;
  aparecer: number;
  respostas: RespostaResponse[]
}

const useAtividadeStore = defineStore('atividade', {
  state: (): Atividade => ({
    id: '0',
    id_aula: '0',
    titulo: '',
    estrelas: 0,
    descricao: '',
    acertos: 0,
    vida: 3,
    video: '',
  }),

  actions: {
    mudarAtividade(atividade: Atividade) {
      this.id = atividade.id;
      this.id_aula = atividade.id_aula;
      this.titulo = atividade.titulo;
      this.descricao = atividade.descricao;
      this.estrelas = atividade.estrelas;
    },

    isCerto(resposta: boolean) {
      if (this.acertos != undefined && this.vida != undefined)
        if (resposta) {
          this.acertos++;
        } else {
          this.vida--;
          if (this.vida <= 0) {
            setTimeout(() => {
              popUpStore.questoes.playVideo = false;
              popUpStore.toggleGameOver();
            }, 3000);
          }
        }
    },

    resetarVidas() {
      this.vida = 3;
    },

    async getAtividadeRestante() {
      const query = `
      query getAtividadeResto($id_atividade:ID!){
        atividade(id_assunto:$id_atividade){
          id
          id_assunto
          video
          falas{
            id
            id_atividade
            fala
            personagem{
              id
              imagem
              cor
              materia
              nome
            }
          }
          questoes{
            id
            id_atividade
            enunciado
            aparecer
            respostas{
              id_questao
              resposta
              certa
            }
          }
        }
      }
      `;
      const variables = {
        id_atividade: this.id,
      };

      const falasStore = useFalasPersonagensStore();
      const questoesStore = useQuestoesStore();
      const personagensStore = usePersonagensStore();



      try {
        const response = await api.post('', {
          query,
          variables,
        });

        // limpar campos
        questoesStore.questoes = [];
        questoesStore.respostas = [];
        personagensStore.personagens = [];
        falasStore.falas = [];

        response.data.data.atividade.questoes.forEach((q: QuestaoResponse) => {
          const newQuestao: Questao = {
            id: q.id,
            pergunta: q.enunciado,
            perguntaFacil: '',
            tempo: q.aparecer,
            tempoCronometro: Math.floor(Math.random() * (30 - 15 + 1)) + 15,
          };

          q.respostas.forEach((r) => {
            const newResposta: Resposta = {
              id_pergunta: q.id,
              resposta: r.resposta,
              certa: r.certa
            }
            questoesStore.respostas.push(newResposta)
          })
          questoesStore.questoes.push(newQuestao)
        });

        // organizar as questões
        questoesStore.questoes.sort((q1, q2) => q1.tempo - q2.tempo)

        // add falas e personagens
        response.data.data.atividade.falas.forEach((f: FalaResponse) => {

          if(f.personagem[0]==null)return;

          // falas
          const newFala: Fala = {
            id: f.id,
            id_personagem: f.personagem[0].id,
            id_atividade: f.id_atividade,
            fala: f.fala,
          };
          falasStore.falas.push(newFala);

          // personagens
          const newPersonagem: Personagem = {
            id: f.personagem[0].id,
            nome: f.personagem[0].nome,
            materia: f.personagem[0].materia,
            cor: f.personagem[0].cor,
            img: f.personagem[0].imagem,
          };
          personagensStore.personagens.push(newPersonagem);
        });

        // console.table(personagensStore.personagens);
        // console.table(falasStore.falas)
        // console.table(questoesStore.questoes)
        // console.table(questoesStore.respostas)


      } catch (error) {
        console.error('Erro ao buscar aulas:', error);
        throw error;
      }
    },

    async salvarAtividade() {

      const userStore = useUserStore();

      const query = `
        mutation AddHistorico($id_atividade:ID!,$pontuacao:Int!){
          addHistorico(id_assunto:$id_atividade,pontuacao:$pontuacao){
            id
          }
        }
      `

      const variables = {
        id_atividade: this.id,
        pontuacao: 3
      }

      try {
        await api.post('', { query, variables }, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${userStore.token}`
          }
        })
      } catch (error) {
        console.error('Erro ao salvar a atividade: ', error);
        throw error
      }
    }

    // async createAtividade(questoes:Questao[],intro:Fala[],video:File){

    //   const questoesStore = useQuestoesStore();
    //   const falasStore = useFalasPersonagensStore();

    //   try{
    //     await questoesStore.
    //   }
    // }
  },
  persist: {
    storage: localStorage,
  },
});

export default useAtividadeStore;
