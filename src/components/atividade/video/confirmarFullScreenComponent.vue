<script setup lang="ts">
import { gsap } from 'gsap';
import { onMounted } from 'vue';

onMounted(() => {
  animacao()
})

const animacao = () => {
  const tml = gsap.timeline();

  tml
  .from('#linha', { rotate: 90, duration: 1 })
}
</script>

<template>
  <q-card class="bg-black text-white" style="width: 300px" flat>

    <q-card-section class="animacao center">
      <q-icon name="screen_rotation" size="80px" />
      <div id="linha"></div>
      <p>
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.animacao {
  position: relative;
}

.animacao #linha {
  background-color: white;
  height: 270px;
  width: 10px;
}

.animacao .q-icon {
  position: absolute;
}

.animacao p {
  position: absolute;
  font-family: 'Baloo 2';
  width: 150px;
}
</style>
