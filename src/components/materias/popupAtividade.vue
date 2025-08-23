<script setup lang="ts">
import { useRouter } from 'vue-router';
import sairIcon from '../icons/sairIcon.vue';
import usePopUpAtividade from 'src/stores/popUpAtividadeStore';
import useAtacItemStore from 'src/stores/itens/atacStore';
import useDefeItemStore from 'src/stores/itens/defeStore';
import useEspecItemStore from 'src/stores/itens/especStore';

const router = useRouter();
const atacItemStore = useAtacItemStore();
const defeItemStore = useDefeItemStore();
const especItemStore = useEspecItemStore();

const popUpStore = usePopUpAtividade();

const comecarAtividade = ()=>{
    router.push('/atividade/introducao').catch((error) => {
    console.error('Erro ao navegar:', error);
  });
}
</script>

<template>
  <q-dialog v-model="popUpStore.ativo" persistent v-if="popUpStore.ativo">
    <!-- <q-card class="top-card">
      <span> LOGARITIMO </span>
    </q-card> -->
    <q-card class="corpo-card">
      <q-card-section class="center">
        {{ popUpStore.nome }}
        <q-btn class="btn-sair" @click="popUpStore.ativo = false" push>
          <sair-icon :color="'white'" />
        </q-btn>
      </q-card-section>
      <q-card-section class="center estrelas">
        <q-rating
          v-model="popUpStore.estrelas"
          :max="3"
          class="estrela"
          size="70px"
          color="grey"
          icon="star"
          color-selected="amber-9"
          disable
        />
      </q-card-section>
      <q-card-section class="descricao">
        <p>
          {{ popUpStore.descricao }}
        </p>
      </q-card-section>

      <q-card-section class="itens">
        <q-fab :icon="atacItemStore.icon" direction="up" class="itens-select" flat>
          <q-fab-action
            class="item"
            color="black"
            icon="remove"
            @click="atacItemStore.mudarItem('', 'add')"
          />
          <q-fab-action
            class="item"
            color="black"
            icon="img:/src/assets/itens/ataque/machado.png"
            @click="atacItemStore.mudarItem('machado', 'img:/src/assets/itens/ataque/machado.png')"
          />
          <q-fab-action
            class="item"
            color="black"
            icon="img:/src/assets/itens/ataque/martelo.png"
            @click="atacItemStore.mudarItem('martelo', 'img:/src/assets/itens/ataque/martelo.png')"
          />
          <q-fab-action
            class="item"
            color="black"
            icon="img:/src/assets/itens/ataque/espada.png"
            @click="atacItemStore.mudarItem('espada', 'img:/src/assets/itens/ataque/espada.png')"
          />
        </q-fab>

        <q-fab :icon="defeItemStore.icon" direction="up" class="itens-select" flat>
          <q-fab-action
            class="item"
            color="black"
            icon="remove"
            @click="defeItemStore.mudarItem('', 'add')"
          />
          <q-fab-action
            class="item"
            color="black"
            icon="img:/src/assets/itens/defesa/escudo.png"
            @click="defeItemStore.mudarItem('escudo', 'img:/src/assets/itens/defesa/escudo.png')"
          />
        </q-fab>

        <q-fab :icon="especItemStore.icon" direction="up" class="itens-select" flat>
          <q-fab-action
            class="item"
            color="black"
            icon="remove"
            @click="especItemStore.mudarItem('', 'add')"
          />
          <q-fab-action
            class="item"
            color="black"
            icon="img:/src/assets/itens/especial/anel.png"
            @click="especItemStore.mudarItem('especial', 'img:/src/assets/itens/especial/anel.png')"
          />
        </q-fab>
      </q-card-section>
      <q-card-section class="center">
        <q-btn class="btn-Jogar" color="green" @click="comecarAtividade">
          <q-item-label> {{ popUpStore.estrelas > 0 ? 'jogar de novo' : 'Começar' }} </q-item-label>
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.btn-sair {
  top: 10px;
  right: 10px;
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
  background-color: var(--color-background);
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
  font-size: 14px;
}

.itens {
  display: flex;
  justify-content: center;
  gap: 18px;
}
.itens-select {
  color: var(--color-text-2);
  background-color: var(--color-background-2) !important;
}
.itens-select .item {
  width: 50px;
  height: 50px;
}

.btn-Jogar {
  grid: btn;
  width: 80%;
  margin-bottom: 15px;
}
</style>
