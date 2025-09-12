<script setup lang="ts">
import { defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import usePopUpStore from 'src/stores/popUp';
import useAtividadesStore from 'src/stores/materias/atividadesStore';
import useMateriaStore from 'src/stores/materiaStore';

const emits = defineEmits(['reiniciar'])

const popUpStore = usePopUpStore();
const atividadesStore = useAtividadesStore();
const materiaStore = useMateriaStore();
const router = useRouter();

const continuar = ()=>{
  popUpStore.togglePause()
}

const sair = () => {
  popUpStore.togglePause()
  void router.push(`/materias/${materiaStore.path}`);
  document.exitFullscreen().catch(() => {
    return;
  });
};

const reiniciar = () => {
  emits('reiniciar')
  popUpStore.togglePause()
};
</script>

<template>
  <q-dialog v-model="popUpStore.pause" :maximized="popUpStore.pause" backdrop-filter="blur(15px)">
    <q-card class="center">
      <q-card-section class="titulo">
        <q-item-label class="center"
          >{{ atividadesStore.atividades[0]?.nome }} <span>introducao</span></q-item-label
        >
      </q-card-section>
      <q-card-actions class="btns center">
        <q-btn color="green-14" label="continuar" icon-right="play_arrow" push @click="continuar" />
        <q-btn color="amber-7" label="reiniciar" icon-right="autorenew" push @click="reiniciar" />
        <q-btn color="red" label="sair" icon-right="exit_to_app" push @click="sair" />
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

.q-dialog .q-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 90%;
  height: 60%;
  background-color: rgba(255, 255, 255, 0.473);
  border-radius: 20px !important;
}

.q-item__label {
  flex-direction: column;
  margin: 0;
  font-size: 10dvw;
}
.q-item__label span {
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
</style>
