<script setup lang="ts">
import useUserStore from 'src/stores/userStore';

const userStore = useUserStore();
</script>

<template>
  <div id="perfil">
    <q-avatar size="70px">
      <img :src="userStore.perfil" alt="">
    </q-avatar>
    <span id="nomeUser">{{ userStore.nome }}</span>
  </div>
</template>

<style scoped>
  #nomeUser{
    margin-left: 10px;
    font-size: 16px;
  }
</style>
