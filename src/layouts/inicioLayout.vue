<script setup lang="ts">
import navBottomComponent from 'src/components/navBottomComponent.vue';
</script>
<template>
  <q-layout>
    <q-page-container>
      <router-view/>
    </q-page-container>
    <q-footer>
      <navBottomComponent />
    </q-footer>
  </q-layout>
</template>


<style scoped>
footer {
  background: var(--color-background-4) !important;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10;
}
</style>
