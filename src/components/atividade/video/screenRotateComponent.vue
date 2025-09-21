<script setup lang="ts">
import { useQuasar } from 'quasar';
import { gsap } from 'gsap';
import { onMounted, ref } from 'vue';
import usePopUpStore from 'src/stores/popUp';

const $q = useQuasar();
const aparecer_orientacao = ref(false);
const popUpStore = usePopUpStore();

onMounted(() => {
  if ($q.screen.width < $q.screen.height) {
    aparecer_orientacao.value = true;
    animacao();
  }
})

const animacao = () => {
  const tml = gsap.timeline();

  tml
    .to('#linha', { width: 270, duration: 1 })
    .to('#linha', { rotate: -90, duration: 1 })
    .to('.screen_rotation', { opacity: 1, x: -70, duration: 0.4 })
    .to('.texto_screen_rotation', { opacity: 1, x: 100, duration: 0.4 }, '-=0.4')
    .to('.screen_rotation', { rotate: -50, duration: 1 }, '-=0.2')
    .to('.screen_rotation', { opacity: 0, x: 0, duration: 0.4 }, '+=0.5')
    .to('.texto_screen_rotation', { opacity: 0, x: 0, duration: 0.4 }, '-=0.4')
    .to('#linha', {
      width: 0, duration: 1, onComplete: () => {
        popUpStore.questoes.playVideo=true;
        aparecer_orientacao.value = false;
      }
    }, '-=0.4')
}
</script>

<template>
  <q-card class="bg-black text-white center" flat v-show="aparecer_orientacao">

    <q-card-section class="animacao center">
      <q-icon class="screen_rotation" name="screen_rotation" size="80px" />
      <div id="linha"></div>
      <p class="texto_screen_rotation">
        Para ter uma melhor experiência
        <br>
        Rode o celular
      </p>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.q-card {
  position: absolute;
  width: 100vw;
  height: 100vh;
}

.animacao {
  position: relative;
}

.animacao #linha {
  background-color: white;
  height: 10px;
  width: 0px;
}

.animacao .q-icon {
  position: absolute;
  opacity: 0;
  transform: rotate(35deg);
}

.animacao p {
  position: absolute;
  font-family: 'Baloo 2';
  width: 150px;
  opacity: 0;
}
</style>
