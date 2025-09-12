import {defineStore} from 'pinia';

const usePopUpStore = defineStore('popup', {
  state: () => ({
    pause: false,
  }),

  getters: {
    menuStatus: (state) => state.pause,
  },

  actions: {
    togglePause() {
      this.pause = !this.pause;
    },
  },
});

export default usePopUpStore;
