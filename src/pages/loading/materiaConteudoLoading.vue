<template>
  <q-page id="pg-materia-conteudo">
    <header>
      <q-skeleton type="QBtn" class="titulo"/>
      <q-skeleton type="QInput" class="pesquisa"/>
    </header>
    <main>
      <q-list>
          <q-skeleton class="item"/>
          <q-skeleton class="item"/>
          <q-skeleton class="item"/>
          <q-skeleton class="item"/>
          <q-skeleton class="item"/>
      </q-list>
    </main>
  </q-page>
</template>

<style scoped>

#pg-materia-conteudo {
  display: flex;
  flex-direction: column;
  padding: 40px 25px 0 25px;
  gap: 40px;
}

header {
  display: contents;
}

.border {
  border-radius: 100px !important;
}

.titulo {
  width: 100%;
  height: 100px;
  border-radius: 20px;
  transition: background-color 0.2s ease, transform 0.1s ease;
  cursor: pointer; /* Indica que é clicável */
}

.pesquisa{
  margin: 0 auto;
  width: 90%;
}

.q-list {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
}

.item{
  width: 90%;
  height: 70px;
}
</style>
