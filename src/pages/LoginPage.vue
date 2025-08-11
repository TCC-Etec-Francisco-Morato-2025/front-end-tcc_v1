<script setup lang="ts">
import useLoginStore from 'src/stores/loginStore';
import entrarComponent from 'components/login/entrarComponent.vue';
import registrarComponent from 'src/components/login/registrarComponent.vue';

const loginStore = useLoginStore();
</script>

<template>
  <q-layout class="center">
    <q-card>
      <q-carousel
        v-model="loginStore.slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
      >
        <q-carousel-slide name="entrar">
          <entrar-component v-if="loginStore.slide == 'entrar'" />
        </q-carousel-slide>
        <q-carousel-slide name="registrar">
          <registrar-component v-if="loginStore.slide == 'registrar'" />
        </q-carousel-slide>
      </q-carousel>
    </q-card>
  </q-layout>
</template>

<style scoped>
.q-card {
  background-color: var(--color-background);
  width: 90%;
  max-width: 400px;
  padding: 10px 0;
  border: 10px;
  margin: 30px auto;
}

.q-carousel {
  background-color: transparent;
  width: 100%;
  height: 100%;
}
</style>
