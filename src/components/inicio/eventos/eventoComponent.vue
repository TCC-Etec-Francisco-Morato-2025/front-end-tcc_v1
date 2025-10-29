<script setup lang="ts">
import novosEquipamentos from 'assets/eventos/novosEquipamentos.jpeg'
</script>

<template>
  <q-card align="center" flat>
    <div class="filtro"></div>
      <q-img :src="novosEquipamentos"/>
  </q-card>
</template>

<style scoped>

.q-img{
  width: 100%;
  height: 100%;
}

.filtro{
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.384);
  z-index: 1;
}
</style>
