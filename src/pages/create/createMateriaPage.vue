<script setup lang="ts">
import usePopUpStore from 'src/stores/popUp';
import popUpCreateMateriaComponent from 'src/components/create/popUpCreateMateriaComponent.vue';

const popUpStore = usePopUpStore();

const clickCriarAtividade = ()=>{
  popUpStore.toggleCreateAtividadePopUp();
}
</script>

<template>
  <q-layout>
    <pop-up-create-materia-component/>
    <q-btn class="btn-voltar" icon="sym_o_arrow_left_alt" dense push/>
    <q-btn class="btn-criar" label="Criar novas materias" push rounded @click="clickCriarAtividade()"/>
    <div class="titulo">
      <h2>Editar Materias</h2>
      <q-icon name="edit" size="30px" />
    </div>
    <div class="list-itens center">
      <q-btn class="btn-edit-materia" v-for="item in 10" :key="item" size="20px" rounded>a</q-btn>
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

.btn-edit-materia{
  height: 60px;
  width: 250px;
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
  height: 60px;
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
  font-family: 'BBH Sans Hegarty';
  font-size: 2.0rem;
}

.list-itens {
  flex-wrap: wrap;
  padding: 15px;
  gap: 20px;
}
.list-itens .q-btn {
  background-color: var(--cor-principal-1);
}
</style>
