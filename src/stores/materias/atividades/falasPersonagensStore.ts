import { defineStore } from "pinia";
import type { Fala } from "src/types";

interface FalasState {
  falas: Fala[];
}


const useFalasPersonagensStore = defineStore('falas',{
  state:():FalasState=>({
    falas:[
      { id: 1, personagem: 1, atividade: 1, fala: 'Vamos matar um dragão?'},
      { id: 2, personagem: 2, atividade: 1, fala: 'Por quê?'},
      { id: 3, personagem: 3, atividade: 1, fala: 'Porque ele roubou minha...'},
      { id: 4, personagem: 1, atividade: 1, fala: 'Sinta-se mal por isso.'},
      { id: 5, personagem: 2, atividade: 1, fala: 'Tá bom, que horas?'},
      { id: 6, personagem: 4, atividade: 1, fala: 'Amanhã às 9?'},
      { id: 7, personagem: 2, atividade: 1, fala: 'É pode ser'},
      { id: 8, personagem: 2, atividade: 1, fala: 'Blz, flw!!'},
    ]
  })
});
export default useFalasPersonagensStore;
