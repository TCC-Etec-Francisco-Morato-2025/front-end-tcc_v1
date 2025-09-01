<script setup lang="ts">
import materiaIcon from 'components/materias/materiaIcon.vue';

import { ref } from 'vue';
import { onMounted } from 'vue';

const materias = ref<Materia[]>([]);
const quantRevista = 7;
// const showMateria = true;
class Materia {
  id: number;
  nome: string;

  constructor(num: number, nomeMateria: string) {
    this.id = num;
    this.nome = nomeMateria;
  }
}

const gerarMateria = (quant: number) => {
  for (let i = 1; i <= quant; i++) {
    const nome = 'Matemática';
    const mat = new Materia(i, nome);
    materias.value.push(mat);
  }
};

onMounted(() => {
  gerarMateria(quantRevista);
});
</script>


<template>
  <q-page>
    <header class="center">
      <h1>Matérias</h1>
    </header>
    <ul class="lista-materias">
      <materia-icon v-for="materia in materias" :nome-materia="materia.nome" :key="materia.id" />
    </ul>
  </q-page>
</template>

<style scoped>
.q-page{
    background: linear-gradient(
    to bottom,
    var(--color-background)20%,
    var(--color-background-4)100%
  );
}

header {
  height: 120px;
  margin-bottom: 20px;
}
header h1 {
  font-size: 45px;
}

.lista-materias {
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  min-width: 100%;
  padding: 0 60px;
  gap: 50px;
}
</style>
