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
    createItemPopUp: false,
    createMateriaPopUp: false,
    createAtividadePopUp: false,
    createQuestaoPopUp: true,
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
    togglecreateItemPopUp() {
      this.createItemPopUp = !this.createItemPopUp;
    },
    togglecreateMateriaPopUp() {
      this.createMateriaPopUp = !this.createMateriaPopUp;
    },
    togglecreateAtividadePopUp() {
      this.createAtividadePopUp = !this.createAtividadePopUp;
    },
  },
  persist: {
    storage: localStorage,
    pick: ['confirmar.naoAparecerNovamente'],
  },
});

export default usePopUpStore;
