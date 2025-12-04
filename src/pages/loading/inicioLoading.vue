<template>
  <q-layout>
    <q-header>
      <div class="perfil">
        <q-skeleton type="QAvatar" size="70px" />
        <q-skeleton type="text" style="width: 100px; margin-left: 10px" />
      </div>
    </q-header>
    <main>
      <section class="secao-para-voce">
        <q-skeleton class="titulo-secao" type="text" />
        <div class="carrocel">
          <q-skeleton class="slide left" />
          <q-skeleton class="slide center" />
          <q-skeleton class="slide right" />
        </div>
      </section>

      <section class="secao-continuar">
        <q-skeleton class="titulo-secao" type="text" />
        <div class="carrocel">
          <q-skeleton class="slide left" />
          <q-skeleton class="slide center" />
          <q-skeleton class="slide right" />
        </div>
      </section>

      <section class="secao-eventos"></section>
    </main>
  </q-layout>
</template>

<style scoped>
header {
  display: flex;
  position: sticky;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: var(--color-background);
}

.perfil {
  display: flex;
  width: 250px;
}

.carrocel {
  position: relative;
  width: 100%;
  height: 150px;

}
.slide {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 220px; /* largura fixa para mostrar parciais */
  height: 100%;
  border-radius: 10px;
}
.center{
  left: 50%;
  transform: translateX(-50%);
}
.left{
  left: -170px;
}
.right {
  right: -170px;
}

.titulo-secao {
  width: 150px;
  height: 100px;
  border-radius: 0 10px 10px 0;
}

.secao-continuar{
  margin: 0;
}
</style>
