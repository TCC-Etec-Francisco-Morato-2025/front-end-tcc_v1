import { defineStore } from 'pinia';
import type { Item } from 'src/types';

const useAtacItemStore = defineStore('atacItem', {
  state: (): Item => ({
    id: 0,
    tipo: 1,
    nome: '',
    icon: '',
    img: '',
    func: '',
    recarregando: false,
  }),
  actions: {
    mudarItem(id: number, nome: string, icon: string, img: string, func: string) {
      this.id = id;
      this.nome = nome;
      this.icon = icon;
      this.img = img;
      this.func = func;
    },
  },

  persist: {
    storage: localStorage,
  },
});

export default useAtacItemStore;
