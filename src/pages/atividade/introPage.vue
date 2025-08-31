<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Typed from 'typed.js';

// Cria uma referência para o elemento HTML
const typedElement = ref<HTMLSpanElement | null>(null);
let typedInstance: Typed | null = null;

// Executa quando o componente é montado
onMounted(() => {
  if (typedElement.value) {
    typedInstance = new Typed(typedElement.value, {
      strings: ['Blá, blá, blá...'],
      typeSpeed: 100,
      loop: false,
      showCursor: false,
    });
  }
});

onUnmounted(() => {
  if (typedInstance) {
    typedInstance.destroy();
  }
});
</script>

<template>
  <q-page>
    <main>
      <q-img src="/src/assets/personagens/K.png" />
      <q-card class="caixa-fala center">
        <q-card-section>
          <span ref="typedElement"></span>
        </q-card-section>
      </q-card>
      <q-btn class="next" push>
        next
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
  font-family: 'Pixelify Sans';
  font-size: 2rem;
  color: black;
  background-color: white;
  border-radius: 20px;
  box-shadow: 2px 4px 6px 5px rgba(30, 26, 107, 0.815), 2px 4px 6px 5px rgba(0, 0, 0, 0.692);
}

.q-btn.next {
  align-self: flex-end;
  right: 0;
  background-color: rgba(73, 64, 250, 0.815);
  margin: 20px;
  width: fit-content;
  padding: 0 50px !important;
  height: 40px !important;
}
</style>
