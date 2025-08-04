<script setup lang="ts">
import useMenuStore from 'src/stores/menuStore';

const stores = useMenuStore();

</script>

<template>
  <q-btn align="center" @click="stores.toggleMenu()" style="color: var(--cor-principal-1);" size="18px" flat dense icon="menu" />
</template>
