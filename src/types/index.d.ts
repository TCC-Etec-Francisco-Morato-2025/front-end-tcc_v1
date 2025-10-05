export interface Item {
  id: number;
  tipo: number;
  nome: string;
  icon: string;
  img: string;
  func: string;
  recarregando: boolean;
}

export interface Materia {
  id: number;
  nome: string;
  icon: string;
  cor: string;
  path: string;
  textColor: string;
}

export interface Assunto {
  id: number;
  nome: string;
  materia: number;
}

export interface Atividade {
  id: number;
  titulo: string;
  estrelas: number;
  descricao: string;
  assunto: number;
  materia: number;
  proxima?: boolean;
  acertos?: number;
  vida?: number;
}

export interface Fala {
  id: number;
  personagem: number;
  atividade: number;
  fala: string;
}

export interface Personagem {
  id: number;
  nome: string;
  materia: string;
  cor: string;
  personagem: string;
}

export interface Questao {
  id: number;
  pergunta: string;
  perguntaFacil: string;
  tempo: number;
  cronometro: number;
  tempoCronometro: number;
  cronometro?: number;
}

export interface Resposta {
  perguntaId: number;
  resposta: string;
  certa: boolean;
}

export {};
