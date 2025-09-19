<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import usePopUpStore from 'src/stores/popUp';
import pauseComponent from 'src/components/atividade/pauseComponent.vue';
import screenRotateComponent from 'src/components/atividade/video/screenRotateComponent.vue';
// import useMateriaStore from 'src/stores/materiaStore';
import videojs from 'video.js'

const popUpStore = usePopUpStore();
// const materiaStore = useMateriaStore();
// const corFundo = ref(materiaStore.cor);

const videoPlayer = ref<HTMLVideoElement | null>(null)
let player: ReturnType<typeof videojs> | null = null


onMounted(() => {
  if (videoPlayer.value) {
    player = videojs(videoPlayer.value, {
      aspectRatio: '16:9',
      controls: false,
      autoplay: true,
      preload: 'auto',
      fluid: true, // responsivo
    })
    if (pergunta.value) {
      player.pause();
    }
  }
  popUpStore.togglePerguntas();
})

onBeforeUnmount(() => {
  if (player) player.dispose()
})


// controle das perguntas
const pergunta = ref(true);
const value = ref(30);

setInterval(() => {
  value.value--
}, 1000)

</script>

<template>
  <pause-component />
  <q-page>
    <screen-rotate-component />
    <main class="center">
      <div class="box-video">
        <video ref="videoPlayer" class="video-js vjs-big-play-centered" loop>
          <source src="/src/assets/aulas/COSTA RICA IN 4K 60fps HDR (ULTRA HD).mp4" type="video/mp4" />
        </video>
        <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/LXb3EKWsInQ?si=M607DeOFOj1o8XT5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->
      </div>
      <q-card class="questoes">
        <q-card-section class="pergunta">
          <q-avatar>
            <q-knob readonly show-value font-size="12px" v-model="value" size="50px" :max="30" :thickness="0.22"
              color="teal" track-color="grey-3" class="q-ma-md">
              {{ value }}
            </q-knob>
          </q-avatar>
          <p>Qual a equação mais se adequal para essa situação?</p>
        </q-card-section>
        <q-card-actions class="resposta">
          <q-list>
            <q-item dense clickable v-ripple>
              <q-item-section avatar class="center">
                <div class="numero-resposta center">
                  A
                </div>
              </q-item-section>

              <q-item-section class="label-resposta">Lorem ipsum dolor sit amet consectetur adipisicing elit.</q-item-section>
            </q-item>
            <q-item dense clickable v-ripple>
              <q-item-section avatar class="center">
                <div class="numero-resposta center">
                  B
                </div>
              </q-item-section>

              <q-item-section class="label-resposta">Lorem ipsum</q-item-section>
            </q-item>
            <q-item dense clickable v-ripple>
              <q-item-section avatar class="center">
                <div class="numero-resposta center">
                  C
                </div>
              </q-item-section>

              <q-item-section class="label-resposta">Lorem ipsum dolor sit</q-item-section>
            </q-item>
            <q-item dense clickable v-ripple>
              <q-item-section avatar class="center">
                <div class="numero-resposta center">
                  D
                </div>
              </q-item-section>

              <q-item-section class="label-resposta">Lorem ipsum dolor sit amet consectetur adipisicing elit. fdnjism smjd msdkolasn fjdjsn</q-item-section>
            </q-item>
          </q-list>
        </q-card-actions>
        <q-card-section>

        </q-card-section>
      </q-card>
    </main>
  </q-page>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

main {
  width: 100dvw;
  height: 100dvh;
  background-color: black;
  /* background: linear-gradient(to bottom, rgba(255, 255, 255, 0.281), transparent 80%); */
  /* background-color: v-bind(corFundo); */
}

.q-card.perguntas {
  width: 300px;
  height: auto;
}

@media (orientation: portrait) {
  .video-js {
    width: 100dvw !important;
  }
}

.video-js {
  /* width: 80dvw; */
  width: 50dvw;
  height: auto;
  scale: 0.8;
}

/* config questões */
.questoes {
  height: 350px;
  width: 400px;
  margin-right: 20px;
}

.pergunta {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 20px 0 20px;
  font-size: 120%;
  gap: 10px;
}

.resposta {
  flex-direction: column;
}

.resposta .q-list {
  width: 80%;
}

.q-item{
  min-height: 40px;
  margin: 20px 0;
  width: 100%;
  border-radius: 20px;
  background-color: var(--cor-principal-1) !important;
}

.numero-resposta {
  width: 30px;
  height: 30px;
  border: 2px solid white;
  border-radius: 100%;
}

.label-resposta{
  font-size: 80%;
  padding-right: 5px;
}
</style>
