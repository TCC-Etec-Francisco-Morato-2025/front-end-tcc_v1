import { defineStore } from "pinia";

const usePopUpAtividade = defineStore('popUpAtividade',{
  state: ()=>({
    ativo:false,
    nome:'',
    descricao:'',
    estrelas:0,
  }),

  actions:{
    acionarAtiviade(ativo:boolean,estrelas:number,nome:string,descricao:string){
      console.log('o delay ocorre no pinia')
      this.ativo = ativo;
      this.estrelas = estrelas;
      this.nome = nome;
      this.descricao = descricao;
    }
  }
})

export default usePopUpAtividade
