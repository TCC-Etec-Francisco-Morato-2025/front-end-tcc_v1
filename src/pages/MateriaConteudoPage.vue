<script setup lang="ts">
import type { Assunto, Atividade } from 'src/types';
import { defineAsyncComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import assuntoComponent from '../components/materias/assuntoComponent.vue';
import popupAtividade from 'src/components/materias/popupAtividade.vue';
import useAtividadesStore from 'src/stores/materias/atividadesStore';
import useMateriaStore from 'src/stores/materias/materiaStore';
import useAssuntosStore from 'src/stores/materias/assuntosStore';
import setaIcon from 'components/icons/setaIcon.vue';

const atividadesStore = useAtividadesStore();
const atividadesPesquisa = ref<Atividade[]>([])
const materiaStore = useMateriaStore();
const assuntosStore = useAssuntosStore();
const assuntos = ref<Assunto[]>([]);
const router = useRouter();
const txtPesquisa = ref('');
const pesquisando = ref(false);

const pesquisa = ()=>{
  setTimeout(()=>{
    pesquisando.value = true
  },300);
  if(txtPesquisa.value != '')
  atividadesStore.atividades.forEach((el)=>{
    if(el.proxima==true || el.estrelas>0){
      if(el.titulo.toLowerCase().trim().includes(txtPesquisa.value.toLowerCase().trim())){
        atividadesPesquisa.value.push(el)
      }
    }
  });
}

const voltar = () => {
  router.push('/materias').catch((error) => {
    // Adicione um .catch() aqui
    console.error('Erro ao navegar:', error);
  });
};

// laço de repção feito para encontrar o assunto que se encaixe nessa matéria
assuntosStore.assuntos.forEach((el) => {
  if (el.materia == materiaStore.id) {
    assuntos.value.push(el);
  }
});

const icone_materia = defineAsyncComponent(
  () => import(`components/icons-materias/${materiaStore.icon}.vue`)
);
</script>

<template>
  <q-page id="pg-materia-conteudo">
    <header>
      <q-btn
        :style="`background-color: ${materiaStore.cor}; color: ${materiaStore.textColor};`"
        class="titulo"
        @click="voltar"
        no-caps
        push
      >
        <div class="titulo-seta">
          <seta-icon :direcao="90" :cor="materiaStore.textColor" />
        </div>
        <div class="titulo-nome center">
          <div class="icon">
            <component :is="icone_materia" />
          </div>
          <h1>{{ materiaStore.nome }}</h1>
        </div>
      </q-btn>
      <div class="pesquisa">
        <q-input v-model="txtPesquisa" label="Pesquisar atividade" @input="pesquisa">
          <template v-slot:append>
            <q-icon v-if="txtPesquisa === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="txtPesquisa = ''" />
          </template>
        </q-input>
      </div>
    </header>
    <q-main>
      <!-- popup que aparece sobre a atividade antes dela começar -->
      <popup-atividade />
      <q-list>
        <q-intersection transition="scale" v-for="assunto in assuntos" :key="assunto.id" once>
          <assunto-component :id="assunto.id" :cor="materiaStore.cor" :nome="assunto.nome" :textColor="materiaStore.textColor" v-if="!pesquisando"/>
        </q-intersection>
      </q-list>
    </q-main>
  </q-page>
</template>

<style scoped>
#pg-materia-conteudo {
  display: flex;
  flex-direction: column;
  padding: 40px 25px 0 25px;
  gap: 40px;
  background: linear-gradient(-20deg, var(--color-background-4) 10%, var(--color-background) 70%);
}

header {
  display: contents;
}

.border {
  border-radius: 100px !important;
}

.titulo {
  width: 100%;
  height: 100px;
  border-radius: 20px;
  transition: background-color 0.2s ease, transform 0.1s ease;
  cursor: pointer; /* Indica que é clicável */
}

.titulo .titulo-nome {
  margin-right: 35px;
  gap: 10px;
  flex-grow: 1;
}
.titulo div h1 {
  font-size: 40px;
}
.titulo .titulo-seta {
  height: 20px;
}
.titulo .icon {
  width: 70px;
}

.pesquisa {
  padding: 0 30px;
}

.q-list {
  display: contents;
  gap: 15px;
}
li {
  list-style: none;
}

.border {
  border-radius: 100px !important;
}
</style>
