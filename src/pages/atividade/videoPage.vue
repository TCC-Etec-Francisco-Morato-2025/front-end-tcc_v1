<script setup lang="ts">
import { ref } from 'vue';
import pauseComponent from 'src/components/atividade/pauseComponent.vue';
import screenRotateComponent from 'src/components/atividade/video/screenRotateComponent.vue';
import useMateriaStore from 'src/stores/materiaStore';

const materiaStore = useMateriaStore();
const corFundo = ref(materiaStore.cor);

const video = ref<HTMLElement|null>(null)

if(video.value){
  console.log(video.value)
}
</script>

<template>
  <pause-component />
  <screen-rotate-component />
  <q-page>
    <main>
      <div class="box-video">
        <q-video ref="video" :ratio="16/9" src="https://www.youtube.com/embed/LXb3EKWsInQ?controls=0&modestbranding=1&rel=0&autoplay=1"/>
        <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/LXb3EKWsInQ?si=M607DeOFOj1o8XT5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->
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
