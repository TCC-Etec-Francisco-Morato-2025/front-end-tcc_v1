import { defineStore } from "pinia";
import type { Fala } from "src/types";

interface FalasState {
  falas: Fala[];
}


const useFalasPersonagensStore = defineStore('falas',{
  state:():FalasState=>({
    falas:[
      { id: '1', id_personagem: '1', id_atividade: '1', fala: 'Vamos matar um dragão?'},
      { id: '2', id_personagem: '2', id_atividade: '1', fala: 'Por quê?'},
      { id: '3', id_personagem: '3', id_atividade: '1', fala: 'Porque ele roubou minha...'},
      { id: '4', id_personagem: '1', id_atividade: '1', fala: 'Sinta-se mal por isso.'},
      { id: '5', id_personagem: '2', id_atividade: '1', fala: 'Tá bom, que horas?'},
      { id: '6', id_personagem: '4', id_atividade: '1', fala: 'Amanhã às 9?'},
      { id: '7', id_personagem: '2', id_atividade: '1', fala: 'É pode ser'},
      { id: '8', id_personagem: '2', id_atividade: '1', fala: 'Blz, flw!!'},
    ]
  })
});
export default useFalasPersonagensStore;
