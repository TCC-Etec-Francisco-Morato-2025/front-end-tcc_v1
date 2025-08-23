<template>
  <q-layout>
    <q-header class="center">
      <h1>Ajustes</h1>
    </q-header>
    <q-main class="main center">
      <section class="config-perfil">
        <q-skeleton type="QAvatar" size="150px"/>
        <div>
          <q-skeleton type="text" style="width: 150px; height: 60px;"/>
        </div>
      </section>
      <section class="config-page center">
        <q-skeleton class="opcoes">
        </q-skeleton>
        <q-skeleton class="opcoes">
        </q-skeleton>
      </section>
    </q-main>
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
  position: static;
  background-color: transparent;
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

.main {
  grid-area: main;
  flex-direction: column;
  margin-top: 40px;
  gap: 40px;
}

.config-perfil {
  flex-direction: column;
  font-size: 18px;
  gap: 10px;
}

.config-page {
  flex-direction: column;
  width: 100%;
  gap: 15px;
}
.config-page .opcoes {
  height: 60px;
  width: 80%;
  border-radius: 20px;
}
</style>
