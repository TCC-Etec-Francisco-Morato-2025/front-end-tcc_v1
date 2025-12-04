<template>
    <header class="center">
      <h1>Matérias</h1>
    </header>
    <ul class="lista-materias">
      <div>
        <q-skeleton size="100px" type="QAvatar" style="margin-bottom: 20px;"/>
        <q-skeleton type="text"/>
      </div>
      <div>
        <q-skeleton size="100px" type="QAvatar" style="margin-bottom: 20px;"/>
        <q-skeleton type="text"/>
      </div>
            <div>
        <q-skeleton size="100px" type="QAvatar" style="margin-bottom: 20px;"/>
        <q-skeleton type="text"/>
      </div>
            <div>
        <q-skeleton size="100px" type="QAvatar" style="margin-bottom: 20px;"/>
        <q-skeleton type="text"/>
      </div>
            <div>
        <q-skeleton size="100px" type="QAvatar" style="margin-bottom: 20px;"/>
        <q-skeleton type="text"/>
      </div>
      <div>
        <q-skeleton size="100px" type="QAvatar" style="margin-bottom: 20px;"/>
        <q-skeleton type="text"/>
      </div>
    </ul>
</template>

<style scoped>

header{
  background-image: linear-gradient(
    to bottom,
    rgba(var(--color-text-1), 0.2) 0%,   /* Sombra preta sutil (10% opacidade) no topo */
    rgba(var(--color-text-1), 0.15) 20%,    /* Transparente 10% abaixo do topo */
    rgba(var(--color-text-1), 0.12) 30%,
    rgba(var(--color-text-1), 0.1) 50%,    /* Continua transparente até 10% antes da base */
    rgba(var(--color-text-1), 0.05) 70%,    /* Continua transparente até 10% antes da base */
    rgba(var(--color-text-1), 0) 100%  /* Sombra preta sutil (10% opacidade) na base */
  );
  height: 120px;
  margin-bottom: 20px;
}
header h1{
  font-size: 45px;
  }

.lista-materias{
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  min-width: 100%;
  padding: 0 60px;
  gap: 50px;
}
</style>
