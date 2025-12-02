<script setup lang="ts">
import { onMounted } from 'vue';
// import { useRouter } from 'vue-router';
import { gsap } from 'gsap';
// import useUserStore from 'src/stores/userStore';

import perfilComponent from 'src/components/inicio/perfil/perfilComponent.vue';
import iconPerfilComponent from 'src/components/inicio/perfil/iconPerfilComponent.vue';
import btnMenuComponent from 'components/inicio/menu/btnMenuComponent.vue';
// import useMenuStore from 'src/stores/menuStore';
import menuComponent from 'components/inicio/menu/menuComponent.vue';
import carrocelComponent from 'src/components/inicio/carrocels/carrocelMateriaComponent.vue';
import carrocelEvento from 'src/components/inicio/carrocels/carrocelEventoComponent.vue';
import eventoComponent from 'src/components/inicio/eventos/eventoComponent.vue';
import carrocelContinuarComponent from 'src/components/inicio/carrocels/carrocelContinuarComponent.vue';

// importar imagens eventos
import novosAssuntos from 'assets/eventos/novosAssuntos.jpeg'
import novosEquipamentos from 'assets/eventos/novosEquipamentos.jpeg'

// const router = ref(useRouter());
// const userStore = useUserStore();

onMounted(()=>{
  // if(userStore.primeiraVez){
  //   void router.value.push('/tour/apresentacao')
  // }
  animacaoEntrada();
})

const animacaoEntrada = () => {
  const tml = gsap.timeline();

  tml.from('.titulo-secao', { x: -300 , duration: 0.8 , ease: 'bounce.out' });
};
</script>

<template>
  <q-layout>
    <perfil-component/>
    <menu-component />
    <q-header>
      <div class="perfil">
        <icon-perfil-component/>
      </div>
      <btnMenuComponent />
    </q-header>
    <main>
      <section class="secao-evento-carrocel q-mb-xl">
        <carrocel-evento />
      </section>
      <section class="secao-para-voce q-pb-xl">
        <q-btn
          class="titulo-secao"
          no-caps
          label="Matérias"
          dense
        />
        <carrocel-component />
      </section>

      <section>
        <q-btn
          class="titulo-secao"
          no-caps
          label="Continuar"
          dense
        />
        <carrocel-continuar-component/>
      </section>

      <section class="secao-eventos">
        <evento-component :src-evento="novosEquipamentos"/>
        <evento-component :src-evento="novosAssuntos"/>
      </section>
    </main>
  </q-layout>
</template>


<style scoped>
.q-layout {
  display: flex;
  flex-direction: column;

  background: linear-gradient(-30deg, var(--color-background-4) 10%, var(--color-background) 100%);
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
  color: var(--color-text-1);
  background: linear-gradient(80deg, transparent 20%, rgb(var(--cor-principal-1))85%, transparent 100%);
  background-size: 400% 100%;
  box-shadow: 0 5px 5px 0px rgb(0, 0, 0);
  animation: gradientShift 3s  ease infinite;
}
@keyframes gradientShift {
  from {
    background-position: 0% 0%; /* Começa com o gradiente totalmente à esquerda */
  }
  to {
    background-position: -134% 0%; /* Move o gradiente para a esquerda, revelando o "novo" da direita */
  }
}

.secao-eventos{
  display: flex;
  flex-direction: column;
  gap: 40px;
}
</style>
