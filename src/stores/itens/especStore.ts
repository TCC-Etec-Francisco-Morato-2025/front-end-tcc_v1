import { defineStore } from "pinia";

const useEspecItemStore = defineStore('especItem',{
  state:()=>({
    nome: '',
    icon: 'add',
  }),
  actions:{
    mudarItem(nome:string,icon:string){
      this.nome = nome;
      this.icon = icon;
    }
  },

  persist:{
    storage:localStorage
  }
})

export default useEspecItemStore;
