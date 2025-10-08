<script setup lang="ts">
import type { Atividade } from 'src/types';
import { defineProps } from 'vue';
import useAtividadeStore from 'src/stores/materias/atividades/atividadeStore';
import usePopUpStore from 'src/stores/popUp';

interface Prop {
  atividade: Atividade;
}

const props = defineProps<Prop>();
const atividadeStore = useAtividadeStore();
const popUpStore = usePopUpStore();

const ativarPopUp = (atividade: Atividade) => {
  atividadeStore.mudarAtividade(atividade);
  popUpStore.toggleAtividade();
};

const descidirAnimacao = (quant_estrela: number) => {
  let animacao = 'scale';
  if (quant_estrela == 0) {
    animacao = 'jump-right';
  }
  return animacao;
};
</script>

<template>
  <q-intersection :transition="descidirAnimacao(props.atividade.estrelas)" once>
    <q-btn
      class="atividade"
      :class="{
        'estrelas-3': props.atividade.estrelas == 3,
        'atividade-concluida': props.atividade.estrelas > 0,
        'atividade-proxima': props.atividade.proxima,
      }"
      no-caps
      :push="props.atividade.estrelas > 0 || props.atividade.proxima"
      :flat="props.atividade.estrelas == 0 && !props.atividade.proxima"
      :disable="props.atividade.estrelas == 0 && !props.atividade.proxima"
      :icon-right="props.atividade.proxima ? 'chevron_right':''"
      @click="ativarPopUp(props.atividade)"
    >
      <!-- atividades de verdade organizadas em lista -->
      <q-item>
        <!-- titulo da atividade -->
        <q-item-section side>
          <q-item-label
            class="atividade-titulo"
            :class="{
              'atividade-concluida-font': props.atividade.estrelas || props.atividade.proxima,
              'font-branca': props.atividade.estrelas == 3 || props.atividade.proxima,
            }"
          >
            {{ props.atividade.titulo }}
          </q-item-label>
        </q-item-section>
        <!-- status da atividade -->
        <q-item-section side top class="atividade-status" v-if="props.atividade.estrelas">
          <!-- mostrar quando foi a ultima vez que a atividade foi acessada -->
          <!-- talvez seja removido -->
          <q-item-label caption>2 min ago</q-item-label>
          <!-- mostra qual foi a maestria do usuário na atividade -->
          <div class="atividade-estrelas">
            <q-rating
              v-model="props.atividade.estrelas"
              :max="3"
              size="14px"
              icon="star"
              color="grey"
              color-selected="amber-9"
              disable
            />
          </div>
        </q-item-section>
        <q-item-section side class="atividade-continuar" v-else-if="props.atividade.proxima">
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
  background-color: var(--cor-principal-1);
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
