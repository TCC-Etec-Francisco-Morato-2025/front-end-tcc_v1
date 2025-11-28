<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';

import useMateriasStore from 'src/stores/materias/materiasStore';
import useMateriaStore from 'src/stores/materias/materiaStore';
import type { Materia } from 'src/types';

// Stores
const materiasStore = useMateriasStore();
const materiaStore = useMateriaStore();

// Lista de slides (direto da store)
const slides = computed<Materia[]>(() => materiasStore.materias);

const router = useRouter();

const irParaMateria = async (slide: Materia) => {
  materiaStore.mudarMateria(slide);

  try {
    await router.push(`/materias/${slide.path}`);
  } catch (error) {
    console.error('Erro ao navegar:', error);
  }
};
</script>

<template>
  <div style="position: relative">
    <swiper
      :slides-per-view="1.8"
      centered-slides
      loop
      :space-between="20"
      class="carrocel"
    >
      <swiper-slide
        v-for="slide in slides"
        :key="slide.id"
        :style="{ backgroundColor: slide.cor }"
        @click="irParaMateria(slide)"
      >
        <div class="nome-slide">{{ slide.nome }}</div>

        <div class="img-slide">
          <q-img
            :src="slide.icon"
            fit="contain"
            style="width: 90%; height: 90%"
          />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
.carrocel {
  height: 200px;
  padding: 30px 0;
}

.swiper-slide {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  transition: all 300ms ease-in-out;
}

.swiper-slide::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.411);
  transition: all 400ms ease-in-out;
  border-radius: 10px;
}

.swiper-slide-active {
  transform: translateY(-5px);
  box-shadow: 0 4px 5px 2px rgba(0, 0, 0, 0.418);
}

.swiper-slide-active::before {
  background-color: rgba(0, 0, 0, 0);
}

.swiper-slide-active .nome-slide {
  z-index: 1;
}

.img-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  border-radius: 10px;
  width: 230px;
  height: 140px;
  z-index: -1;
}

.nome-slide {
  color: white;
  text-shadow: 5px 2px 2px rgb(0, 0, 0);
  font-size: 40px;
  font-family: 'Jua';
}
</style>
