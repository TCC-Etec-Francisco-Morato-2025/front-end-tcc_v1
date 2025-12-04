<script setup lang="ts">
import bemVindoApresentacao from '../components/apresentação/bemVindoApresentacao.vue';
import sobreApresentacao from '../components/apresentação/sobreApresentacao.vue';
import { ref } from 'vue';
import { gsap } from 'gsap';

const showDialog = ref(true);
const transitionDuration = ref(2000);
const slide = ref('bemVindo');

const mudarSlide = (mensagem: string) => {
  slide.value = mensagem;
};

const iniciarTutorial = () => {
  animacaoSaida();
};

const animacaoSaida = () => {
  const tml = gsap.timeline();

  tml.to('.popUp', {
    opacity: 0,
    borderRadius: '100% !importante',
    duration: 1,
    onComplete: () => {
      showDialog.value = false;
    },
  });
};
</script>

<template>
  <q-dialog v-model="showDialog" :maximized="showDialog" persistent class="popUp">
    <q-carousel
      v-model="slide"
      vertical
      animated
      transition-next="slide-up"
      :transition-duration="transitionDuration"
    >
      <q-carousel-slide name="bemVindo">
        <bem-vindo-apresentacao @proximo="mudarSlide" />
      </q-carousel-slide>
      <q-carousel-slide name="sobre">
        <sobre-apresentacao @proximo="iniciarTutorial" />
      </q-carousel-slide>
    </q-carousel>
  </q-dialog>
</template>

<style scoped>
.q-carousel__slide {
  padding: 0;
}
</style>
