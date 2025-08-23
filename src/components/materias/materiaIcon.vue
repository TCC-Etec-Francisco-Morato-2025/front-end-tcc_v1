<!-- icone de todas as matérias que aparece na página matéria -->

<script setup lang="ts">
import { defineProps } from 'vue';
import useMateriaStore from 'stores/materiaStore';
import { useRouter } from 'vue-router';

const router = useRouter()
const store = useMateriaStore();

const ativarMaterias = ()=>{
  store.mudarMateria('matemática','img:/public/icons/icon-materia.png','rgb(0, 68, 136)','./public/icons/icon-materia.png');
  if(store.nome==undefined)return;
  router.push(`/materias/${props.nomeMateria.toLocaleLowerCase()}`)
  .catch(error => { // Adicione um .catch() aqui
      console.error('Erro ao navegar:', error);
      // Lidar com o erro, talvez mostrar uma mensagem para o usuário
    });
}

interface props{
  nomeMateria:string
}

const props = defineProps<props>();
</script>

<template>
  <li class="center">
    <q-btn size="40px" color="secondary" dense round push @click="ativarMaterias">
      <q-icon size="60px" name="img:/public/icons/icon-materia.png" />
    </q-btn>
    <span>{{ props.nomeMateria }}</span>
  </li>
</template>

<style scoped>
  li{
    flex-direction: column;
    gap: 15px;
  }
</style>
