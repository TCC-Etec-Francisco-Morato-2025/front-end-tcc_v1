<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import tutorialInicio from 'src/components/tutorial/tutorialInicio.vue';
import popUpApresentacao from 'src/components/apresentação/popUpApresentacao.vue';
import perfilComponent from 'components/inicio/perfilComponent.vue';
import btnMenuComponent from 'components/inicio/menu/btnMenuComponent.vue';
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
        <carrocel-evento />
      </section>
      <section class="secao-para-voce">
        <q-btn
          class="titulo-secao"
          @click="router.push('para-voce')"
          no-caps
          icon-right="chevron_right"
          label="Para você"
          dense
        />
        <carrocel-component :quant="5" />
      </section>

      <section class="secao-continuar">
        <q-btn
          class="titulo-secao"
          @click="router.push('continuar')"
          no-caps
          icon-right="chevron_right"
          label="Continuar"
          dense
        />
        <carrocel-component :quant="7" />
      </section>

      <section class="secao-eventos"></section>
    </q-main>
  </q-layout>
</template>


<style scoped>
.q-layout {
  display: flex;
  flex-direction: column;

  background: linear-gradient(-20deg, var(--color-background-4) 20%, var(--color-background) 100%);
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
  font-size: 20px;
  padding: 5px 20px;
  border-radius: 0 10px 10px 0;
  background: linear-gradient(80deg, var(--cor-principal-2) 10%, var(--cor-principal-3) 100%);
  color: var(--color-background);
}
</style>
