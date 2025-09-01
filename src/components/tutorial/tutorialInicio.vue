<script setup lang="ts">
import { ref } from 'vue';

const showTutorial = ref(false);
</script>

<template>
  <q-dialog v-model="showTutorial" :maximized="showTutorial" persistent>
    test
  </q-dialog>
</template>
