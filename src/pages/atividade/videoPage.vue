<script setup lang="ts">
import { ref } from 'vue';
import pauseComponent from 'src/components/atividade/pauseComponent.vue';
import screenRotateComponent from 'src/components/atividade/video/screenRotateComponent.vue';
import useMateriaStore from 'src/stores/materiaStore';

const materiaStore = useMateriaStore();
const corFundo = ref(materiaStore.cor);
</script>

<template>
  <pause-component />
  <screen-rotate-component />
  <q-page>
    <main>
      <div class="box-video">
        <q-video :ratio="16/9" src="/src/assets/"/>
      </div>
    </main>
  </q-page>
</template>

<style scoped>
main {
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.281), transparent 80%);
  background-color: v-bind(corFundo);
}
</style>
