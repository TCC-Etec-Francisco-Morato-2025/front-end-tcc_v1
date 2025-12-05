<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import useMateriaStore from 'src/stores/materias/materiaStore';
import usePopUpStore from 'src/stores/popUp';
import useAtividadeStore from 'src/stores/materias/atividades/atividadeStore';

const atividadeStore = useAtividadeStore();
const emits = defineEmits(['reiniciar']);
const $q = useQuasar();
const router = useRouter();
const materiaStore = useMateriaStore();
const popUpStore = usePopUpStore();

atividadeStore.videoExtraAcionado = false;

const sair = () => {
  popUpStore.atividade = false;
  popUpStore.gameOver = false;

  void $q.fullscreen.exit();

  router.replace(`/materias/${materiaStore.path}`).catch((error) => {
    console.error('Erro ao navegar:', error);
  });
};

const reiniciar = () => {
  atividadeStore.resetarVidas();
  popUpStore.toggleGameOver();
  emits('reiniciar');
};
</script>

<template>
  <q-dialog
    v-if="popUpStore.gameOver"
    v-model="popUpStore.gameOver"
    persistent
    backdrop-filter="blur(20px) brightness(0)"
    :maximized="popUpStore.gameOver"
  >
    <!-- <q-card class="top-card">
      <span> LOGARITIMO </span>
    </q-card> -->
    <q-card flat v-once>
      <q-card-section class="center">
        <h2 class="titulo">GAME OVER</h2>
        <q-btn class="btn-sair" icon="close" @click="sair" push />
      </q-card-section>
      <q-card-section>
        <dot-lottie-vue
          src="https://lottie.host/3bfee18e-8375-4a01-95be-d7a7ae80d94e/YPz4lauraF.json"
          loop
          autoplay
        />
      </q-card-section>
      <q-card-actions align="center">
        <q-btn class="btn-novamente" label="Novamente" @click="reiniciar" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
@media (orientation: landscape) {
  .q-card {
    height: 95dvh !important;
    width: 400px !important;
    overflow: hidden;
  }
}

.titulo {
  font-size: 3.3rem;
  font-family: 'Pixelify Sans';
  text-align: center;
  animation: animacao 700ms ease-in-out alternate infinite;
}
@keyframes animacao {
  from {
    color: white;
  }
  to {
    color: red;
  }
}

.btn-sair {
  top: 12px;
  right: 12px;
  position: absolute;
  background-color: red;
  width: 35px;
  height: 35px;
  padding: 0;
  border-radius: 100%;
  color: white;
}

.q-card {
  display: grid;
  /* grid-template-rows: 1fr 5fr auto; */
  width: 400px;
  height: auto;
  background-color: black;
  border: 1px solid red;
  border-radius: 20px !important;
}

/* .caixa-botoes {
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 10px auto;
} */
.btn-novamente {
  font-family: 'Pixelify Sans';
  background-color: red;
  /* color: rgb(0, 0, 0);
  border: 2px solid #f7c92e;
  background-color: #fff0b1; */
}
</style>
