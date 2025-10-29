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
  respostas?: RespostaCreate[];
}

interface Prop {
  questao: QuestaoCreate;
  index: number;
}

const props = defineProps<Prop>();
const questao = props.questao
const emit = defineEmits<{
  questaoEditada: [QuestaoCreate, number];
}>();
const $q = useQuasar();
const popUpStore = usePopUpStore();
const respostaCorreta = ref(0);

const removeResposta = (key: number) => {
  if (questao.respostas && key >= 0 && key < questao.respostas.length) {
    questao.respostas.splice(key, 1);
  }
};

const mudarCerta = (resposta: RespostaCreate) => {
  questao.respostas?.forEach((el) => (el.isTrue = false));
  resposta.isTrue = true;
};

const addResposta = () => {
  if(!questao.respostas)return
  if (questao.respostas.length >= 4) return;
  const newResposta: RespostaCreate = { resposta: '', isTrue: false };
  questao.respostas.push(newResposta);
};

const editQuestao = () => {
  let mensagem = '';

  if (!questao.pergunta) {
    mensagem = 'Falta escrever a pergunta';
  } else if (!questao.perguntaFacil) {
    mensagem = 'Falta escrever a pergunta facilitada';
  } else if (questao.respostas?.some((a) => !a.resposta)) {
    mensagem = 'Falta preencher alguma resposta';
  } else {
  if(!questao.respostas)return
    const newQuestao: QuestaoCreate = {
      pergunta: questao.pergunta,
      perguntaFacil: questao.perguntaFacil,
      respostas: questao.respostas,
      tempo: questao.tempo,
    };

    emit('questaoEditada', newQuestao, 1);
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
      <q-input v-model="questao.pergunta" label="Pergunta:" outlined />
      <q-input v-model="questao.perguntaFacil" label="Pergunta facilitada:" outlined />
      <section class="respostas center">
        <div
          class="resposta center"
          v-for="(resposta, indexOf) in questao.respostas"
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
            v-if="questao.respostas&&questao.respostas.length < 4"
          />
          <q-btn
            icon="remove"
            color="red"
            @click="removeResposta(questao.respostas?.length - 1)"
            v-if="questao.respostas&&questao.respostas?.length > 2"
          />
        </div>
        <div class="box-resposta-correta" v-if="questao.respostas">
          Resposta Correta: {{
            questao.respostas[respostaCorreta]?.resposta
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
