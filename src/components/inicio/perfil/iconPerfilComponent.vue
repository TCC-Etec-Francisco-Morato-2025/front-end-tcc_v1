<script setup lang="ts">
import usePopUpStore from 'src/stores/popUp';
import useUserStore from 'src/stores/userStore';
import { useRouter } from 'vue-router';

const popUpStore = usePopUpStore();
const userStore = useUserStore();
const router = useRouter();

const logar = () => {
  if (userStore.logado) {
    popUpStore.togglePerfil();
  } else {
    router.push('/login').catch((error) => {
      console.error('Erro ao navegar:', error);
    });
  }
};

console.info(userStore.foto)
</script>

<template>
  <q-btn align="left" no-caps flat id="perfil" @click="logar" class="nLogado">
    <q-avatar size="60px">
      <q-img :src="userStore.foto??'/public/img/perfil.png'" alt="" v-if="userStore.logado" />
      <q-img src="/public/img/perfil.png" v-else/>
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

.nLogado {
  box-shadow: none;
  width: 250px;
}
</style>
