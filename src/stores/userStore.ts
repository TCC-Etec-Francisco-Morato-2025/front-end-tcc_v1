import type { User } from "src/types";
import { defineStore } from "pinia";

const useUserStore = defineStore('user', {
  state: (): User=>({
    primeiraVez: true,
    logado: false,
    uid:'',
    nome:'',
    perfil:'',
    email:'',
    admin: false,
    senha:'',
    token:'',
    itens:[
      { id: 1 , tipo: 1 },
      { id: 1 , tipo: 2 },
      { id: 1 , tipo: 3 },
    ]
  }),

  actions:{
    mudarUser(newUser:User){
      if(newUser.token!=undefined){
        this.logado= true;
        this.uid= newUser.uid;
        this.nome= newUser.nome;
        this.perfil= newUser.perfil;
        this.admin= newUser.admin;
        this.token= newUser.token;
        this.itens= newUser.itens;
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
