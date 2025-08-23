<script setup lang="ts">
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import useMateriaStore from 'src/stores/materiaStore';
import { useRouter } from 'vue-router';
import 'swiper/css';

import { ref } from 'vue';

interface propCarrocel {
  quant: number;
}

const props = defineProps<propCarrocel>();

const materiaStore = useMateriaStore();
const slides = ref<CarrocelItens[]>([]);
const modules = [Navigation];
const router = useRouter();

class CarrocelItens {
  img: string;
  name: string;
  cor: string;
  id: number;
  path: string;

  constructor(img: string, name: string, cor: string, id: number, path: string) {
    this.id = id;
    this.img = img;
    this.name = name;
    this.cor = cor;
    this.path = path;
  }
}

for (let i = 0; i < props.quant; i++) {
  const newMateria = new CarrocelItens(
    materiaStore.img,
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
      :modules="modules"
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
          <div class="nome-slide" :style="`color: ${slide.cor};`">{{ slide.name }}</div>
          <q-img :src="slide.img" :radio="16/9" class="img-slide"/>
        </div>
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
.slide {
  width: 220px; /* largura fixa para mostrar parciais */
  border-radius: 10px;
  cursor: pointer;
}

.slide .slide-pai {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.img-slide {
  display: contents;
  position: absolute;
}

.slide-pai .nome-slide {
  text-shadow: 5px 2px 10px rgb(61, 45, 45);
  font-size: 40px;
  font-family: 'Jua';
  z-index: 1;
}
</style>
