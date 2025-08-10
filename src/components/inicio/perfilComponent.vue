<script setup lang="ts">
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
  <div id="perfil" @click="logar" class=".nLogado">
    <q-avatar size="70px" v-if="userStore.logado">
      <img :src="userStore.perfil" alt="" />
    </q-avatar>
    <perfil-icon v-else />
    <span id="nomeUser" v-if="userStore.logado">{{ userStore.nome }}</span>
    <span id="nomeUser" v-else>Entrar</span>
  </div>
</template>

<style scoped>
#nomeUser {
  margin-left: 10px;
  font-size: 16px;
}

.nLogado{
  cursor: pointer;
}
</style>
