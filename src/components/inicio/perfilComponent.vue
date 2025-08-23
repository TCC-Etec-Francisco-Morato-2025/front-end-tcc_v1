<script setup lang="ts">
import perfilIcon from '../icons/perfilIcon.vue';
import useUserStore from 'src/stores/userStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const logar = () => {
  if (!userStore.logado) {
    router.push('/login').catch((error) => {
      console.error('Erro ao navegar:', error);
    });
  }
};
</script>

<template>
  <q-btn align="left" no-caps flat id="perfil" @click="logar" class="nLogado">
    <q-avatar size="60px">
      <img :src="userStore.perfil" alt="" v-if="userStore.logado" />
      <perfil-icon v-else />
    </q-avatar>
    <span id="nomeUser" v-if="userStore.logado">{{ userStore.nome }}</span>
    <span id="nomeUser" v-else>Entrar</span>
  </q-btn>
</template>

<style scoped>
#nomeUser {
  margin-left: 10px;
  font-size: 16px;
  color: var(--color-text-1);
}

.nLogado{
  box-shadow: none;
  width: 250px;
}
</style>
