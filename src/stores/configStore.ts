import { defineStore } from "pinia";
import { Dark } from "quasar";

// const $q = useQuasar();
const dark = Dark;

const useConfig = defineStore('config',{
  state:()=>({
    darkMode: dark.isActive
  }),
  getters:{
  },
  actions:{
  },
  persist:{
    storage: localStorage
  }
})

export default useConfig;
