
import { defineStore } from "pinia";

const useUserStore = defineStore('user', {
  state: ()=>({
    nome: 'Fulano de tall',
    perfil:'public/img/mapache-pedro.gif',
  }),

  actions:{
    mudarFoto(newFoto:string){
      this.perfil = newFoto;
    },
    mudarNome(newNome:string){
      this.nome = newNome
    },
    mudarUser(newNome:string, newFoto:string){
      this.perfil = newFoto;
      this.nome = newNome;
    }
  }
})

export default useUserStore;
