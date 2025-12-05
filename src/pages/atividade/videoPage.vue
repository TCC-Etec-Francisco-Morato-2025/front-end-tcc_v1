<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref, onMounted, onBeforeUnmount, watch, nextTick, computed } from 'vue';
import { gsap } from 'gsap';
import useQuestaoStore from 'src/stores/materias/atividades/questaoStore';
import usePopUpStore from 'src/stores/popUp';
import useQuestoesStore from 'src/stores/materias/atividades/questoesStore';
import gameOverComponent from 'src/components/atividade/video/gameOverComponent.vue';
import fimJogoComponent from 'src/components/atividade/video/fimJogoComponent.vue';
import pauseComponent from 'src/components/atividade/pauseComponent.vue';
import screenRotateComponent from 'src/components/atividade/video/screenRotateComponent.vue';
import questoesComponent from 'src/components/atividade/video/questoesComponent.vue';
import videojs from 'video.js';
import useAtividadeStore from 'src/stores/materias/atividades/atividadeStore';
import useAtacItemStore from 'src/stores/itens/atacStore';
import useDefeItemStore from 'src/stores/itens/defeStore';
import useEspecItemStore from 'src/stores/itens/especStore';
import { onBeforeRouteLeave } from 'vue-router';
import useAtividadesStore from 'src/stores/materias/atividadesStore';

const $q = useQuasar();
const atividadesStore = useAtividadesStore();
const atividadeStore = useAtividadeStore();
const popUpStore = usePopUpStore();
const questoesStore = useQuestoesStore();
const questaoStore = useQuestaoStore();

const atacStore = useAtacItemStore();
const defeStore = useDefeItemStore();
const especStore = useEspecItemStore();

const sec = ref(0);
const ordemQuestao = ref(0);
const boxQuestoes = ref<HTMLElement | null>(null);
const videoPlayer = ref<HTMLVideoElement | null>(null);
let player: ReturnType<typeof videojs> | null = null;

// --- CONFIGURAÇÃO DO VÍDEO EXTRA (DINÂMICO) ---
const videoOverlayRef = ref<HTMLVideoElement | null>(null);
let playerOverlay: ReturnType<typeof videojs> | null = null;

// Variáveis reativas que devem ser controladas pela Store externa
const urlVideoExtra = computed(() => atividadeStore.videoExtraUrl || '');
// Esta variável booleana será modificada pelo botão da outra página (ex: store.videoExtraAcionado = true)
const mostrarVideo = ref(false);
// ----------------------------------------------

onMounted(() => {
  atacStore.carregado = true;
  defeStore.carregado = true;
  especStore.carregado = true;
  atividadeStore.vida = 3;

  if (videoPlayer.value) {
    player = videojs(videoPlayer.value, {
      controls: false,
      preload: 'auto',
      playsinline: true,
    });

    if ($q.screen.height < $q.screen.width) {
      player.autoplay(true);
    }

    player.on('timeupdate', () => {
      const currentTime = player?.currentTime();
      if (currentTime) {
        sec.value = Math.floor(currentTime);

        // Lógica das Questões (Original)
        if (
          questoesStore.questoes[ordemQuestao.value]?.tempo === sec.value &&
          questoesStore.questoes[ordemQuestao.value]?.id != questaoStore.id
        ) {
          const newQuestao = questoesStore.questoes[ordemQuestao.value];
          if (newQuestao) {
            questaoStore.mudarQuestao(newQuestao);
            popUpStore.toggleQuestoes();
            ordemQuestao.value++;
            popUpStore.questoes.playVideo = false;
            player?.pause();
            void animacaoQuestao();
          }
        }
      }
    });

    // Watcher de controle de Play/Pause das Questões
    // Watcher de controle de Play/Pause das Questões
    watch(
      () => popUpStore.questoes.playVideo,
      () => {
        if (popUpStore.questoes.playVideo) {
          // Se estava com as questões abertas (fluxo de retorno)
          if (popUpStore.questoes.estado) {
            // 1. Garante que o principal continua pausado enquanto esperamos
            player?.pause();

            setTimeout(() => {
              // Verificação de segurança: O componente ainda está montado?
              if (!videoPlayer.value) return;

              void (async () => {
                await animacaoQuestao().catch((err) => {
                  console.error(err);
                  return false;
                });

                popUpStore.toggleQuestoes();

                // Só verificamos a store AGORA, no momento exato de decidir
                if (atividadeStore.videoExtraAcionado) {
                  mostrarVideo.value = true;
                  await acionarVideoExtra();
                } else {
                  // Se NÃO tem video extra, damos play no principal agora
                  void player?.play();
                }
              })();
            }, 2000);
          } else {
            // Se não estava no estado de questão (ex: pause normal), segue fluxo padrão
            if (!atividadeStore.videoExtraAcionado) {
              void player?.play();
            }
          }
        } else {
          void player?.pause();
        }
      }
    );

    player.on('ended', () => {
      popUpStore.fimJogo = true;
    });
  }
});

// --- NOVO WATCHER PARA ACIONAMENTO EXTERNO (BOTÃO DE OUTRA PÁGINA) ---
const acionarVideoExtra = async () => {
  if (!urlVideoExtra.value) {
    console.warn('URL do vídeo extra não definida na store!');
    // Se não tiver URL, desaciona e não faz nada, ou você pode tratar o erro aqui.
    atividadeStore.videoExtraAcionado = false;
    return;
  }

  // 3. Aguarda renderização do v-if
  await nextTick();

  if (videoOverlayRef.value) {
    playerOverlay = videojs(videoOverlayRef.value, {
      controls: false,
      autoplay: true,
      playsinline: true,
    });

    void playerOverlay.play();

    if (player) {
      const tempoAtual = player.currentTime() || 0;
      player.currentTime(tempoAtual + 9);
    }

    // Ao terminar o vídeo extra
    playerOverlay.on('ended', () => {
      // Notifica a Store que o vídeo acabou
      void player?.play();
      atividadeStore.videoExtraAcionado = false;
      mostrarVideo.value = false;
    });
  }
};
// -------------------------------------------------------------------

onBeforeUnmount(() => {
  if (player) player.dispose();
  if (playerOverlay) playerOverlay.dispose();
});

const resetarVideo = () => {
  player?.currentTime(0);
  ordemQuestao.value = 0;
  questaoStore.id = '-1';

  // Reseta estado da Store
  atividadeStore.videoExtraAcionado = false;
  // Você também pode resetar a URL e o tempo aqui se necessário:
  // atividadeStore.videoExtraUrl = '';

  void player?.play();
  popUpStore.questoes.playVideo = true;
};

// animação
const tml = gsap.timeline({ paused: true });
const animacaoQuestao = (): Promise<true> => {
  return new Promise((resolve) => {
    if (!popUpStore.questoes.playVideo) {
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

onBeforeRouteLeave(() => {
  const atividadeOriginal = atividadesStore.atividades.find((at) => at.id === atividadeStore.id);
  if (atividadeOriginal) atividadeStore.mudarAtividade(atividadeOriginal);
});
</script>

<template>
  <game-over-component @reiniciar="resetarVideo" />
  <fim-jogo-component />
  <pause-component @reiniciar="resetarVideo" />
  <q-page>
    <q-rating
      v-model="atividadeStore.vida"
      :max="3"
      class="estrela"
      size="30px"
      color="grey"
      style="left: 0; top: 0; margin: 20px; position: absolute; z-index: 100"
      icon="img:/public/icons/icons-pixel/icons8-coração-de-pixel-100.png"
      icon-selected="img:/public/icons/icons-pixel/icons8-coração-de-pixel-96.png"
      disable
    />
    <screen-rotate-component />
    <main class="center">
      <q-responsive ref="boxPlayer" :ratio="16 / 9">
        <video ref="videoPlayer" class="video-js vjs-big-play-centered">
          <source :src="atividadeStore.video" type="video/mp4" />
        </video>
      </q-responsive>

      <div v-if="mostrarVideo" class="video-overlay-container">
        <q-responsive :ratio="16 / 9" style="width: 100%">
          <video ref="videoOverlayRef" class="video-js vjs-big-play-centered">
            <source :src="urlVideoExtra" type="video/mp4" />
          </video>
        </q-responsive>
      </div>

      <div ref="boxQuestoes" class="box-questoes">
        <questoes-component v-if="popUpStore.questoes.estado" />
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
}

.q-responsive {
  width: 100dvw;
  height: auto;
  scale: 1;
}

.video-overlay-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
}

.box-questoes {
  position: absolute;
  z-index: 1;
}
</style>
