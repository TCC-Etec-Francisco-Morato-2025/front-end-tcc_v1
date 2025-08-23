<script setup lang="ts">
import setaIcon from 'src/components/icons/setaIcon.vue';
import materiaIcon from 'components/materias/materiaIcon.vue';
import { useRouter } from 'vue-router';
import { onMounted,ref } from 'vue';


const materias = ref<Materia[]>([]);
const router = useRouter()
const quantRevista = 10;
// const showMateria = true;
class Materia{
  id: number;
  nome: string

  constructor(num:number, nomeMateria: string){
    this.id = num;
    this.nome = nomeMateria;
  }
}

const gerarMateria = (quant:number)=>{
  for(let i=1;i<=quant;i++){
    const nome = 'Matematica'
    const mat = new Materia(i,nome);
    materias.value.push(mat);
  }
}

onMounted(()=>{
  gerarMateria(quantRevista);
})
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
        <materia-icon v-for="materia in materias" :nome-materia="materia.nome" :key="materia.id" />
      </q-list>
    </main>
  </q-page>
</template>

<style scoped>
header{
  margin: 25px 0 40px 0;
}

header .q-btn{
  height: 45px;
  padding: 5px 20px;
  border-radius: 0 10px 10px 0;
  background-color: var(--color-background-3);
  color: var(--color-text-1);
}
header div{
  margin-top: 5px;
  margin-right: 10px;
  width: 15px;
}
header h1{
  font-size: 24px;
}

.q-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 10%;
  gap: 40px;
}
li {
  list-style: none;
}
</style>
