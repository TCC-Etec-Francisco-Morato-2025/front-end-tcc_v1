
import { defineStore } from "pinia";

const useUserStore = defineStore('user', {
  state: ()=>({
    logado: false,
    uid:'',
    nome:'',
    perfil:'',
    email:'',
    senha:'',
    token:'',
  }),

  actions:{
    mudarUsuario(newUID:string,newNome:string|null,newPerfil:string|null,newEmail:string|null,newSenha:string,newToken:string){
      if(newNome!=null && newPerfil!=null && newEmail!=null){
        this.uid=newUID
        this.nome=newNome
        this.perfil=newPerfil
        this.email=newEmail
        this.senha=newSenha
        this.token=newToken
        this.logado=true
      }
    }
  },
  persist:{
    storage:localStorage
  }
})

export default useUserStore;
