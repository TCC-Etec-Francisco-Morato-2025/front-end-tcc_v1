<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import useMateriaStore from 'src/stores/materiaStore';
import useAtividadeStore from 'src/stores/materias/atividades/atividadeStore';
import usePopUpStore from 'src/stores/popUp';

const $q = useQuasar();
const router = useRouter();
const materiaStore = useMateriaStore();
const popUpStore = usePopUpStore();
const atividadeStore = useAtividadeStore();

const proxima = () => {
  void $q.fullscreen.exit();
  router.push(`/materias/${materiaStore.path}`).catch((error) => {
    console.error('Erro ao navegar:', error);
  });
};
</script>

<template>
  <q-dialog v-model="popUpStore.fimJogo" persistent backdrop-filter="blur(20px) brightness(0)">
    <!-- <q-card class="top-card">
      <span> LOGARITIMO </span>
    </q-card> -->
    <q-card class="corpo-card">
      <q-card-section class="center">
        <q-item-label class="titulo">
          {{ atividadeStore.titulo }}
        </q-item-label>
        <q-btn class="btn-sair" icon="close" @click="popUpStore.toggleAtividade()" push />
      </q-card-section>
      <q-card-section class="center estrelas">
        <q-rating
          v-model="atividadeStore.estrelas"
          :max="3"
          class="estrela"
          size="70px"
          color="grey"
          icon="img:src/assets/icons-pixel/star.svg"
          icon-selected="img:src/assets/icons-pixel/star-solid.svg"
          disable
        />
      </q-card-section>
      <q-card-section class="descricao"> </q-card-section>
      <q-card-section align="right">
        <q-btn
          class="btn-novamente"
          @click="proxima"
          flat
          label="Novamente"
          v-if="atividadeStore.estrelas !== 3"
        />
        <q-btn
          class="btn-proxima"
          @click="proxima"
          flat
          label="proxima"
          icon-right="keyboard_double_arrow_right"
          v-if="atividadeStore.estrelas > 0"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.q-item__label.titulo {
  font-family: 'Pixelify Sans';
  text-align: center;
  width: 230px;
}

.btn-sair {
  top: 12px;
  right: 12px;
  position: absolute;
  background-color: red;
  width: 35px;
  height: 35px;
  padding: 0;
  border-radius: 100%;
}

.corpo-card {
  display: grid;
  grid-template-areas:
    'topo'
    'estrelas';
  /* grid-template-rows: 1fr 5fr auto; */
  width: 300px;
  background-color: var(--fundo-card);
  color: var(--color-text-1);
  border-radius: 20px;
}

.top-card {
  grid: topo;
  background-color: blue;
  padding: 30px;
  width: fit-content;
  z-index: 1;
}

.estrelas {
  grid: estrela;
  cursor: none;
}
.disabled,
.disabled *,
[disabled],
[disabled] * {
  opacity: 1 !important ;
  cursor: pointer !important;
}

.descricao {
  text-align: center;
  font-family: 'Handjet';
  font-size: 16px;
}

.itens {
  display: flex;
  justify-content: center;
  gap: 15px;
}
.itens-select {
  color: #d77f17;
  background-color: #ffda92 !important;
  border: 3px solid #d77f17;
  border-radius: 100%;
  box-shadow: 0 4px 5px 0px rgba(0, 0, 0, 0.466);
}
.itens-select .item {
  width: 50px;
  height: 50px;
}

.btn-proxima {
  font-family: 'Pixelify Sans';
  text-shadow: 1px 1px 2px rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  background-color: #f1bf18;
}
.btn-novamente{
  font-family: 'Pixelify Sans';
  color: rgb(0, 0, 0);
  border: 2px solid #f7c92e;
  background-color: #fff0b1 ;
}
</style>
