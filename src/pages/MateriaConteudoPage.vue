<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import listComponent from '../components/materias/listComponent.vue';
import useMateriaStore from 'stores/materiaStore';
import setaIcon from 'components/icons/setaIcon.vue';

const store = useMateriaStore();
const router = useRouter();
const txtPesquisa = ref('');

const exercicios = ref<Exercicio[]>([]);
const quant = 60;

const voltar = () => {
  router.push('/materias').catch((error) => {
    // Adicione um .catch() aqui
    console.error('Erro ao navegar:', error);
  });
};

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
  <div id="pg-materia-conteudo">
    <header>
      <div class="titulo" @click="voltar">
        <button>
          <seta-icon :tamanho="22" :direcao="90" />
        </button>
        <div class="center">
          <q-icon size="50px" name="img:/public/icons/icon-materia.png" />
          <h1>{{ store.nome }}</h1>
        </div>
      </div>
      <div class="pesquisa">
        <q-input dark v-model="txtPesquisa">
          <template v-slot:append>
            <q-icon v-if="txtPesquisa === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="txtPesquisa = ''" />
          </template>
        </q-input>
      </div>
    </header>
    <main>
      <!-- <ul class="lista-exercicio">
        <li v-for="exercicio in exercicios" :key="exercicio.id">
          <list-component
            :nome="exercicio.nome"
            :descricao="exercicio.descricao"
            :id="exercicio.id"
          />
        </li>
      </ul> -->
      <q-list>
          <list-component
            :nome="exercicio.nome"
            :descricao="exercicio.descricao"
            :id="exercicio.id"
            v-for="exercicio in exercicios" :key="exercicio.id"
          />
      </q-list>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.pesquisa .q-input {
  // Escondemos o Quasar underline e padding do `q-field__control` se houver.
  // Isso é importante para que o box-shadow seja o único destaque.
  .q-field__control {
    padding: 0 !important;
    min-height: auto !important;

    // Remove as linhas (underline) do Quasar que podem aparecer no `borderless` ou `filled`
    &::before,
    &::after {
      border: none !important;
    }
  }

  .q-icon {
    color: var(--color-text-2);
  }

  // Estilos padrão do seu input
  border: 1px solid transparent; // Borda invisível para manter o espaço
  border-radius: 17px;
  background-color: var(--color-background-3);
  padding: 0 10px;
  box-shadow: none; // Garante que nenhuma sombra padrão esteja presente

  // // Adiciona uma transição suave para as mudanças de box-shadow e background
  // transition: background-color 0.3s ease, box-shadow 0.3s ease;

  // Estilo quando o input está focado
  &.q-field--focused {
    color: red;
    background-color: var(--color-text-1); // Um pouco mais claro no foco
    // Efeito de sombra que simula uma borda/destaque
    box-shadow: 0 0 0 2px rgba(var(--cor-principal-1-rgb), 0.5); // Cor principal com opacidade
    // Aumentar a borda transparente para dar a impressão de uma borda visível
    border: 1px solid var(--cor-principal-1); // Borda fina da cor principal no foco
  }

  // Estilo quando o mouse está sobre o input (não focado)
  // &:hover:not(.q-field--focused) {
  //   background-color: lighten(var(--color-background-3), 2%); // Ligeiramente mais claro no hover
  //   box-shadow: 0 0 0 1px rgba(var(--cor-principal-1-rgb), 0.2); // Sombra sutil no hover
  // }
}

// Estilo para o texto interno do q-input
.custom-input-text {
  color: var(--color-background); // Exemplo: cor do texto branco
  // Outros estilos como font-size, font-weight, etc.
}

// Se suas variáveis de cor forem RGB, você pode usá-las assim:
// Exemplo: --cor-principal-1-rgb: 255, 87, 34; (para um laranja)
// Certifique-se de que essas variáveis estão definidas em um escopo global (e.g., :root)
// :root {
//   --cor-principal-1: #FF5722;
//   --cor-principal-1-rgb: 255, 87, 34;
//   --color-background-3: #222; // Exemplo de cor de fundo escura para o input
//   --cor-principal-2: #333;
//   --cor-principal-2-1: #444;
// }

#pg-materia-conteudo {
  --distancia-entre-itens: 40px;
  display: flex;
  flex-direction: column;
  gap: var(--distancia-entre-itens);
}

#pg-materia-conteudo header {
  display: flex;
  flex-direction: column;
  gap: var(--distancia-entre-itens);
}

.border {
  border-radius: 100px !important;
}

.pesquisa {
  padding: 0 5%;
}

.titulo {
  display: flex;
  align-items: center;
  background-color: var(--cor-principal-2);
  height: 100px;
  margin: var(--distancia-entre-itens) 20px 0 20px;
  border-radius: 20px;
  padding: 18px;
  transition: background-color 0.2s ease, transform 0.1s ease;
  cursor: pointer; /* Indica que é clicável */
}
.titulo:hover {
  background-color: var(--cor-principal-2-1); /* Cor mais escura ao passar o mouse */
}

.titulo:active {
  background-color: var(--cor-principal-2-1); /* Cor ainda mais escura ao clicar */
  transform: translateY(2px); /* Pequeno deslocamento para baixo */
}
.titulo div {
  width: 100%;
  margin-right: 35px;
}
.titulo div h1 {
  font-size: 40px;
}
.titulo button {
  background-color: transparent;
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
