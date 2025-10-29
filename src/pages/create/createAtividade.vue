<script setup lang="ts">
import useAulasStore from 'src/stores/materias/aulasStore';
import usePopUpStore from 'src/stores/popUp';
import { useRouter } from 'vue-router';
import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
import useMateriasStore from 'src/stores/materias/materiasStore';
import popUpEditAtividadeComponent from 'src/components/admin/edit/popUpEditAtividadeComponent.vue';
import popUpCreateAtividadeComponent from 'src/components/admin/create/popUpCreateAtividadeComponent.vue';
import useAtividadesStore from 'src/stores/materias/atividadesStore';
import type { Atividade } from 'src/types';

const popUpStore = usePopUpStore();
const router = useRouter();
const materiasStore = useMateriasStore();
const aulasStore = useAulasStore();
const atividadesStores = useAtividadesStore();
const atividadeEdit = ref<Atividade>({
  id: '',
  titulo: '',
  estrelas: 0,
  descricao: '',
  id_aula: '',
  vida: 0,
  video: '',
});

const clickCriarAtividade = () => {
  popUpStore.toggleCreateAtividadePopUp();
};

onBeforeMount(() => {
  materiasStore
    .getMaterias()
    .then(() => {
      materiasStore.materias.forEach((m) => {
        aulasStore
          .getAulas(m.id)
          .then(() => {
            const aulas = aulasStore.aulas.filter((al) => al.id_materia === m.id);
            aulas.map((al) => {
              void atividadesStores.getAtividades(al.id);
            });
          })
          .catch(() => {
            console.error('Erro ao pegar Aulas');
          });
      });
    })
    .catch(() => {
      console.error('Erro ao pegar matérias');
    });
});

const editAtividade = (atividade:Atividade)=>{
  atividadeEdit.value = atividade;
  popUpStore.toggleEditAtividadePopUp();
}

onBeforeUnmount(() => {
  popUpStore.createAtividadePopUp = false;
  popUpStore.createQuestaoPopUp = false;
  popUpStore.editAtividadePopUp = false;
  popUpStore.editQuestaoPopUp = false;
});
</script>

<template>
  <q-layout>
    <pop-up-create-atividade-component />
    <pop-up-edit-atividade-component :atividade="atividadeEdit"/>
    <q-btn class="btn-voltar" icon="sym_o_arrow_left_alt" @click="router.go(-1)" push />
    <q-btn
      class="btn-criar"
      label="Criar novas Atividades"
      push
      rounded
      @click="clickCriarAtividade()"
    />
    <div class="titulo">
      <h2>Editar Atividades</h2>
      <q-icon name="edit" size="30px" />
    </div>
    <div class="list-atividades center">
      <q-expansion-item
        v-for="materia in materiasStore.materias"
        :label="materia.nome"
        :key="materia.id"
      >
        <q-list>
          <q-item>
            <q-expansion-item
              v-for="aula in aulasStore.aulas.filter((al) => al.id_materia == materia.id)"
              :key="aula.id"
              :label="aula.titulo"
            >
              <q-list>
                <q-btn
                  v-for="atividade in atividadesStores.atividades.filter(
                    (a) => a.id_aula == aula.id
                  )"
                  :key="atividade.id"
                  :label="atividade.titulo"
                  :style="`background-color: ${materia.cor}; color: ${materia.textColor};`"
                  @click="editAtividade(atividade)"
                />
              </q-list>
            </q-expansion-item>
          </q-item>
        </q-list>
      </q-expansion-item>
    </div>
  </q-layout>
</template>

<style scoped>
.q-layout {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100dvh;
  padding: 15px;
}

.btn-voltar {
  display: block;
  align-self: flex-start;
  background-color: var(--cor-principal-3);
  width: 55px;
  height: 40px;
}

.btn-criar {
  margin-top: 70px;
  font-family: 'Baloo 2';
  font-size: 23px;
  width: 350px;
  height: 70px;
  background-color: var(--cor-principal-2);
  background: linear-gradient(
    80deg,
    var(--cor-principal-1) 5%,
    var(--cor-principal-2) 40%,
    var(--cor-principal-3) 80%,
    var(--cor-principal-1) 100%
  );
  background-size: 400% 100%;
  animation: gradientShift 2s linear infinite;
}
@keyframes gradientShift {
  from {
    background-position: 0% 0%; /* Começa com o gradiente totalmente à esquerda */
  }
  to {
    background-position: -134% 0%; /* Move o gradiente para a esquerda, revelando o "novo" da direita */
  }
}

.titulo {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 100px;
}
.titulo h2 {
  font-family: 'Baloo 2';
  font-size: 2rem;
}

.list-atividades {
  flex-direction: column;
  flex-wrap: wrap;
  padding: 15px;
  gap: 20px;
}
.list-atividades .q-btn {
  background-color: var(--cor-principal-1);
}
.atividades {
  width: 300px;
  height: 65px;
  font-family: 'Baloo 2';
  font-size: 30px;
}
</style>
