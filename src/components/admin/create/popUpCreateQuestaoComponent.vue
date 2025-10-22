<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref, watch } from 'vue';
import usePopUpStore from 'src/stores/popUp';

interface RespostaCreate {
  resposta: string;
  isTrue: boolean;
}
interface QuestaoCreate {
  id?: string;
  pergunta: string;
  perguntaFacil: string;
  tempo: number;
  tempoCronometro?: number;
  cronometro?: number;
  respostas?:RespostaCreate[];
}


interface Prop{
  questao:QuestaoCreate;
}

const props = defineProps<Prop>();
const emit = defineEmits<{
  questaoCriada: [QuestaoCreate];
}>();
const $q = useQuasar();
const popUpStore = usePopUpStore();
const pergunta = ref('');
const perguntaFacil = ref('');
const respostaCorreta = ref(0);
const respostas = ref<RespostaCreate[]>([]);

watch(()=>popUpStore.createQuestaoPopUp,()=>{
  pergunta.value=props.questao.pergunta
  perguntaFacil.value=props.questao.perguntaFacil
  if(props.questao.respostas!==undefined)
  respostas.value=props.questao.respostas
})

const removeResposta = (key: number) => {
  respostas.value.splice(key, 1);
};

const mudarCerta = (resposta: RespostaCreate) => {
  respostas.value.forEach((el) => (el.isTrue = false));
  resposta.isTrue = true;
};

const addResposta = () => {
  if(respostas.value.length>=4)return;
  const newResposta: RespostaCreate = {
    resposta: '',
    isTrue: false,
  };
  respostas.value.push(newResposta);
};

const criarQuestao = () => {
  let mensagem: string;

  if (pergunta.value == '') {
    mensagem = 'Falta escrever a pergunta';
  } else if (perguntaFacil.value == '') {
    mensagem = 'Falta escrever a pergunta facilitada';
  } else if (respostas.value.some((a) => a.resposta == '')) {
    mensagem = 'Falta preencher alguma resposta';
  } else {
    const newQuestao:QuestaoCreate = {
      pergunta: pergunta.value,
      perguntaFacil: perguntaFacil.value,
      respostas: respostas.value,
      tempo:props.questao.tempo
    };

    emit('questaoCriada',newQuestao)
    popUpStore.toggleCreateQuestaoPopUp();
    return;
  }

  $q.notify({
    message: mensagem,
    color: 'negative',
    icon: 'sym_o_warning',
    position: 'bottom',
    timeout: 1500,
  });
};
</script>

<template>
  <q-dialog v-model="popUpStore.createQuestaoPopUp" :maximized="popUpStore.createQuestaoPopUp">
    <div class="create-questao center">
      <h1>Crie a sua Questão</h1>
      <q-input v-model="pergunta" label="Pergunta:" outlined />
      <q-input v-model="perguntaFacil" label="Pergunta facilitada:" outlined />
      <section class="respostas center">
        <div class="resposta center" v-for="(resposta, indexOf) in respostas" :key="indexOf">
          <q-input v-model="resposta.resposta" label="Resposta:" outlined />
          <q-radio v-model="respostaCorreta" :val="indexOf" @click="mudarCerta(resposta)" />
        </div>
        <div class="center" style="gap: 10px">
          <q-btn icon="add" color="green" @click="addResposta()" v-if="respostas.length<4"/>
          <q-btn
            icon="remove"
            color="red"
            @click="removeResposta(respostas.length - 1)"
            v-if="respostas.length > 2"
          />
        </div>
        <div class="box-resposta-correta">
          Resposta Correta: {{ respostas[respostaCorreta]?.resposta }}
        </div>
      </section>
      <q-btn size="20px" class="btn-criar" label="criar" @click="criarQuestao()" />
    </div>
  </q-dialog>
</template>

<style scoped>
.create-questao {
  flex-direction: column;
  background-color: black;
  padding: 20px;
  gap: 40px;
}
.q-input {
  max-width: 400px;
  width: 100%;
}
h1 {
  text-align: center;
  font-family: 'Baloo 2';
  font-size: 4.3rem;
}
.btn-criar {
  font-family: 'Baloo 2';
  width: 250px;
  border-radius: 10px;
  background-color: var(--cor-principal-1);
}

.respostas {
  width: 100%;
  flex-direction: column;
  gap: 20px;
}
.resposta {
  width: 100%;
}
.box-resposta-correta {
  border-radius: 5px;
  padding: 15px;
  text-align: center;
  border: 1px solid;
}
</style>
