<script setup lang="ts">
import { useQuasar } from 'quasar';
import type { QFile } from 'quasar';
import type { Swiper as SwiperClass } from 'swiper';
import { onBeforeUnmount, ref, watch, nextTick, onMounted } from 'vue';
import usePopUpStore from 'src/stores/popUp';
import SplitType from 'split-type';
import { gsap } from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';

const $q = useQuasar();

// swiper
const swiperInstance = ref<SwiperClass | null>(null);
const modules = [Navigation];

// barra de progresso
const popUpStore = usePopUpStore();
const progressive = ref(0.1);

// animação
const text1 = ref<HTMLElement | null>(null);

// pegar a imagem
const imgItem = ref<File | null>(null);
const inputImg = ref<InstanceType<typeof QFile> | null>(null);

// variaveis para o que o usuário mandar
const nome = ref('');
const descricao = ref('');
const imgPreview = ref('');

// 🔥 NOVAS REFS PARA CONTROLE DE FULLSCREEN
const wasFullscreenBeforeDialog = ref(false);
const isFullscreenActive = ref(false);

// refs para controlar split e animação
let splitInstance: any = null;
let anim: GSAPTween | GSAPTimeline | null = null;

const onSwiper = (swiper: SwiperClass) => {
  swiperInstance.value = swiper;
};

const mensagemAlert = (mensagem: string) => {
  $q.notify({
    message: mensagem,
    color: 'warning',
    icon: 'sym_o_warning',
    position: 'bottom',
    timeout: 1500,
  });
};

// 🔥 FUNÇÃO PARA VERIFICAR STATUS DO FULLSCREEN
const checkFullscreenStatus = () => {
  isFullscreenActive.value = !!document.fullscreenElement;
};

// 🔥 FUNÇÃO PARA RESTAURAR FULLSCREEN COM TENTATIVAS
const restoreFullscreenWithRetry = async (retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      // Pequena pausa entre tentativas
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Tentar entrar em fullscreen novamente
      if (!document.fullscreenElement) {
        await $q.fullscreen.request();
        console.log('✅ Fullscreen restaurado na tentativa', i + 1);
        break;
      }
    } catch (error) {
      console.warn(`❌ Tentativa ${i + 1} falhou:`, error);
    }
  }
};

// 🔥 DETECTAR QUANDO A PÁGINA GANHA FOCO (DIÁLOGO FECHOU)
const handleFocus = () => {
  if (wasFullscreenBeforeDialog.value && !document.fullscreenElement) {
    console.log('🔄 Diálogo fechou, restaurando fullscreen...');
    void restoreFullscreenWithRetry();
  }
};

// função que cria a animação — chamada quando o dialog abre
const startText1Animation = async () => {
  // espera o DOM do dialog ser renderizado
  await nextTick();

  if (!text1.value) return;

  // limpa caso já exista algo
  cleanupAnimation();

  // cria o split (words, chars, lines — conforme desejar)
  splitInstance = new SplitType(text1.value, { types: 'words,chars' });

  // cria a animação; não use onComplete para revert se repetir indefinidamente
  anim = gsap.from(splitInstance.words, {
    y: -100,
    opacity: 0,
    rotation: 'random(-80, 80)',
    duration: 0.7,
    ease: 'back',
    stagger: 0.15,
  });
};

// limpa animação e reverte split se existir
const cleanupAnimation = () => {
  try {
    if (anim && typeof anim.kill === 'function') {
      anim.kill();
      anim = null;
    }
    if (splitInstance && typeof splitInstance.revert === 'function') {
      splitInstance.revert();
      splitInstance = null;
    }
  } catch (e) {
    // silencia erros de limpeza
    console.warn('Erro ao limpar animação:', e);
  }
};

const nextSlide = () => {
  if (swiperInstance.value && progressive.value < 0.85) {
    progressive.value += 0.25;
    swiperInstance.value.slideNext();
  }
};

const prevSlide = () => {
  if (swiperInstance.value && progressive.value > 0.1) {
    progressive.value -= 0.25;
    swiperInstance.value.slidePrev();
  }
};

const selectImg = () => {
  if (inputImg.value) {
    // 🔥 SALVAR ESTADO ANTES DE ABRIR O DIÁLOGO
    wasFullscreenBeforeDialog.value = isFullscreenActive.value;
    console.log('💾 Estado salvo - estava em fullscreen:', wasFullscreenBeforeDialog.value);

    inputImg.value.pickFiles();

    // Entrar em fullscreen se não estiver
    if (!isFullscreenActive.value) {
      void $q.fullscreen.request();
    }
  }
};

// 🔥 PROCESSAR IMAGEM SELECIONADA
const processImage = () => {
  if (imgItem.value) {
    // Limpar URL anterior se existir
    if (imgPreview.value) {
      URL.revokeObjectURL(imgPreview.value);
    }

    // Criar nova URL para prévia
    imgPreview.value = URL.createObjectURL(imgItem.value);
    console.log('🖼️ Imagem selecionada:', imgItem.value.name);

    // 🔥 RESTAURAR FULLSCREEN APÓS SELECIONAR IMAGEM
    if (wasFullscreenBeforeDialog.value) {
      console.log('🔄 Restaurando fullscreen após seleção de imagem...');
      void restoreFullscreenWithRetry();
    }
  }
};

watch(() => imgItem.value, processImage);

// observa quando o diálogo abre/fecha
watch(
  () => popUpStore.createItem,
  async (isOpen) => {
    if (isOpen) {
      // 🔥 ENTRAR EM FULLSCREEN QUANDO O DIALOG ABRIR
      if (!isFullscreenActive.value) {
        try {
          await $q.fullscreen.request();
          console.log('🚀 Dialog aberto - Fullscreen ativado');
        } catch (error) {
          console.warn('❌ Não foi possível entrar em fullscreen:', error);
        }
      }

      await startText1Animation();
    } else {
      cleanupAnimation();

      // 🔥 SAIR DO FULLSCREEN QUANDO O DIALOG FECHAR
      if (isFullscreenActive.value) {
        try {
          await $q.fullscreen.exit();
          console.log('🔚 Dialog fechado - Fullscreen desativado');
        } catch (error) {
          console.warn('❌ Erro ao sair do fullscreen:', error);
        }
      }
    }
  },
  { immediate: false }
);

// 🔥 CONFIGURAR LISTENERS
onMounted(() => {
  // Listener para mudanças de fullscreen
  document.addEventListener('fullscreenchange', checkFullscreenStatus);

  // 🔥 LISTENER PARA DETECTAR QUANDO O DIÁLOGO DE ARQUIVO FECHA
  window.addEventListener('focus', handleFocus);

  // Verificar status inicial
  checkFullscreenStatus();
});

// limpa ao desmontar componente
onBeforeUnmount(() => {
  cleanupAnimation();

  // 🔥 LIMPAR LISTENERS
  document.removeEventListener('fullscreenchange', checkFullscreenStatus);
  window.removeEventListener('focus', handleFocus);

  // Limpar URL da imagem
  if (imgPreview.value) {
    URL.revokeObjectURL(imgPreview.value);
  }
});
</script>

<template>
  <q-dialog v-model="popUpStore.createItem" :maximized="popUpStore.createItem">
    <div class="corpo">
      <div class="time-line">
        <div class="fase center" :class="{ esta: progressive >= 0.01 }">
          <q-icon size="25px" :name="progressive <= 0.1 ? 'sym_o_border_color' : 'check'" />
        </div>
        <div class="fase center" :class="{ esta: progressive >= 0.35 }">
          <q-icon size="30px" :name="progressive <= 0.35 ? 'sym_o_image_arrow_up' : 'check'" />
        </div>
        <div class="fase center" :class="{ esta: progressive >= 0.6 }">
          <q-icon size="30px" :name="progressive <= 0.6 ? 'sym_o_docs' : 'check'" />
        </div>
        <div class="fase center" :class="{ esta: progressive >= 0.85 }">
          <q-icon size="30px" :name="progressive <= 0.85 ? 'sym_o_list_alt_check' : 'check'" />
        </div>
        <q-linear-progress
          class="linha"
          :value="progressive"
          dark
          size="10px"
          animation-speed="1200"
        />
      </div>
      <swiper
        :centered-slides="true"
        :modules="modules"
        :allow-touch-move="false"
        @swiper="onSwiper"
      >
        <swiper-slide>
          <h2 ref="text1" class="text">Primeiro digite o nome do item</h2>
          <q-input class="nome" v-model="nome" dense outlined rounded standout />
          <q-btn
            label="próximo"
            icon-right="sym_o_keyboard_double_arrow_right"
            @click="nome ? nextSlide() : mensagemAlert('você precisa dar um nome para o item')"
          />
        </swiper-slide>
        <swiper-slide>
          <h2 ref="text2" class="text">Selecione uma imagem</h2>
          <q-file
            ref="inputImg"
            v-model="imgItem"
            style="display: none"
            type="file"
            accept=".png"
          />
          <div class="img center" :style="imgPreview ? 'border:none' : ''" @click="selectImg()">
            <q-img :src="imgPreview" v-if="imgPreview" :ratio="4 / 4" />
            <q-icon name="sym_o_cloud_upload" size="200px" v-else />
          </div>
          <q-btn label="escolher uma nova imagem" @click="selectImg()" v-if="imgPreview" />
          <q-btn label="selecionar imagem" @click="selectImg()" v-else />
          <div class="btn">
            <q-btn label="anterior" icon="sym_o_keyboard_double_arrow_left" @click="prevSlide" />
            <q-btn
              label="próximo"
              icon-right="sym_o_keyboard_double_arrow_right"
              @click="
                imgPreview
                  ? nextSlide()
                  : mensagemAlert('você precisa selecionar uma imagem para o item')
              "
            />
          </div>
        </swiper-slide>
        <swiper-slide>
          <h2 ref="text3" class="text">Coloque a sua descrição</h2>
          <q-input class="descricao" v-model="descricao" autogrow outlined />
          <div class="btn">
            <q-btn label="anterior" icon="sym_o_keyboard_double_arrow_left" @click="prevSlide" />
            <q-btn
              label="próximo"
              icon-right="sym_o_keyboard_double_arrow_right"
              @click="
                descricao ? nextSlide() : mensagemAlert('você precisa dar uma descrição ao item')
              "
            />
          </div>
        </swiper-slide>
        <swiper-slide class="box-carac">
          <h2 ref="text4" class="text">Confira para saber se tudo está certo</h2>
          <section class="box-carac-item center">
            <h3>Imagem:</h3>
            <q-img :src="imgPreview" :ratio="4 / 4" class="img" />
          </section>
          <section class="box-carac-item center">
            <h3>Nome:<span>{{ nome }}</span></h3>
          </section>
          <section class="box-carac-item center">
            <h3>Descrição:</h3>
            {{ descricao }}
          </section>
          <div class="btn">
            <q-btn label="anterior" icon="sym_o_keyboard_double_arrow_left" @click="prevSlide" />
            <q-btn
              label="concluir"
              icon-right="sym_o_keyboard_double_arrow_right"
              @click="nextSlide"
            />
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </q-dialog>
</template>

<style scoped>
.corpo {
  background: linear-gradient(to top, var(--color-background-4) 10%, var(--color-background) 100%);
}

.time-line {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 100;
  height: 100px;
}
.fase {
  border-radius: 100%;
  width: 50px;
  height: 50px;
  background-color: var(--color-background-2);
  z-index: 1;
}
.fase.esta {
  background-color: var(--cor-principal-1);
}
.linha {
  position: absolute;
}

.swiper {
  height: auto;
}
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100dvh;
}
.nome {
  width: 80%;
}
.descricao {
  width: 90%;
}
.text {
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
  border: 2px solid rgba(0, 0, 0, 0.534);
  border-radius: 20px;
}

.box-carac {
  align-items: flex-start;
  height: auto;
  gap: 50px;
  padding-bottom: 40px;
}
.box-carac-item {
  padding-left: 20px;
  width: 100%;
  flex-direction: column;
}
.box-carac-item h3,.box-carac-item {
  align-self: flex-start;
  font-size: 2rem;
}
</style>
