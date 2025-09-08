<script setup lang="ts">
import useMateriaStore from 'src/stores/materiaStore';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const materiaStore = useMateriaStore();
const slides = ref<CarrocelItens[]>([]);
const quant = 3;
const router = useRouter();

class CarrocelItens {
  name: string;
  cor: string;
  id: number;
  path: string;

  constructor( name: string, cor: string, id: number, path: string) {
    this.id = id;
    this.name = name;
    this.cor = cor;
    this.path = path;
  }
}

for (let i = 0; i < quant; i++) {
  const newMateria = new CarrocelItens(
    materiaStore.nome,
    materiaStore.cor,
    i,
    materiaStore.nome
  );
  slides.value.push(newMateria);
}

const irParaMateria = (path: string) => {
  router.push(`/materias/${path.toLocaleLowerCase()}`).catch((error) => {
    // Adicione um .catch() aqui
    console.error('Erro ao navegar:', error);
    // Lidar com o erro, talvez mostrar uma mensagem para o usuário
  });
};
</script>

<template>
  <div style="position: relative">
    <swiper
      :slides-per-view="'auto'"
      :centered-slides="true"
      :loop="true"
      :space-between="20"
      class="carrocel"
    >
      <swiper-slide
        v-for="slide in slides"
        :key="slide.id"
        class="slide"
        :style="`background-color: ${slide.cor};`"
      >
        <div class="slide-pai" @click="irParaMateria(slide.path)">
          <!-- <q-img :src="slide.img" :radio="16 / 9" class="img-slide" /> -->
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
.carrocel {
  width: 100dvw;
  height: 540px;
  padding: 30px 0;
}
.slide {
  width: 355px;
}
.slide-pai {
  position: relative;
  width: 100%;
}
.img-slide {
  position: absolute;
}
</style>
