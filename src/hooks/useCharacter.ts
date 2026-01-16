import { useState, useCallback, useEffect } from "react";
import {
  Character,
  createDefaultCharacter,
  calcularDefesa,
  calcularMemoria,
  calcularAnimum,
  calcularVidaMax,
  calcularEcosPsiquicos,
} from "@/types/character";

const STORAGE_KEY = "calafrio-character";

export function useCharacter() {
  const [character, setCharacter] = useState<Character>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return createDefaultCharacter();
      }
    }
    return createDefaultCharacter();
  });

  // Salvar automaticamente no localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(character));
  }, [character]);

  // Atualizar campo simples
  const updateField = useCallback(<K extends keyof Character>(field: K, value: Character[K]) => {
    setCharacter((prev) => {
      const updated = { ...prev, [field]: value };
      
      // Recalcular valores derivados quando necessário
      if (field === "corpo") {
        updated.defesa = calcularDefesa(value as number);
      }
      if (field === "mente") {
        updated.memoria = calcularMemoria(value as number);
      }
      if (field === "alma") {
        const novoAnimum = calcularAnimum(value as number);
        updated.energiaAnima = novoAnimum;
        updated.animumMax = novoAnimum;
        if (updated.animumAtual > novoAnimum) {
          updated.animumAtual = novoAnimum;
        }
      }
      if (field === "nivel") {
        const novoNivel = value as number;
        const novaVidaMax = calcularVidaMax(novoNivel);
        updated.vidaMax = novaVidaMax;
        updated.ecosPsiquicos = calcularEcosPsiquicos(novoNivel);
        if (updated.vidaAtual > novaVidaMax) {
          updated.vidaAtual = novaVidaMax;
        }
      }
      
      return updated;
    });
  }, []);

  // Reset para valores padrão
  const resetCharacter = useCallback(() => {
    setCharacter(createDefaultCharacter());
  }, []);

  return {
    character,
    updateField,
    setCharacter,
    resetCharacter,
  };
}
