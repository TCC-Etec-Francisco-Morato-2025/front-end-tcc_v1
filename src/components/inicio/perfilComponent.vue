<script setup lang="ts">
import { ref } from 'vue';

  const imgPerfil = ref('./public/img/mapache-pedro.gif')
</script>

<template>
  <div id="perfil">
    <q-avatar size="70px">
      <img :src="imgPerfil" alt="">
    </q-avatar>
    <span id="nomeUser">Fulano de tall</span>
  </div>
</template>

<style scoped>
  #nomeUser{
    margin-left: 10px;
    font-size: 16px;
  }
</style>
