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

export interface Aula {
  id: number;
  id_materia: number;
  titulo: string;
}

export interface Atividade {
  id: number;
  titulo: string;
  estrelas: number;
  descricao: string;
  id_aula: number;
  id_materia: number;
  proxima?: boolean;
  acertos?: number;
  vida: number;
  video: string;
}

export interface Fala {
  id: number;
  id_personagem: number;
  id_atividade: number;
  fala: string;
}

export interface Personagem {
  id: number;
  nome: string;
  materia: string;
  cor: string;
  img: string;
}

export interface Questao {
  id: number;
  pergunta: string;
  perguntaFacil: string;
  tempo: number;
  tempoCronometro: number;
  cronometro?: number;
}

export interface Resposta {
  id_pergunta: number;
  resposta: string;
  certa: boolean;
}

export interface itensUser{
  id:number,
  tipo:number,
}

export interface User{
    primeiraVez?: boolean,
    logado?: boolean,
    id:string,
    nome:string|null,
    foto:string|null,
    email?:string,
    admin:boolean,
    password?:string,
    token?:string,
    itens?:itensUser[]
}

export {};
