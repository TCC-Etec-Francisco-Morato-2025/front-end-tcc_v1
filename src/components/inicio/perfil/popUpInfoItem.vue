<script setup lang="ts">
import type { Item } from 'src/types';

defineProps<{
  item: Item;
}>();
</script>

<template>
  <q-popup-proxy>
    <q-card flat>
      <q-card-section class="row no-wrap q-gutter-md items-center">
        <q-avatar
          style="
            background-color: rgb(var(--cor-principal-2), 0.1);
            border: 1px solid rgb(var(--cor-principal-3));
          "
          :icon="item.icon"
          size="60px"
          rounded
        />
        <div class="title-fit">{{ item.nome }}</div>
      </q-card-section>

      <q-card-section>
        <div class="text-h6" style="color: rgb(var(--cor-principal-1))">Descrição:</div>
        <p class="text-body2">
          {{ item.descricao }}
        </p>
      </q-card-section>

      <q-card-section>
        <div class="q-pa-md content-habilidade">
          <div class="">
            <div class="row items-center q-gutter-sm">
              <q-avatar
                style="border: 1px solid rgb(var(--cor-principal-3)); border-radius: 10px"
                icon="sym_o_bolt"
                size="40px"
              />
              <div class="text-h6">Habilidade</div>
            </div>
          </div>
          <div class="q-pt-md q-gutter-sm">
            <div class="text-h6" style="font-size: 18px;">
              {{ item.habilidadeTitulo }}
            </div>
            <div class="text-body2">
              {{ item.habilidade }}
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-popup-proxy>
</template>

<style scoped>
.q-card {
  border-radius: 15px;
  background: var(--color-background-4);
}

.content-habilidade {
  border-radius: 10px;
  border: 1px solid rgb(var(--cor-principal-3));
  background-color: rgba(var(--cor-principal-3), 0.3);
}

.title-fit {
  font-size: clamp(12px, 1.3rem, 1.5rem);
  word-wrap: break-word;
  white-space: normal;
  font-weight: 600;
}
</style>
