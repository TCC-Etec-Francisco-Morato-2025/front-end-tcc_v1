<script setup lang="ts">
import useAulasStore from 'src/stores/materias/aulasStore';
import useMateriasStore from 'src/stores/materias/materiasStore';
import type { Atividade, Aula, Materia } from 'src/types';
import { computed, ref } from 'vue';

const props = defineProps<{
  atividade: Atividade;
}>();

const aula = computed<Aula | undefined>(() => {
  return useAulasStore().aulas.find((a) => a.id == props.atividade.id_aula);
});

const materia = computed<Materia | undefined>(() => {
  return useMateriasStore().materias.find((m) => m.id == aula.value?.id_materia);
});

const estrelas = ref(3);
</script>

<template>
  <div class="content-card q-pa-md q-gutter-md">
    <section class="row items-center">
      <div class="content-img center" :style="`background-color:${materia?.cor}`">
        <q-badge color="green" rounded floating>
          <q-icon name="sym_o_check_circle" size="18px" />
        </q-badge>
        <q-img :src="materia?.icon" />
      </div>
      <div class="content-info q-pl-md">
        <div class="text-caption q-mt-xs" :style="`color:${materia?.cor}`">
          {{ materia?.nome }} - {{ aula?.titulo }}
        </div>

        <div class="text-h5 ellipsis" style="width: 250px">{{ atividade.titulo }}</div>
      </div>
    </section>

    <q-separator />

    <section>
      <q-rating
        v-model="estrelas"
        :max="3"
        class="estrela"
        size="25px"
        color="grey"
        icon="img:/public/icons/icons-pixel/star.svg"
        icon-selected="img:/public/icons/icons-pixel/star-solid.svg"
        disable
      />
      <div class="row q-gutter-md q-pt-md">
        <div><q-badge color="green" /> 14 acertos</div>
        <div><q-badge color="red" /> 4 erros</div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.content-img {
  position: relative;
  border-radius: 5px;
  width: 65px;
  height: 65px;

  .q-img {
    width: 45px;
  }
}

.content-info {
  flex-grow: 1;
  position: relative;
  height: 100%;
}
</style>
