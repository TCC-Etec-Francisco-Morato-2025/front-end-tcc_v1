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
  <swiper :slides-per-view="'auto'" loop>
    <swiper-slide
    class="q-ml-md"
      v-for="slide in slides"
      :key="slide.id"
      :style="{ backgroundColor: slide.cor }"
      @click="irParaMateria(slide)"
    >
      <div class="nome-slide z-top">{{ slide.nome }}</div>

      <div class="content-img absolute-center">
          <q-img
            :src="slide.icon"
          />
        </div>
    </swiper-slide>
  </swiper>
</template>

<style scoped>
.swiper {
  width: 100%;
  height: 200px;
  padding: 30px 0;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;

  border-radius: 10px;
  cursor: pointer;
  transition: all 300ms ease-in-out;
}

.content-img{
  width: 120px;
}

/* .swiper-slide::before {
  content: "";
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.411);
  transition: all 400ms ease-in-out;
  border-radius: 10px;
} */

/* .swiper-slide-active {
  transform: translateY(-5px);
  box-shadow: 0 4px 5px 2px rgba(0, 0, 0, 0.418);
} */

/* .swiper-slide-active::before {
  background-color: rgba(0, 0, 0, 0);
} */

/* .swiper-slide-active .nome-slide {
  z-index: 1;
} */

.nome-slide {
  color: white;
  text-shadow: 5px 2px 2px rgb(0, 0, 0);
  font-size: 40px;
  font-family: 'Jua';
}
</style>
