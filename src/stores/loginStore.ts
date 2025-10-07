import { defineStore } from 'pinia';
import useUserStore from './userStore';
import { api } from 'src/boot/axios';

const userStore = useUserStore();

const useLoginStore = defineStore('login', {
  state: () => ({
    query: '',
    variables: {
      token: '',
      email: '',
      senha: '',
    },
    loading: false,
  }),
  actions: {
    async login() {
      this.loading = true;

      this.query = `
      query loginUser($email:String!, $senha:String!){
        user(email: $email, senha: $senha){
          username
          email
        }
      }`;

      if (userStore.email && userStore.senha) {
        this.variables.email = userStore.email;
        this.variables.senha = userStore.senha;
      } else{
        return;
      }

      const response = await api.post('', { query: this.query, variables: this.variables });

      try {
        if (response.data && response.data.data) {
          userStore.mudarUser(response.data.data);
        } else {
          console.error('Dados da resposta não encontrados ou formatados de maneira incorreta.');
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async register() {},

    async manterLogin() {
      this.loading = true;
      this.query = `
        query loginUser($email:String!, $token:String!){
          user(email: $email, senha: $token){
            username
            email
          }
        }`;

      const response = await api.post('', { query: this.query, variables: this.variables });

      try {
        if (response.data && response.data.data) {
          userStore.mudarUser(response.data.data);
        } else {
          console.error('Dados da resposta não encontrados ou formatados de maneira incorreta.');
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
  persist: {
    storage: localStorage,
    pick: ['variables.email', 'variables.token'],
  },
});
export default useLoginStore;
