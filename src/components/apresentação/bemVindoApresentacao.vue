<script setup lang="ts">
import { gsap } from 'gsap';
import { onMounted, ref, defineEmits } from 'vue';

const fase1 = ref(true);

const emit = defineEmits<{
  (e: 'proximo', mensagem: string): void;
}>();

const proximoSlide = () => {
  emit('proximo', 'sobre');
};

onMounted(() => {
  animateText();
  // setTimeout(() => {
  //   saidaText();
  // }, 4000);
});

const animateText = () => {
  const tml = gsap.timeline();

  tml
    .from('.txt1', { opacity: 0, y: -100, duration: 2 })
    .from('.txt2', { opacity: 0, x: -100, duration: 1 }, '-=0.5')
    .from('.txt3', { opacity: 0, y: 100, duration: 1 }, '-=0.75')
    .from('.mascote', { opacity: 0, x: 100, duration: 1 }, '-=0.5')
    .from('.btn-play', { opacity: 0, y: 100, duration: 1 }, '-=0.5');
};

const saidaText = () => {
  const tml = gsap.timeline();

  gsap.to('.txt1', { opacity: 0, x: -300, duration: 1 });
  gsap.to('.txt2', { opacity: 0, duration: 1 });
  gsap.to('.btn-play', { opacity: 0, y: 100, duration: 1 });
  tml
    .to('.txt3', { opacity: 0, x: 300, duration: 1, onComplete: () => {} })
    .to(
      '.mascote',
      {
        y: '-60%',
        scale: 0.8,
        duration: 1,
        onComplete: () => {
          fase1.value = false;
        },
      },
      '-=0.5'
    )
    .from('.txt4', { opacity: 0, y: 150, duration: 1 })
    .from('#sim', { opacity: 0, x: -100, duration: 0.5 }, '-=0.2')
    .from('#nao', { opacity: 0, x: 100, duration: 0.5 }, '-=0.5');
  // .from('.textos2', {opacity: 0, y: 100, duration: 1});
};
</script>

<template>
  <q-card class="slide">
    <q-card-section class="textos" v-if="fase1">
      <div class="txt1">
        <h1>BEM-</h1>
        <h1>VINDO</h1>
      </div>
      <span class="txt2">ao</span>
      <h1 class="txt3">ENKIE!</h1>
    </q-card-section>
    <q-card-section class="mascote">
      <q-img
        src="/src/assets/logo/pngtree-kawaii-axolotl-clipart-for-creative-projects-png-image_19991221.png"
      />
    </q-card-section>
    <q-card-actions v-if="fase1">
      <q-btn class="btn-play" label="Play" @click="saidaText" />
    </q-card-actions>
    <q-card-actions class="pergunta center" v-show="!fase1">
      <h1 class="txt4">Já jogou antes?</h1>
      <div class="btns center">
        <q-btn id="sim" label="Sim" to="/login" />
        <q-btn id="nao" label="Não" @click="proximoSlide" />
      </div>
    </q-card-actions>
  </q-card>
</template>

<style scoped>
* {
  overflow: hidden;
}

.slide {
  flex-direction: column;
  background: linear-gradient(160deg, #008dda 40%, #ac96f3 95%);
  height: 100%;
  width: 100%;
  max-width: 100dvw;
  max-height: 100dvh;
}

.mascote {
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  bottom: 15%;
  width: 90%;
}

h1 {
  font-family: 'Baloo 2';
  font-size: 20dvw;
  height: 20dvw;
  text-align: center;
}
.textos {
  flex-direction: column;
  height: 340px;
  text-align: center;
}
.txt1 {
  color: #b2edef;
  text-shadow: 5px 0 1px white;
}
.txt2 {
  font-size: 4dvw;
}
.txt3 {
  font-size: 24dvw;
  color: hsl(323, 100%, 81%);
  text-shadow: 5px 0 2px #ff66c4;
}

.btn-play {
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ff66c4;
  font-family: 'Baloo 2';
  font-size: 1.8rem;
  border-radius: 20px;
  box-shadow: 2px 3px 0 2px rgba(0, 0, 0, 0.185);
  color: white;
  width: 250px;
}

@keyframes pulse {
  to {
    transform: translateX(-50%) translateY(-3px);
    box-shadow: 0 3px 0 0 rgba(0, 0, 0, 0.151);
  }
}

.pergunta {
  position: absolute;
  justify-content: flex-start;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  height: 50%;
  bottom: 0;
}
.pergunta h1 {
  color: #ac96f3;
  text-shadow: 2px 2px 1px #ffffff;
  height: auto;
  width: 100%;
  font-size: 13dvw;
}

.btns {
  width: 100%;
  gap: 20px;
}
.pergunta .q-btn {
  background-color: black;
  font-family: 'Baloo 2';
  font-size: 5dvw;
  border-radius: 20px;
  width: 120px;
  height: 75px;
}
.q-btn#sim {
  background-color: #ffffff;
  color: #ac96f3;
}
.q-btn#nao {
  background-color: #ac96f3;
  color: rgb(255, 255, 255);
}
</style>
