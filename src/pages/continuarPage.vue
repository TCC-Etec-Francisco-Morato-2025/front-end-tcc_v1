<script setup lang="ts">
import useAtividadesStore from 'src/stores/materias/atividadesStore';
import useAulasStore from 'src/stores/materias/aulasStore';
import useMateriasStore from 'src/stores/materias/materiasStore';
import useUserStore from 'src/stores/userStore';
import type { Atividade } from 'src/types';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const materiasStore = useMateriasStore();
const aulasStore = useAulasStore();
const atividadesStore = useAtividadesStore();
const userStore = useUserStore();
const atividadesContinuar = ref<Atividade[]>([]);

onMounted(async()=>{
  for( const m of materiasStore.materias){
    await aulasStore.getAulas(m.id,userStore.token)
    for(const a of aulasStore.aulas){
      await atividadesStore.getAtividades(a.id,userStore.token,true);

      const atividadesIncompletas = atividadesStore.atividades.filter((at)=>at.estrelas==0);

      const atividadeContinuar = atividadesIncompletas[0];

      if(atividadeContinuar)
      atividadesContinuar.value.push(atividadeContinuar)
    }
  }
})


</script>

<template>
  <q-page>
    <header>
      <q-btn class="voltar" icon="arrow_back" label="Continuar" @click="router.push('/')" dense push no-caps />
    </header>
    <main>
      <q-list class="materia">
        <q-card flat>
          <q-card-section align="center" :style="`background-color:`">
            <h2 class="titulo">Matemática</h2>
          </q-card-section>

          <q-separator />

          <q-list class="atividades">

            <q-card class="card-atividade">
              <q-card-section>
                <h3>
                  Leis de newton
                </h3>
                <h7>
                  atividade II
                </h7>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn class="btn-continuar" label="Continuar" push/>
              </q-card-actions>
            </q-card>

          </q-list>
        </q-card>
      </q-list>
    </main>
  </q-page>
</template>

<style scoped>
header {
  margin: 25px 0 40px 0;
}

.q-btn.voltar {
  font-size: 20px;
  height: 45px;
  padding: 5px 20px;
  border-radius: 0 10px 10px 0;
  color: white;
  background: linear-gradient(80deg, transparent 20%, var(--cor-principal-1)85%, transparent 100%);
  background-size: 400% 100%;
  box-shadow: 0 5px 5px 0px rgb(0, 0, 0);
  animation: corPassando 3s ease infinite;
}

@keyframes corPassando {
  from {
    background-position: 0% 0%;
  }

  to {
    background-position: -134% 0%;
  }
}

.q-list.materia {
  display: flex;
  padding: 0 5%;
  gap: 15px;
}

.titulo,h2 {
  font-size: 250%;
  font-family: 'Baloo 2';
}

.q-card {
  width: 100%;
}

.atividades {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 10px;
  gap: 15px;
}

.card-atividade {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-radius: 10px;
  width: 200px;
  background-color: rgb(219, 199, 12);
  box-shadow: 0 3px 3px 2px rgba(0, 0, 0, 0.568);
}

.card-atividade h3{
  font-size: 150%;
}

.card-atividade h7{
  font-family: 'Pixelify Sans';
}

.btn-continuar{
  font-family: 'Pixelify Sans';
  color: rgb(0, 0, 0) ;
  background-color: #fff0b1 ;
}

li {
  list-style: none;
}
</style>
