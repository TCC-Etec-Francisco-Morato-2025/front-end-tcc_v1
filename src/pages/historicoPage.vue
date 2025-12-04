<script setup lang="ts">
import { useRouter } from 'vue-router';

import carrocelHistorico from 'src/components/historico/carrocelHistorico.vue';
import carrocelContinuarComponent from 'src/components/inicio/carrocels/continuar/carrocelContinuarComponent.vue';
import useAtividadesStore from 'src/stores/materias/atividadesStore';

const router = useRouter();
const atividadesStore = useAtividadesStore();
</script>

<template>
  <q-page>
    <header class="q-pa-md">
      <q-btn
        class="wipe-transition"
        icon="arrow_back"
        label="Histórico"
        @click="router.push('/')"
        size="17px"
        push
        no-caps
      />
    </header>
    <main>
      <section class="q-pt-lg" >
        <div class="text-h5 q-pl-md row items-center">
          <div class="content-icon-play row content-center justify-center q-mr-sm">
            <q-icon name="sym_o_play_circle" size="30px" />
          </div>
          <div>
            Continuar
            <div class="text-caption text-gray-3">
              {{ atividadesStore.ativContinuar.length }} atividades em andamento
            </div>
          </div>
          <carrocel-continuar-component />
        </div>
      </section>
      <section>
        <div class="text-h5 q-pl-md row items-center">
          <div class="content-icon-play row content-center justify-center q-mr-sm">
            <q-icon name="sym_o_play_circle" size="30px" />
          </div>
          <div>
            Continuar
            <div class="text-caption text-gray-3">
              {{ atividadesStore.ativConcluidas.length }} atividades em andamento
            </div>
          </div>
          <carrocel-historico />
        </div>
      </section>
    </main>
  </q-page>
</template>

<style lang="scss" scoped>
header {
  .q-btn {
    background: linear-gradient(
      80deg,
      transparent 25%,
      rgb(var(--cor-principal-3)) 85%,
      transparent 100%
    );
    background-size: 400% 100%;
    box-shadow: 0 5px 5px 0px rgb(0, 0, 0);
    animation: gradientShift 3s ease infinite;
  }

  @keyframes gradientShift {
    from {
      background-position: 0% 0%; /* Começa com o gradiente totalmente à esquerda */
    }
    to {
      background-position: 135% 0%; /* Move o gradiente para a esquerda, revelando o "novo" da direita */
    }
  }
}
.content-icon-play {
  border-radius: 10px;
  width: 50px;
  height: 50px;
  background-color: rgb(var(--cor-principal-1));
}
</style>
