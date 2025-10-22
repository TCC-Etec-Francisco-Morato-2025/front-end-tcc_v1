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
    createQuestaoPopUp: false,
    editItemPopUp: false,
    editMateriaPopUp: false,
    editAtividadePopUp: false,
    editQuestaoPopUp: false,
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
    toggleCreateItemPopUp() {
      this.createItemPopUp = !this.createItemPopUp;
    },
    toggleCreateMateriaPopUp() {
      this.createMateriaPopUp = !this.createMateriaPopUp;
    },
    toggleCreateAtividadePopUp() {
      this.createAtividadePopUp = !this.createAtividadePopUp;
    },
    toggleCreateQuestaoPopUp() {
      this.createQuestaoPopUp = !this.createQuestaoPopUp;
    },
    toggleEditItemPopUp() {
      this.editItemPopUp = !this.editItemPopUp;
    },
    toggleEditMateriaPopUp() {
      this.editMateriaPopUp = !this.editMateriaPopUp;
    },
    toggleEditAtividadePopUp() {
      this.editAtividadePopUp = !this.editAtividadePopUp;
    },
    toggleEditQuestaoPopUp() {
      this.editQuestaoPopUp = !this.editQuestaoPopUp;
    },
  },
  persist: {
    storage: localStorage,
    pick: ['confirmar.naoAparecerNovamente'],
  },
});

export default usePopUpStore;
