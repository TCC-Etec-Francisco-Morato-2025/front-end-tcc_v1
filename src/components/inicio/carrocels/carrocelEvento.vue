<script setup lang="ts">
import usePopUpStore from 'src/stores/popUp';
import useMateriaStore from 'src/stores/materiaStore';
import { Swiper, SwiperSlide } from 'swiper/vue';
// import { useRouter } from 'vue-router';
import { ref } from 'vue';
import popUpBossComponent from './popUpBossComponent.vue';

const popUpStore = usePopUpStore();
const materiaStore = useMateriaStore();
const slides = ref<CarrocelItens[]>([]);
const quant = 3;
// const router = useRouter();

class CarrocelItens {
  name: string;
  cor: string;
  id: number;
  path: string;

  constructor(name: string, cor: string, id: number, path: string) {
    this.id = id;
    this.name = name;
    this.cor = cor;
    this.path = path;
  }
}

for (let i = 0; i < quant; i++) {
  const newMateria = new CarrocelItens(materiaStore.nome, materiaStore.cor, i, materiaStore.nome);
  slides.value.push(newMateria);
}

// const irParaMateria = (path: string) => {
//   router.push(`/materias/${path.toLocaleLowerCase()}`).catch((error) => {
//     // Adicione um .catch() aqui
//     console.error('Erro ao navegar:', error);
//     // Lidar com o erro, talvez mostrar uma mensagem para o usuário
//   });
// };
</script>

<template>
  <swiper :slides-per-view="'auto'" :centered-slides="true" :loop="true" class="carrocel">
    <swiper-slide class="slide" @click="popUpStore.toggleEventoBoss()">
      <div class="slide-pai center">
        <div class="efeito"></div>
        <q-img ref="img" src="/src/assets/eventos/boosSazonal.jpeg" alt="Imagem da matéria" />
        <div class="titulo">Boss Sazonal</div>
      </div>
    </swiper-slide>
  </swiper>
  <pop-up-boss-component/>
</template>

<style scoped>
.swiper {
  width: auto;
  height: 540px;
  padding: 30px 0;
}
.swiper-slide {
  width: 96dvw !important;
}
.slide-pai {
  position: relative;
  height: 100%;
}
.efeito {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: radial-gradient(circle, transparent, #000000 70%),
    linear-gradient(to top, transparent 60%, black 80%),
    linear-gradient(to bottom, transparent 50%, black 80%);
}
.titulo {
  position: absolute;
  font-family: 'horror';
  font-size: 3rem;
  bottom: 20px;
  color: white;
  z-index: 2;
}
.img-slide {
  /* position: absolute; */
}
</style>
