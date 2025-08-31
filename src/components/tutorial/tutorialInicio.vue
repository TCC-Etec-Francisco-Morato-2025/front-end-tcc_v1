<script setup lang="ts">
import { ref } from 'vue';

const showTutorial = ref(true);
</script>

<template>
  <q-dialog v-model="showTutorial" :maximized="showTutorial" persistent>
    
  </q-dialog>
</template>
