<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import {gsap} from 'gsap';
import usePopUpStore from 'src/stores/popUp';
import useQuestoesStore from 'src/stores/materias/atividades/questoesStore';
import pauseComponent from 'src/components/atividade/pauseComponent.vue';
import screenRotateComponent from 'src/components/atividade/video/screenRotateComponent.vue';
import questoesComponent from 'src/components/atividade/video/questoesComponent.vue';
// import useMateriaStore from 'src/stores/materiaStore';
import videojs from 'video.js'

const popUpStore = usePopUpStore();
const questoesStore = useQuestoesStore();
// const materiaStore = useMateriaStore();
// const corFundo = ref(materiaStore.cor);
const questaoAtual = ref(0)
const sec = ref(0)
const videoPlayer = ref<HTMLVideoElement | null>(null)
let player: ReturnType<typeof videojs> | null = null;


onMounted(() => {
  // configuração do player
  if (videoPlayer.value) {
    player = videojs(videoPlayer.value, {
      aspectRatio: '16:9',
      controls: false,
      autoplay:true,
      fluid: true, // responsivo
    })
    // verifica a cada segundo o tempo do video
    player.on('timeupdate',()=>{
      if(player && player.currentTime()!=undefined){
        // transforma em numero para depois arredondar
        const currentTime = player.currentTime();
        if (typeof currentTime === 'number') {
          sec.value = Math.floor(currentTime);
          // vasculha o store de questões para achar correspondente
          questoesStore.questoes.forEach((el)=>{
            // necessário verificar se a questão atual é diferente da que ele está mostrando agora porque a função é tão rápida que repete 3 vezes por segundo
            if(el.tempo===sec.value && questaoAtual.value != el.id){
              questaoAtual.value = el.id;
              animacaoQuestaoIntro();
              popUpStore.toggleQuestoes();
              popUpStore.questoes.playVideo=false;
              player?.pause();
            };
          });
        };
      };
    });
    watch(()=>popUpStore.questoes.playVideo,()=>{
      if(popUpStore.questoes.playVideo){
        animacaoQuestaoLeave();
        void player?.play();
      }else{
        void player?.pause();
      }
    });
  }
})

onBeforeUnmount(() => {
  if (player) player.dispose()
})

const animacaoQuestaoIntro = ()=>{
  gsap.to(videoPlayer.value,{width:'50dvw', scale: 0.8, duration: 0.5})
}

const animacaoQuestaoLeave = ()=>{
  gsap.killTweensOf(videoPlayer.value)
}
</script>

<template>
  <pause-component />
  <q-page>
    <screen-rotate-component />
    <main class="center">
      <div class="box-video">
        <video ref="videoPlayer" class="video-js vjs-big-play-centered">
          <source src="/src/assets/aulas/COSTA RICA IN 4K 60fps HDR (ULTRA HD).mp4" type="video/mp4" />
        </video>
      </div>
      <div class="box-questoes" v-if="popUpStore.questoes.estado">
        <questoes-component :questao-id="questaoAtual"/>
      </div>
    </main>
  </q-page>
</template>

<style scoped>

main {
  width: 100dvw;
  height: 100dvh;
  background-color: black;
  /* background: linear-gradient(to bottom, rgba(255, 255, 255, 0.281), transparent 80%); */
  /* background-color: v-bind(corFundo); */
}

@media (orientation: portrait) {
  .video-js {
    width: 100dvw !important;
  }
}

.video-js {
  width: 80dvw;
  height: auto;
  scale: 0.8;
}

/* config questões */
.box-questoes{
  position: relative;
}
</style>
