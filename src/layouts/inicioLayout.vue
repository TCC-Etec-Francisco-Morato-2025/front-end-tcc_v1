<script setup lang="ts">
import navBottomComponent from 'src/components/navBottomComponent.vue';
</script>
<template>
  <q-layout>
    <q-page-container>
      <router-view/>
    </q-page-container>
    <q-fab class="btn-create" icon="edit" direction="up" flat>
      <q-fab-action class="icon" icon="menu_book"/>
      <q-fab-action class="icon" icon="sym_o_swords" to="/create/item"/>
      <q-fab-action class="icon" icon="smart_display"/>
    </q-fab>
    <q-footer>
      <navBottomComponent />
    </q-footer>
  </q-layout>
</template>


<style scoped>
footer {
  background: transparent !important;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10;
}

.btn-create{
  position: fixed;
  background-color: var(--cor-principal-1);
  width: 60px;
  height: 60px;
  right: 20px;
  bottom: 70px;
  border-radius: 100%;
  z-index: 20;
}
.btn-create .icon{
  background-color: var(--cor-principal-1);
}
</style>
