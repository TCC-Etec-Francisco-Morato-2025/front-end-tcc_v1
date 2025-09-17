<script setup lang="ts">
import { ref, onMounted , onBeforeUnmount } from 'vue';
import pauseComponent from 'src/components/atividade/pauseComponent.vue';
import screenRotateComponent from 'src/components/atividade/video/screenRotateComponent.vue';
import useMateriaStore from 'src/stores/materiaStore';
import videojs from 'video.js'

const materiaStore = useMateriaStore();
const corFundo = ref(materiaStore.cor);

const videoPlayer = ref<HTMLVideoElement | null>(null)
let player: ReturnType<typeof videojs> | null = null


onMounted(() => {
  if (videoPlayer.value) {
    player = videojs(videoPlayer.value, {
      aspectRatio: '16:9',
      controls: true,
      autoplay: true,
      preload: 'auto',
      fluid: true, // responsivo
    })
  }
})

onBeforeUnmount(() => {
  if (player) player.dispose()
})
</script>

<template>
  <pause-component />
  <q-page>
    <screen-rotate-component />
    <main>
      <div class="box-video">
        <video ref="videoPlayer" class="video-js vjs-big-play-centered">
          <source src="/src/assets/aulas/COSTA RICA IN 4K 60fps HDR (ULTRA HD).mp4" type="video/mp4"/>
        </video>
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

.box-video{
  width: 80dvw;
}

.video-js{
  width: 100%;
  height: auto;
}
</style>
