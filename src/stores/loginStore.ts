import { defineStore } from 'pinia';
import useUserStore from './userStore';
import { api } from 'src/boot/axios';

interface loginVariable {
  file?: null | File;
  nome?: string;
  senha: string;
  email: string;
}

const useLoginStore = defineStore('login', {
  state: () => ({
    slide: 'entrar',
    query: '',
    variables: {
      token: '',
      email: '',
      password: '',
    },
    loading: false,
  }),
  actions: {
    async login(senha: string, email: string) {
      const formData = new FormData();

      const variables: loginVariable = {
        senha,
        email,
      };

      const operations = {
        query: `
      mutation Register($email: String!, $senha: String!) {
        login(email:$email,password:$senha){
          token
          user{
            id
            username
            foto
          }
        }
      }
    `,
        variables,
      };

      formData.append('operations', JSON.stringify(operations));

      try {
        this.loading = true;

        const response = await api.post('', formData, {
          withCredentials: true,
        });

        console.log(response.data.data);
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async register(nome: string, email: string, senha: string, selectedFile: File | null) {
      const formData = new FormData();

      const variables: loginVariable = {
        file: null,
        nome,
        senha,
        email,
      };

      const operations = {
        query: `
      mutation Register($file: Upload, $email: String!, $senha: String!, $nome: String!) {
        register(uuid: null, email: $email, password: $senha, username: $nome, foto: $file) {
          token
          user {
            id
            username
            foto
          }
        }
      }
    `,
        variables,
      };

      formData.append('operations', JSON.stringify(operations));

      // 3. Se tiver arquivo, inclui o mapeamento e o arquivo
      if (selectedFile) {
        formData.append('map', JSON.stringify({ '0': ['variables.file'] }));
        formData.append('0', selectedFile);
      }

      try {
        this.loading = true;

        const response = await api.post('', formData, {
          withCredentials: true,
        });

        console.log(response.data.data);
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async manterLogin() {
      this.loading = true;
      this.query = `
        query loginUser($email:String!, $token:String!){
          user(email: $email, password: $token){
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
