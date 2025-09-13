import {defineStore} from 'pinia';

const usePopUpStore = defineStore('popup', {
  state: () => ({
    pause: false,
    notFullScreen: false,
  }),

  getters: {
    menuStatus: (state) => state.pause,
  },

  actions: {
    togglePause() {
      this.pause = !this.pause;
    },
    toggleNotFullScreen(isFullscreen:boolean){
      this.notFullScreen=isFullscreen
    }
  },
});

export default usePopUpStore;
