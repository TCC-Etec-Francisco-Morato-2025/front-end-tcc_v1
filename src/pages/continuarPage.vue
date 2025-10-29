<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import setaIcon from 'src/components/icons/setaIcon.vue';

const router = useRouter();

const exercicios = ref<Exercicio[]>([]);
const quant = 2;

class Exercicio {
  id: number;
  nome: string;
  descricao: string;

  constructor(num: number, nomeMateria: string, descricao: string) {
    this.id = num;
    this.nome = nomeMateria;
    this.descricao = descricao;
  }
}

const gerarExercicio = (quant: number) => {
  for (let i = 1; i <= quant; i++) {
    const nome = 'Multiplicação';
    const loren =
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo enim voluptatem quis officia illo ducimus, laudantium repudiandae quae nobis velit consectetur itaque iusto quas, corporis eligendi, optio quo soluta? Aperiam?';
    const exc = new Exercicio(i, nome, loren);
    exercicios.value.push(exc);
  }
};

gerarExercicio(quant);
</script>

<template>
  <q-page>
    <header>
      <q-btn dense flat no-caps class="center" @click="router.push('/')">
        <div>
          <seta-icon :direcao="90" />
        </div>
        <h1>Continuar:</h1>
      </q-btn>
    </header>
    <main>
          <q-list>

          </q-list>
    </main>
  </q-page>
</template>

<style scoped>
header{
  margin: 25px 0 40px 0;
}

header .q-btn{
  height: 45px;
  padding: 5px 20px;
  border-radius: 0 10px 10px 0;
  background-color: var(--color-background-3);
  color: var(--color-text-1);
}
header div{
  margin-top: 5px;
  margin-right: 10px;
  width: 15px;
}
header h1{
  font-size: 24px;
}

.q-list {
  display: flex;
  flex-direction: column;
  padding: 0 5%;
  gap: 15px;
}
li {
  list-style: none;
}
</style>
