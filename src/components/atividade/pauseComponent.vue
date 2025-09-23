<script setup lang="ts">
import { defineEmits , watch } from 'vue';
import { useRouter } from 'vue-router';
import usePopUpStore from 'src/stores/popUp';
import useAtividadesStore from 'src/stores/materias/atividadesStore';
import useMateriaStore from 'src/stores/materiaStore';

const emits = defineEmits(['reiniciar'])

const popUpStore = usePopUpStore();
const atividadesStore = useAtividadesStore();
const materiaStore = useMateriaStore();
const router = useRouter();

const continuar = () => {
  popUpStore.questoes.playVideo = true;
  popUpStore.togglePause()
}

const confirmar = () => {
  popUpStore.togglePause()
  popUpStore.questoes.estado = false;
  popUpStore.toggleConfirmar()
  void router.push(`/materias/${materiaStore.path}`);
  document.exitFullscreen().catch(() => {
    return;
  });
}

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
  emits('reiniciar')
  popUpStore.togglePause()
};

watch(()=>popUpStore.pause,()=>{
  if(popUpStore.pause==false){
    popUpStore.questoes.playVideo=true
  }
})
</script>

<template>
  <q-dialog v-model="popUpStore.pause" :maximized="popUpStore.pause" backdrop-filter="blur(15px)" class="pause">
    <q-card class="center">
      <q-card-section class="titulo">
        <h2 class="center">
          {{ atividadesStore.atividades[0]?.nome }}
          <span>Introdução</span>
        </h2>
      </q-card-section>
      <q-card-actions class="btns center">
        <q-btn color="green-14" label="continuar" icon-right="play_arrow" push @click="continuar" />
        <q-btn color="amber-7" label="reiniciar" icon-right="autorenew" push @click="reiniciar" />
        <q-btn color="red" label="sair" icon-right="exit_to_app" push @click="sair" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- confirmar popup -->
  <q-dialog v-model="popUpStore.confirmar.estado" persistent transition-show="scale" transition-hide="scale">
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
.btn-pause {
  color: rgb(0, 0, 0);
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
  width: 90%;
  height: 60%;
  background-color: rgba(255, 255, 255, 0.473);
  border-radius: 20px !important;
}

.titulo h2 {
  flex-direction: column;
  margin: 0;
  font-size: 10dvw;
}

h2 span {
  font-size: 5dvw;
}

.q-dialog .btns {
  flex-direction: column;
  width: 100%;
  gap: 20px;
}

.btns .q-btn {
  font-size: 1rem;
  width: 80%;
  height: 65px;
  border-radius: 20px;
}

.icon-alert {
  box-shadow: 0 2px 4px 1px rgba(0, 0, 0, 0.13);
}
</style>
