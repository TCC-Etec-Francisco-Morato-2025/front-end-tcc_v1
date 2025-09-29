import useQuestaoStore from "src/stores/materias/atividades/questaoStore";

const questaoStore = useQuestaoStore();

export function useEspecFunc() {

  // recuperar 30% tempo perdido
  const ampulhetaDeZhonyas = () => {
    const tempoRecuperar = Math.floor(questaoStore.tempoCronometro/0.3);

    if(questaoStore.cronometro<questaoStore.tempoCronometro/0.7)
      questaoStore.cronometro = tempoRecuperar+questaoStore.cronometro;
  };

  return {
    ampulhetaDeZhonyas,
  };
}
