<script setup lang="ts">
import { defineProps, ref } from 'vue';
import setaIcon from '../icons/setaIcon.vue';

const estadoLista = ref(false);
const btn = ref<HTMLElement | null>(null);

const mutEstadoLista = () => {
  const button = document.getElementById('btn-' + props.id);
  console.log(button);
  estadoLista.value = !estadoLista.value;
  button?.classList.toggle('ativo');
};

const props = defineProps({
  nome: String,
  descricao: String,
  id: Number,
});
</script>

<template>
  <!-- <q-expansion-item  ref="expansion_item" expand-icon-class="" :label="props.nome" @click="mutEstadoLista">
    <q-card>
      <q-card-section>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos
        corrupti commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto
        suscipit iste eveniet doloribus ullam aliquid.
      </q-card-section>
    </q-card>
  </q-expansion-item> -->
  <q-item>
    <q-btn ref="btn" @click="mutEstadoLista" push :id="'btn-' + props.id">
      <div>
        <span>
          {{ props.nome }}
        </span>
        <seta-icon :tamanho="12" :ativado="estadoLista" />
      </div>
    </q-btn>
    <q-slide-transition :appear="estadoLista" v-show="estadoLista" :duration="300">
      <q-card class="info">
        <q-card-section>
          {{ props.descricao }}
        </q-card-section>
        <q-card-section class="btn-iniciar">
          <q-btn label="começar" push/>
        </q-card-section>
      </q-card>
    </q-slide-transition>
  </q-item>
</template>

<style scoped>
.q-item {
  flex-direction: column;
}
.q-card {
  color: var(--color-text-1);
  background-color: var(--cor-principal-1);
  border-radius: 0 0 5px 5px;
}
.ativo.q-btn {
  background-color: var(--cor-principal-2) !important;
  color: var(--color-text-1) !important;
  transition: 100ms ease-out;
  border-radius: 7px 7px 0px 0px;
}

.q-expansion-item .expand-icon-class {
  color: var(--color-text-1) !important;
}

.q-btn {
  margin: 0;
  height: 50px;
  overflow: hidden;
  background-color: var(--color-background-3);
  transition: 1s ease-out;
  color: var(--color-text-1);
  border-radius: 15px;
}
.q-btn div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.ativo.q-btn {
  border-radius: 7px 7px 0px 0px;
}

.q-card__section.btn-iniciar {
  padding: 0;
}

.q-card__section.btn-iniciar .q-btn{
  background-color:rgb(12, 146, 12);
  box-shadow: 0 0px 10px 1px rgba(0, 0, 0, 0.418);
  width: 170px;
  border-radius: 0 0 0 5px;
}
</style>
