import useConfig from "src/stores/configStore";
import useMateriasStore from "src/stores/materias/materiasStore";
import { Dark } from "quasar";
import { watch } from "vue";

const configStore = useConfig();
const darkMode = Dark;
const materiaStore = useMateriasStore();

const inciarMateria = async()=>{
  await materiaStore.getMaterias();
}

inciarMateria().catch(()=>{
  console.error('erro ao iniciar materias')
})

darkMode.set(configStore.darkMode);

watch(() => configStore.darkMode, () => {
  darkMode.set(configStore.darkMode)
});
