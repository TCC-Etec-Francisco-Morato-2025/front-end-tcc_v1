import { defineStore } from 'pinia';
import type { Item } from 'src/types';

interface ItensState{
  atac: Item[],
  def: Item[],
  espec: Item[]
}

const useItensStore = defineStore('itens', {
  state: (): ItensState => ({
    atac: [
      { id: 1, tipo: 1, nome: 'Trombeta dos Arcanjos', icon: 'img:/src/assets/itens/ataque/machado.png', img: '/src/assets/itens/ataque/machado.png', func: 'trombetaDosArcanjos', recarregando: false },
      { id: 2, tipo: 1, nome: 'Espada Ondulatoria Divina', icon: 'img:/src/assets/itens/ataque/martelo.png', img: '/src/assets/itens/ataque/martelo.png', func: 'espadaOndulatoriaDivina', recarregando: false },
      // { id: 0, tipo: 0, nome: '', icon: 'add', img: '', func: '', recarregando: false },
      // { id: 0, tipo: 0, nome: '', icon: 'add', img: '', func: '', recarregando: false },
      // { id: 0, tipo: 0, nome: '', icon: 'add', img: '', func: '', recarregando: false },
      // { id: 0, tipo: 0, nome: '', icon: 'add', img: '', func: '', recarregando: false },
    ],
    def: [
      { id: 1, tipo: 2, nome: 'Anel do Vazio', icon: 'img:/src/assets/itens/defesa/escudo.png', img: '/src/assets/itens/defesa/escudo.png', func: 'anelDoVazio', recarregando: false },
      // { id: 0, tipo: 0, nome: '', icon: 'add', img: '', func: '', recarregando: false },
      // { id: 0, tipo: 0, nome: '', icon: 'add', img: '', func: '', recarregando: false },
    ],
    espec: [
      { id: 1, tipo: 3, nome: 'Ampulheta de Zhonyas', icon: 'img:/src/assets/itens/especial/anel.png', img: '/src/assets/itens/especial/anel.png', func: 'ampulhetaDeZhonyas', recarregando: false },
      // { id: 0, tipo: 0, nome: '', icon: 'add', img: '', func: '', recarregando: false },
      // { id: 0, tipo: 0, nome: '', icon: 'add', img: '', func: '', recarregando: false },
    ],
  }),
});

export default useItensStore;
