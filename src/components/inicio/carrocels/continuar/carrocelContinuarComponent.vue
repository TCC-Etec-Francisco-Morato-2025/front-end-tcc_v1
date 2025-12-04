<script setup lang="ts">
import { computed } from 'vue';
// import { useRouter } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { Atividade } from 'src/types';
import useAtividadesStore from 'src/stores/materias/atividadesStore';
import cardContinuarCarrocelComponent from '../continuar/cardContinuarCarrocelComponent.vue';


const atividadesStore = useAtividadesStore();

// Lista de slides (direto da store)
const slides = computed<Atividade[]>(() => atividadesStore.ativContinuar);

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
  <div style="position: relative">
    <swiper :slides-per-view="'auto'" centered-slides loop :space-between="40">
      <swiper-slide
        v-for="slide in slides"
        :key="slide.id"
        class="shadow-2 q-pa-md"
      >
        <card-continuar-carrocel-component :atividade="slide"/>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
.swiper {
  height: 150px;
  padding: 30px 0;

  .swiper-slide {
    display: flex;
    align-items: center;
    width: 90dvw;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.01);
  }
}
</style>
