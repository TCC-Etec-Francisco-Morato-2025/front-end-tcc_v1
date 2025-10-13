import { defineStore } from 'pinia';

const usePopUpStore = defineStore('popup', {
  state: () => ({
    pause: false,
    notFullScreen: false,
    confirmar: {
      estado: false,
      naoAparecerNovamente: false,
    },
    questoes: {
      estado: false,
      playVideo: true,
    },
    fimJogo: false,
    gameOver: false,
    atividade: false,
    eventoBoss: false,
    perfil: false,
    createItem:false,
  }),

  getters: {
    menuStatus: (state) => state.pause,
  },

  actions: {
    togglePause() {
      this.pause = !this.pause;
    },
    toggleNotFullScreen(isFullscreen: boolean) {
      this.notFullScreen = isFullscreen;
    },
    toggleConfirmar(naoAparecerNovamente?: boolean) {
      if (!naoAparecerNovamente) this.confirmar.estado = !this.confirmar.estado;

      if (naoAparecerNovamente) {
        this.confirmar.naoAparecerNovamente = naoAparecerNovamente;
      }
    },
    toggleQuestoes() {
      this.questoes.estado = !this.questoes.estado;
    },
    toggleFimJogo() {
      this.fimJogo = !this.fimJogo;
    },
    toggleGameOver() {
      this.gameOver = !this.gameOver;
    },
    toggleAtividade() {
      this.atividade = !this.atividade;
    },
    toggleEventoBoss() {
      this.eventoBoss = !this.eventoBoss;
    },
    togglePerfil() {
      this.perfil = !this.perfil;
    },
    togglecreateItem(){
      this.createItem = !this.createItem;
    }
  },
  persist: {
    storage: localStorage,
    pick: ['confirmar.naoAparecerNovamente'],
  },
});

export default usePopUpStore;
