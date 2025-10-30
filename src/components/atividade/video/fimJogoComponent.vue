<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import useMateriaStore from 'src/stores/materias/materiaStore';
import useAtividadesStore from 'src/stores/materias/atividadesStore';
import useAtividadeStore from 'src/stores/materias/atividades/atividadeStore';
import usePopUpStore from 'src/stores/popUp';

const $q = useQuasar();
const router = useRouter();
const atividadesStore = useAtividadesStore();
const materiaStore = useMateriaStore();
const popUpStore = usePopUpStore();
const atividadeStore = useAtividadeStore();

// calculo de estrelas
if (atividadeStore.acertos != undefined)
  if (atividadeStore.vida === 3) {
    atividadeStore.estrelas = 3;
  } else if (atividadeStore.vida === 2) {
    atividadeStore.estrelas = 2;
  } else {
    atividadeStore.estrelas = 1;
  }

const proxima = async () => {

  // salvar atividade
  await atividadeStore.salvarAtividade();

  // encontrar a próxima atividade e deixar o popUp ativo
  const indexAtividadeAtual = atividadesStore.atividades.findIndex((el) => el.id === atividadeStore.id);
  const proximaAtividade = atividadesStore.atividades[indexAtividadeAtual+1]

  if (!proximaAtividade) return;

  atividadeStore.mudarAtividade(proximaAtividade);

  popUpStore.atividade = true;
  popUpStore.fimJogo = false;

  void $q.fullscreen.exit();

  router.push(`/materias/${materiaStore.path}`).catch((error) => {
    console.error('Erro ao navegar:', error);
  });
};

const novamente = ()=>{
  atividadeStore.vida=0;
  atividadeStore.acertos=0;
  popUpStore.fimJogo = false;
  router.push('/atividade/introducao').catch((error) => {
    console.error('Erro ao navegar:', error);
  });
}

const sair = () => {
  popUpStore.atividade = false;
  popUpStore.fimJogo = false;

  void $q.fullscreen.exit();

  router.push(`/materias/${materiaStore.path}`).catch((error) => {
    console.error('Erro ao navegar:', error);
  });
};
</script>

<template>
  <q-dialog v-if="popUpStore.fimJogo" v-model="popUpStore.fimJogo" persistent backdrop-filter="blur(20px) brightness(0)"
    :maximized="popUpStore.fimJogo">
    <!-- <q-card class="top-card">
      <span> LOGARITIMO </span>
    </q-card> -->
    <q-card class="corpo-card" flat v-once>
      <q-card-section class="center">
        <q-item-label class="titulo">
          {{ atividadeStore.titulo }}
        </q-item-label>
        <q-btn class="btn-sair" icon="close" @click="sair" push />
      </q-card-section>
      <q-card-section class="center estrelas">
        <q-rating v-model="atividadeStore.estrelas" :max="3" class="estrela" size="70px" color="grey"
          icon="img:/public/icons/icons-pixel/star.svg" icon-selected="img:/public/icons/icons-pixel/star-solid.svg"
          disable />
      </q-card-section>
      <q-card-section class="animacao center">
        <dot-lottie-vue class="sol" src="https://lottie.host/89de8449-8b30-4af0-ac2b-64cceff2ff6a/3D1vugTNAp.json" loop
          autoplay />
        <dot-lottie-vue class="confete" src="https://lottie.host/53c8947e-1829-49c2-a508-fce69bae936b/UmfKTLVqQy.json"
          autoplay />
      </q-card-section>
      <q-card-actions align="right" class="caixa-botoes">
        <q-btn class="btn-novamente" @click="novamente" flat label="Novamente" v-if="atividadeStore.estrelas !== 3" />
        <q-btn class="btn-proxima" @click="proxima" flat label="proxima" icon-right="keyboard_double_arrow_right"
          v-if="atividadeStore.estrelas > 0" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
@media (orientation: landscape) {
  .corpo-card {
    height: 95dvh !important;
    width: 400px !important;
  }

  .caixa-botoes {
    padding: 10px 20px;
  }
}

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
  color: white;
}

.corpo-card {
  display: grid;
  /* grid-template-rows: 1fr 5fr auto; */
  width: 300px;
  height: fit-content;
  background-color: var(--fundo-card);
  color: var(--color-text-1);
  border-radius: 20px !important;
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
  opacity: 1 !important;
  cursor: pointer !important;
}

.animacao {
  position: relative;
  overflow: hidden;
}

.confete {
  position: absolute;
  width: 540px;
}

.sol {
  z-index: 1;
}

.caixa-botoes {
  display: flex;
  gap: 10px;
  justify-content: right;
  padding: 10px auto;
}

.btn-proxima {
  font-family: 'Pixelify Sans';
  text-shadow: 1px 1px 2px rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  background-color: #f1bf18;
}

.btn-novamente {
  font-family: 'Pixelify Sans';
  color: rgb(0, 0, 0);
  border: 2px solid #f7c92e;
  background-color: #fff0b1;
}
</style>
