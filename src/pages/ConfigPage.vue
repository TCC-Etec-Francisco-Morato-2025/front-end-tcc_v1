<script setup lang="ts">
import editarIcon from 'src/components/icons/editarIcon.vue';
import perfilIcon from 'src/components/icons/perfilIcon.vue';
import useUserStore from 'src/stores/userStore';
import useConfig from 'src/stores/configStore';
import { ref, watch } from 'vue';

const userStore = useUserStore();
const notificacao = ref(true);
const configStore = useConfig();
const newNome = ref(userStore.nome);

watch(
  () => newNome.value,
  () => {
    if (newNome.value != '') {
      userStore.mudarNome(newNome.value);
      console.log(userStore.nome);
    } else {
      newNome.value = userStore.nome;
    }
  }
);
</script>

<template>
  <q-layout>
    <header>
      <h1>Ajustes</h1>
    </header>
    <main>
      <section class="config-perfil">
        <q-avatar size="150px">
          <img src="public/img/mapache-pedro.gif" alt="" v-if="userStore.logado"/>
          <perfil-icon v-else/>
        </q-avatar>
        <div style="cursor: pointer" v-if="userStore.logado">
          {{ userStore.nome }}<editar-icon style="margin-left: 5px" />
          <q-popup-edit v-model="newNome" auto-save v-slot="scope">
            <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
          </q-popup-edit>
        </div>
        <div v-else>
          <q-btn class="btn-cadastro" align="center" label="Entrar" no-caps flat to="/login"/>
          <q-btn class="btn-cadastro" label="Registrar-se" flat no-caps/>
        </div>
      </section>
      <section class="config-page">
        <div class="opcoes" :class="{ ativo: configStore.darkMode }">
          <span>Dark Mode</span>
          <q-toggle color="blue" v-model="configStore.darkMode" val="battery"/>
        </div>
        <div class="opcoes" :class="{ ativo: notificacao }">
          <span>Notificações</span>
          <q-toggle color="blue" v-model="notificacao" val="battery" />
        </div>
      </section>
    </main>
    <footer>
      <a href="#" class="opcao">Ajuda</a>
      <a href="#" class="opcao">Termos de uso e políticas de privacidade</a>
    </footer>
  </q-layout>
</template>

<style scoped>
.q-layout {
  display: grid;
  grid-template-areas:
    'header'
    'main'
    'footer';
  grid-template-rows: 125px auto 160px;
}

header {
  grid-area: header;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.2) 0%,
    /* Sombra preta sutil (10% opacidade) no topo */ rgba(255, 255, 255, 0.15) 20%,
    /* Transparente 10% abaixo do topo */ rgba(255, 255, 255, 0.12) 30%,
    rgba(255, 255, 255, 0.1) 50%,
    /* Continua transparente até 10% antes da base */ rgba(255, 255, 255, 0.07) 70%,
    rgba(255, 255, 255, 0.04) 80%,
    rgba(255, 255, 255, 0.02) 90%,
    /* Continua transparente até 10% antes da base */ rgba(255, 255, 255, 0) 100%
      /* Sombra preta sutil (10% opacidade) na base */
  );
  height: 125px;
  /* margin-bottom: 100px; */
}
header h1 {
  font-size: 50px;
  margin-bottom: 15px;
}

main {
  grid-area: main;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 40px;
  gap: 40px;
}

.config-perfil {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 18px;
  gap: 10px;
}

.q-btn.btn-cadastro{
  padding: 0 20px;
  margin: 0 10px;
  border-bottom: 2px solid var(--color-text-2);
  border-radius: 0px;
  color: var(--color-text-2);
}
.q-btn.btn-cadastro:hover {
  animation: btnHover 300ms ease-in forwards;
  border-radius: 5px;
  border: 0;
}

@keyframes btnHover {
  from {
  }
  to {
    background-color: var(--cor-principal-1);
    box-shadow: 0 3px 10px 1px var(--cor-principal-1);
    color: var(--color-text-3);
    transform: translatey(-2px);
  }
}

.config-page {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 15px;
}

.config-page .opcoes {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  width: 80%;
  font-size: 20px;
  border-radius: 20px;
  background-color: var(--color-background-3);
  /* background-color: var(--cor-principal-2-1); */
  padding: 15px;
  transition: all 350ms ease-in-out;
}

.ativo {
  color: var(--color-text-3);
  background-color: var(--cor-principal-2-1) !important;
}

footer {
  grid-area: footer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
}

footer .opcao {
  color: var(--cor-principal-1);
  font-size: 14px;
}
</style>
