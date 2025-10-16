<script setup lang="ts">
import { useQuasar } from 'quasar';
import { onBeforeUnmount, ref, watch } from 'vue';
import type { QFile } from 'quasar';
import videojs from 'video.js';
import useMateriasStore from 'src/stores/materias/materiasStore';
import usePopUpStore from 'src/stores/popUp';

interface Options {
  label: string;
  value: string;
}

const $q = useQuasar();
const inputVideo = ref<InstanceType<typeof QFile> | null>(null);
let player: ReturnType<typeof videojs> | null = null;
const urlVideo = ref('');
const videoPreview = ref<HTMLVideoElement | null>(null);

const slide = ref('fase1');
const optionsMateria = ref<Options[]>([]);
const optionsVida = ref([
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
]);

// pinias
const materiasStore = useMateriasStore();
const popUpStore = usePopUpStore();

// variaveis para o que o usuário mandar
const nome = ref('');
const descricao = ref('');
const materia = ref('');
const vida = ref(1);
const video = ref<File | null>(null);

// definir opções do select
materiasStore.materias.map((e) => {
  const newOption = {
    label: e.nome,
    value: e.id,
  };
  optionsMateria.value.push(newOption);
});

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
      initializeVideoPlayer();
    }
  }
);

// inicializar o video
const initializeVideoPlayer = () => {
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
  });

  player.src({
    src: urlVideo.value,
    type: 'video/mp4'
  });
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
    <div class="popUp">
      <h2 ref="text4" class="titulo">Vamos criar uma nova Atividade</h2>
      <q-carousel v-model="slide" transition-prev="scale" transition-next="scale" animated>
        <q-carousel-slide name="fase1" class="box-carac center">
          <q-select v-model="materia" :options="optionsMateria" dark outlined bottom-slots>
            <template v-slot:prepend>
              <span style="font-size: 1.2rem"> Materia: </span>
            </template>
            <template v-slot:append>
              <q-icon name="menu_book" />
            </template>
          </q-select>

          <q-input class="nome" v-model="nome" label="Nome:" dense outlined standout />

          <q-input class="descricao" label="descrição" v-model="descricao" autogrow outlined />

          <q-select
            v-model="vida"
            :options="optionsVida"
            label="Quantidade de vidas:"
            type="number"
            outlined
          />
        </q-carousel-slide>
        <q-carousel-slide name="fase2">
          <q-responsive ref="boxPlayer" :ratio="16 / 9">
            <q-file
              ref="inputVideo"
              v-model="video"
              style="display: none"
              type="file"
              accept="video/*"
            />
            <div
              style="border: 2px solid var(--color-background-3); border-radius: 20px"
              class="center"
              @click="getVideo()"

            >
              <q-icon name="sym_o_video_file" style="width: 100%" size="150px" />
            </div>
            <video ref="videoPreview" class="video-js vjs-big-play-centered">
              <source/>
            </video>
          </q-responsive>
        </q-carousel-slide>
      </q-carousel>

      <div class="btn center">
        <q-btn
          label="próxima"
          icon-right="keyboard_double_arrow_right"
          color="green"
          @click="slide = 'fase2'"
          push
          rounded
          v-if="slide == 'fase1'"
        />
        <q-btn
          label="Voltar"
          icon="keyboard_double_arrow_left"
          color="orange-4"
          @click="slide = 'fase1'"
          push
          rounded
          v-if="slide == 'fase2'"
        />
        <q-btn
          label="enviar"
          color="green"
          @click="mensagemAlert()"
          push
          rounded
          v-if="slide == 'fase2'"
        />
        <q-btn
          label="cancelar"
          color="red"
          @click="popUpStore.togglecreateAtividadePopUp()"
          push
          rounded
        />
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
</style>
