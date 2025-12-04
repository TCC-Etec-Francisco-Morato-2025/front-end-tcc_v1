import { defineStore } from "pinia";
import { Dark } from "quasar";
import usePopUpStore from "./popUp";

const popUpStore = usePopUpStore();

// const $q = useQuasar();
const dark = Dark;

const useConfig = defineStore('config',{
  state:()=>({
    darkMode: dark.isActive,
    aviso: !popUpStore.confirmar.naoAparecerNovamente,
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
