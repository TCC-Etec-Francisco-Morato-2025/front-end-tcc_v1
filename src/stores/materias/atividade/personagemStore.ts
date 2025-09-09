import { defineStore } from 'pinia';

const usePersonagemStore = defineStore('personagem', {
  state: () => ({
      id: 0,
      nome: '',
      materia: '',
      cor: '',
      personagem: ''
  }),
  actions:{
    mudarPersonagem( id:number, nome:string, materia:string, cor:string, personagem:string){
      this.id = id
      this.nome = nome
      this.materia = materia
      this.cor = cor
      this.personagem = `src/assets/personagens/${personagem}.png`
    }
  }
});
export default usePersonagemStore;
