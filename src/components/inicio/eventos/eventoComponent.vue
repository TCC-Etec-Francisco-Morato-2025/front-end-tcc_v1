<script setup lang="ts">
interface Prop{
  srcEvento:string
}

const props = defineProps<Prop>();
</script>

<template>
  <q-card align="center" flat>
    <div class="filtro"></div>
      <q-img :src="props.srcEvento"/>
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
