<script setup lang="ts">
import { usePopUpStore } from 'src/stores/popUp';

const popUpStore = usePopUpStore();

</script>

<template>
  <q-dialog v-model="popUpStore.fimJogo" persistent>
    <q-card class="bg-white text-black">
      <q-card-section class="row items-center q-pa-md">
        <div class="text-h6">Parabéns! Você completou o jogo!</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Fechar" color="primary" v-close-popup @click="popUpStore.toggleFimJogo()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
