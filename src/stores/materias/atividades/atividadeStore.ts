import { defineStore } from 'pinia';
import type { Atividade, Fala, Personagem, Questao } from 'src/types';
import usePopUpStore from 'src/stores/popUp';
import { api } from 'src/boot/axios';
import useFalasPersonagensStore from './falasPersonagensStore';
import useQuestaoStore from './questaoStore';
import usePersonagensStore from './personagensStore';

const popUpStore = usePopUpStore();

const useAtividadeStore = defineStore('atividade', {
  state: (): Atividade => ({
    id: '0',
    id_aula: '0',
    titulo: '',
    estrelas: 0,
    descricao: '',
    acertos: 0,
    vida: 1,
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
      this.vida = 1;
    },

    async getAtividadeRestante(id_atividade: number) {
      const query = `
      query getAtividadeResto($id_atividade:ID){
        atividade(id_assunto:$id_atividade){
          id
          id_assunto
          video
        falas{
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
      `;
      const variables = {
        id_atividade: id_atividade,
      };

      const falasStore = useFalasPersonagensStore();
      const questoesStore = useQuestaoStore();
      const personagensStore = usePersonagensStore();

      try {
        const response = await api.post('', {
          query,
          variables,
        });
        response.data.data.atividade.forEach((a) => {
          const newQuestao: Questao = {
            id: a.id,
            pergunta: a.enunciado,
            perguntaFacil: '',
            tempo: 0,
            tempoCronometro: 0,
          };
        });

        response.data.data.questoes.forEach((q) => {
          if (this.id == a.id_assunto) {
            this.video = a.video;
          }
        });

        // add falas e personagens
        falasStore.falas = [];
        response.data.data.falas.forEach((f) => {
          // falas
          const newFala: Fala = {
            id: f.id,
            id_personagem: f.personagem.id,
            id_atividade: f.id_atividade,
            fala: f.fala,
          };
          falasStore.falas.push(newFala);

          // personagens
          const newPersonagem: Personagem = {
            id: f.personagem.id,
            nome: f.personagem.nome,
            materia: f.personagem.materia,
            cor: f.personagem.cor,
            img: f.personagem.imagem,
          };
          personagensStore.personagens.push(newPersonagem);
        });
      } catch (error) {
        console.error('Erro ao buscar aulas:', error);
        throw error;
      }
    },
  },
  persist: {
    storage: localStorage,
  },
});

export default useAtividadeStore;
