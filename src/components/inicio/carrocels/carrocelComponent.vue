<script setup lang="ts">
import type { Materia } from 'src/types';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useRouter } from 'vue-router';
import 'swiper/css';
import useMateriasStore from 'src/stores/materias/materiasStore';
import useMateriaStore from 'src/stores/materiaStore';

import { ref, defineAsyncComponent } from 'vue';

const slides = ref<Materia[]>([]);
const modules = [Navigation];
const router = useRouter();
const materiasStore = useMateriasStore();
const materiaStore = useMateriaStore();

materiasStore.materias.map((el) => {
  slides.value.push(el);
});

const irParaMateria = (slide:Materia) => {

  materiaStore.mudarMateria(slide.nome, slide.icon, slide.cor, slide.textColor, slide.id, slide.path)

  router.push(`/materias/${slide.path}`).catch((error) => {
    // Adicione um .catch() aqui
    console.error('Erro ao navegar:', error);
    // Lidar com o erro, talvez mostrar uma mensagem para o usuário
  });
};

const iconMateria = (icon: string) => {
  return defineAsyncComponent(() => import(`../../icons-materias/${icon}.vue`));
};
</script>

<template>
  <div style="position: relative">
    <swiper
      :slides-per-view="'auto'"
      :centered-slides="true"
      :modules="modules"
      :loop="true"
      :space-between="20"
      class="carrocel"
    >
      <swiper-slide
        v-for="slide in slides"
        :key="slide.id"
        :style="`background-color: ${slide.cor};`"
        @click="irParaMateria(slide)"
      >
        <div class="nome-slide">{{ slide.nome }}</div>
        <div class="img-slide">
          <component :is="iconMateria(slide.icon)" />
        </div>
        <!-- <q-img :src="slide.img" :radio="16/9" class="img-slide"/> -->
        <!-- <q-icon nome="science" size="100px"/> -->
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
/* carrocel */
.carrocel {
  width: 100%;
  height: 200px;
  padding: 30px 0;
}

.swiper-slide {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 230px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 500ms ease-in-out;
}

.swiper-slide::before{
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.699);
  transition: all 400ms ease-in-out;
  border-radius: 10px;
}

.swiper-slide-active {
  width: 230px;
  transform: translateY(-5px);
  box-shadow: 0px 5px 10px 3px rgba(0, 0, 0, 0.747);
}
.swiper-slide-active::before{
  background-color: rgba(0, 0, 0, 0.253);
}
.swiper-slide-active .nome-slide{
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
