<script setup lang="ts">
import useAulasStore from 'src/stores/materias/aulasStore';
import useMateriasStore from 'src/stores/materias/materiasStore';
import type { Atividade, Aula, Materia } from 'src/types';
import { computed } from 'vue';

const props = defineProps<{
  atividade: Atividade;
}>();

const aula = computed<Aula|undefined>(()=>{
  return useAulasStore().aulas.find(a=>a.id==props.atividade.id_aula);
})

const materia = computed<Materia|undefined>(()=>{
  return useMateriasStore().materias.find(m=>m.id==aula.value?.id_materia);
})
</script>

<template>
  <div class="content-img center" :style="`background-color:${materia?.cor}`">
    <q-img :src="materia?.icon"/>
  </div>
  <div class="content-info q-pl-md">
    <div class="text-caption q-mt-xs" :style="`color:${materia?.cor}`">{{ materia?.nome }} - {{ aula?.titulo }}</div>

    <div class="text-h5 ellipsis" style="width: 250px">{{ atividade.titulo }}</div>
  </div>
</template>

<style lang="scss" scoped>
.content-img {
  border-radius: 5px;
  width: 50px;
  height: 50px;

  .q-img {
    width: 40px;
  }
}

.content-info {
  flex-grow: 1;
  position: relative;
  height: 100%;
}
</style>
