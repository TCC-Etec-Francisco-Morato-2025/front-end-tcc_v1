<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useMenuStore from 'src/stores/menuStore';

const menuStore = useMenuStore();
const router = ref(useRouter());

const mudarRota = (path:string)=>{
  menuStore.toggleMenu();
  router.value.push(path)
  .catch(error => { // Adicione um .catch() aqui
      console.error('Erro ao navegar:', error);
      // Lidar com o erro, talvez mostrar uma mensagem para o usuário
    });
}

// import perfilComponent from '../perfilComponent.vue';
import sairIcon from 'src/components/icons/sairIcon.vue';

</script>

<template>
  <q-dialog v-model="menuStore.isOpen" position="right" :maximized="menuStore.isOpen">
    <q-card>
      <q-card-section class="topo">
        <q-btn flat round dense @click="menuStore.toggleMenu" class="sair">
          <sair-icon :tamanho="50" />
        </q-btn>
        <q-avatar size="100px">
          <img src="public/img/mapache-pedro.gif" alt="" />
        </q-avatar>
      </q-card-section>
      <div class="navMenu center">
        <q-btn name="materias" @click="mudarRota('/materias')">
          <div class="grid-button">
            <q-icon name="home" />
            <q-item-label class="label">Matérias</q-item-label>
          </div>
        </q-btn>

        <q-btn name="favorito" @click="mudarRota('/favorito')">
          <div class="grid-button">
            <q-icon name="home" />
            <q-item-label class="label">Favoritos</q-item-label>
          </div>
        </q-btn>

        <q-btn name="historico" @click="mudarRota('/historico')">
          <div class="grid-button">
            <q-icon name="home" />
            <q-item-label class="label">Histórico</q-item-label>
          </div>
        </q-btn>

        <q-btn name="config" @click="mudarRota('/config')">
          <div class="grid-button">
            <q-icon name="home" />
            <q-item-label class="label">Configuração</q-item-label>
          </div>
        </q-btn>
      </div>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
.q-card {
  padding: 10px 10px 0 10px;
  width: 100vw;
  height: 100vh;
  background-color: var(--color-background);
}

.q-btn.sair {
  position: absolute;
  right: 0;
  z-index: 1;
}

.topo {
  display: flex;
  justify-content: center;
  align-content: center;
}

.navMenu {
  margin-top: 50px;
  gap: 20px;
  flex-direction: column;
}

.navMenu .q-btn {
  border-bottom: 2px solid var(--cor-principal-1);
  width: 280px;
  height: 60px;
  border-radius: 0;
}

.navMenu .q-btn:hover {
  animation: btnHover 270ms ease-in forwards;
  border-radius: 10px;
  border: 0;
}

@keyframes btnHover {
  from {
    width: 280px;
    height: 60px;
  }
  to {
    background-color: var(--cor-principal-1);
    box-shadow: 0 6px 6px 1px var((--cor-principal-2), 100%);
    transform: translatey(-5px);
  }
}

.navMenu .grid-button {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  border-radius: 20px;
  width: 100%;
}

.navMenu .grid-button .q-item__label {
  padding-right: 15px;
}
</style>
