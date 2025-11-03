<script setup lang="ts">
import { auth } from 'boot/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'vue-router';
import useLoginStore from 'src/stores/loginStore';
import useUserStore from 'src/stores/userStore';
import { ref } from 'vue';

const loginStore = useLoginStore();
const txtNome = ref('');
const txtEmail = ref('');
const txtSenha = ref('');
const txtSenhaConfirm = ref('');
const router = useRouter();

// regras de verificação dos campos de senha e email
const rules = {
  nome: (val: string) => {
    if (!val) return 'O nome é obrigatório'
    if (val.length < 4) return 'O nome precisa de pelo menos 4 letras'
    return true
  },

  email: (val: string) =>
    !!val && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Email inválido',

  senha: (val: string) => {
    if (!val) return 'A senha é obrigatória'
    if (val.length < 8) return 'A senha deve ter no mínimo 8 caracteres'
    if (!/[A-Z]/.test(val)) return 'A senha precisa ter pelo menos uma letra maiúscula'
    if (!/\d/.test(val)) return 'A senha precisa ter pelo menos um número'
    if (!/[!@#$%^&*]/.test(val)) return 'A senha precisa ter pelo menos um símbolo (!@#$%^&*)'
    return true
  },

  confirmSenha: (val: string) => {
    if (!val) return 'confirme a senha'
    if (val != txtSenha.value) return 'senha incorreta'
    return true
  }
}

const registrar = async () => {
  await loginStore.register(txtNome.value, txtEmail.value, txtSenhaConfirm.value, null)
  .then(()=>{
    router.push('/').catch((erro) => {
      console.error('Erro ao tentar acessar a página: ' + erro);
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

    if (email && token){
      await loginStore.login(email, token).catch(async () => {
        if (displayName)
          await loginStore.register(displayName, email, token,uid)
      })
      userStore.foto=photoURL;
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
//     ('Login com Facebook bem-sucedido:', user);
//     // Redirecione o usuário ou atualize a UI
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       (error.message);
//     } else {
//       (String(error));
//     }
//   }
// };

const emit = defineEmits(['entrar']);
</script>

<template>
  <q-card-section class="login-topo">
    <h1>Registrar-se</h1>
    <q-btn flat class="sair" icon="close" size="20px" @click="router.push('/config')"/>
  </q-card-section>
  <q-card-section>
    <q-form @submit="registrar">
      <q-input class="input" label="Nome" type="text" v-model="txtNome" :rules="[rules.nome]" autofocus />
      <q-input class="input" label="Email" type="email" v-model="txtEmail" :rules="[rules.email]" />
      <q-input class="input" label="Senha" type="password" v-model="txtSenha" :rules="[rules.senha]" />
      <q-input class="input" label="Confirme a senha" type="password" v-model="txtSenhaConfirm"
        :rules="[rules.confirmSenha]" />
      <div class="area-btn center">
        <q-btn id="btn-entrar" label="Entrar" flat no-caps @click="emit('entrar')" />
        <q-btn id="btn-registrar" type="submit" label="Registrar-se" no-caps />
      </div>
    </q-form>
  </q-card-section>
  <q-card-section class="center login-rapido">
    <q-btn class="login-rapido-opcoes" id="login-google" icon="img:https://www.google.com/favicon.ico "
      @click="loginWithGoogle" label="Entrar com o Google" push no-caps />
    <!-- <q-btn class="login-rapido-opcoes" id="login-facebook" icon="img:src\assets\Facebook_Logo_Secondary.png"
      @click="loginWithFacebook" label="Entrar com o Facebook" push no-caps /> -->
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
  position: absolute;
  color: white;
  top: 15px;
  right: 15px;
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

.area-btn #btn-registrar {
  background-color: var(--cor-principal-1);
  box-shadow: 0 3px 2px 2px rgba(0, 0, 0, 0.432);
}

.area-btn #btn-entrar {
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
