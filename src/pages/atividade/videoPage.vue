<script setup lang="ts">
// import { onMounted } from 'vue';
import usePopUpStore from 'src/stores/popUp';
import pauseComponent from 'src/components/atividade/pauseComponent.vue';
import confirmarFullScreenComponent from 'src/components/atividade/video/confirmarFullScreenComponent.vue';



const popUpStore = usePopUpStore();

if (!popUpStore.fullScreen.naoAparecerNovamente) {
  popUpStore.toggleFullScreen()
}

</script>

<template>
  <pause-component />
  <q-page>
    <confirmarFullScreenComponent />
  </q-page>
</template>