<script setup lang="ts">
import { auth } from 'boot/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';
import useLoginStore from 'src/stores/loginStore';
import useUserStore from 'src/stores/userStore';
import { ref, defineEmits } from 'vue';

const loginStore = useLoginStore();
const falha = ref(false);
const txtEmail = ref('');
const txtSenha = ref('');
const router = useRouter();

const rules = {
  email: (val: string) => {
    if (!val) return 'O email é obrigatório';
    if (falha.value) return 'Email errado';
    return true
  },
  senha: (val: string) => {
    if (!val) return 'A senha é obrigatório';
    if (falha.value) return 'Senha errada';
    return true
  }

}

const login = async () => {
  await loginStore.login(txtEmail.value, txtSenha.value).then(() => {
    router.push('/').catch((erro) => {
      console.error('Erro ao tentar acessar a página: ' + erro);
    })
  }).catch(() => {
    falha.value = true
    Notify.create({
      message: 'Email ou senha estão errados',
      color: 'red',
      icon: 'sym_o_warning',
      position: 'bottom',
      timeout: 1500,
    })
  })
}

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const userStore = useUserStore();
    const result = await signInWithPopup(auth, provider);
    const { uid, displayName, photoURL, email } = result.user;
    const token = await result.user.getIdToken();

    if (email && token) {
      await loginStore.login(email, token)
        .then(() => {
          if(userStore.foto?.trim()=='/public/img/perfil.png'){
            userStore.foto = photoURL;
          }
        })
        .catch(async () => {
          console.error('Usuário não existe');
          if (displayName)
            await loginStore.register(displayName, email, token, uid)
        })
    }

    void router.push('/');
    // Redirecione o usuário ou atualize a UI
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(String(error));
    }
  }
};

// const loginWithFacebook = async () => {
//   const provider = new FacebookAuthProvider();
//   try {
//     const result = await signInWithPopup(auth, provider);
//     const user = result.user;
//     console.log('Login com Facebook bem-sucedido:', user);
//     // Redirecione o usuário ou atualize a UI
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.log(error.message);
//     } else {
//       console.log(String(error));
//     }
//   }
// };

const emit = defineEmits(['registrar']);
</script>

<template>
  <q-card-section class="login-topo">
    <h1>Login</h1>
    <q-btn flat class="sair" icon="close" size="20px" @click="router.push('/config')" />
  </q-card-section>
  <q-card-section>
    <q-form @submit="login()">
      <q-input label="Email" type="email" v-model="txtEmail" :error="falha" :rules="[rules.email]" autofocus />
      <q-input label="Senha" type="password" v-model="txtSenha" :error="falha" :rules="[rules.senha]" />
      <div class="area-btn center">
        <q-btn label="Registrar-se" no-caps @click="emit('registrar')" id="btn-registrar" flat />
        <q-btn type="submit" label="Entrar" no-caps id="btn-entrar" class="shadow-2" />
      </div>
    </q-form>
  </q-card-section>
  <q-card-section class="center login-rapido">
    <q-btn class="login-rapido-opcoes" id="login-google" icon="img:https://www.google.com/favicon.ico "
      @click="loginWithGoogle" label="Entrar com o Google" push no-caps />
  </q-card-section>
  <q-card-actions align="center">
    <q-btn flat label="Esqueci minha senha" no-caps />
  </q-card-actions>
</template>

<style scoped>
.login-topo {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-topo h1 {
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
}

.q-form .area-btn {
  gap: 10px;
  margin-top: 10px;
}

.area-btn #btn-entrar {
  background-color: var(--cor-principal-1);
}

.area-btn #btn-registrar {
  padding: 0 10px;
  border-radius: 0;
  border-bottom: 2px solid white;
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
</style>
