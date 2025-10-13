<script setup lang="ts">
import gsap from 'gsap';
import useLoginStore from 'src/stores/loginStore';
import entrarComponent from 'components/login/entrarComponent.vue';
import registrarComponent from 'src/components/login/registrarComponent.vue';
import { onMounted } from 'vue';

const loginStore = useLoginStore();

onMounted(async() => {
  animacao();
  await loginStore.login('ejaskolski@example.net','1234567');
});

const animacao = () => {
  const tl = gsap.timeline();

  tl.from('.q-card', { duration: 1, y: 100, rotationY: 720, opacity: 0, ease: 'power2.out' });
};

const animacaoTroca = () => {
  const tl = gsap.timeline();

  tl.from('.q-card', { duration: 0.5, rotationY: -180, opacity: 0 });

  if (loginStore.slide == 'registrar') {
    loginStore.slide = 'entrar';
  } else {
    loginStore.slide = 'registrar';
  }
};
</script>

<template>
  <q-layout class="center">
    <q-card>
      <q-carousel v-model="loginStore.slide">
        <q-carousel-slide name="entrar">
          <entrar-component v-if="loginStore.slide == 'entrar'" @registrar="animacaoTroca" />
        </q-carousel-slide>
        <q-carousel-slide name="registrar">
          <registrar-component v-if="loginStore.slide == 'registrar'" @entrar="animacaoTroca" />
        </q-carousel-slide>
      </q-carousel>
    </q-card>
  </q-layout>
</template>

<style scoped>
* {
  overflow: hidden;
}

.center {
  background-color: var(--cor-principal-3);
}

.q-card {
  background-color: var(--cor-principal-3);
  width: 90%;
  max-width: 400px;
  padding: 10px 0;
  border: 10px;
  margin: 30px auto;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.267);
}

.q-carousel {
  background-color: transparent;
  width: 100%;
  height: 100%;
}
</style>
