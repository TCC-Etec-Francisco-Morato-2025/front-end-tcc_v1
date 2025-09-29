import usePopUpStore from "src/stores/popUp";
import useQuestaoStore from "src/stores/materias/atividades/questaoStore";

const popUpStore = usePopUpStore();
const questaoStore = useQuestaoStore();

export function useAtacFunc() {

  // mudar a pergunta
  const espadaOndulatoriaDivina = () => {
    questaoStore.pergunta = questaoStore.perguntaFacil;
  };

  // Pula a questão atual
  const trombetaDosArcanjos = () => {
    popUpStore.questoes.playVideo=true;
  };

  return {
    espadaOndulatoriaDivina,
    trombetaDosArcanjos,
  };
}
