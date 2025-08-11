import { defineStore } from "pinia";

const useLoginStore = defineStore('login',{
  state:()=>({
    slide:'entrar'
  })
})
export default useLoginStore;
