<script setup lang="ts">
import { useQuasar } from 'quasar';
import useAtividadeStore from 'src/stores/materias/atividades/atividadeStore';
import usePopUp from 'src/stores/popUp';
import { onBeforeMount, ref } from 'vue';

const $q = useQuasar();
const loading = ref(false);
const popUpStore = usePopUp();
const atividadeStore = useAtividadeStore();

onBeforeMount(async () => {
  try {
    loading.value = true;
    await atividadeStore.getAtividadeRestante();
  }
  finally {
    loading.value = false
  }
})

// onUnmounted(async()=>{
//   await materiasStore.getMaterias();
// })

const pausar = () => {
  popUpStore.questoes.playVideo = false;
  popUpStore.togglePause();
}

const autorizar = () => {
  popUpStore.toggleNotFullScreen(false);
  void $q.fullscreen.request();
}

const bloquear = () => {
  popUpStore.toggleNotFullScreen(true);
}

if (!$q.fullscreen.isActive) {
  bloquear();
}

document.addEventListener('fullscreenchange', () => {
  if (!$q.fullscreen.isActive) {
    bloquear();
  } else {
    autorizar()
  }
})
</script>

<template>
  <q-layout>
    <q-dialog v-model="popUpStore.notFullScreen" backdrop-filter="blur(20px)" persistent>
      <q-card class="bg-red text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">
            <q-icon name="warning" />
            Atenção
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Para acessar a atividade é necessário estar em tela cheia
        </q-card-section>

        <q-card-actions align="right" class="bg-red-2 text-red">
          <q-btn flat label="OK" @click="autorizar" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-btn icon="pause" class="btn-pause" size="15px" flat @click="pausar" v-show="!popUpStore.questoes.estado" />
    <q-page-container>
      <div style="width: 100%;height: 100%;" v-if="loading">
        <q-inner-loading :showing="true">
          <q-spinner-hourglass
            color="primary"
            size="10em"
          />
        </q-inner-loading>
      </div>
      <router-view v-else/>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.q-layout {
  position: relative;
}

.btn-pause {
  color: rgb(0, 0, 0);
  background-color: rgba(255, 255, 255, 0.507);
  top: 10px;
  right: 10px;
  position: absolute;
  z-index: 100;
}
</style>
