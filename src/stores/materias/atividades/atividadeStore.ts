import { defineStore } from 'pinia';
import type { Atividade } from 'src/types';
import usePopUpStore from 'src/stores/popUp';

const popUpStore = usePopUpStore();

const useAtividadeStore = defineStore('atividade', {
  state: (): Atividade => ({
    id: 0,
    assunto: 0,
    materia: 0,
    titulo: '',
    estrelas: 0,
    descricao: '',
    acertos: 0,
    vida: 1,
  }),

  actions: {
    mudarAtividade(atividade: Atividade) {
      this.id = atividade.id;
      this.assunto = atividade.assunto;
      this.materia = atividade.materia;
      this.titulo = atividade.titulo;
      this.descricao = atividade.descricao;
      this.estrelas = atividade.estrelas;
    },

    isCerto(resposta: boolean) {
      if (this.acertos != undefined && this.vida != undefined)
        if(resposta){
          this.acertos++;
        }else{
          this.vida--;
          if(this.vida<=0){
            setTimeout(()=>{
              popUpStore.questoes.playVideo=false;
              popUpStore.toggleGameOver();
            },3000)
          }
        }
    },

    resetarVidas(){
      this.vida = 1;
    }
  },
  persist: {
    storage: localStorage,
  },
});

export default useAtividadeStore;
