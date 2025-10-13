import { defineStore } from 'pinia';
import useUserStore from './userStore';
import { api } from 'src/boot/axios';

interface LoginState {
  slide: string;
  query: string;
  mutation: string;
  variables: {
    nome: string | null;
    email: string | null;
    senha: string | null;
  };
  loading: boolean;
}

const useLoginStore = defineStore('login', {
  state: (): LoginState => ({
    slide: 'entrar',
    query: '',
    mutation: '',
    variables: {
      nome: null,
      email: null,
      senha: null,
    },
    loading: false,
  }),

  actions: {
    async login(email: string, senha: string) {
      const hasAuth = email && senha;

      if (!hasAuth) {
        throw new Error('Forneça email e senha');
      }

      const variables = {
        senha:senha,
        email:email
      }

      try {
        this.loading = true;
          this.variables = { email, senha, nome: null };
          const query =
          `mutation login($email: String!, $senha: String!) {
            	login(email:$email,password:$senha){
                token
                user{
                  id
                  username
                }
              }
          }`;

        const response = await api.post('', {
          query,
          variables,
        });

        console.log(response.data.data.login)

        if (response.data.errors) {
          throw new Error(response.data.errors[0].message);
        }

        return response.data.data;
      } catch (error) {
        console.error('Erro no login:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async register(nome: string, email: string, senha: string) {
      this.mutation = `
        mutation Register($nome: String!, $email: String!, $senha: String!) {
          register(username: $nome, email: $email, password: $senha,uuid:null,token:null) {
            token
            user {
              username
              foto
            }
          }
        }
      `;

      this.variables = { nome, email, senha };

      try {
        this.loading = true;
        const response = await api.post('', {
          query: this.mutation,
          variables: this.variables
        });

        if (response.data.errors) {
          throw new Error(response.data.errors[0].message);
        }

        return response.data.data;
      } catch (error: any) {
        console.error('Erro no registro:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async manterLogin() {
      try {
        this.loading = true;
        const userStore = useUserStore();

        this.query = `
          query loginUser($email: String!, $token: String!) {
            user(email: $email, password: $token) {
              username
              email
            }
          }`;

        const response = await api.post('', {
          query: this.query,
          variables: this.variables
        });

        if (response.data.errors) {
          throw new Error(response.data.errors[0].message);
        }

        if (response.data?.data) {
          userStore.mudarUser(response.data.data);
        } else {
          console.error('Dados da resposta não encontrados');
        }
      } catch (error) {
        console.error('Erro no manterLogin:', error);
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
