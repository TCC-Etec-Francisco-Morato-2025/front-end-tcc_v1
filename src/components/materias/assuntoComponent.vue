<!-- lista de todos os assuntos relacionados a matéria que aparece em materiaConteudo -->

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import usePopUpAtividade from 'src/stores/popUpAtividadeStore';
import setaIcon from '../icons/setaIcon.vue';

const popUpStore = usePopUpAtividade();
const estadoLista = ref(false);
const btn = ref<HTMLElement | null>(null);

const ativarPopUp = (nome: string, descricao: string, estrelas: number) => {
  popUpStore.acionarAtiviade(true, estrelas, nome, descricao);
};

const mutEstadoLista = () => {
  const button = document.getElementById('btn-' + props.id);
  console.log(button);
  estadoLista.value = !estadoLista.value;
  button?.classList.toggle('ativo');
};

const props = defineProps({
  nome: String,
  id: Number,
});

const atividades = ref<Atividade[]>([]);
const quant = 10;

class Atividade {
  id: number;
  nome: string;
  descricao: string;
  estrelas: number;
  proxima: boolean;

  constructor(
    num: number,
    nomeMateria: string,
    descricao: string,
    estrela: number,
    proxima: boolean
  ) {
    this.id = num;
    this.nome = nomeMateria;
    this.descricao = descricao;
    this.estrelas = estrela;
    this.proxima = proxima;
  }
}

const geraratividade = (quant: number) => {
  for (let i = 1; i <= quant; i++) {
    let estrela: number = 0;
    const proxima: boolean = false;
    if (i <= 3) {
      estrela = Math.floor(Math.random() * 3) + 1;
    }
    const nome = 'Multiplicação ' + i;
    const loren =
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo enim voluptatem quis officia illo';
    const exc = new Atividade(i, nome, loren, estrela, proxima);
    atividades.value.push(exc);
  }
};
geraratividade(quant);

for (let i = 0; i < atividades.value.length; i++) {
  const atividade = atividades.value[i];
  if (atividade) {
    if (atividade.estrelas === 0) {
      atividade.proxima = true;
      break; // para no primeiro que encontrar
    } else {
      atividade.proxima = false;
    }
  }
}

const descidirAnimacao = (quant_estrela:number)=>{
  let animacao = 'scale'
  if(quant_estrela==0){
    animacao = 'jump-right'
  }
  return animacao;
}

</script>

<template>
  <q-item class="itens-assunto">
    <q-btn ref="btn" @click="mutEstadoLista" push :id="'btn-' + props.id" class="assunto-expansion">
      <div>
        <span>
          {{ props.nome }}
        </span>
        <div id="seta">
          <seta-icon :ativado="estadoLista" />
        </div>
      </div>
    </q-btn>
    <!-- usando para fazer um slide de informações descendo -->
    <q-slide-transition :appear="estadoLista" v-show="estadoLista" :duration="300">
      <!-- card usando para facilitar na organização dos itens internos -->
      <q-card class="card-atividades" flat>
        <q-card-section>
          <q-list class="lista-atividades">
            <!-- informações sobre a atividade -->
            <!-- btn usando para dar a sensação de click para o usuário -->
            <q-intersection
              v-for="atividade in atividades"
              :key="atividade.id"
              :transition="descidirAnimacao(atividade.estrelas)"
              once
            >
              <q-btn
                class="atividade"
                :class="{
                  'estrelas-3': atividade.estrelas == 3,
                  'atividade-concluida': atividade.estrelas > 0,
                  'atividade-proxima': atividade.proxima,
                }"
                no-caps
                :push="atividade.estrelas > 0 || atividade.proxima"
                :flat="atividade.estrelas == 0 && !atividade.proxima"
                :disable="atividade.estrelas == 0 && !atividade.proxima"
                @click="ativarPopUp(atividade.nome, atividade.descricao, atividade.estrelas)"
              >
                <!-- ativiades de verdade organizadas em lista -->
                <q-item>
                  <!-- titulo da atividade -->
                  <q-item-section side>
                    <q-item-label
                      class="atividade-titulo"
                      :class="{
                        'atividade-concluida-font': atividade.estrelas || atividade.proxima,
                        'font-branca': atividade.estrelas == 3 || atividade.proxima,
                      }"
                    >
                      {{ atividade.nome }}
                    </q-item-label>
                  </q-item-section>
                  <!-- status da atividade -->
                  <q-item-section side top class="ativida-status" v-if="atividade.estrelas">
                    <!-- mostrar quando foi a ultima vez que a atividade foi acessada -->
                    <!-- talvez seja removido -->
                    <q-item-label caption>2 min ago</q-item-label>
                    <!-- mostra qual foi a maestria do usuário na atividade -->
                    <div class="atividade-estrelas">
                      <q-rating
                        v-model="atividade.estrelas"
                        :max="3"
                        size="14px"
                        icon="star"
                        color="grey"
                        color-selected="amber-9"
                        disable
                      />
                    </div>
                  </q-item-section>
                  <q-item-section side class="atividade-continuar" v-else-if="atividade.proxima">
                    <seta-icon :direcao="-90" :cor="'white'" />
                  </q-item-section>
                </q-item>
              </q-btn>
            </q-intersection>
          </q-list>
        </q-card-section>
      </q-card>
    </q-slide-transition>
  </q-item>
</template>

<style scoped>
.q-card {
  color: var(--color-text-3);
  background-color: var(--color-background-2);
  border-radius: 0 0 5px 5px;
}
.ativo.q-btn {
  background-color: var(--cor-principal-2) !important;
  color: var(--color-text-3) !important;
  transition: 100ms ease-out;
  border-radius: 7px 7px 0px 0px;
}

.q-expansion-item .expand-icon-class {
  color: var(--color-text-1) !important;
}

.q-btn.assunto-expansion {
  margin: 0;
  height: 70px;
  overflow: hidden;
  background-color: var(--color-background-3);
  transition: 1s ease-out;
  font-size: 20px;
  color: var(--color-text-2);
  border-radius: 5px;
}
.q-btn div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.q-btn div #seta {
  width: 15px;
}
.ativo.q-btn {
  border-radius: 7px 7px 0px 0px;
}

.lista-atividades {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* card que organiza tudo */
.card-atividades {
  width: 100%;
}
.card-atividades .q-card__section--vert {
  padding: 10px !important;
}

/* conteiner que abriga as atividades */
.q-item.itens-assunto {
  flex-direction: column;
}

/* estilo da atividade */
.atividade {
  padding: 10px;
  width: 100%;
  height: 70px;
  background-color: transparent;
}
.atividade .q-item {
  padding: 0;
}
.atividade-titulo {
  color: var(--color-text-2);
  font-size: 20px;
}
.atividade-concluida {
  background-color: var(--color-background-2) !important;
}
.atividade-concluida-font {
  color: var(--color-text-1);
}
/* caso a pessoa tenha zerado a atividade */
.estrelas-3 {
  background-color: rgb(223, 189, 0) !important;
}
.font-branca {
  color: var(--color-text-3) !important;
}
/* próxima atividade */
.atividade-proxima {
  background-color: var(--cor-principal-1);
}

/* status */
.ativida-status {
  position: relative;
  width: 120px !important;
  padding: 0;
}
.ativida-status .q-item__label {
  position: absolute;
  justify-content: flex-end;
  top: -20px;
}

/* continuar */
.atividade-continuar {
  width: max-content !important;
  height: 14px;
}

.disabled,
.disabled *,
[disabled],
[disabled] * {
  opacity: 1 !important ;
  cursor: pointer !important;
}
</style>
