<script setup lang="ts">
import usePopUpStore from 'src/stores/popUp';

const popUpStore = usePopUpStore();
</script>

<template>
  <q-dialog v-model="popUpStore.fullScreen.estado" persistent transition-show="scale" transition-hide="scale">
    <q-card class="bg-black text-white" style="width: 300px">

      <q-card-section class="center">
        <q-icon name="mobile_rotate"/>
        <div></div>
        <p>
          Para ter uma melhor experiência
          <br>
          Rode o celular
        </p>
      </q-card-section>

      <q-card-actions>
        <div class="flex items-center">
          <q-checkbox v-model="popUpStore.fullScreen.naoAparecerNovamente" />
          <span>Não aparcer novamente.</span>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>