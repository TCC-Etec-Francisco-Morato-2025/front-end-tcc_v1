<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import tutorialInicio from 'src/components/tutorial/tutorialInicio.vue';
import popUpApresentacao from 'src/components/apresentação/popUpApresentacao.vue';
import perfilComponent from 'components/inicio/perfilComponent.vue';
import btnMenuComponent from 'components/inicio/menu/btnMenuComponent.vue';
import setaDuplaIcon from 'src/components/icons/setaDuplaIcon.vue';
// import useMenuStore from 'src/stores/menuStore';
import menuComponent from 'components/inicio/menu/menuComponent.vue';
import carrocelComponent from 'src/components/inicio/carrocels/carrocelComponent.vue';
import carrocelEvento from 'src/components/inicio/carrocels/carrocelEvento.vue';

const router = ref(useRouter());
</script>

<template>
  <q-layout>
    <tutorial-inicio />
    <pop-up-apresentacao />
    <menu-component />
    <q-header>
      <div class="perfil">
        <perfilComponent />
      </div>
      <btnMenuComponent />
    </q-header>
    <q-main>
      <section class="secao-evento-carrocel">
        <carrocel-evento/>
      </section>
      <section class="secao-para-voce">
        <div class="titulo-secao" @click="router.push('para-voce')">Para você <seta-dupla-icon /></div>
        <carrocel-component :quant="5"/>
      </section>

      <section class="secao-continuar">
        <div class="titulo-secao" @click="router.push('continuar')">Continuar <seta-dupla-icon /></div>
        <carrocel-component :quant="7"/>
      </section>

      <section class="secao-eventos"></section>
    </q-main>
  </q-layout>
</template>


<style scoped>
.q-layout{
  display: flex;
  flex-direction: column;
  gap: 30px;
}

header {
  grid-area: header;
  display: flex;
  position: sticky;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: var(--color-background);
}

main {
  grid-area: main;
  display: contents;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 50px;
}

.secao-para-voce,
.secao-continuar {
  width: 100%;
}

.titulo-secao {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: fit-content;
  font-size: 20px;
  padding: 5px 20px;
  border-radius: 0 10px 10px 0;
  background-color: var(--color-background-3);
  color: var(--color-text-1);
}
</style>
