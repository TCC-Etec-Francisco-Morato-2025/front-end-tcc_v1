<script setup lang="ts">
import type { Resposta } from 'src/types';
import { useQuasar } from 'quasar';
import { ref, watch, nextTick, onMounted } from 'vue';
import { gsap } from 'gsap';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';

// import funcGlobal Itens
import { useAtacFunc } from 'src/composables/itens/useAtacFunc';
import { useDefeFunc } from 'src/composables/itens/useDefeFunc';
import { useEspecFunc } from 'src/composables/itens/useEspecFunc';

// imports pinia
import useAtacItemStore from 'src/stores/itens/atacStore';
import useDefeItemStore from 'src/stores/itens/defeStore';
import useEspecItemStore from 'src/stores/itens/especStore';
import useQuestaoStore from 'src/stores/materias/atividades/questaoStore';
import useQuestoesStore from 'src/stores/materias/atividades/questoesStore';
import usePopUpStore from 'src/stores/popUp';
import useAtividadeStore from 'src/stores/materias/atividades/atividadeStore';

// funcGlobal Itens
const { espadaOndulatoriaDivina, trombetaDosArcanjos } = useAtacFunc();
const { anelDoVazio } = useDefeFunc();
const { ampulhetaDeZhonyas } = useEspecFunc();

// variaveis pinia
const atividadeStore = useAtividadeStore();
const questaoStore = useQuestaoStore();
const popUpStore = usePopUpStore();
const questoesStore = useQuestoesStore();
// itens
const atacStore = useAtacItemStore();
const defeStore = useDefeItemStore();
const especStore = useEspecItemStore();

// variaveis que faz o tempo esgotado funcionar
const boxTempoEsgotado = ref<HTMLElement | null>(null);
const showTempoEsgotado = ref(false);
const showItensTempoEsgotado = ref(false);

// variaveis que faz o resultado da resposta funcionar
const boxResultado = ref<HTMLElement | null>(null);
const isCorreta = ref('');
const corResultado = ref('');
const iconeResultado = ref('');
const showItensResultado = ref(false);
const showResultado = ref(false);

const $q = useQuasar();
const respostas = ref<Resposta[]>([]);
let intervalId: ReturnType<typeof setInterval> | null = null;

onMounted(async () => {
  await criarRespostas();
  contar();
});

// verifica se tem alguma pergunta nova a ser feita
watch(
  () => questaoStore.id,
  async () => {
    await criarRespostas();
  },
  { deep: true },
);

// criar respostas
const criarRespostas = (): Promise<boolean> => {
  return new Promise((resolve) => {
    respostas.value = questoesStore.respostas.filter(
      (r: Resposta) => r.id_pergunta === questaoStore.id,
    );
    resolve(true);
  });
};

const contar = () => {
  if (intervalId !== null) return;

  intervalId = setInterval(() => {
    questaoStore.cronometro--;

    if (questaoStore.cronometro === 0 && !showResultado.value) {
      clearInterval(intervalId!);
      intervalId = null;
      void tempoEsgotado();
    }
  }, 1000);
};

// função que checa que ele foi certas ou errada
const resultado = (resposta: boolean) => {
  if (resposta) {
    isCorreta.value = 'correta!!';
    corResultado.value = 'rgb(2, 136, 2)';
    iconeResultado.value =
      'https://lottie.host/5767d6f6-6489-49b8-92cf-ab0eb36664fb/9ekbGq8RxN.json';
  } else {
    isCorreta.value = 'errada';
    corResultado.value = 'rgb(153, 3, 3)';
    iconeResultado.value =
      'https://lottie.host/0dc1f535-5b39-4df8-8772-5484b4a6119c/FknvN5XfBL.json';
  }
};

// função para animação da resposta
const animacaoResultado = async (resposta: boolean) => {
  resultado(resposta);
  atividadeStore.isCerto(resposta);

  showResultado.value = true;

  await nextTick(); // garante que boxResultado existe no DOM

  if (boxResultado.value) {
    gsap.to(boxResultado.value, {
      backgroundColor: corResultado.value,
      scale: 1,
      borderRadius: '10px',
      duration: 0.6,
      ease: 'back.out',
    });

    setTimeout(() => {
      // fazer os itens aparecerem
      showItensResultado.value = true;

      setTimeout(() => {
        encerrar();
      }, 2000);
    }, 100);
  }
};

const tempoEsgotado = async () => {
  showTempoEsgotado.value = true;

  await nextTick(); // garante que boxResultado existe no DOM

  if (boxTempoEsgotado.value) {
    if ($q.screen.height < $q.screen.width) {
      gsap.to(boxTempoEsgotado.value, {
        backgroundColor: '#fb8c00',
        scale: 1,
        borderRadius: '10px',
        duration: 0.6,
        ease: 'back.out',
      });
    } else {
      gsap.to(boxTempoEsgotado.value, {
        backgroundColor: '#fb8c00',
        scale: 1,
        borderRadius: '0px',
        duration: 0.6,
        ease: 'back.out',
      });
    }

    // fazer os itens aparecerem
    showItensTempoEsgotado.value = true;

    setTimeout(() => {
      encerrar();
    }, 2000);
  }
};

const encerrar = () => {
  clearInterval(intervalId!);
  intervalId = null;
  popUpStore.questoes.playVideo = true;
};

// func Itens
const ativarItem = (nomeFunc: string): void => {
  switch (nomeFunc) {
    case 'trombetaDosArcanjos':
      if (atacStore.recarregando) {
        atacStore.recarregando = false;
        trombetaDosArcanjos();
      }
      break;

    case 'espadaOndulatoriaDivina':
      if (atacStore.recarregando) {
        atacStore.recarregando = false;
        espadaOndulatoriaDivina();
      }
      break;

    case 'anelDoVazio':
      if (defeStore.recarregando) {
        defeStore.recarregando = false;
        anelDoVazio();
      }
      break;

    case 'ampulhetaDeZhonyas':
      if (especStore.recarregando) {
        especStore.recarregando = false;
        ampulhetaDeZhonyas();
      }
      break;
  }
};
</script>

<template>
  <div ref="boxTempoEsgotado" class="resultado center" v-if="showTempoEsgotado">
    <span v-if="showItensTempoEsgotado">Tempo Esgotado</span>
    <DotLottieVue
      style="scale: 2"
      autoplay
      src="https://lottie.host/74136ad9-98d0-4d7e-9e0d-a3e7e02cc37d/BM6BH5mW56.json"
      v-if="showItensTempoEsgotado"
    />
  </div>

  <div ref="boxResultado" class="resultado center" v-if="showResultado">
    <span v-if="showItensResultado">Resposta {{ isCorreta }}</span>
    <DotLottieVue autoplay :src="iconeResultado" v-if="showItensResultado" />
  </div>

  <q-card class="questoes" flat>
    <q-card-section align="left">
      <q-avatar>
        <q-knob
          readonly
          :max="questaoStore.tempoCronometro"
          v-model="questaoStore.cronometro"
          show-value
          size="50px"
          :thickness="0.22"
          track-color="grey-3"
          class="q-ma-md"
        />
      </q-avatar>

      <span class="pergunta">{{ questaoStore.pergunta }}</span>
    </q-card-section>

    <q-card-actions align="center">
      <q-list>
        <q-item
          dense
          clickable
          v-ripple
          v-for="(resposta, indexOf) in respostas"
          :key="indexOf"
          @click="animacaoResultado(resposta.certa)"
        >
          <q-item-section class="label-resposta">{{ resposta.resposta }}</q-item-section>
        </q-item>
      </q-list>
    </q-card-actions>
    <q-card-actions align="center">
      <q-btn
        v-if="atacStore.icon !== ''"
        style="background-color: var(--color-background-2)"
        :icon="atacStore.icon"
        size="16px"
        @click="ativarItem(atacStore.func)"
        :disable="atacStore.recarregando"
        :class="''"
        round
        push
      />
      <q-btn
        v-if="defeStore.icon !== ''"
        style="background-color: var(--color-background-2)"
        :icon="defeStore.icon"
        size="16px"
        @click="ativarItem(defeStore.func)"
        :disable="defeStore.recarregando"
        round
        push
      />
      <q-btn
        v-if="especStore.icon !== ''"
        style="background-color: var(--color-background-2)"
        :icon="especStore.icon"
        size="16px"
        @click="ativarItem(especStore.func)"
        :disable="especStore.recarregando"
        round
        push
      />
    </q-card-actions>
  </q-card>
</template>

<style scoped>
@media (orientation: portrait) {
  .questoes {
    border-radius: 0 !important;
    height: 40dvh !important;
    width: 100dvw !important;
    margin-right: 0 !important;
  }

  .pergunta {
    padding: 20px 20px 0 20px;
    font-size: 120%;
    gap: 10px;
  }

  .resultado {
    border-radius: 0 !important;
    height: 40dvh !important;
    width: 100dvw !important;
    margin-right: 0 !important;
  }
}

* {
  overflow: hidden;
}

.q-knob {
  padding: 0;
  margin: 0;
  color: var(--cor-principal-3);
}

.pergunta {
  margin-left: 20px;
}

.questoes {
  background: linear-gradient(
    to bottom,
    var(--color-background) 20%,
    var(--color-background-4) 100%
  );
  border-radius: 10px;
  height: 350px;
  width: 400px;
  margin-right: 20px;
}

.q-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 80%;
  margin-top: 10px;
}

.q-item {
  min-height: 40px;
  width: 100%;
  border-radius: 20px;
  background-color: var(--cor-principal-2) !important;
}

.numero-resposta {
  width: 30px;
  height: 30px;
  border: 2px solid white;
  border-radius: 100%;
}

.label-resposta {
  font-size: 80%;
  padding-right: 5px;
}

.resultado {
  border-radius: 100%;
  flex-direction: column;
  position: absolute;
  height: 350px;
  width: 400px;
  margin-right: 20px;
  scale: 0;
  z-index: 1;
}
</style>
