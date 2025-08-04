<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import perfilComponent from 'components/inicio/perfilComponent.vue';
import btnMenuComponent from 'components/inicio/menu/btnMenuComponent.vue';
import setaDuplaIcon from 'src/components/icons/setaDuplaIcon.vue';
// import useMenuStore from 'src/stores/menuStore';
import menuComponent from 'components/inicio/menu/menuComponent.vue';
import useMateriaStore from 'src/stores/materiaStore';
import 'swiper/css';
import { ref } from 'vue';

const materiaStore = useMateriaStore();
const slides = ref<CarrocelItens[]>([]);
const quant = 4;
const modules = [Navigation];

class CarrocelItens {
  icon: string;
  name: string;
  cor: string;
  id: number;

  constructor(icon: string, name: string, cor: string, id: number) {
    this.id = id;
    this.icon = icon;
    this.name = name;
    this.cor = cor;
  }
}

for (let i = 0; i < quant; i++) {
  const newMateria = new CarrocelItens(materiaStore.icon, materiaStore.nome, materiaStore.cor, i);
  slides.value.push(newMateria);
}
</script>

<template id="inicioPage">
  <menu-component />
  <header>
    <div class="perfil">
      <perfilComponent />
    </div>
    <btnMenuComponent />
  </header>
  <main>
    <section class="secao-para-voce">
      <div class="titulo-secao">Para você <seta-dupla-icon /></div>
      <div style="position: relative;">
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
            <div class="nome-slide" :style="`color: ${slide.cor};`">{{ slide.name }}</div>
            <q-img :src="slide.icon" :ratio="16 / 9" class="icon-slide" />
          </swiper-slide>
        </swiper>
      </div>
    </section>

    <section class="secao-continuar">
      <div class="titulo-secao">Continuar <seta-dupla-icon /></div>
      <swiper
        :slides-per-view="'auto'"
        :centered-slides="true"
        navigation
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
          <div class="nome-slide" :style="`color: ${slide.cor};`">{{ slide.name }}</div>
          <q-img :src="slide.icon" :ratio="16 / 9" class="icon-slide" />
        </swiper-slide>
      </swiper>
    </section>

    <section class="secao-eventos"></section>
  </main>
</template>


<style scoped>
#inicioPage {
  display: grid;
  position: relative;
  grid-template-areas:
    'header'
    'main';
  grid-template-rows: 100px auto 50px;
  min-height: 100%;
}

header {
  grid-area: header;
  display: flex;
  position: sticky;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: var(--color-background);
}

main {
  grid-area: main;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  margin-top: 60px;
  gap: 50px;
}

.secao-para-voce,
.secao-continuar {
  width: 100%;
}

.titulo-secao {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: fit-content;
  font-size: 24px;
  padding: 5px 20px;
  border-radius: 0 10px 10px 0;
  background-color: var(--color-background-3);
  color: var(--color-text-1);
}

/* carrocel */
.carrocel {
  width: 100%;
  height: 200px;
  padding: 30px 0;
}
.slide {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 220px; /* largura fixa para mostrar parciais */
  border-radius: 10px;
}

.slide .icon-slide {
  position: absolute;
}

.slide .nome-slide {
  text-shadow: 2px 2px 10px rgb(0, 0, 0);
  font-size: 40px;
  font-family: 'Jua';
}
</style>
