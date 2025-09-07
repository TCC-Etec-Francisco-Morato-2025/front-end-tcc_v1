<script setup lang="ts">
import { gsap } from 'gsap';
import { onMounted } from 'vue';
import useUserStore from 'src/stores/userStore';

const userStore = useUserStore();

const emit = defineEmits<{
  (e: 'proximo', mensagem: string): void;
}>();

const proximo = () =>{
  animacaoSaida();
}

onMounted(() => {
  animacaoEntrada();
  userStore.jaAcessou();
});

// animações

const animacaoEntrada = () => {
  const tml = gsap.timeline();

  tml.from('p', { opacity: 0, y: -100, duration: 1})
  .from('.q-img', { opacity: 0, y: 100, duration: 1}, "-=0.5")
  .from('.q-btn', { opacity: 0, x: '-100%', duration: 0.5}, "-=0.25");
};

const animacaoSaida = () => {
  const tml = gsap.timeline();

  tml.to('p', { opacity: 0, y: -100, duration: 1})
  .to('.q-img', { opacity: 0, y: 100 , duration: 1}, "-=0.5")
  .to('.q-btn', { opacity: 0, x: 100 , duration: 1, onComplete: ()=>{
    emit('proximo', 'tutorial');
  }}, "-=0.5")
};
</script>

<template>
  <q-card class="slide">
    <q-card-actions align="right">
      <q-btn flat no-caps icon-right="skip_next" dense>
        <q-item-label>Pular tutorial</q-item-label>
      </q-btn>
    </q-card-actions>
    <q-card-section>
      <p>
        Aqui você aprende diversas coisas ao mesmo tempo que se diverte!!!
      </p>
    </q-card-section>
    <q-card-section>
      <q-img src="/src/assets/logo/10757403.png" />
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat no-caps icon-right="chevron_right" to="/" @click="proximo">
        <q-item-label>Próximo</q-item-label>
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<style scoped>
*{
  overflow: hidden;
}

p{
  font-family: 'Baloo 2';
  font-size: 2rem;
}

.q-img{
  width: 330px;
}

.slide {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  text-align: center;
  background: linear-gradient(160deg, #ac96f3 40%, #e384ff 100%);
  height: 100%;
  width: 100%;
  max-width: 100dvw;
  max-height: 100dvh;
}

.q-btn{
  padding-left: 20px;
  font-family: 'Baloo 2';
  font-size: 1rem;
}
</style>
