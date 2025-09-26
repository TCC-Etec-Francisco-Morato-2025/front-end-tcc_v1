<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import useAtividadeStore from 'src/stores/materias/atividades/atividadeStore';
import useFalasPersonagensStore from 'src/stores/materias/atividades/falasPersonagensStore';
import usePersonagensStore from 'src/stores/materias/atividades/personagensStore';
// import useAtividadesStore from 'src/stores/materias/atividadesStore';
import pauseComponent from 'src/components/atividade/pauseComponent.vue';
import Typed from 'typed.js';

interface Personagem {
  id: number;
  nome: string;
  materia: string;
  cor: string;
  personagem: string;
}

interface Fala {
  id: number;
  personagem: number;
  atividade: number;
  fala: string;
}

const router = useRouter();
const ordem = ref(1);
const atividadeStore = useAtividadeStore();
// const atividadesStore = useAtividadesStore();
const falaStore = useFalasPersonagensStore();
const personagensStore = usePersonagensStore();
const personagemAtual = ref<Personagem>();
const falaAtual = ref<Fala>();
const corAtual = ref('');
const typedElement = ref<HTMLSpanElement | null>(null);
let typedInstance: Typed | null = null;

// Executa quando o componente é montado
onMounted(() => {
  escolherFala(ordem.value, 1); // substituir o 1 per atividade.id
  if (typedElement.value && falaAtual.value) {
    typedInstance = new Typed(typedElement.value, {
      strings: [falaAtual.value.fala],
      typeSpeed: 50,
      loop: false,
      showCursor: false,
    });
  }
});

onUnmounted(() => {
  if (typedInstance) {
    typedInstance.destroy();
  }
});

const voltarFala = () => {
  if (ordem.value > 1) ordem.value--;
  escolherFala(ordem.value, 1);
  if (typedInstance) {
    typedInstance.destroy();
    if (typedElement.value && falaAtual.value) {
      typedInstance = new Typed(typedElement.value, {
        strings: [falaAtual.value.fala],
        typeSpeed: 50,
        loop: false,
        showCursor: false,
      });
    }
  }
};

const proximaFala = () => {
  if(ordem.value < falaStore.falas.length){
    ordem.value++;
    escolherFala(ordem.value, 1);
    if (typedInstance) {
      typedInstance.destroy();
      if (typedElement.value && falaAtual.value) {
        typedInstance = new Typed(typedElement.value, {
          strings: [falaAtual.value.fala],
          typeSpeed: 50,
          loop: false,
          showCursor: false,
        });
      }
    }
  }else{
    void router.push('/atividade/video')
  }
};

const escolherFala = (ordem: number, atividade: number) => {
  falaStore.falas.forEach((fala) => {
    if (atividade === fala.atividade && ordem === fala.id) {
      falaAtual.value = fala;
      escolherPersonagem(falaAtual.value.personagem);
    }
  });
};

const escolherPersonagem = (id: number) => {
  personagensStore.personagens.forEach((personagem) => {
    if (id === personagem.id) {
      personagemAtual.value = personagem;
      console.log(personagemAtual.value);
      corAtual.value = personagemAtual.value.cor;
    }
  });
};


const reiniciar = ()=>{
  ordem.value=1;
  escolherFala(ordem.value, atividadeStore.id);
  if (typedElement.value && falaAtual.value) {
    typedInstance = new Typed(typedElement.value, {
      strings: [falaAtual.value.fala],
      typeSpeed: 50,
      loop: false,
      showCursor: false,
    });
  }
}
</script>

<template>
  <pause-component @reiniciar="reiniciar"/>
  <q-page>
    <q-btn
      class="btn-voltar"
      icon="arrow_back"
      size="30"
      rounded
      @click="voltarFala"
      v-if="ordem > 1"
    />
    <main>
      <q-img :src="`src/assets/personagens/${personagemAtual?.personagem}.png`" />
      <q-card class="caixa-fala center">
        <q-card-section>
          <span ref="typedElement"></span>
        </q-card-section>
      </q-card>
      <q-btn class="next" @click="proximaFala" push> next </q-btn>
    </main>
  </q-page>
</template>

<style scoped>
header {
  position: relative;
}

.btn-voltar {
  position: absolute;
  top: 15px;
  left: 15px;
  color: black;
  background-color: rgba(255, 255, 255, 0.486);
}

main {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.226), transparent 80%);
  background-color: v-bind(corAtual);
  height: 100dvh;
}

.q-img {
  width: 350px;
  height: 350px;
}

.caixa-fala {
  text-align: center;
  min-height: 200px;
  width: 90dvw;
  max-width: 400px;
  font-family: 'Pixelify Sans';
  font-size: 200%;
  color: black;
  background-color: white;
  border-radius: 20px;
  box-shadow: 2px 4px 6px 3px v-bind(corAtual), 2px 4px 6px 5px rgba(0, 0, 0, 0.692);
}

.q-btn.next {
  align-self: flex-end;
  right: 0;
  color: black;
  background-color: rgba(255, 255, 255, 0.486);
  margin: 20px;
  width: fit-content;
  padding: 0 50px !important;
  height: 40px !important;
}
</style>
