
import { defineStore } from "pinia";

const useUserStore = defineStore('user', {
  state: ()=>({
    primeiraVez: true,
    logado: false,
    uid:'',
    nome:'',
    perfil:'',
    email:'',
    senha:'',
    token:'',
    itens:[
      { id: 1 , tipo: 1 },
      { id: 1 , tipo: 2 },
      { id: 1 , tipo: 3 },
    ]
  }),

  actions:{
    login(newUID:string,newNome:string|null,newPerfil:string|null,newEmail:string|null,newSenha:string,newToken:string){
      if(newNome!=null && newPerfil!=null && newEmail!=null){
        this.uid=newUID
        this.nome=newNome
        this.perfil=newPerfil
        this.email=newEmail
        this.senha=newSenha
        this.token=newToken
        this.logado=true
      }
    },
    logout(){
        this.uid=''
        this.nome=''
        this.perfil=''
        this.email=''
        this.senha=''
        this.token=''
        this.logado=false
    },
    jaAcessou(){
      this.primeiraVez = !this.primeiraVez;
    }
  },
  persist:{
    storage:localStorage,
    pick:['token','primeiraVez']
  }
})

export default useUserStore;
