<script setup lang="ts">
import { useQuasar } from 'quasar';
import type { QFile } from 'quasar';
import { onBeforeUnmount, ref, watch } from 'vue';
import usePopUpStore from 'src/stores/popUp';

const $q = useQuasar();

// barra de progresso
const popUpStore = usePopUpStore();

// pegar a imagem
const imgPreview = ref('');
const inputImg = ref<InstanceType<typeof QFile> | null>(null);

// variaveis para o que o usuário mandar
const imgItem = ref<File | null>(null);
const nome = ref('');
const descricao = ref('');

const mensagemAlert = () => {
  let mensagem:string;

  if(!nome.value){
    mensagem='Você precisa dar um nome ao item'
  }else if(!descricao.value){
    mensagem='você precisa dar uma descrição ao item'
  }else if (!imgPreview.value){
    mensagem='você precisa dar uma imagem ao item'
  }else{
    return;
  }

  $q.notify({
    message: mensagem,
    color: 'warning',
    icon: 'sym_o_warning',
    position: 'bottom',
    timeout: 1500,
  });
};

const selectImg = () => {
  if (inputImg.value) {
    inputImg.value.pickFiles();
  }
};

const processImage = () => {
  if (imgItem.value) {
    if (imgPreview.value) {
      URL.revokeObjectURL(imgPreview.value);
    }

    imgPreview.value = URL.createObjectURL(imgItem.value);
    console.log('🖼️ Imagem selecionada:', imgItem.value.name);
  }
};

watch(() => imgItem.value, processImage);

// limpa ao desmontar componente
onBeforeUnmount(() => {
  // Limpar URL da imagem
  if (imgPreview.value) {
    URL.revokeObjectURL(imgPreview.value);
  }
});
</script>

<template>
  <q-dialog v-model="popUpStore.createItemPopUp" :maximized="popUpStore.createItemPopUp">
    <div class="popUp">
      <h2 ref="text4" class="titulo">Vamos criar um item</h2>
      <div class="box-carac center">
        <section>
          <h3>Selecione uma imagem:</h3>
          <q-file ref="inputImg" v-model="imgItem" style="display: none" type="file" accept=".png" />
          <div class="img center" :style="imgPreview ? 'border:none' : ''" @click="selectImg()">
            <q-img :src="imgPreview" v-if="imgPreview" :ratio="4 / 4" />
            <q-icon name="sym_o_cloud_upload" size="200px" v-else />
          </div>
        </section>

          <q-input class="nome" v-model="nome" label="Nome:" dense outlined standout/>

          <q-input class="descricao" label="descrição" v-model="descricao" autogrow outlined />

          <div class="btn">
            <q-btn label="enviar" color="green" @click="mensagemAlert()" push rounded/>
            <q-btn label="cancelar" color="red" @click="popUpStore.toggleCreateItemPopUp()" push rounded/>
          </div>
      </div>
    </div>
  </q-dialog>
</template>

<style scoped>
.popUp {
  width: 100%;
  padding: 40px 20px;
  background: linear-gradient(to top, var(--color-background-4) 10%, var(--color-background) 100%);
}

.descricao {
  width: 50%;
}
.titulo {
  text-align: center;
  font-family: 'Baloo 2';
  font-size: 3rem;
}
.btn {
  display: flex;
  align-self: center;
  gap: 10px;
}
.img {
  height: 300px;
  width: 300px;
  border: 2px solid var(--color-background-3);
  border-radius: 20px;
}

.nome{
  min-width: 300px;
}
.descricao{
  min-width: 300px;
}
.q-input{
  max-width: 500px;
}

.box-carac {
  margin-top: 50px;
  flex-direction: column;
  gap: 50px;
}
h3 {
  align-self: flex-start;
  font-size: 1.3rem;
}
</style>
