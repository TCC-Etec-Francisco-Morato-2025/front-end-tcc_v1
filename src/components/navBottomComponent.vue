<script setup lang="ts">
import { ref, watchEffect , onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { gsap } from 'gsap';

// Inicialize tabAtual com 'inicio' como valor padrão.
const tabAtual = ref('inicio');
const router = useRouter();
const route = useRoute();
// Use o 'watch' para sincronizar tabAtual com o nome da rota.
// A verificação `if (rota)` garante que o nome da rota seja válido.
watchEffect(() => {
  const routeName = ref(route.name);
  console.log(routeName.value)
  if (routeName.value) {
    tabAtual.value = routeName.value.toString();
    if(routeName.value=='materia-conteudo')
      tabAtual.value='materias';
  }
});

const navigateToTab = (tabName: string, path: string) => {
  tabAtual.value = tabName;
  router.push(path).catch(error => {
    console.error('Erro ao navegar:', error);
  });
};

onMounted(()=>{
  animacaoEntrada();
})

const animacaoEntrada = () => {
  const tml = gsap.timeline();

  tml.from('.q-tabs', { y: 200 , duration: 1 });
};
</script>

<template>
  <q-tabs
    v-model="tabAtual"
    narrow-indicator
    align="justify"
  >
    <q-tab name="inicio" @click="navigateToTab('inicio', '/')">
      <q-icon size="30px" name="home" />
    </q-tab>

    <q-tab name="materias" @click="navigateToTab('materias', '/materias')">
      <q-icon size="25px" name="menu_book" />
    </q-tab>

    <q-tab name="config" @click="navigateToTab('config', '/config')">
      <q-icon size="25px" name="settings" />
    </q-tab>
  </q-tabs>
</template>

<style scoped>
.q-tab--active{
    color: var(--cor-principal-1);
}
.q-tab--active .q-icon {
  animation: subir 0.3s ease-in-out forwards;
}

.q-tabs {
  color: var(--color-text-1);
  background-color: var(--color-background-4);

}

@keyframes subir {
  to {
    transform: translateY(-5px);
  }
}
</style>
