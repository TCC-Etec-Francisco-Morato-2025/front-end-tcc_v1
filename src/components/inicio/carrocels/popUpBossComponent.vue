<script setup lang="ts">
import usePopUpStore from 'src/stores/popUp';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode } from 'swiper/modules';
import { ref } from 'vue';

const popUpStore = usePopUpStore();
const modules = ref([FreeMode]);
</script>

<template>
  <q-dialog v-model="popUpStore.eventoBoss" backdrop-filter="blur(5px) brightness(0.3)">
    <q-card>
      <q-card-section class="titulo_boss">
        <div class="text-h6">Boss Sazonal</div>
      </q-card-section>
      <q-card-section>
        <p>
          Ser fraco e despresivel, deseja mesmo me desafiar?
        </p>
      </q-card-section>
      <q-card-actions>
        <swiper v-model="modules" :slides-per-view="'auto'" :free-mode="true" :space-between="20" :free-mode-sticky="false">
          <swiper-slide v-for="test in 8" :key="test">
            <q-btn label="desafio" />
          </swiper-slide>
        </swiper>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.q-card{
  background: linear-gradient(to bottom, rgb(21, 6, 44) 10%, black 40%);
  box-shadow: none;
}

.titulo_boss {
  color: #ffffff;
  font-weight: bold;
  text-align: center;
  font-family: 'horror';
}

.swiper {
  background-color: black;
  width: auto;
  height: auto;
  padding: 10px 0;
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

.q-btn {
  background-color: rgb(59, 59, 202);
  width: 220px;
  height: 140px;
}
</style>
