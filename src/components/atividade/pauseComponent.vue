<script setup lang="ts">
import { defineEmits, watch } from 'vue';
import { useRouter } from 'vue-router';
import usePopUpStore from 'src/stores/popUp';
import useAtividadeStore from 'src/stores/materias/atividades/atividadeStore';
import useMateriaStore from 'src/stores/materiaStore';

const emits = defineEmits(['reiniciar']);

const popUpStore = usePopUpStore();
const atividadeStore = useAtividadeStore();
const materiaStore = useMateriaStore();
const router = useRouter();

const continuar = () => {
  popUpStore.questoes.playVideo = true;
  popUpStore.togglePause();
};

const confirmar = () => {
  popUpStore.togglePause();
  popUpStore.questoes.estado = false;
  popUpStore.toggleConfirmar();
  void router.push(`/materias/${materiaStore.path}`);
  document.exitFullscreen().catch(() => {
    return;
  });
};

const sair = () => {
  if (!popUpStore.confirmar.naoAparecerNovamente) {
    popUpStore.toggleConfirmar();
  } else {
    popUpStore.togglePause();
    popUpStore.questoes.estado = false;
    void router.push(`/materias/${materiaStore.path}`);
    document.exitFullscreen().catch(() => {
      return;
    });
  }
};

const reiniciar = () => {
  emits('reiniciar');
  popUpStore.togglePause();
};

watch(
  () => popUpStore.pause,
  () => {
    if (popUpStore.pause == false) {
      popUpStore.questoes.playVideo = true;
    }
  }
);
</script>

<template>
  <q-dialog
    v-model="popUpStore.pause"
    :maximized="popUpStore.pause"
    backdrop-filter="blur(15px)"
    class="pause"
  >
    <q-card class="center text-white">
      <q-card-section align="center">
          <h2>
            {{ atividadeStore.titulo }}
          </h2>
          Introdução<br />
      </q-card-section>
      <q-card-actions align="center" vertical style="gap: 5px;">
        <q-btn class="opcao" color="green-14" label="continuar" icon-right="play_arrow" push @click="continuar" />
        <q-btn class="opcao" color="amber-7" label="reiniciar" icon-right="autorenew" push @click="reiniciar" />
        <q-btn class="opcao" color="red" label="sair" icon-right="exit_to_app" push @click="sair" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- confirmar popup -->
  <q-dialog
    v-model="popUpStore.confirmar.estado"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="bg-amber-6 text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h5">
          <q-avatar class="icon-alert" icon="report" color="amber-6" />
          Atenção
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <span>Ao sair da atividade você perde todo o seu progresso. Tem certeza disso?</span>
      </q-card-section>

      <q-card-actions>
        <div class="flex items-center">
          <q-checkbox v-model="popUpStore.confirmar.naoAparecerNovamente" />
          <span>Não aparcer novamente.</span>
        </div>
      </q-card-actions>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="cancelar" @click="popUpStore.toggleConfirmar()" />
        <q-btn flat label="Sim" @click="confirmar" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
@media (orientation: landscape) {
  .q-dialog.pause .q-card {
    width: 450px !important;
    height: 350px !important;
  }
  .opcao.q-btn {
    width: 300px !important;
    height: 50px !important;
  }
}

.btn-pause {
  color: rgb(29, 21, 21);
  background-color: rgba(255, 255, 255, 0.507);
  top: 10px;
  right: 10px;
  position: absolute;
  z-index: 1;
}

.q-dialog.pause .q-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 350px;
  height: 450px;
  background-color: rgba(255, 255, 255, 0.473);
  border-radius: 20px !important;
}

h2{
  font-size: 2.5rem;
}

.opcao.q-btn {
  font-size: 1rem;
  width: 80%;
  height: 65px;
  border-radius: 20px;
}

.icon-alert {
  box-shadow: 0 2px 4px 1px rgba(0, 0, 0, 0.13);
}
</style>
