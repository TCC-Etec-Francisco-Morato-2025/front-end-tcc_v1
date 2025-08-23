<script setup lang="ts">
  import setaIcon from 'src/components/icons/setaIcon.vue';
</script>

<template>
  <q-page>
    <main>
      <q-img src="/src/assets/personagens/K.png" />
      <q-card class="caixa-fala center">
        <q-card-section> Blá, blá, blá... </q-card-section>
      </q-card>
      <q-btn>
        next
        <seta-icon :direcao="-90"/>
      </q-btn>
    </main>
  </q-page>
</template>

<style scoped>
main {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.226), transparent 80%);
  background-color: rgb(30, 26, 107);
  height: 100dvh;
}

.q-img {
  width: 350px;
  height: 350px;
}

.caixa-fala {
  min-height: 200px;
  width: 90dvw;
  max-width: 400px;
  font-size: 2rem;
  color: black;
  background-color: white;
  border-radius: 20px;
}

.q-btn{
  width: fit-content;
  height: 40px !important;
}
</style>
