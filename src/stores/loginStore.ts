import { defineStore } from 'pinia';
import useUserStore from './userStore';
import { api } from 'src/boot/axios';

const userStore = useUserStore();

const useLoginStore = defineStore('login', {
  state: () => ({
    slide: 'entrar',
    rotaApi: 'http://localhost:8000/graphql',
    data: ''
  }),
  actions: {
    async login(uid?:string, tokenGoogle?:string) {
      this.data =`
      query{
        user(uid:${uid},token:${tokenGoogle}){
          username
          email
        }
      }`

      const response = await api.post(this.rotaApi, {
        query: this.data,
      });

      try {
        userStore.mudarUser(response.data.data);
      } catch (error) {
        console.log(error);
      }
    },
    async register() {},
  },
});
export default useLoginStore;
