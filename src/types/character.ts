export interface Character {
  nome: string;
  nivel: number;
  
  // Stats principais
  vidaAtual: number;
  vidaMax: number;
  animumAtual: number;
  animumMax: number;
  aptidao: number;
  velocidade: number;
  
  // Atributos
  corpo: number;
  mente: number;
  alma: number;
  
  // Derivados (calculados)
  defesa: number;      // 3 + (corpo * 3)
  memoria: number;     // mente * 6
  energiaAnima: number; // alma * 9
  
  // Ecos psíquicos
  ecosPsiquicos: number; // = nivel atual
  
  // Palavras-chave
  ocupacao: string;
  personalidade: string;
  miscelanea: string[];
  
  // Inventário
  fundos: string;
  esp: string;
  inventario: string;
  
  // Quem sou eu
  descricao: string;
  
  // Habilidades
  habilidadesParanormais: HabilidadeParanormal[];
  habilidadesUnicas: HabilidadeUnica[];
  
  // Imagem do personagem
  imagemUrl?: string;
}

export interface HabilidadeParanormal {
  id: string;
  nome: string;
  grau: 0 | 1 | 2 | 3;
  custo: number;
  descricao: string;
  aprimoramentos: number; // 0, 1 ou 2
}

export interface HabilidadeUnica {
  id: string;
  nome: string;
  descricao: string;
  aprimoramentos: number; // 0, 1 ou 2
}

export function calcularDefesa(corpo: number): number {
  return 3 + (corpo * 3);
}

export function calcularMemoria(mente: number): number {
  return mente * 6;
}

export function calcularAnimum(alma: number): number {
  return alma * 9;
}

export function calcularVidaMax(nivel: number): number {
  return nivel * 6;
}

export function calcularEcosPsiquicos(nivel: number): number {
  return nivel;
}

export function getCustoMemorizacao(grau: 0 | 1 | 2 | 3): number {
  switch (grau) {
    case 0: return 0;
    case 1: return 3;
    case 2: return 6;
    case 3: return 12;
    default: return 0;
  }
}

export function createDefaultCharacter(): Character {
  return {
    nome: "",
    nivel: 1,
    vidaAtual: 6,
    vidaMax: 6,
    animumAtual: 9,
    animumMax: 9,
    aptidao: 0,
    velocidade: 6,
    corpo: 0,
    mente: 0,
    alma: 1,
    defesa: 3,
    memoria: 0,
    energiaAnima: 9,
    ecosPsiquicos: 1,
    ocupacao: "",
    personalidade: "",
    miscelanea: [],
    fundos: "",
    esp: "",
    inventario: "",
    descricao: "",
    habilidadesParanormais: [],
    habilidadesUnicas: [],
  };
}
