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
    carregado: false,
    descricao:'',
    habilidade:'',
    habilidadeTitulo:''
  }),
  actions: {
    mudarItem(item:Item) {
      this.id = item.id;
      this.nome = item.nome;
      this.icon = item.icon;
      this.img = item.img;
      this.func = item.func;
      this.carregado = item.carregado
      this.descricao = item.descricao
      this.habilidade = item.habilidade
      this.habilidadeTitulo = item.habilidadeTitulo
    },
  },

  persist:{
    storage:localStorage
  }
})

export default useEspecItemStore;
