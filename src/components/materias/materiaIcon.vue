<!-- icone de todas as matérias que aparece na página matéria -->

<script setup lang="ts">
import type { Materia } from 'src/types';
import { defineProps , defineAsyncComponent, onMounted } from 'vue';
import useMateriaStore from 'src/stores/materias/materiaStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const materiaStore = useMateriaStore();

const props = defineProps<Materia>();

const icon_materia = defineAsyncComponent(()=>import(`../icons-materias/${props.icon}.vue`));

const ativarMaterias = () => {
  materiaStore.mudarMateria(
    props
  );
  if (materiaStore.nome == undefined) return;
  router.push(`/materias/${props.path}`).catch((error) => {
    // Adicione um .catch() aqui
    console.error('Erro ao navegar:', error);
    // Lidar com o erro, talvez mostrar uma mensagem para o usuário
  });
};
</script>

<template>
  <q-item class="center">
    <q-btn :style="`background-color: ${props.cor};`" size="40px" dense round push @click="ativarMaterias">
      <div>
        <component :is="icon_materia"></component>
      </div>
    </q-btn>
    <span>{{ props.nome }}</span>
  </q-item>
</template>

<style scoped>
.q-btn div{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
}

.q-item {
  flex-direction: column;
  gap: 15px;
}
</style>
