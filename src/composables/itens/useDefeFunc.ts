import { watch } from "vue";
import useQuestaoStore from "src/stores/materias/atividades/questaoStore"
import usePopUpStore from "src/stores/popUp";

const questaoStore = useQuestaoStore();
const popUpStore = usePopUpStore();

export function useDefeFunc(){

  // se a questão não for respondida, pular para a próxima sem perder vida
  const anelDoVazio = () => {
    watch(()=>questaoStore.cronometro,()=>{
      if(questaoStore.cronometro === 1){
        setTimeout(()=>{
          popUpStore.toggleQuestoes();
        },500)
      }
    })
  }

  return{
    anelDoVazio
  }
}
