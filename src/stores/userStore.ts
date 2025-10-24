import type { User } from "src/types";
import { defineStore } from "pinia";

const useUserStore = defineStore('user', {
  state: (): User => ({
    primeiraVez: true,
    logado: false,
    id: '',
    nome: '',
    foto: '',
    email: '',
    admin: false,
    token: '',
    itens: [
      { id: '1', tipo: 1 },
      { id: '1', tipo: 2 },
      { id: '1', tipo: 3 },
    ]
  }),

  actions: {
    mudarUser(newUser: User) {
      if (newUser.token == undefined) return;
      this.logado = true;
      this.id = newUser.id;
      this.nome = newUser.nome;
      this.admin = newUser.admin;
      this.token = newUser.token;
      if(newUser.foto?.trim()=='semImagem'){
        this.foto = '/public/img/perfil.png';
      }
      // this.itens= newUser.itens;
    },
    logout() {
      this.id = ''
      this.nome = ''
      this.foto = ''
      this.email = ''
      this.token = ''
      this.logado = false
    },
    jaAcessou() {
      this.primeiraVez = !this.primeiraVez;
    }
  },
  persist: {
    storage: localStorage,
  }
})

export default useUserStore;
