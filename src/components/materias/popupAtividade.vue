<script setup lang="ts">
import type { Item } from 'src/types';
import { ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
// import useUserStore from 'src/stores/userStore';
import useItensStore from 'src/stores/itens/itensStore';
import useAtividadeStore from 'src/stores/materias/atividades/atividadeStore';
import usePopUpStore from 'src/stores/popUp';
import useAtacItemStore from 'src/stores/itens/atacStore';
import useDefeItemStore from 'src/stores/itens/defeStore';
import useEspecItemStore from 'src/stores/itens/especStore';

interface Itens {
  atac: Item[];
  def: Item[];
  espec: Item[];
}

// interface ItemUser {
//   id: number;
//   tipo: number;
// }

// configurações dá aplicação
const $q = useQuasar();
const router = useRouter();
const itensPadão: Item = {
  id:'0', icon:'add', func:'', nome:'', img:'',recarregando:false
}

// pinia para todos os itens no geral
const popUpStore = usePopUpStore();
const itensStore = useItensStore();

// usuário
// const userStore = useUserStore();

// pinia para as escolhas do usuário
const atividadeStore = useAtividadeStore();
const atacItemStore = useAtacItemStore();
const defeItemStore = useDefeItemStore();
const especItemStore = useEspecItemStore();

// variaveis para funcionalidade da página
const itensUser = ref<Itens>({
  atac: [],
  def: [],
  espec: [],
});

watch(() => popUpStore.atividade, async () => {
  if (popUpStore.atividade) {
    await atividadeStore.salvarAtividade();
  }
})

// função para selecionar quais são os itens do usuário e quais não são

// ataque
itensStore.atac.forEach((el: Item) => {

  if (el.tipo == 1) {
    itensUser.value.atac.push(el);
  }
});

// defesa
itensStore.def.forEach((el: Item) => {

  if (el.tipo == 2) {
    itensUser.value.def.push(el);
  }
});

// especial
itensStore.espec.forEach((el: Item) => {

  if (el.tipo == 3) {
    itensUser.value.espec.push(el);
  }
});

const comecarAtividade = () => {
  $q.fullscreen.request().catch(() => {
    void $q.fullscreen.request();
  });
  router.push('/atividade/introducao').catch((error) => {
    console.error('Erro ao navegar:', error);
  });
};
</script>

<template>
  <q-dialog v-model="popUpStore.atividade" :maximized="popUpStore.atividade" persistent v-if="popUpStore.atividade">
    <!-- <q-card class="top-card">
      <span> LOGARITIMO </span>
    </q-card> -->
    <q-card flat>
      <q-card-section align="center">
        <div class="titulo">
          {{ atividadeStore.titulo }}
        </div>
        <q-btn icon="close" color="red" class="btn-sair" @click="popUpStore.toggleAtividade()" round push />
      </q-card-section>
      <q-card-section align="center">
        <q-rating v-model="atividadeStore.estrelas" :max="3" class="estrela" size="70px" color="grey"
          icon="img:/public/icons/icons-pixel/star.svg" icon-selected="img:/public/icons/icons-pixel/star-solid.svg"
          disable />
      </q-card-section>
      <q-card-section align="center">
        <p>
          {{ atividadeStore.descricao }}
        </p>
      </q-card-section>

      <q-card-section class="itens">
        <q-fab :icon="atacItemStore.icon" direction="up" class="itens-select" flat>
          <q-fab-action class="item" color="black" icon="remove" @click="atacItemStore.mudarItem(itensPadão)" />
          <q-fab-action v-for="atac in itensUser.atac" class="item" color="black" :icon="atac.icon" :key="atac.id"
            @click="atacItemStore.mudarItem(atac)" />
        </q-fab>

        <q-fab :icon="defeItemStore.icon" direction="up" class="itens-select" flat>
          <q-fab-action class="item" color="black" icon="remove"
            @click="defeItemStore.mudarItem(itensPadão)" />
          <q-fab-action v-for="def in itensUser.def" class="item" color="black" :icon="def.icon" :key="def.id"
            @click="defeItemStore.mudarItem(def)" />
        </q-fab>

        <q-fab :icon="especItemStore.icon" direction="up" class="itens-select" flat>
          <q-fab-action class="item" color="black" icon="remove"
            @click="especItemStore.mudarItem(itensPadão)" />
          <q-fab-action v-for="espec in itensUser.espec" class="item" color="black" :icon="espec.icon" :key="espec.id"
            @click="especItemStore.mudarItem(espec)" />
        </q-fab>
      </q-card-section>
      <q-card-section align="center">
        <q-btn class="btn-Jogar" @click="comecarAtividade" flat>
          <q-item-label>
            {{ atividadeStore.estrelas > 0 ? 'jogar de novo' : 'Começar' }}
          </q-item-label>
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped>
@media (orientation: portrait) {}

.titulo {
  font-size: 130%;
  font-family: 'Pixelify Sans';
  text-align: center;
  width: 230px;
  margin-top: 10px;
}

.btn-sair {
  top: 12px;
  right: 12px;
  position: absolute;
}

.q-card {
  width: 500px;
  height: auto;
  max-height: 90dvh;
  max-width: 90dvw;
  background-color: var(--fundo-card);
  color: var(--color-text-1);
  border-radius: 20px !important;
}

/* .corpo-card {
  width: 500px;
  height: auto;
  max-height: 90dvh;
  max-width: 90dvw;
  background-color: var(--fundo-card);
  color: var(--color-text-1);
  border-radius: 20px !important;
} */

.top-card {
  background-color: blue;
  padding: 30px;
  width: fit-content;
  z-index: 1;
}

.estrelas {
  cursor: none;
}

.disabled,
.disabled *,
[disabled],
[disabled] * {
  opacity: 1 !important;
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

.btn-Jogar {
  font-family: 'Pixelify Sans' !important;
  width: 80%;
  margin-bottom: 15px;
  color: rgb(0, 0, 0) !important;
  border: 2px solid #f7c92e;
  background-color: #fff0b1 !important;
}
</style>
