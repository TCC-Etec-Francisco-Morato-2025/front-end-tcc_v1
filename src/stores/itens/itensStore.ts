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
      { id: '1', tipo: 1, nome: 'Trombeta dos Arcanjos', icon: 'img:/public/itens/ataque/TrompeteArc.png', img: '/public/itens/ataque/TrompeteArc.png', func: 'trombetaDosArcanjos', carregado: true, descricao: 'Uma trombeta dada pelos deuses do RPG para seus subordinados de níveis mais altos. Com o objetivo de levar os alunos ao “céu” da aprovação e diploma ela serve como arma para questões malignas e difíceis enviadas do inferno', habilidade: 'Pula para a próxima questão (1 uso por atividade)', habilidadeTitulo:'Arrebatar' },
      // { id: '2', tipo: 1, nome: 'Espada Ondulatoria Divina', icon: 'img:/public/itens/ataque/EspadaOnd.png', img: '/public/itens/ataque/EspadaOnd.png', func: 'espadaOndulatoriaDivina', carregado: true },
      // { id: '0', tipo: 0, nome: '', icon: 'add', img: '', func: '', carregado: true },
      // { id: '0', tipo: 0, nome: '', icon: 'add', img: '', func: '', carregado: true },
      // { id: '0', tipo: 0, nome: '', icon: 'add', img: '', func: '', carregado: true },
      // { id: '0', tipo: 0, nome: '', icon: 'add', img: '', func: '', carregado: true },
    ],
    def: [
      { id: '1', tipo: 2, nome: 'Anel do Vazio', icon: 'img:/public/itens/defesa/anelDoVazio.png', img: '/public/itens/defesa/anelDoVazio.png', func: 'anelDoVazio', carregado: true, descricao: 'Anel que foi usado por aquele conhecido como “O mais forte”. A pessoa que utilizar esse anel e receber tanta informação a ponto de não conseguir responder uma pergunta em um certo período acaba utilizando o poder do primeiro portador e faz a mente do questionador se tornar “vazia” fazendo-o esquecer a pergunta ', habilidade: 'Se o usuário estiver com ele equipado e passar o tempo limite da questão ele pula ela (1 uso por atividade)', habilidadeTitulo: 'Tropeço' },
      // { id: '0', tipo: 0, nome: '', icon: 'add', img: '', func: '', carregado: true },
      // { id: '0', tipo: 0, nome: '', icon: 'add', img: '', func: '', carregado: true },
    ],
    espec: [
      { id: '1', tipo: 3, nome: 'Ampulheta de Zhonyas', icon: 'img:/public/itens/especial/ampu.png', img: '/public/itens/especial/ampu.png', func: 'ampulhetaDeZhonyas', carregado: true, descricao: 'Uma Ampulheta forjada por um antigo Anão da tribo dos Rioters onde o portador que utilizar a ampulheta poderá voltar no tempo por 15 segundos', habilidade: 'Recupera 15 segundos do cronometro(1 uso por atividade)', habilidadeTitulo:'Retroceder' },
      // { id: '0', tipo: 0, nome: '', icon: 'add', img: '', func: '', carregado: true },
      // { id: '0', tipo: 0, nome: '', icon: 'add', img: '', func: '', carregado: true },
    ],
  }),
});

export default useItensStore;
