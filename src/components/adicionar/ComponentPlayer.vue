<script lang="ts" setup>
import { onMounted, ref, watchEffect } from 'vue';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-youtube';

const videoPlayer = ref<HTMLVideoElement | null>(null);
interface propPlayer {
  src: string;
  format: string;
}
const props = defineProps<propPlayer>();

watchEffect(() => {
  console.log(props.src,props.format);
  if (props.src !== '' && videoPlayer.value) {
    const player = videojs(videoPlayer.value);
    player.src({type: props.format ,src: props.src});
  }
});

onMounted(() => {
  if (videoPlayer.value) {
      videojs(videoPlayer.value, {
      controls: true,
      autoplay: true,
      preload: 'auto',
      techOrder: ['html5','youtube'],
      sources: [
        {
          src: "video/mp4",
          type: props.format,
        },
      ],
      youtube: {
        iv_load_policy: 3,
      },
    });
  }
});

</script>

<template>
  <div class="containerVideo">
    <video ref="videoPlayer" class="video-js">
    </video>
  </div>
</template>

<style scoped>
.containerVideo {
  width: 100%;
}

.video-js {
  width: 100%;
  height: 200px;
}
.containerVideo video {
  width: 100% !important;
  object-fit: cover;
}
</style>
