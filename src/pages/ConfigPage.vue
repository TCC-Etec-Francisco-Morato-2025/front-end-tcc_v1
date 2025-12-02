<script setup lang="ts">
import usePopUpStore from 'src/stores/popUp';
import useUserStore from 'src/stores/userStore';
import useLoginStore from 'src/stores/loginStore';
import useConfig from 'src/stores/configStore';
import { ref, watch } from 'vue';

const popUpStore = usePopUpStore();
const userStore = useUserStore();
const loginStore = useLoginStore();
const notificacao = ref(true);
const configStore = useConfig();

watch(
  () => configStore.aviso,
  () => {
    popUpStore.confirmar.naoAparecerNovamente = !configStore.aviso;
  }
);
</script>

<template>
  <q-layout id="pg-config">
    <!-- começo da página -->
    <q-header class="center">
      <h1>Ajustes</h1>
    </q-header>
    <main class="main">
      <section class="config-perfil">
        <!-- avatar -->
        <q-avatar size="150px">
          <!-- se o usuário estiver logado, ele mostra a imagem de perfil -->
          <q-img :src="userStore.foto??'/public/img/perfil.png'" alt="" v-if="userStore.logado" />
          <!-- se não, ele mostra uma imagem padrão -->
           <q-img src="/public/img/perfil.png" v-else/>
        </q-avatar>

        <!-- nome de usuário -->
        <div style="cursor: pointer" v-if="userStore.logado">
          {{ userStore.nome }}
        </div>

        <!-- se não estiver logado, ele mostra os botões para login e registro -->
        <div v-else>
          <q-btn class="btn-cadastro" align="center" label="Entrar" no-caps flat to="/login" />
          <q-btn
            class="btn-cadastro"
            label="Registrar-se"
            flat
            @click="loginStore.slide = 'registrar'"
            no-caps
            to="/login"
          />
        </div>
      </section>

      <!-- configuração da página -->
      <section class="config-page">
        <!-- mudar para modo claro ou escuro -->
        <div class="opcoes" :class="{ ativo: configStore.darkMode }">
          <span>Dark Mode</span>
          <q-toggle color="blue" v-model="configStore.darkMode" val="battery" />
        </div>

        <!-- ativar ou desativar notificações -->
        <div class="opcoes" :class="{ ativo: notificacao }">
          <span>Notificações</span>
          <q-toggle color="blue" v-model="notificacao" val="battery" />
        </div>

        <!-- ativar aviso nas atividades -->
        <div class="opcoes" :class="{ ativo: configStore.aviso }">
          <span>Aviso</span>
          <q-toggle color="blue" v-model="configStore.aviso" val="battery" />
        </div>
      </section>

      <!-- termos de privacidade e ajuda -->
      <q-btn
        no-caps
        label="Sair da conta"
        icon="logout"
        rounded
        class="btn-logout"
        @click="userStore.logout"
        v-if="userStore.logado"
      />
      <!-- <section class="center">
        <a href="#" class="opcao">Ajuda</a>
        <a href="#" class="opcao">Termos de uso e políticas de privacidade</a>
      </section> -->
    </main>
  </q-layout>
</template>

<style scoped>
#pg-config {
  display: grid;
  grid-template-areas:
    'header'
    'main'
    'section';
  grid-template-rows: 125px;
  background: linear-gradient(-40deg, var(--color-background-4) 30%, var(--color-background) 100%);
}

header {
  grid-area: header;
  position: static;
  background-color: transparent;
  align-items: flex-end;
  height: 125px;
  /* margin-bottom: 100px; */
}
header h1 {
  color: var(--color-text-1);
  font-size: 50px;
  margin-bottom: 15px;
}

.main {
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

.q-btn.btn-cadastro {
  padding: 0 20px;
  margin: 0 10px;
  border-bottom: 2px solid var(--color-text-2);
  border-radius: 0px;
  color: var(--color-text-2);
}
.q-btn.btn-cadastro:hover {
  animation: btnHover 300ms ease-in forwards;
  border-radius: 5px;
  border: none;
}

@keyframes btnHover {
  from {
  }
  to {
    background-color: rgb(var(--cor-principal-1));
    box-shadow: 0 3px 5px 1px rgba(0, 0, 0, 0.425);
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
  background-color: rgb(65, 65, 175) !important;
}

.btn-logout {
  color: var(--color-text-3);
  background-color: rgb(236, 57, 57);
}

section {
  grid-area: section;
  height: fit-content;
  justify-content: flex-end;
  flex-direction: column;
}

section .opcao {
  color: rgb(var(--cor-principal-1));
  font-size: 14px;
}
</style>
