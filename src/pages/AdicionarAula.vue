<script lang="ts" setup>
import Player from 'src/components/adicionar/ComponentPlayer.vue';
import { ref } from 'vue';
const step = ref(1);
const done = ref(0);
const youtubeUrl = ref('');
const inputVideo = ref<File | null>(null);
const srcVideo = ref('');
const formatURL = ref('');
const handleUpload = () => {
  if (inputVideo.value) {
    srcVideo.value = URL.createObjectURL(inputVideo.value);
    formatURL.value = "video/mp4";
    console.log('Preview URL:', srcVideo.value);
  }
};

const yotubeChange=()=>{
  formatURL.value = "video/youtube";
  srcVideo.value = youtubeUrl.value;
}
</script>


<template>
  <q-stepper v-model="step" ref="stepper" animated header-nav contracted flat>
    <q-step :name="1" title="INTRODUCAO" icon="person" :done="done >= 1"> INTRODUÇÂO </q-step>
    <q-step :name="2" title="VIDEO" icon="video_file" :done="done >= 2">
      <q-card class="cardVideo" flat>
        <q-card-section> 
            <Player :src="srcVideo" :format="formatURL"/>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-input v-model="youtubeUrl" class="inputYoutube"   @update:model-value="yotubeChange">
            <template v-slot:prepend >
              <q-icon name="youtube_searched_for" />
            </template>
          </q-input>
          <q-file v-model="inputVideo" label="Enviar video"  @update:model-value="handleUpload" accept="video/mp4,video/x-m4v,video/*"
          >
            <template v-slot:prepend>
              <q-icon name="cloud_upload" />
            </template>
          </q-file>
        </q-card-section>
      </q-card>
    </q-step>

    <q-step :name="3" title="PERGUNTAS" icon="add_comment" :done="done == 3"> PERGUNTAS
      <Player :src="srcVideo" :format="formatURL"/>
    </q-step>
  </q-stepper>

  <q-stepper-navigation>
    <q-btn
      @click="
        () => {
          done += 1;
          step += 1;
        }
      "
      label="Avançar"
      class="center"
      icon-right="skip_next"
    />
    <q-btn
      flat
      @click="
        step -= 1;
        done -= 1;
      "
      label="Back"
    />
  </q-stepper-navigation>
</template>

<style scoped lang="scss">
.q-app {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.q-stepper {
  width: 100%;
  box-shadow: none;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: nowrap;
  border: none;
  outline: none;
  margin: 50px 0px 0px 0px;
  background-color: var(--color-background-1);
}

.q-stepper__nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  padding: 0px 10px 0px 10px;
}

.q-stepper__nav button {
  width: 100%;
  background-color: var(--color-background-3);
}

.q-stepper__tab--active,
.q-stepper__tab--done {
  color: var(--cor-principal-2);
}

.q-stepper__step {
  height: 100%;
}

/* Força label embaixo do ícone mesmo no contracted */
.custom-stepper .q-stepper__tab {
  flex-direction: column !important;
  align-items: center;
}

/* Centraliza e ajusta espaçamento */
.custom-stepper .q-stepper__title {
  margin-top: 6px;
  white-space: normal;
  text-align: center;
}

/* Remove hover */
.custom-stepper .q-stepper__tab:hover {
  background: none !important;
}

.q-stepper__step-inner {
  display: flex;
  align-items: center;
  justify-content: center;
}

.cardVideo {
  width: 100%;
  min-height: 300px;
  background-color: var(--color-background-2);
}

.q-card__section {
    width: 100%;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
}

.inputYoutube{
    width: 100%;
}

</style>