<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue';
import { gsap } from 'gsap';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import useQuestoesStore from 'src/stores/materias/atividades/questoesStore';
import usePopUpStore from 'src/stores/popUp';

interface props {
  questaoId: number
}

interface Respostas {
  perguntaId: number,
  resposta: string,
  certa: boolean
}

// variaveis pinia
const popUpStore = usePopUpStore()
const questoesStore = useQuestoesStore();


// variaveis que faz o tempo esgotado funcionar
const boxTempoEsgotado = ref<HTMLElement | null>(null)
const showTempoEsgotado = ref(false)
const showItensTempoEsgotado = ref(false)

// variaveis que faz o resultado da resposta funcionar
const boxResultado = ref<HTMLElement | null>(null)
const isCorreta = ref('')
const corResultado = ref('')
const iconeResultado = ref('')
const showItensResultado = ref(false)
const showResultado = ref(false)


const props = defineProps<props>();
const time = ref(0);
const respostas = ref<Respostas[]>([])


onMounted(async()=>{
  await criarRespostas();
  contar();
})

// verifica se tem alguma pergunta nova a ser feita
watch(() => props.questaoId, async() => {
  await criarRespostas();
}, { deep: true })

// criar respostas
const criarRespostas = (): Promise<boolean> => {
  return new Promise((resolve) => {
    questoesStore.resposta.forEach((el) => {
      if (el.perguntaId === props.questaoId) {
        respostas.value.push(el);
      }
    });
    resolve(true);
  });
};

// conta o time
const contar = () => {
    time.value = questoesStore.questoes[props.questaoId]?.conometro ?? 15;
    setInterval(() => {
      time.value--
      if (time.value == 0 && !showResultado.value) {
        void tempoEsgotado();
      }
    }, 1000)
}

// função que checa que ele foi certas ou errada
const resultado = (resposta: boolean) => {
  if (resposta) {
    isCorreta.value = 'correta!!'
    corResultado.value = 'rgb(2, 136, 2)'
    iconeResultado.value = 'https://lottie.host/5767d6f6-6489-49b8-92cf-ab0eb36664fb/9ekbGq8RxN.json'
  } else {
    isCorreta.value = 'errada'
    corResultado.value = 'rgb(153, 3, 3)'
    iconeResultado.value = 'https://lottie.host/0dc1f535-5b39-4df8-8772-5484b4a6119c/FknvN5XfBL.json'
  }
}

// função para animação da resposta
const animacaoResultado = async (resposta: boolean) => {

  resultado(resposta);

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

    setTimeout(()=>{
      // fazer os itens aparecerem
      showItensResultado.value = true;

      setTimeout(() => {
        encerrar()
      }, 2000);
    },100)
  }
}

const tempoEsgotado = async () => {
  showTempoEsgotado.value = true;

  await nextTick(); // garante que boxResultado existe no DOM

  if (boxTempoEsgotado.value) {
    gsap.to(boxTempoEsgotado.value, {
      backgroundColor: '#fb8c00',
      scale: 1,
      borderRadius: '10px',
      duration: 0.6,
      ease: 'back.out',
    });

    // fazer os itens aparecerem
    showItensTempoEsgotado.value = true;

    setTimeout(() => {
      encerrar()
    }, 2000);
  }
}

const encerrar = () => {
  popUpStore.questoes.playVideo = true;
}
</script>

<template>
  <div ref="boxTempoEsgotado" class="resultado center" v-if="showTempoEsgotado">
    <span v-if="showItensTempoEsgotado">Tempo Esgotado</span>
    <DotLottieVue style="scale: 2;" autoplay
      src="https://lottie.host/74136ad9-98d0-4d7e-9e0d-a3e7e02cc37d/BM6BH5mW56.json" v-if="showItensTempoEsgotado" />
  </div>

  <div ref="boxResultado" class="resultado center" v-if="showResultado">
    <span v-if="showItensResultado">Resposta {{ isCorreta }}</span>
    <DotLottieVue autoplay :src="iconeResultado" v-if="showItensResultado" />
  </div>

  <q-card class="questoes" flat>

    <q-card-section class="pergunta">

      <q-avatar>
        <q-knob readonly :max="questoesStore.questoes[props.questaoId]?.conometro" v-model="time" show-value size="50px" :thickness="0.22" track-color="grey-3"
          class="q-ma-md" />
      </q-avatar>

      <span>{{ questoesStore.questoes[props.questaoId]?.pergunta }}</span>

    </q-card-section>

    <q-card-actions class="resposta">
      <q-list>

        <q-item dense clickable v-ripple v-for="(resposta, indexOf) in respostas" :key="indexOf"
          @click="animacaoResultado(resposta.certa)">

          <q-item-section class="label-resposta">{{ resposta.resposta }}</q-item-section>
        </q-item>
      </q-list>
    </q-card-actions>
  </q-card>
</template>

<style scoped>
* {
  overflow: hidden;
}

.q-knob {
  padding: 0;
  margin: 0;
  color: var(--cor-principal-3);
}

.questoes {
  border-radius: 10px;
  height: 350px;
  width: 400px;
  margin-right: 20px;
}

.pergunta {
  display: flex;
  align-items: center;
  justify-content: flex-start;
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

.q-item {
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
