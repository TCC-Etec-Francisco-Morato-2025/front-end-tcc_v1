export interface Item {
  id: string;
  tipo?: number;
  nome: string;
  icon: string;
  img: string;
  func: string;
  carregado: boolean;
  descricao: string;
  habilidade: string;
  habilidadeTitulo: string;
}

export interface Materia {
  id: string;
  nome: string;
  icon: string;
  cor: string;
  path: string;
  textColor: string;
}

export interface Aula {
  id: string;
  id_materia: string;
  titulo: string;
}

export interface Atividade {
  id: string;
  titulo: string;
  estrelas: number;
  descricao: string;
  id_aula: string;
  proxima?: boolean;
  acertos?: number;
  vida: number;
  video: string;
}

export interface Fala {
  id: string;
  id_personagem: string;
  id_atividade: string;
  fala: string;
}

export interface Personagem {
  id: string;
  nome: string;
  materia: string;
  cor: string;
  img: string;
}

export interface Questao {
  id: string;
  pergunta: string;
  perguntaFacil: string;
  tempo: number;
  tempoCronometro: number;
  cronometro?: number;
}

export interface Resposta {
  id_pergunta: string;
  resposta: string;
  certa: boolean;
}

export interface itensUser {
  id: string,
  tipo: number,
}

export interface User {
  primeiraVez?: boolean,
  logado?: boolean,
  id: string,
  nome: string | null,
  foto: string | null,
  email?: string,
  admin: boolean,
  token?: string,
  itens?: itensUser[]
}

export { };
