import { defineStore } from 'pinia';

const useAtacItemStore = defineStore('atacItem', {
  state: () => ({
    id: 0,
    nome: '',
    icon: 'add',
    img: '',
  }),
  actions: {
    mudarItem(id: number, nome: string, icon: string, img: string) {
      this.id = id;
      this.nome = nome;
      this.icon = icon;
      this.img = img;
    },
  },

  persist: {
    storage: localStorage,
  },
});

export default useAtacItemStore;
