<!-- lista de todos os assuntos relacionados a matéria que aparece em materiaConteudo -->

<script setup lang="ts">
import type { Atividade } from 'src/types';
import { defineProps, ref } from 'vue';
import useAtividadesStore from 'src/stores/materias/atividadesStore';
import useMateriaStore from 'src/stores/materias/materiaStore';
import setaIcon from '../icons/setaIcon.vue';
import atividadeComponent from './atividadeComponent.vue';

const atividadesStore = useAtividadesStore();
const materiaStore = useMateriaStore();
const atividades = ref<Atividade[]>([]);
const estadoLista = ref(false);
const btn = ref<HTMLElement | null>(null);

const mutEstadoLista = () => {
  const button = document.getElementById('btn-' + props.id);
  console.log(button);
  estadoLista.value = !estadoLista.value;
  button?.classList.toggle('ativo');
};

interface Props {
  id: number;
  nome: string;
  cor: string;
  textColor: string;
}

const props = defineProps<Props>();

const corAtivo = ref(props.cor);
const corTextAtivo = ref(props.textColor);

// achar as ativiades dessa matéria em especifico, caso a pessoa já tenha entrado em outras matérias
atividadesStore.atividades.forEach((el) => {
  if (el.id_aula === props.id && el.id_aula === materiaStore.id) {
    atividades.value.push(el);
  }
});

for (let i = 0; i < atividades.value.length; i++) {
  const atividade = atividades.value[i];
  if (atividade) {
    if (atividade.estrelas === 0) {
      atividade.proxima = true;
      break; // para no primeiro que encontrar
    } else {
      atividade.proxima = false;
    }
  }
}
</script>

<template>
  <q-item class="itens-assunto">
    <q-btn ref="btn" @click="mutEstadoLista" push :id="'btn-' + props.id" class="assunto-expansion">
      <div>
        <span>
          {{ props.nome }}
        </span>
        <div id="seta">
          <seta-icon :ativado="estadoLista" />
        </div>
      </div>
    </q-btn>
    <!-- usando para fazer um slide de informações descendo -->
    <q-slide-transition :appear="estadoLista" v-show="estadoLista" :duration="300">
      <!-- card usando para facilitar na organização dos itens internos -->
      <q-card class="card-atividades" flat>
        <q-card-section>
          <q-list class="lista-atividades">
            <!-- informações sobre a atividade -->
            <!-- btn usando para dar a sensação de click para o usuário -->
            <atividade-component :atividade="atividade" v-for="atividade in atividades" :key="atividade.id"/>
          </q-list>
        </q-card-section>
      </q-card>
    </q-slide-transition>
  </q-item>
</template>

<style scoped>
.q-card {
  color: var(--color-text-3);
  background-color: var(--color-background-2);
  border-radius: 0 0 5px 5px;
}
.ativo.q-btn {
  background-color: v-bind(corAtivo) !important;
  color: v-bind(corTextAtivo) !important;
  transition: 100ms ease-out;
  border-radius: 7px 7px 0px 0px;
}

.q-expansion-item .expand-icon-class {
  color: var(--color-text-1) !important;
}

.q-btn.assunto-expansion {
  margin: 0;
  height: 70px;
  overflow: hidden;
  background-color: var(--color-background-3);
  transition: 1s ease-out;
  font-size: 20px;
  color: var(--color-text-2);
  border-radius: 5px;
}
.q-btn div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.q-btn div #seta {
  width: 15px;
}
.ativo.q-btn {
  border-radius: 7px 7px 0px 0px;
}

.lista-atividades {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* card que organiza tudo */
.card-atividades {
  width: 100%;
}
.card-atividades .q-card__section--vert {
  padding: 10px !important;
}

/* conteiner que abriga as atividades */
.q-item.itens-assunto {
  flex-direction: column;
}
</style>
