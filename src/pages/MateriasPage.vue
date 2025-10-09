<script setup lang="ts">
import useMateriasStore from 'src/stores/materias/materiasStore';
import materiaIcon from 'components/materias/materiaIcon.vue';
import { onMounted } from 'vue';

const materiasStore = useMateriasStore();

onMounted(async()=>{
  await materiasStore.getMaterias();
})

</script>


<template>
  <q-page>
    <header class="center">
      <h1>Matérias</h1>
    </header>
    <q-list class="lista-materias">
      <materia-icon v-for="materia in materiasStore.materias" :nome="materia.nome" :key="materia.id" :icon="materia.icon" :id="materia.id" :path="materia.path" :cor="materia.cor" :textColor="materia.textColor"/>
    </q-list>
  </q-page>
</template>

<style scoped>
.q-page{
    background: linear-gradient(
    to bottom,
    var(--color-background)20%,
    var(--color-background-4)100%
  );
}

header {
  height: 120px;
  margin-bottom: 20px;
}
header h1 {
  font-size: 45px;
}

.lista-materias {
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  min-width: 100%;
  padding: 0 50px;
  gap: 15px;
}
</style>
