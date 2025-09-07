<script setup lang="ts">
import useMateriasStore from 'src/stores/materias/materiasStore';
import setaIcon from 'src/components/icons/setaIcon.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const materiasStore = useMateriasStore();
</script>

<template>
  <q-page>
    <header>
      <q-btn dense flat no-caps class="center" @click="router.push('/')">
        <div>
          <seta-icon :direcao="90" />
        </div>
        <h1>Para você:</h1>
      </q-btn>
    </header>
    <main>
      <q-list class="lista-materias">
          <materia-icon
            v-for="materia in materiasStore.materias"
            :nome="materia.nome"
            :key="materia.id"
            :icon="materia.icon"
            :id="materia.id"
            :path="materia.path"
            :cor="materia.cor"
            :textColor="materia.textColor"
          />
      </q-list>
    </main>
  </q-page>
</template>

<style scoped>
header {
  margin: 25px 0 40px 0;
}

header .q-btn {
  height: 45px;
  padding: 5px 20px;
  border-radius: 0 10px 10px 0;
  background-color: var(--color-background-3);
  color: var(--color-text-1);
}
header div {
  margin-top: 5px;
  margin-right: 10px;
  width: 15px;
}
header h1 {
  font-size: 24px;
}

.lista-materias {
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  min-width: 100%;
  padding: 0 50px;
  gap: 15px;
}
li {
  list-style: none;
}
</style>
