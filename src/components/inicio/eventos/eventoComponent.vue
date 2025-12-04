<script setup lang="ts">
interface Prop{
  srcEvento:string
}

const props = defineProps<Prop>();
</script>

<template>
  <q-card align="center" class="bg-transparent q-px-md q-mb-md" flat>
    <q-img :src="props.srcEvento"/>
  </q-card>
</template>
