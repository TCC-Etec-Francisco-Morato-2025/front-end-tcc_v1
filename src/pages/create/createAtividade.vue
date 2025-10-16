<script setup lang="ts">
import usePopUpStore from 'src/stores/popUp';
import popUpCreateAtividadeComponent from 'src/components/create/popUpCreateAtividadeComponent.vue';

const popUpStore = usePopUpStore();

const clickCriarAtividade = ()=>{
  popUpStore.togglecreateAtividadePopUp();
}
</script>

<template>
  <q-layout>
    <pop-up-create-atividade-component/>
    <q-btn class="btn-voltar" icon="sym_o_arrow_left_alt" push/>
    <q-btn class="btn-criar" label="Criar novas Atividades" push rounded @click="clickCriarAtividade()"/>
    <div class="titulo">
      <h2>Editar Atividades</h2>
      <q-icon name="edit" size="30px" />
    </div>
    <div class="list-atividades center">
      <q-btn class="atividades" v-for="item in 10" :key="item" size="20px" rounded>a</q-btn>
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
  flex-wrap: wrap;
  padding: 15px;
  gap: 20px;
}
.list-atividades .q-btn {
  background-color: var(--cor-principal-1);
}
.atividades{
  width: 300px;
  height: 65px;
  font-family: 'Baloo 2';
  font-size: 30px;
}
</style>
