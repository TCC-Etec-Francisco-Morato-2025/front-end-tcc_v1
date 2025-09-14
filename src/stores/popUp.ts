import { defineStore } from 'pinia';

const usePopUpStore = defineStore('popup', {
  state: () => ({
    pause: false,
    notFullScreen: false,
    confirmar: {
      estado: false,
      naoAparecerNovamente: false,
    },
    fullScreen: {
      estado: false,
      naoAparecerNovamente: false,
    }
  }),

  getters: {
    menuStatus: (state) => state.pause,
  },

  actions: {
    togglePause() {
      this.pause = !this.pause;
    },
    toggleNotFullScreen(isFullscreen: boolean) {
      this.notFullScreen = isFullscreen
    },
    toggleConfirmar(naoAparecerNovamente?: boolean) {
      if (!naoAparecerNovamente)
        this.confirmar.estado = !this.confirmar.estado

      if (naoAparecerNovamente) {
        this.confirmar.naoAparecerNovamente = naoAparecerNovamente
      }
    },
    toggleFullScreen(naoAparecerNovamente?: boolean) {
      if (!naoAparecerNovamente)
        this.fullScreen.estado = !this.fullScreen.estado

      if (naoAparecerNovamente) {
        this.fullScreen.naoAparecerNovamente = naoAparecerNovamente
      }
    }
  },
  persist: {
    storage: localStorage,
    pick: ['confirmar.naoAparecerNovamente','fullScreen.naoAparecerNovamente']
  }
});

export default usePopUpStore;
