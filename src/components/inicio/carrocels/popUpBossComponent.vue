<script setup lang="ts">
import usePopUpStore from 'src/stores/popUp';
import { Swiper, SwiperSlide } from 'swiper/vue';

const popUpStore = usePopUpStore();
</script>

<template>
  <q-dialog v-model="popUpStore.eventoBoss">
    <q-card>
      <q-card-section class="titulo_boss">
        <div class="text-h6">Boss Sazonal</div>
      </q-card-section>
      <q-card-actions>
        <swiper :slides-per-view="'auto'" :centered-slides="true" :loop="true" class="carrocel">
          <swiper-slide v-for="test in 5" :key="test">
            <q-btn label="desafio" />
          </swiper-slide>
        </swiper>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.titulo_boss {
  background-color: #f5f5f5;
  color: #333;
  font-weight: bold;
  text-align: center;
}

.carrocel {
  width: auto;
  height: 300px;
  padding: 30px 0;
}

.q-btn {
  width: 60px;
}
</style>
