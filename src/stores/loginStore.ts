import { defineStore } from 'pinia';
import useUserStore from './userStore';
import { api } from 'src/boot/axios';
import { Loading } from 'quasar';
import { User } from 'src/types';

interface LoginState {
  slide: string;
}

const useLoginStore = defineStore('login', {
  state: (): LoginState => ({
    slide: 'entrar',
  }),

  actions: {
    async login(email: string, senha: string) {

      const formData = new FormData();
      const userStore = useUserStore();

      const operations = {
        query: `
          mutation Login($email: String!, $senha: String!) {
            login(email: $email, password: $senha) {
              token
              user {
                id
                username
                foto
              }
            }
          }
        `,
        variables: {
          senha,
          email,
        },
      };


      formData.append('operations', JSON.stringify(operations));
      formData.append('map', JSON.stringify({}));

      try {
        Loading.show();
        const response = await api.post('', formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const user = response.data.data.login.user
        const token = response.data.data.login.token;
        const newUser: User = {
          id: user.id,
          nome: user.username,
          foto: user.foto,
          token: token,
          admin: false
        }
        userStore.mudarUser(newUser);

      } catch (error: any) {
        console.error("erro no registro:", error);
        throw error;
      } finally {
        Loading.hide();
      }
    },

    async register(nome: string, email: string, senha: string,uid?:string) {

      const formData = new FormData();
      const userStore = useUserStore();

      const operations = {
        query: `
      mutation Register($email: String!, $senha: String!, $nome: String!, $uid:String) {
        register(uuid:$uid,token:null,email: $email, password: $senha, username: $nome) {
          token
          user {
            id
            username
            foto
          }
        }
      }
    `,
        variables: {
          nome,
          senha,
          email,
          uid
        },
      };


      formData.append('operations', JSON.stringify(operations));
      formData.append('map', JSON.stringify({}));

      try {
        Loading.show();
        const response = await api.post('', formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const user = response.data.data.register.user
        const token = response.data.data.register.token;
        const newUser: User = {
          id: user.id,
          nome: user.username,
          foto: user.foto,
          token: token,
          admin: false
        }
        userStore.mudarUser(newUser);

      } catch (error: any) {
        console.error("erro no registro:", error);
        throw error;
      } finally {
        Loading.hide();
      }
    },

    async manterLogin() {
      try {
        Loading.show();
        const userStore = useUserStore();

        const query = `
          query loginUser($email: String!, $token: String!) {
            user(email: $email, password: $token) {
              username
              email
            }
          }`;

        const response = await api.post('', {
          query: query,
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
        Loading.hide();
      }
    },
  },
});

export default useLoginStore;
