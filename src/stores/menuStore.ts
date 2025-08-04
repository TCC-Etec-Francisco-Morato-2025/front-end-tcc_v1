import {defineStore} from 'pinia';

const useMenuStore = defineStore('menu', {
  state: () => ({
    isOpen: false,
  }),

  getters: {
    menuStatus: (state) => state.isOpen,
  },

  actions: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
      console.log(this.isOpen);
    },
  },
});

export default useMenuStore;
