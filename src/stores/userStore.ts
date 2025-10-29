import type { User } from "src/types";
import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Loading } from "quasar";

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
    // itens: [
    //   { id: '1', tipo: 1 },
    //   { id: '1', tipo: 2 },
    //   { id: '1', tipo: 3 },
    // ]
  }),

  actions: {
    mudarUser(newUser: User) {
      if (newUser.token == undefined) return;
      this.logado = true;
      this.id = newUser.id;
      this.nome = newUser.nome;
      this.admin = newUser.admin;
      this.token = newUser.token;
      if (newUser.foto?.trim() == 'semImagem') {
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
    },

    async mudarNome(newNome: string) {

      const query = `
  mutation EditNome($nome: String!) {
    editUser(username: $nome, foto: null) {
      username
      foto
    }
  }
      `
      const variables = { nome: newNome }

      try {
        const response = await api.post('', { query, variables }, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        this.nome = response.data.data.editUser.username;
      } catch (error) {
        console.error('Erro ao tentar mudar o nome: ', error);
        throw error;
      }
    },
    async mudarImg(newImg: File) {

      const formData = new FormData();

      const operations = {
        query: `
          mutation EditFoto($foto:Upload) {
            editUser(username:null,foto:$foto){
              username
              foto
            }
          }
        `,
        variables: {
          foto: null
        },
      };


      formData.append('operations', JSON.stringify(operations));
      formData.append('map', JSON.stringify({ 0: ['variables.foto'] }))
      formData.append('0', newImg)

      try {
        Loading.show();
        const response = await api.post('', formData, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${this.token}`
          },
        });

        this.foto=response.data.data.editUser.foto;

      } catch (error: any) {
        console.error("erro no registro:", error);
        throw error;
      } finally{
        Loading.hide();
      }
    },
  },
  persist: {
    storage: localStorage,
  }
})

export default useUserStore;
