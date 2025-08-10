import useConfig from "src/stores/configStore";
import { Dark } from "quasar";
import { watch } from "vue";

const configStore = useConfig();
const darkMode = Dark;

darkMode.set(configStore.darkMode);

watch(()=>configStore.darkMode,()=>{
  darkMode.set(configStore.darkMode)
});
