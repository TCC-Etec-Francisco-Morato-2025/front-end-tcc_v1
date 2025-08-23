<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import assuntoComponent from '../components/materias/assuntoComponent.vue';
import popupAtividade from 'src/components/materias/popupAtividade.vue';
import useMateriaStore from 'stores/materiaStore';
import setaIcon from 'components/icons/setaIcon.vue';

const store = useMateriaStore();
const router = useRouter();
const txtPesquisa = ref('');

const assuntos = ref<Assunto[]>([]);
const quant = 4;

const voltar = () => {
  router.push('/materias').catch((error) => {
    // Adicione um .catch() aqui
    console.error('Erro ao navegar:', error);
  });
};

class Assunto {
  id: number;
  nome: string;

  constructor(num: number, nomeMateria: string) {
    this.id = num;
    this.nome = nomeMateria;
  }
}

const gerarAssunto = (quant: number) => {
  for (let i = 1; i <= quant; i++) {
    const nome = 'Logarítimo';
    const assunto = new Assunto(i, nome);
    assuntos.value.push(assunto);
  }
};

gerarAssunto(quant);
</script>

<template>
  <q-page id="pg-materia-conteudo">
    <header>
      <q-btn class="titulo" @click="voltar" no-caps push>
        <div class="titulo-seta">
          <seta-icon :direcao="90" :cor="'var(--color-text-3)'" />
        </div>
        <div class="titulo-nome center">
          <q-icon size="50px" name="img:/public/icons/icon-materia.png" />
          <h1>{{ store.nome }}</h1>
        </div>
      </q-btn>
      <div class="pesquisa">
        <q-input v-model="txtPesquisa" label="Pesquisar atividade">
          <template v-slot:append>
            <q-icon v-if="txtPesquisa === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="txtPesquisa = ''" />
          </template>
        </q-input>
      </div>
    </header>
    <q-main>
      <!-- popup que aparece sobre a atividade antes dela começar -->
      <popup-atividade />
      <q-list>
        <q-intersection transition="scale" v-for="assunto in assuntos" :key="assunto.id" once>
          <assunto-component :nome="assunto.nome" :id="assunto.id" />
        </q-intersection>
      </q-list>
    </q-main>
  </q-page>
</template>

<style scoped>
#pg-materia-conteudo {
  display: flex;
  flex-direction: column;
  padding: 40px 25px 0 25px;
  gap: 40px;
}

header {
  display: contents;
}

.border {
  border-radius: 100px !important;
}

.titulo {
  background-color: var(--cor-principal-2);
  width: 100%;
  height: 100px;
  border-radius: 20px;
  transition: background-color 0.2s ease, transform 0.1s ease;
  cursor: pointer; /* Indica que é clicável */
}

.titulo .titulo-nome {
  margin-right: 15px;
  flex-grow: 1;
  color: var(--color-text-3);
}
.titulo div h1 {
  font-size: 40px;
}
.titulo .titulo-seta {
  height: 20px;
}

.pesquisa {
  padding: 0 30px;
}

.q-list {
  display: contents;
  gap: 15px;
}
li {
  list-style: none;
}

.border {
  border-radius: 100px !important;
}
</style>
