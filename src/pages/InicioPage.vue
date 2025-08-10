<script setup lang="ts">

import perfilComponent from 'components/inicio/perfilComponent.vue';
import btnMenuComponent from 'components/inicio/menu/btnMenuComponent.vue';
import setaDuplaIcon from 'src/components/icons/setaDuplaIcon.vue';
// import useMenuStore from 'src/stores/menuStore';
import menuComponent from 'components/inicio/menu/menuComponent.vue';
import carrocelComponent from 'src/components/inicio/carrocelComponent.vue';
</script>

<template id="inicioPage">
  <menu-component />
  <header>
    <div class="perfil">
      <perfilComponent />
    </div>
    <btnMenuComponent />
  </header>
  <main>

    <section class="secao-para-voce">
      <div class="titulo-secao">Para você <seta-dupla-icon /></div>
      <carrocel-component :quant="5"/>
    </section>

    <section class="secao-continuar">
      <div class="titulo-secao">Continuar <seta-dupla-icon /></div>
      <carrocel-component :quant="7"/>
    </section>

    <section class="secao-eventos"></section>
  </main>
</template>


<style scoped>
#inicioPage {
  display: grid;
  position: relative;
  grid-template-areas:
    'header'
    'main';
  grid-template-rows: 100px auto 50px;
  min-height: 100%;
}

header {
  grid-area: header;
  display: flex;
  position: sticky;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: var(--color-background);
}

main {
  grid-area: main;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  margin-top: 60px;
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
  font-size: 24px;
  padding: 5px 20px;
  border-radius: 0 10px 10px 0;
  background-color: var(--color-background-3);
  color: var(--color-text-1);
}
</style>
