<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { gsap } from 'gsap';
import useAtacItemStore from 'src/stores/itens/atacStore';
import useDefeItemStore from 'src/stores/itens/defeStore';
import useEspecItemStore from 'src/stores/itens/especStore';
import useQuestaoStore from 'src/stores/materias/atividades/questaoStore';
import usePopUpStore from 'src/stores/popUp';
import useQuestoesStore from 'src/stores/materias/atividades/questoesStore';
import fimJogoComponent from 'src/components/atividade/video/fimJogoComponent.vue';
import pauseComponent from 'src/components/atividade/pauseComponent.vue';
import screenRotateComponent from 'src/components/atividade/video/screenRotateComponent.vue';
import questoesComponent from 'src/components/atividade/video/questoesComponent.vue';
// import useMateriaStore from 'src/stores/materiaStore';
import videojs from 'video.js';

const $q = useQuasar();
const popUpStore = usePopUpStore();
const questoesStore = useQuestoesStore();
const questaoStore = useQuestaoStore();
const itemAtacStore = useAtacItemStore();
const itemDefeStore = useDefeItemStore();
const itemEspecStore = useEspecItemStore();
// const materiaStore = useMateriaStore();
// const corFundo = ref(materiaStore.cor);
const sec = ref(0);
const boxQuestoes = ref<HTMLElement | null>(null);
const videoPlayer = ref<HTMLVideoElement | null>(null);
let player: ReturnType<typeof videojs> | null = null;

onMounted(() => {
  // configuração do player
  if (videoPlayer.value) {
    player = videojs(videoPlayer.value, {
      controls: false,
      preload: 'auto',
      playsinline: true,
    });

    if ($q.screen.height < $q.screen.width) {
      player.autoplay(true);
    }
    // verifica a cada segundo o tempo do video
    player.on('timeupdate', () => {
      // transforma em numero para depois arredondar
      const currentTime = player?.currentTime();
      if (currentTime !== undefined) {
        sec.value = Math.floor(currentTime);
        // vasculha o store de questões para achar correspondente
        questoesStore.questoes.forEach((el) => {
          // necessário verificar se a questão atual é diferente da que ele está mostrando agora porque a função é tão rápida que repete 3 vezes por segundo
          if (el.tempo === sec.value && questaoStore.id != el.id) {
            questaoStore.mudarQuestao(
              el.id,
              el.pergunta,
              el.perguntaFacil,
              el.tempo,
              el.tempoCronometro
            );
            // função para ativar o popup
            popUpStore.toggleQuestoes();
            // garante que a variavel que controla o video sempre esteja false quando ele for pausado
            popUpStore.questoes.playVideo = false;
            player?.pause();
            void animacaoQuestao();
          }
        });
      }
    });
    // pausar o video quando o valor mudar
    watch(
      () => popUpStore.questoes.playVideo,
      async () => {
        if (popUpStore.questoes.playVideo) {
          // esperar animação de voltar
          if (popUpStore.questoes.estado) {
            await animacaoQuestao();
            popUpStore.toggleQuestoes();
          }
          void player?.play();
        } else {
          void player?.pause();
        }
      }
    );

    //Finalizar quando o video acabar
    player.on('ended', () => {
      popUpStore.fimJogo = true;
    });
  }
});

onBeforeUnmount(() => {
  if (player) player.dispose();
});

const resetarVideo = () => {
  player?.currentTime(0);
  questaoStore.id = 0;
  void player?.play();
  popUpStore.questoes.playVideo = true;
};

// animação
const tml = gsap.timeline({ paused: true });

const animacaoQuestao = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!popUpStore.questoes.playVideo) {
      // constrói animação se ainda não foi montada
      tml.clear();

      if ($q.screen.height < $q.screen.width) {
        tml
          .fromTo('.q-responsive', { x: 0 }, { x: '-24dvw', scale: '0.4', duration: 1 })
          .fromTo(boxQuestoes.value, { x: 700 }, { x: '24dvw', duration: 1 }, '-=0.8');
      } else {
        tml
          .fromTo('.q-responsive', { y: 0 }, { y: '-15dvh', duration: 1 })
          .fromTo(boxQuestoes.value, { y: '100dvh' }, { y: '30dvh', duration: 1 }, '-=1');
      }

      tml.eventCallback('onComplete', () => resolve(true));
      tml.play();
    } else {
      tml.reverse();
      tml.eventCallback('onReverseComplete', () => resolve(true));
    }
  });
};
</script>

<template>
  <fim-jogo-component />
  <pause-component @reiniciar="resetarVideo" />
  <q-page>
    <screen-rotate-component />
    <main class="center">
      <q-responsive ref="boxPlayer" :ratio="16 / 9">
        <video ref="videoPlayer" class="video-js vjs-big-play-centered">
          <source
            src="/src/assets/aulas/Mãe é tudo igual, só muda o endereço  IRMÃO DO JOREL - Cartoon Network Brasil (720p, h264, youtube).mp4"
            type="video/mp4"
          />
        </video>
      </q-responsive>
      <div ref="boxQuestoes" class="box-questoes">
        <questoes-component v-if="popUpStore.questoes.estado" />
      </div>
      <div class="box-itens">
        <q-avatar rounded>
          <q-img />
        </q-avatar>
      </div>
    </main>
  </q-page>
</template>

<style scoped>
main {
  overflow: hidden;
  position: relative;
  width: 100dvw;
  height: 100dvh;
  background-color: black;
  /* background: linear-gradient(to bottom, rgba(255, 255, 255, 0.281), transparent 80%); */
  /* background-color: v-bind(corFundo); */
}

/* celular em pé */
/* @media (orientation: portrait) {
  .video-js {
    scale: 1;
  }
} */

.q-responsive {
  width: 100dvw;
  height: auto;
  scale: 1;
}
@media (orientation: landscape) {
}

/* config questões */
.box-questoes {
  position: absolute;
  z-index: 1;
}
</style>
