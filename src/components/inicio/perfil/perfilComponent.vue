<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue';
import usePopUpStore from 'src/stores/popUp';
import useUserStore from 'src/stores/userStore';
import useItensStore from 'src/stores/itens/itensStore';
import { QFile } from 'quasar';

const itensStore = useItensStore();
const popUpStore = usePopUpStore();
const itensAtac = ref(itensStore.atac);
const itensDef = ref(itensStore.def);
const itensEspec = ref(itensStore.espec);
const userStore = useUserStore();
const newNome = ref(userStore.nome);

const editImage = ref(true);
const imgPreview = ref('');
const imgItem = ref<File | null>(null);
const inputImg = ref<InstanceType<typeof QFile> | null>(null);

const mudarNome = async () => {
  userStore.nome = newNome.value;
  if (newNome.value)
    await userStore.mudarNome(newNome.value)
}

// mudar imagem
const enviarImg = async()=>{
  if(imgItem.value)
  await userStore.mudarImg(imgItem.value);
  editImage.value=false
}

const processImage = () => {
  if (imgItem.value) {
    if (imgPreview.value) {
      URL.revokeObjectURL(imgPreview.value);
    }

    imgPreview.value = URL.createObjectURL(imgItem.value);
    console.log('🖼️ Imagem selecionada:', imgItem.value.name);
  }
};
const selectImg = () => {
  if (inputImg.value) {
    inputImg.value.pickFiles();
  }
};
watch(() => imgItem.value, processImage);

itensStore.atac.forEach((el) => {
  if (userStore.itens)
    userStore.itens.some((el2, i) => {
      if (el2.id === el.id) {
        const item = itensAtac.value[i];
        itensAtac.value.splice(i, 1);
        if (item !== undefined) itensAtac.value.unshift(item);
      }
    });
});

itensStore.def.forEach((el) => {
  if (userStore.itens)
    userStore.itens.some((el2, i) => {
      if (el2.id === el.id) {
        const item = itensDef.value[i];
        itensDef.value.splice(i, 1);
        if (item !== undefined) itensDef.value.unshift(item);
      }
    });
});

itensStore.espec.forEach((el) => {
  if (userStore.itens)
    userStore.itens.some((el2, i) => {
      if (el2.id === el.id) {
        const item = itensEspec.value[i];
        itensEspec.value.splice(i, 1);
        if (item !== undefined) itensEspec.value.unshift(item);
      }
    });
});

onBeforeUnmount(() => {
  // Limpar URL da imagem
  if (imgPreview.value) {
    URL.revokeObjectURL(imgPreview.value);
  }
});
</script>

<template>
  <q-dialog v-model="popUpStore.perfil" :maximized="popUpStore.perfil">
    <q-card>
      <q-card-actions align="right">
        <q-btn icon="close" color="red" size="12px" round @click="popUpStore.togglePerfil()" />
      </q-card-actions>
      <q-card-section align="center">
        <!-- avatar -->
        <q-avatar size="100px" @click="editImage = true" style="cursor: pointer;">
          <!-- se o usuário estiver logado, ele mostra a imagem de perfil -->
          <img :src="userStore.foto" alt="" v-if="userStore.foto" />
        </q-avatar>
        <q-dialog v-model="editImage">
          <q-card style="width: 300px;">
            <q-btn icon="close" @click="editImage = false" align="right" dense flat rounded/>
            <q-card-section align="center">
              <q-file ref="inputImg" v-model="imgItem" style="display: none" type="file" accept=".png" />
              <q-avatar size="150px">
                <q-img :src="userStore.foto" alt="" v-if="userStore.foto && !imgPreview"/>
                <q-img :src="imgPreview" v-if="imgPreview"/>
              </q-avatar>
              <q-card-actions align="center">
                <q-btn label="Trocar Imagem" align="center" color="orange-6" icon-right="sync" @click="selectImg()" dense no-caps rounded/>
              </q-card-actions>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn label="Cancelar" color="red" dense no-caps/>
              <q-btn label="Pronto" color="green" @click="enviarImg()" dense no-caps/>
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- nome de usuário -->
        <div style="cursor: pointer; margin-top: 10px">
          {{ userStore.nome }}<q-btn icon="sym_o_edit_square" dense size="10px" />
          <q-popup-edit v-model="newNome" auto-save v-slot="scope" @before-hide="mudarNome()">
            <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
          </q-popup-edit>
        </div>
      </q-card-section>
      <q-card-actions class="box-itens center" align="left" vertical>
        <h2 class="tag-itens">Itens do Jogo:</h2>
        <div class="nome-itens atac">
          Itens de Ataque
        </div>
        <div class="box-item center">
          <q-btn class="itens" v-for="(item, indexOf) in itensAtac" :key="indexOf" :icon="item.icon" size="20px" round
            push />
        </div>
        <div class="nome-itens def">
          Itens de Defesa
        </div>
        <div class="box-item center">
          <q-btn class="itens" v-for="(item, indexOf) in itensDef" :key="indexOf" :icon="item.icon" size="20px" round
            push />
        </div>
        <div class="nome-itens espec">
          Itens Especiais
        </div>
        <div class="box-item center">
          <q-btn class="itens" v-for="(item, indexOf) in itensEspec" :key="indexOf" :icon="item.icon" size="20px" round
            push />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.q-card {
  background: linear-gradient(-30deg, var(--color-background-4) 10%, var(--color-background) 100%);
  padding: 10px;
}

.tag-itens {
  font-family: 'Pixelify Sans';
  align-self: flex-start;
  font-size: 1.5rem;
}

.box-itens {
  margin: 25px 0;
  font-size: 1.2rem;
  font-family: Handjet;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px;
}

.box-item {
  gap: 10px;
}

.q-btn.itens {
  background-color: var(--color-background);
}

/* nomes das classes dos itens */
.nome-itens {
  text-align: center;
  width: 100%;
}

.nome-itens.atac {
  background-color: var(--cor-principal-1);
}

.nome-itens.def {
  background-color: var(--cor-principal-3);
}

.nome-itens.espec {
  background-color: var(--cor-principal-2);
}


.btn-vertudo {
  margin-top: 5px;
  align-self: flex-end;
}
</style>
