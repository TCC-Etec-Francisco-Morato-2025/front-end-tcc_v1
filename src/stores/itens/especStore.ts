import { defineStore } from "pinia";
import type { Item } from 'src/types';

const useEspecItemStore = defineStore('especItem',{
  state: (): Item => ({
    id: '0',
    tipo: 3,
    nome: '',
    icon: '',
    img: '',
    func: '',
    recarregando: false,
  }),
  actions: {
    mudarItem(item:Item) {
      this.id = item.id;
      this.nome = item.nome;
      this.icon = item.icon;
      this.img = item.img;
      this.func = item.func;
      this.recarregando = item.recarregando
    },
  },

  persist:{
    storage:localStorage
  }
})

export default useEspecItemStore;
