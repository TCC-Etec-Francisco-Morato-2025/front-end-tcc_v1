<script setup lang="ts">
import { useQuasar } from 'quasar';
import { nextTick, onBeforeUnmount, ref, watch } from 'vue';
import type { QFile } from 'quasar';
import videojs from 'video.js';
import useAulasStore from 'src/stores/materias/aulasStore';
import usePopUpStore from 'src/stores/popUp';
import popUpCreateQuestaoComponent from './popUpCreateQuestaoComponent.vue';
import popUpEditQuestaoComponent from '../edit/popUpEditQuestaoComponent.vue';
import usePersonagensStore from 'src/stores/materias/atividades/personagensStore';

interface Intro {
  intro: string;
  personagem: OptionsPersonagem;
}
interface OptionsPersonagem {
  label: string;
  img: string;
  materia:string;
  value: string;
}
interface OptionsAula {
  label: string;
  value: string;
}
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

const $q = useQuasar();
const indexEdit = ref(0);
const questaoEdit = ref<QuestaoCreate>({
  pergunta: '',
  perguntaFacil: '',
  tempo: 0,
  respostas: [],
});
const questaoDefault = ref<QuestaoCreate>({
  pergunta: '',
  perguntaFacil: '',
  tempo: 0,
  respostas: [],
});

// variaveis do video
const inputVideo = ref<InstanceType<typeof QFile> | null>(null);
let player: ReturnType<typeof videojs> | null = null;
const urlVideo = ref('');
const videoPreview = ref<HTMLVideoElement | null>(null);
const tempoAtual = ref('00:00');
const videoKey = ref(0);

const slide = ref('fase1');
const optionsAula = ref<OptionsAula[]>([]);
const optionsPersonagem = ref<OptionsPersonagem[]>([]);
const optionsVida = ref([
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
]);

// pinias
const aulasStore = useAulasStore();
const popUpStore = usePopUpStore();
const personagensStore = usePersonagensStore();

// variaveis para o que o usuário mandar
const nome = ref('');
const descricao = ref('');
const aula = ref('');
const vida = ref(1);
const video = ref<File | null>(null);
const questoes = ref<QuestaoCreate[]>([]);
const introducao = ref<Intro[]>([]);

// definir opções do select
aulasStore.aulas.map((a) => {
  const newOption: OptionsAula = {
    label: a.titulo,
    value: a.id,
  };
  optionsAula.value.push(newOption);
});
personagensStore.personagens.map((p) => {
  const newOption: OptionsPersonagem = {
    label: p.nome,
    img: p.img,
    materia: p.materia,
    value: p.id,
  };
  optionsPersonagem.value.push(newOption);
});

const addIntro = () =>{
  const newIntro: Intro = {
    intro:'',
    personagem: {} as OptionsPersonagem
  };
  introducao.value.push(newIntro);
}

const removeIntro = (index: number) => {
  introducao.value.splice(index, 1);
};

const mensagemAlert = () => {
  let mensagem: string;

  if (!nome.value) {
    mensagem = 'Você precisa dar um nome ao item';
  } else if (!descricao.value) {
    mensagem = 'você precisa dar uma descrição ao item';
  } else {
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

// função para pegar o video
const getVideo = () => {
  if (inputVideo.value) {
    inputVideo.value.pickFiles();
  }
};

// gerar URL
watch(
  () => video.value,
  () => {
    if (video.value) {
      if (urlVideo.value) {
        URL.revokeObjectURL(urlVideo.value);
      }
      urlVideo.value = URL.createObjectURL(video.value);
      videoKey.value++;
      void initializeVideoPlayer();
    }
  }
);

// inicializar o video
const initializeVideoPlayer = async () => {
  await nextTick();

  if (!videoPreview.value || !urlVideo.value) {
    return;
  }

  if (player) {
    player.dispose();
  }

  player = videojs(videoPreview.value, {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: urlVideo.value,
        type: 'video/mp4',
      },
    ],
  });

  player.load();
  tempoAtual.value = '0000';

  player.on('timeupdate', () => {
    const currentTime = player?.currentTime();

    if (currentTime !== undefined) {
      questaoDefault.value.tempo = Math.floor(currentTime);
      tempoAtual.value = formatarTempo(currentTime);
    }
  });
};

const formatarTempo = (totalSegundos: number) => {
  const minutos = Math.floor(totalSegundos / 60);
  const segundos = Math.floor(totalSegundos % 60);

  const minutosFormatados = String(minutos).padStart(2, '0');
  const segundosFormatados = String(segundos).padStart(2, '0');

  return `${minutosFormatados}:${segundosFormatados}`;
};

const editTempo = (tempo: number) => {
  let tempoAtualVideo = player?.currentTime();

  if (tempoAtualVideo !== undefined) tempoAtualVideo += tempo;
  player?.currentTime(tempoAtualVideo);
};

// conf questao
const addQuestao = (newQuestao: QuestaoCreate) => {
  questoes.value.push(newQuestao);
};
const createQuestao = () => {
  player?.pause();
  questaoDefault.value.pergunta = '';
  questaoDefault.value.perguntaFacil = '';
  questaoDefault.value.respostas = [
    {
      resposta: '',
      isTrue: true,
    },
    {
      resposta: '',
      isTrue: false,
    },
  ];
  popUpStore.toggleCreateQuestaoPopUp();
};
const editQuestao = (questao: QuestaoCreate, index: number) => {
  player?.pause();
  questaoEdit.value = questao;
  indexEdit.value = index;
  popUpStore.toggleEditQuestaoPopUp()
};
const editarQuestao = (questao: QuestaoCreate, index: number) => {
  if (questao)
    questoes.value[index] = questao;
  void player?.play();
}
const deleteQuestao = (index: number) => {
  questoes.value.splice(index, 1);
};


onBeforeUnmount(() => {
  if (player) player.dispose();
  if (urlVideo.value) {
    URL.revokeObjectURL(urlVideo.value);
  }
});
</script>

<template>
  <q-dialog v-model="popUpStore.createAtividadePopUp" :maximized="popUpStore.createAtividadePopUp">
    <pop-up-edit-questao-component @questao-editada="editarQuestao" :questao="questaoEdit" :index="indexEdit" />
    <pop-up-create-questao-component @questao-criada="addQuestao" :questao="questaoDefault" />
    <div class="popUp">
      <h2 ref="text4" class="titulo">Vamos criar uma nova Atividade</h2>
      <q-carousel v-model="slide" transition-prev="scale" transition-next="scale" animated>
        <q-carousel-slide name="fase1" class="box-carac center">
          <q-select v-model="aula" :options="optionsAula" behavior="menu" dark outlined bottom-slots>
            <template v-slot:prepend>
              <span style="font-size: 1.2rem"> Aula: </span>
            </template>
            <template v-slot:append>
              <q-icon name="menu_book" />
            </template>
          </q-select>

          <q-input class="nome" v-model="nome" label="Nome:" dense outlined standout />

          <q-input class="descricao" label="descrição" v-model="descricao" autogrow outlined />

          <q-select v-model="vida" :options="optionsVida" label="Quantidade de vidas:" type="number" outlined />
        </q-carousel-slide>

        <!-- criando a introdução -->
        <q-carousel-slide name="fase2">
          <div class="introducao center">
            <div class="intro center" v-for="(intro, indexOf) in introducao" :key="indexOf">
              <q-input v-model="intro.intro" label="Introduçao:" outlined />
              <q-select v-model="intro.personagem" :options="optionsPersonagem" behavior="menu" dark outlined bottom-slots>
                <template v-slot:prepend>
                  <span style="font-size: 1.2rem"> Personagem: </span>
                </template>
                <template v-slot:append>
                  <q-img :src="intro.personagem.img" v-if="intro.personagem.img"/>
                  <q-icon name="sym_o_background_replace" v-else/>
                </template>
                <template v-slot:option="p">
                  <q-item v-bind="p.itemProps">
                    <q-item-section avatar>
                      <q-img :src="p.opt.img" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ p.opt.label }}</q-item-label>
                      <q-item-label caption>Professor de {{ p.opt.materia }}</q-item-label>
                    </q-item-section>
                    <q-img src="/src/assets/personagens/A.png"/>
                  </q-item>
                </template>
              </q-select>
              <div class="center" style="gap: 10px">
                <q-btn icon="add" color="green" @click="addIntro()"/>
                <q-btn icon="remove" color="red" @click="removeIntro(introducao.length - 1)"
                  v-if="introducao.length > 2" />
              </div>
            </div>
          </div>
        </q-carousel-slide>

        <!-- criando video para  a atividade -->
        <q-carousel-slide name="fase3">
          <section align="center" class="section-video">
            <q-responsive ref="boxPlayer" :ratio="16 / 9">
              <q-file ref="inputVideo" v-model="video" style="display: none" type="file" accept="video/*" />
              <div style="border: 2px solid; border-radius: 20px" class="center" @click="getVideo()" v-if="!urlVideo">
                <q-icon name="sym_o_video_file" style="width: 100%" size="150px" />
              </div>
              <video ref="videoPreview" class="video-js vjs-big-play-centered" :key="videoKey" v-else>
                <source />
              </video>
            </q-responsive>
            <q-btn class="btn-trocar-video" :label="urlVideo ? 'trocar video' : 'adicionar video'"
              :icon-right="urlVideo ? 'sync' : 'upload'" @click="getVideo()" push />
          </section>
          <section class="section-info center" style="flex-direction: column; margin-top: 40px; gap: 30px" v-if="video">
            <div class="control-tempo center" style="flex-direction: column; gap: 15px">
              <div class="box-tempo-video">Tempo: {{ tempoAtual }}</div>
              <div class="center" style="gap: 10px">
                <q-btn label="- 5s" @click="editTempo(-5)" no-caps round outline />
                <q-btn label="- 1s" @click="editTempo(-1)" no-caps round outline />
                <q-btn label="+1s" @click="editTempo(1)" no-caps round outline />
                <q-btn label="+5s" @click="editTempo(5)" no-caps round outline />
              </div>
            </div>
            <div class="questoes">
              <q-btn class="btn-add-questoes" label="adicionar questoes" icon-right="add" @click="createQuestao()" flat
                rounded />
              <q-list class="questoes-criadas">
                <q-item v-for="(questao, indexOf) in questoes" :key="indexOf">
                  <q-item-section>
                    <q-item-label lines="1">
                      {{ questao.pergunta }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section class="center" side>
                    <q-item-label top>
                      {{ formatarTempo(questao.tempo) }}
                    </q-item-label>
                    <div>
                      <q-btn icon="sym_o_edit_square" @click="editQuestao(questao, indexOf)" dense flat />
                      <q-btn icon="sym_o_delete" color="red" @click="deleteQuestao(indexOf)" dense flat />
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </section>
        </q-carousel-slide>
      </q-carousel>

      <div class="btn center">
        <q-btn label="próxima" icon-right="keyboard_double_arrow_right" color="green"
          @click="slide = slide == 'fase2' ? 'fase3' : 'fase2'" push rounded v-if="slide != 'fase3'" />
        <q-btn label="Voltar" icon="keyboard_double_arrow_left" color="orange-4"
          @click="slide = slide == 'fase1' ? 'fase2' : 'fase1'" push rounded v-if="slide != 'fase1'" />
        <q-btn label="enviar" color="green" @click="mensagemAlert()" push rounded v-if="slide == 'fase3'" />
        <q-btn label="cancelar" color="red" @click="popUpStore.toggleCreateAtividadePopUp()" push rounded />
      </div>
    </div>
  </q-dialog>
</template>

<style scoped>
.disabled,
.disabled *,
[disabled],
[disabled] * {
  opacity: 1 !important;
  cursor: pointer !important;
}

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
  font-size: 2.8rem;
}

.btn {
  margin-top: 30px;
  gap: 10px;
}

.q-carousel {
  background-color: transparent;
  height: auto;
}

.nome {
  min-width: 300px;
}

.descricao {
  min-width: 300px;
}

.q-input {
  max-width: 500px;
}

.q-select {
  padding: 0;
  min-width: 300px;
  font-size: 1rem;
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

.btn-trocar-video {
  margin-top: 20px;
  background-color: var(--cor-principal-3);
}

.box-tempo-video {
  text-align: center;
  padding: 10px;
  border: 1px solid;
  border-radius: 5px;
  font-size: 1.3rem;
}

.btn-add-questoes {
  font-size: 1.3rem;
  width: 300px;
  font-family: 'Baloo 2';
  border: 2px dotted;
}

.questoes-criadas {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  gap: 20px;
}

.questoes-criadas .q-item {
  border: 1px solid;
  border-radius: 10px;
  max-width: 80dvw;
  width: 400px;
}
</style>
