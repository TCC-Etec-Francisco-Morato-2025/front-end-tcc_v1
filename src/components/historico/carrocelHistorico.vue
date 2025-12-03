<script setup lang="ts">
import { computed } from 'vue';
// import { useRouter } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import type { Atividade } from 'src/types';

import useAtividadesStore from 'src/stores/materias/atividadesStore';
import cardCarrocelHistorico from './cardCarrocelHistorico.vue';
import type { PaginationOptions } from 'swiper/types';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const modules = [Pagination];

const paginationOptions: PaginationOptions = {
  el: '.custom-pagination',
  clickable: true,
  type: 'bullets',
};

const atividadesStore = useAtividadesStore();

// Lista de slides (direto da store)
const slides = computed<Atividade[]>(() => atividadesStore.atividades);

// const router = useRouter();

// const irParaMateria = async (slide: Materia) => {
//   materiaStore.mudarMateria(slide);

//   try {
//     await router.push(`/materias/${slide.path}`);
//   } catch (error) {
//     console.error('Erro ao navegar:', error);
//   }
// };
</script>

<template>
  <swiper :modules="modules" :pagination="paginationOptions" :slides-per-view="'auto'" centered-slides loop :space-between="40">
    <swiper-slide v-for="slide in slides" :key="slide.id" class="shadow-2">
      <card-carrocel-historico :atividade="slide" />
    </swiper-slide>
  </swiper>
  <div class="custom-pagination row content-center justify-center"></div>
</template>

<style lang="scss" scoped>
.swiper {
  position: relative;
  padding: 30px 0;

  .swiper-slide {
    display: flex;
    align-items: center;
    width: 90dvw;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.01);
  }
}
:deep(.swiper-pagination-bullet) {
  transition: width 100ms ease-out;
  background: #bbb;
  opacity: 0.7;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: rgb(var(--cor-principal-2)) !important;
  opacity: 1;
  width: 30px;
  border-radius: 30px;
}
</style>
