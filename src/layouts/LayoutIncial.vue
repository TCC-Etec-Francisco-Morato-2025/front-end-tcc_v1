<script setup lang="ts">
import navBottomComponent from 'src/components/navBottomComponent.vue';
</script>
<template>
  <q-layout>
    <q-page-container style=" margin-bottom: 60px;">
      <router-view/>
    </q-page-container>
    <nav>
      <navBottomComponent />
    </nav>
  </q-layout>
</template>


<style scoped>
nav {
  grid-area: nav;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: var(--cor-backgroud-1-dark);
  z-index: 2;
}
</style>
