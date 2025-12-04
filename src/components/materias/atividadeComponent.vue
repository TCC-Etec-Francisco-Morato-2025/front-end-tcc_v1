<script setup lang="ts">
import type { Atividade } from 'src/types';
import { defineProps } from 'vue';
import useAtividadeStore from 'src/stores/materias/atividades/atividadeStore';
import usePopUpStore from 'src/stores/popUp';

interface Prop {
  atividade: Atividade;
}

const props = defineProps<Prop>();
const atividade = props.atividade
const atividadeStore = useAtividadeStore();
const popUpStore = usePopUpStore();

const ativarPopUp = (atividade: Atividade) => {
  atividadeStore.mudarAtividade(atividade);
  popUpStore.toggleAtividade();
};

const descidirAnimacao = (quant_estrela: number,proxima?:boolean) => {
  let animacao = 'scale';
  if (!quant_estrela && !proxima) {
    animacao = 'jump-right';
  }
  return animacao;
};

console.info(atividade.dt_conclusao)
</script>

<template>
  <q-intersection :transition="descidirAnimacao(atividade.estrelas,atividade.proxima)" once>
    <q-btn
      class="atividade"
      :class="{
        'estrelas-3': atividade.estrelas == 3,
        'atividade-concluida': atividade.estrelas > 0,
        'atividade-proxima': atividade.proxima,
      }"
      no-caps
      :push="atividade.estrelas > 0 || atividade.proxima"
      :flat="!atividade.estrelas && !atividade.proxima"
      :disable="!atividade.estrelas && !atividade.proxima"
      :icon-right="atividade.proxima ? 'chevron_right':''"
      @click="ativarPopUp(atividade)"
    >
      <!-- atividades de verdade organizadas em lista -->
      <q-item>
        <!-- titulo da atividade -->
        <q-item-section side>
          <q-item-label
            class="atividade-titulo"
            :class="{
              'atividade-concluida-font': atividade.estrelas || atividade.proxima,
              'font-branca': atividade.estrelas == 3 || atividade.proxima,
            }"
          >
            {{ atividade.titulo }}
          </q-item-label>
        </q-item-section>
        <!-- status da atividade -->
        <q-item-section side top class="atividade-status" v-if="atividade.estrelas">
          <!-- mostrar quando foi a ultima vez que a atividade foi acessada -->
          <!-- talvez seja removido -->
          <div v-if="atividade.dt_conclusao">
            <q-item-label v-if="atividade.dt_conclusao/60<1" class="minutos" caption>{{ (atividade.dt_conclusao/60).toFixed() }} sec atrás</q-item-label>
            <q-item-label v-if="atividade.dt_conclusao<60&&atividade.dt_conclusao/60>=1" class="minutos" caption>{{ atividade.dt_conclusao }} min atrás</q-item-label>
            <q-item-label class="horas" v-if="atividade.dt_conclusao>59" caption>{{ (atividade.dt_conclusao/60).toFixed() }}h atrás</q-item-label>
            <q-item-label class="dias" v-if="atividade.dt_conclusao>1439" caption>{{ ((atividade.dt_conclusao/60)/24).toFixed() }}d atrás</q-item-label>
          </div>
          <!-- mostra qual foi a maestria do usuário na atividade -->
          <div class="atividade-estrelas">
            <q-rating
              v-model="atividade.estrelas"
              :max="3"
              size="14px"
              icon="star"
              color="grey"
              color-selected="amber-9"
              disable
            />
          </div>
        </q-item-section>
        <q-item-section side class="atividade-continuar" v-else-if="atividade.proxima">
        </q-item-section>
      </q-item>
    </q-btn>
  </q-intersection>
</template>


<style scoped>
/* estilo da atividade */
.atividade {
  padding: 10px;
  width: 100%;
  height: 70px;
  background-color: transparent;
}
.atividade .q-item {
  padding: 0;
}
.atividade-titulo {
  width: 160px;
  color: var(--color-text-2);
  font-size: 4dvw;
}
.atividade-concluida {
  background-color: var(--color-background-2) !important;
}
.atividade-concluida-font {
  color: var(--color-text-1);
}
/* caso a pessoa tenha zerado a atividade */
.estrelas-3 {
  background-color: rgb(223, 189, 0) !important;
}
.font-branca {
  color: var(--color-text-3) !important;
}
/* próxima atividade */
.atividade-proxima {
  background-color: rgb(var(--cor-principal-1));
}

/* status */
.atividade-status {
  align-items: center;
  padding: 0;
}
.atividade-status .q-item__label {
  /* position: absolute;
  justify-content: flex-end;
  top: -20px; */
}

/* continuar */
.atividade-continuar {
  width: max-content !important;
  height: 14px;
}

.disabled,
.disabled *,
[disabled],
[disabled] * {
  opacity: 1 !important ;
  cursor: pointer !important;
}
</style>
