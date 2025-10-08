<script setup lang="ts">
import { auth } from 'boot/firebase';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'vue-router';
import useUserStore from 'src/stores/userStore';
import sairIcon from 'src/components/icons/sairIcon.vue';
import { ref } from 'vue';

const useStore = useUserStore();
const txtNome = ref('');
const txtEmail = ref('');
const txtSenha = ref('');
const txtSenhaConfirm = ref('');
const router = useRouter();

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log(user.photoURL);
    useStore.mudarUser(
      user.uid,
      user.displayName,
      user.photoURL,
      user.email,
      user.refreshToken,
      user.refreshToken
    );
    router.go(-1);
    // Redirecione o usuário ou atualize a UI
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log(String(error));
    }
  }
};

const loginWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('Login com Facebook bem-sucedido:', user);
    // Redirecione o usuário ou atualize a UI
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log(String(error));
    }
  }
};

const emit = defineEmits(['entrar']);
</script>

<template>
    <q-card-section class="login-topo">
      <h1>Registrar-se</h1>
      <q-btn flat class="sair" @click="router.push('/config')">
        <sair-icon :color="'var(--color-text-1)'"/>
      </q-btn>
    </q-card-section>
    <q-card-section>
      <q-form>
        <q-input class="input" label="Nome" type="text" v-model="txtNome" autofocus/>
        <q-input class="input" label="Email" type="email" v-model="txtEmail" />
        <q-input class="input" label="Senha" type="password" v-model="txtSenha" />
        <q-input class="input" label="Confirme a senha" type="password" v-model="txtSenhaConfirm" />
        <div class="area-btn center">
          <q-btn id="btn-entrar" label="Entrar" flat no-caps @click="emit('entrar')"/>
          <q-btn id="btn-registrar" type="submit" label="Registrar-se" no-caps />
        </div>
      </q-form>
    </q-card-section>
    <q-card-section class="center login-rapido">
      <q-btn
        class="login-rapido-opcoes"
        id="login-google"
        icon="img:https://www.google.com/favicon.ico "
        @click="loginWithGoogle"
        label="Entrar com o Google"
        push
        no-caps
      />
      <q-btn
        class="login-rapido-opcoes"
        id="login-facebook"
        icon="img:src\assets\Facebook_Logo_Secondary.png"
        @click="loginWithFacebook"
        label="Entrar com o Facebook"
        push
        no-caps
      />
    </q-card-section>
</template>

<style scoped>
.login-topo {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-topo h1 {
  color: var(--color-text-1);
  text-align: center;
  font-size: 40px;
}
.login-topo .q-btn.sair {
  top: 15px;
  right: 15px;
  position: absolute;
  padding: 0;
  width: 40px;
}

.q-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 20px;
  color: white;
}
.q-form .area-btn {
  gap: 10px;
  margin-top: 10px;
}
.area-btn #btn-registrar{
  background-color: var(--cor-principal-1);
  box-shadow: 0 3px 2px 2px rgba(0, 0, 0, 0.432);
}
.area-btn #btn-entrar{
  padding: auto 0;
  color: var(--color-text-1);
  border-radius: 0;
  border-bottom: 2px solid var(--color-text-1);
}

.login-rapido {
  gap: 10px;
  flex-direction: column;
}
.login-rapido-opcoes {
  height: 40px;
  width: 80%;
  border-radius: 10px;
}
.login-rapido-opcoes#login-google {
  color: black;
  background-color: white;
}
.login-rapido-opcoes#login-facebook {
  color: rgb(255, 255, 255);
  background-color: rgb(66, 103, 178);
}
</style>
