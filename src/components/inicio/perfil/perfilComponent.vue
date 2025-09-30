<script setup lang="ts">
import { ref } from 'vue';
import type { Item } from 'src/types';
import usePopUpStore from 'src/stores/popUp';
import useUserStore from 'src/stores/userStore';
import useItensStore from 'src/stores/itens/itensStore';

const itensStore = useItensStore();
const popUpStore = usePopUpStore();
const itensUser = ref<Item[]>([]);
const userStore = useUserStore();
const newNome = ref(userStore.nome);

itensStore.atac.forEach((el) => {
  if (userStore.itens.some((el2) => el.id === el2.id)) {
    itensUser.value.push(el)
  }
});

itensStore.def.forEach((el) => {
  if (userStore.itens.some((el2) => el.id === el2.id)) {
    itensUser.value.push(el)
  }
});

itensStore.espec.forEach((el) => {
  if (userStore.itens.some((el2) => el.id === el2.id)) {
    itensUser.value.push(el)
  }
});
</script>

<template>
  <q-dialog v-model="popUpStore.perfil" :maximized="popUpStore.perfil">
    <q-card>
      <q-card-actions align="right">
        <q-btn icon="close" color="red" size="12px" round @click="popUpStore.togglePerfil()" />
      </q-card-actions>
      <q-card-section align="center" >
        <!-- avatar -->
        <q-avatar size="30px">
          <!-- se o usuário estiver logado, ele mostra a imagem de perfil -->
          <img :src="userStore.perfil" alt="" />
          <!-- se não, ele mostra uma imagem padrão -->
        </q-avatar>

        <!-- nome de usuário -->
        <div style="cursor: pointer;margin-top: 10px;">
          {{ userStore.nome }}
          <q-popup-edit v-model="newNome" auto-save v-slot="scope">
            <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
          </q-popup-edit>
        </div>
      </q-card-section>
      <q-card-actions align="center" vertical>
        <h2 class="tag-itens">Itens Adquiridos</h2>
        <div class="box-item center">
          <q-btn class="itens" v-for="(item, indexOf) in itensUser" :key="indexOf" :icon="item.icon" size="20px" round push color="amber-7"/>
        </div>
        <q-btn class="btn-vertudo" label="ver tudo" size="10px" icon-right="keyboard_arrow_right" flat align="right"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.q-card{
  background: linear-gradient(-30deg, var(--color-background-4) 10%, var(--color-background) 100%);
  padding: 10px;
}

.tag-itens{
  font-size: 2rem;
}

.box-item{
  gap: 10px;
}

.btn-vertudo{
  margin-top: 5px;
  align-self: flex-end;
}
</style>
