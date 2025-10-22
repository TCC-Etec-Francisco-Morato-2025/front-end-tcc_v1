<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';
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
  respostas: RespostaCreate[];
}

interface Prop {
  questao: QuestaoCreate;
  index: number;
}

const props = defineProps<Prop>();
const emit = defineEmits<{
  questaoEditada: [QuestaoCreate, number];
}>();
const $q = useQuasar();
const popUpStore = usePopUpStore();
const respostaCorreta = ref(0);

const removeResposta = (key: number) => {
  if (props.questao.respostas && key >= 0 && key < props.questao.respostas.length) {
    props.questao.respostas.splice(key, 1);
  }
};

const mudarCerta = (resposta: RespostaCreate) => {
  props.questao.respostas.forEach((el) => (el.isTrue = false));
  resposta.isTrue = true;
};

const addResposta = () => {
  if (props.questao.respostas.length >= 4) return;
  const newResposta: RespostaCreate = { resposta: '', isTrue: false };
  props.questao.respostas.push(newResposta);
};

const editQuestao = () => {
  let mensagem = '';

  if (!props.questao.pergunta) {
    mensagem = 'Falta escrever a pergunta';
  } else if (!props.questao.perguntaFacil) {
    mensagem = 'Falta escrever a pergunta facilitada';
  } else if (props.questao.respostas.some((a) => !a.resposta)) {
    mensagem = 'Falta preencher alguma resposta';
  } else {
    const newQuestao: QuestaoCreate = {
      pergunta: props.questao.pergunta,
      perguntaFacil: props.questao.perguntaFacil,
      respostas: props.questao.respostas,
      tempo: props.questao.tempo,
    };

    emit('questaoEditada', newQuestao, props.index);
    popUpStore.toggleEditQuestaoPopUp();
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
  <q-dialog v-model="popUpStore.editQuestaoPopUp" :maximized="popUpStore.editQuestaoPopUp">
    <div class="create-questao center">
      <h1>Crie a sua Questão</h1>
      <q-input v-model="props.questao.pergunta" label="Pergunta:" outlined />
      <q-input v-model="props.questao.perguntaFacil" label="Pergunta facilitada:" outlined />
      <section class="respostas center">
        <div
          class="resposta center"
          v-for="(resposta, indexOf) in props.questao.respostas"
          :key="indexOf"
        >
          <q-input v-model="resposta.resposta" label="Resposta:" outlined />
          <q-radio v-model="respostaCorreta" :val="indexOf" @click="mudarCerta(resposta)" />
        </div>
        <div class="center" style="gap: 10px">
          <q-btn
            icon="add"
            color="green"
            @click="addResposta()"
            v-if="props.questao.respostas?.length < 4"
          />
          <q-btn
            icon="remove"
            color="red"
            @click="removeResposta(props.questao.respostas?.length - 1)"
            v-if="props.questao.respostas?.length > 2"
          />
        </div>
        <div class="box-resposta-correta">
          Resposta Correta: {{
            props.questao.respostas[respostaCorreta]?.resposta
            }}
        </div>
      </section>
      <q-btn size="20px" class="btn-criar" label="Pronto" @click="editQuestao()" />
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
