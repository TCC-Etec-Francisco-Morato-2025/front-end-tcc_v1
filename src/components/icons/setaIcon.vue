<script setup lang="ts">
import { ref, watch  } from 'vue';

const iconSeta = ref<HTMLElement | null>(null);
const icon = ref<HTMLElement | null>(null);

interface props{
  ativado?: boolean,
  cor?: string,
  direcao?:number
}

const props = withDefaults(defineProps<props>(), {
  ativado: false,   // Default to false if not provided
  cor: 'currentColor', // Default to current text color if not provided
  direcao: 0        // Default to 0 if not provided
})

const updateClasses = (isActive: boolean) => {
  if (iconSeta.value) {
    iconSeta.value.classList.toggle('ativado', isActive); // Adiciona 'ativado' se isActive for true, remove se for false
    icon.value?.classList.toggle('rodar', isActive)
  }
};

watch(() => props.ativado, (ativado) => {
  updateClasses(ativado);
}, { immediate: true });

</script>
<template>
  <svg ref="icon"
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    :transform="`rotate(${props.direcao})`"
    viewBox="0 0 512.000000 512.000000"
    preserveAspectRatio="xMidYMid meet"
  >
    <g
      ref="iconSeta"
      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
      stroke="none"
      :fill="props.cor"
    >
      <path
        d="M277 4009 c-103 -24 -197 -103 -244 -204 -23 -51 -28 -73 -27 -145 0
-160 -96 -52 1192 -1342 777 -778 1160 -1155 1191 -1172 73 -39 158 -53 234
-37 34 7 83 24 108 37 31 17 414 394 1191 1172 1288 1290 1192 1182 1192 1342
0 72 -4 94 -28 147 -84 184 -308 262 -491 171 -26 -13 -388 -368 -1037 -1016
l-998 -997 -998 997 c-652 651 -1011 1003 -1037 1016 -76 37 -170 49 -248 31z"
      />
    </g>
  </svg>
</template>

<style scoped>
svg{
  transition: 0.3s linear;
}
.ativado {
  transition: 0.3s linear;
  fill: var(--color-text-3) !important;
}
.rodar{
  transform: rotate(180deg);
}
</style>
