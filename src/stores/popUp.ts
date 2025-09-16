import { defineStore } from 'pinia';

const usePopUpStore = defineStore('popup', {
  state: () => ({
    pause: false,
    notFullScreen: false,
    confirmar: {
      estado: false,
      naoAparecerNovamente: false,
    },
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
    }
  },
  persist: {
    storage: localStorage,
    pick: ['confirmar.naoAparecerNovamente']
  }
});

export default usePopUpStore;
