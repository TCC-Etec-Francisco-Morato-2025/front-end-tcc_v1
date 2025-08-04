<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';

// Inicialize tabAtual com 'inicio' como valor padrão.
const tabAtual = ref('inicio');
const router = useRouter();
// Use o 'watch' para sincronizar tabAtual com o nome da rota.
// A verificação `if (rota)` garante que o nome da rota seja válido.
watchEffect(() => {
  const routeName = useRoute().name;
  if (routeName) {
    tabAtual.value = routeName.toString();
  }
});

const navigateToTab = (tabName: string, path: string) => {
  tabAtual.value = tabName;
  router.push(path).catch(error => {
    console.error('Erro ao navegar:', error);
  });
};
</script>

<template>
  <q-tabs
    v-model="tabAtual"
    narrow-indicator
    dense
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

<style lang="scss" scoped>

.q-tab--active .q-icon {
  animation: subir 0.3s ease-in-out forwards;
  color: var(--cor-principal-1);
}

.q-tabs {
  height: 50px;
  margin-bottom: 4px;
  color: var(--color-text-2);
}

@keyframes subir {
  to {
    transform: translateY(-5px);
  }
}
</style>
