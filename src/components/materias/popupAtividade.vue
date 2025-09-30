<script setup lang="ts">
import type { Item } from 'src/types';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import sairIcon from '../icons/sairIcon.vue';
import useUserStore from 'src/stores/userStore';
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

interface ItemUser {
  id: number;
  tipo: number;
}

// configurações dá aplicação
const $q = useQuasar();
const router = useRouter();

// pinia para todos os itens no geral
const popUpStore = usePopUpStore();
const itensStore = useItensStore();

// usuário
const userStore = useUserStore();

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

// função para selecionar quais são os itens do usuário e quais não são

// ataque
itensStore.atac.forEach((el: Item) => {
  if (userStore.itens.some((el2: ItemUser) => el.id === el2.id && el.tipo == el2.tipo)) {
    itensUser.value.atac.push(el);
  }
});

// defesa
itensStore.def.forEach((el: Item) => {
  if (userStore.itens.some((el2: ItemUser) => el.id === el2.id && el.tipo == el2.tipo)) {
    itensUser.value.def.push(el);
  }
});

// especial
itensStore.espec.forEach((el: Item) => {
  if (userStore.itens.some((el2: ItemUser) => el.id === el2.id && el.tipo == el2.tipo)) {
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
  <q-dialog v-model="popUpStore.atividade" persistent v-if="popUpStore.atividade">
    <!-- <q-card class="top-card">
      <span> LOGARITIMO </span>
    </q-card> -->
    <q-card class="corpo-card">
      <q-card-section class="center">
        <q-item-label class="titulo">
          {{ atividadeStore.titulo }}
        </q-item-label>
        <q-btn class="btn-sair" @click="popUpStore.toggleAtividade()" push>
          <sair-icon :color="'white'" />
        </q-btn>
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
      <q-card-section class="descricao">
        <p>
          {{ atividadeStore.descricao }}
        </p>
      </q-card-section>

      <q-card-section class="itens">
        <q-fab :icon="atacItemStore.icon" direction="up" class="itens-select" flat>
          <q-fab-action
            class="item"
            color="black"
            icon="remove"
            @click="atacItemStore.mudarItem(0, 'add', '', '', '')"
          />
          <q-fab-action
            v-for="atac in itensUser.atac"
            class="item"
            color="black"
            :icon="atac.icon"
            :key="atac.id"
            @click="atacItemStore.mudarItem(atac.id, atac.nome, atac.icon, atac.img, atac.func)"
          />
        </q-fab>

        <q-fab :icon="defeItemStore.icon" direction="up" class="itens-select" flat>
          <q-fab-action
            class="item"
            color="black"
            icon="remove"
            @click="atacItemStore.mudarItem(0, 'add', '', '', '')"
          />
          <q-fab-action
            v-for="def in itensUser.def"
            class="item"
            color="black"
            :icon="def.icon"
            :key="def.id"
            @click="defeItemStore.mudarItem(def.id, def.nome, def.icon, def.img, def.func)"
          />
        </q-fab>

        <q-fab :icon="especItemStore.icon" direction="up" class="itens-select" flat>
          <q-fab-action
            class="item"
            color="black"
            icon="remove"
            @click="atacItemStore.mudarItem(0, 'add', '', '', '')"
          />
          <q-fab-action
            v-for="espec in itensUser.espec"
            class="item"
            color="black"
            :icon="espec.icon"
            :key="espec.id"
            @click="especItemStore.mudarItem(espec.id, espec.nome, espec.icon, espec.img, espec.func)"
          />
        </q-fab>
      </q-card-section>
      <q-card-section class="center">
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
    'estrelas'
    'btn';
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

.btn-Jogar {
  grid: btn;
  font-family: 'Pixelify Sans' !important;
  width: 80%;
  margin-bottom: 15px;
  color: rgb(0, 0, 0) !important;
  border: 2px solid #f7c92e;
  background-color: #fff0b1 !important;
}
</style>
