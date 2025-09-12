<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import useFalasPersonagensStore from 'src/stores/materias/atividades/falasPersonagensStore';
import usePersonagensStore from 'src/stores/materias/atividades/personagensStore';
import usePopUp from 'src/stores/popUp';
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

const ordem = ref(1);
const atividade = 1;
const popUpStore = usePopUp();
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
  escolherFala(ordem.value, atividade);
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
  escolherFala(ordem.value, atividade);
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
  ordem.value++;
  escolherFala(ordem.value, atividade);
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

const pausar = ()=>{
  popUpStore.togglePause();
}

const reiniciar = ()=>{
  ordem.value=1;
  escolherFala(ordem.value, atividade);
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
  <q-btn icon="pause" class="btn-pause" size="15px" flat @click="pausar" />
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

/* area de jogo pausado */
.btn-pause {
  color: rgb(0, 0, 0);
  background-color: rgba(255, 255, 255, 0.507);
  top: 10px;
  right: 10px;
  position: absolute;
  z-index: 1;
}

.q-dialog .q-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 90%;
  height: 60%;
  background-color: rgba(255, 255, 255, 0.473);
  border-radius: 20px !important;
}

.q-item__label {
  flex-direction: column;
  margin: 0;
  font-size: 10dvw;
}
.q-item__label span {
  font-size: 5dvw;
}
.q-dialog .btns {
  flex-direction: column;
  width: 100%;
  gap: 20px;
}
.btns .q-btn {
  font-size: 1rem;
  width: 80%;
  height: 65px;
  border-radius: 20px;
}
</style>
