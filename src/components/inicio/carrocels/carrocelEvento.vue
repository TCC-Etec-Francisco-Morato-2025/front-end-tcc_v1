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

for (let i = 0; i < quant; i++) {
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
          <!-- <q-img :src="slide.img" :radio="16 / 9" class="img-slide" /> -->
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
.carrocel {
  width: 100dvw;
  height: 450px;
  padding: 30px 0;
}
.slide {
  width: 355px;
}
.slide-pai {
  position: relative;
  width: 100%;
  background-image: linear-gradient(
    to bottom,
    rgba(30, 30, 30, 1) 0%,
    /* Sombra preta sutil (10% opacidade) no topo */ rgba(30, 30, 30, 0.7) 30%,
    /* Transparente 10% abaixo do topo */ rgba(30, 30, 30, 0.5) 40%,
    rgba(30, 30, 30, 0.3) 50%,
    /* Continua transparente até 10% antes da base */ rgba(30, 30, 30, 0.1) 60%,
    rgba(30, 30, 30, 0.05) 70%,
    rgba(30, 30, 30, 0.03) 80%,
    /* Continua transparente até 10% antes da base */ rgba(30, 30, 30, 0) 100%
      /* Sombra preta sutil (10% opacidade) na base */
  );
}
.img-slide {
  position: absolute;
  background-image: linear-gradient(
    to bottom,
    rgba(30, 30, 30, 1) 0%,
    /* Sombra preta sutil (10% opacidade) no topo */ rgba(30, 30, 30, 0.7) 30%,
    /* Transparente 10% abaixo do topo */ rgba(30, 30, 30, 0.5) 40%,
    rgba(30, 30, 30, 0.3) 50%,
    /* Continua transparente até 10% antes da base */ rgba(30, 30, 30, 0.1) 60%,
    rgba(30, 30, 30, 0.05) 70%,
    rgba(30, 30, 30, 0.03) 80%,
    /* Continua transparente até 10% antes da base */ rgba(30, 30, 30, 0) 100%
      /* Sombra preta sutil (10% opacidade) na base */
  );
}
</style>
