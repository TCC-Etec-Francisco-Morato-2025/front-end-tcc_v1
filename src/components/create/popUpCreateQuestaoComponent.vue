<script setup lang="ts">
import usePopUpStore from 'src/stores/popUp';

const popUpStore = usePopUpStore();
</script>

<template>
  <q-dialog v-model="popUpStore.createQuestaoPopUp" :maximized="popUpStore.createQuestaoPopUp">
    <div class="create-questao">
      test
    </div>
  </q-dialog>
</template>

<style scoped>
.create-questao{
  background-color: black;
}
</style>
