<script setup lang="ts">
import usePopUpStore from 'src/stores/popUp';

const popUpStore = usePopUpStore();
</script>

<template>
    <q-dialog v-model="popUpStore.confirmar.estado" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-amber-6 text-white" style="width: 300px">
            <q-card-section>
                <div class="text-h5">
                    <q-avatar class="icon-alert" icon="report" color="amber-6" />
                    Atenção
                </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <span>Ao sair da atividade você perde todo o seu progresso. Tem certeza disso?</span>
            </q-card-section>

            <q-card-actions>
                <div class="flex items-center">
                    <q-checkbox v-model="popUpStore.confirmar.naoAparecerNovamente" />
                    <span>Não aparcer novamente.</span>
                </div>
            </q-card-actions>

            <q-card-actions align="right" class="bg-white text-teal">
                <q-btn flat label="cancelar" @click="popUpStore.toggleConfirmar()" />
                <q-btn flat label="Sim" @click="confirmar" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>