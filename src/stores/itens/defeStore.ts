import { defineStore } from 'pinia';
import type { Item } from 'src/types';

const useDefeItemStore = defineStore('defeItem', {
  state: (): Item => ({
    id: 0,
    tipo: 2,
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

export default useDefeItemStore;
