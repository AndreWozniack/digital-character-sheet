import { Character } from "@/types/character";
import { DualStatInput } from "./StatInput";
import { User } from "lucide-react";

interface HeaderSectionProps {
  character: Character;
  onUpdate: <K extends keyof Character>(field: K, value: Character[K]) => void;
}

export function HeaderSection({ character, onUpdate }: HeaderSectionProps) {
  return (
    <div className="space-y-4">
      {/* Header row: Imagem + Nome + Logo */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Imagem do personagem */}
        <div className="w-24 h-28 sm:w-32 sm:h-40 border-2 border-primary bg-secondary/30 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
          {character.imagemUrl ? (
            <img
              src={character.imagemUrl}
              alt="Personagem"
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground" />
          )}
        </div>

        {/* Nome e Logo */}
        <div className="flex-1 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <input
              type="text"
              value={character.nome}
              onChange={(e) => onUpdate("nome", e.target.value)}
              placeholder="NOME"
              className="flex-1 bg-transparent border-b-2 border-primary text-xl sm:text-2xl lg:text-3xl
                       font-display font-bold uppercase tracking-wider text-center sm:text-left
                       focus:outline-none placeholder:text-muted-foreground/50"
            />
            <div className="text-center sm:text-right shrink-0">
              <span className="font-display text-[10px] text-muted-foreground block">- T T R P G -</span>
              <span className="font-display text-lg sm:text-xl lg:text-2xl font-black tracking-[0.2em] sm:tracking-[0.3em]">CALAFRIO</span>
            </div>
          </div>

          {/* Nível e Velocidade - inline com nome em telas maiores */}
          <div className="hidden sm:flex items-center gap-4 pt-2">
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-semibold">Nível:</span>
              <input
                type="number"
                value={character.nivel}
                onChange={(e) => onUpdate("nivel", Math.max(1, parseInt(e.target.value) || 1))}
                min={1}
                className="w-12 bg-transparent border-b-2 border-primary/30 px-1 py-0.5 
                         text-center font-body text-lg focus:border-primary focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-semibold">Vel:</span>
              <div className="border-2 border-primary px-2 py-0.5 text-center">
                <span className="font-display font-bold">{character.velocidade}</span>
              </div>
            </div>
            <span className="text-xs text-muted-foreground italic hidden md:inline">
              PV máx = Nível × 6
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid - Mobile optimized */}
      <div className="grid grid-cols-2 gap-3 sm:hidden">
        {/* Nível */}
        <div className="bg-secondary/30 p-3 border border-primary/20">
          <span className="font-display text-xs text-muted-foreground block mb-1">NÍVEL</span>
          <input
            type="number"
            value={character.nivel}
            onChange={(e) => onUpdate("nivel", Math.max(1, parseInt(e.target.value) || 1))}
            min={1}
            className="w-full bg-transparent text-2xl font-display font-bold text-center
                     focus:outline-none"
          />
        </div>
        {/* Velocidade */}
        <div className="bg-secondary/30 p-3 border border-primary/20">
          <span className="font-display text-xs text-muted-foreground block mb-1">VELOCIDADE</span>
          <div className="text-2xl font-display font-bold text-center">{character.velocidade}</div>
        </div>
      </div>

      {/* Stats principais - Cards em mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Vida */}
        <div className="bg-secondary/30 p-3 border border-primary/20">
          <div className="flex items-center justify-between sm:block">
            <span className="font-display text-xs text-muted-foreground">VIDA (PV)</span>
            <span className="text-xs text-muted-foreground sm:hidden">máx: {character.vidaMax}</span>
          </div>
          <div className="flex items-center justify-center gap-2 mt-1">
            <input
              type="number"
              value={character.vidaAtual}
              onChange={(e) => onUpdate("vidaAtual", parseInt(e.target.value) || 0)}
              min={0}
              max={character.vidaMax}
              className="w-16 bg-transparent text-2xl font-display font-bold text-center
                       border-b-2 border-primary/30 focus:border-primary focus:outline-none"
            />
            <span className="text-xl text-primary font-bold">/</span>
            <span className="text-2xl font-display font-bold text-muted-foreground">{character.vidaMax}</span>
          </div>
        </div>

        {/* Ânimum */}
        <div className="bg-secondary/30 p-3 border border-primary/20">
          <div className="flex items-center justify-between sm:block">
            <span className="font-display text-xs text-muted-foreground">ÂNIMUM (PA)</span>
            <span className="text-xs text-muted-foreground sm:hidden">máx: {character.animumMax}</span>
          </div>
          <div className="flex items-center justify-center gap-2 mt-1">
            <input
              type="number"
              value={character.animumAtual}
              onChange={(e) => onUpdate("animumAtual", parseInt(e.target.value) || 0)}
              min={0}
              max={character.animumMax}
              className="w-16 bg-transparent text-2xl font-display font-bold text-center
                       border-b-2 border-primary/30 focus:border-primary focus:outline-none"
            />
            <span className="text-xl text-primary font-bold">/</span>
            <span className="text-2xl font-display font-bold text-muted-foreground">{character.animumMax}</span>
          </div>
        </div>

        {/* Aptidão */}
        <div className="bg-secondary/30 p-3 border border-primary/20">
          <span className="font-display text-xs text-muted-foreground block">APTIDÃO (BA)</span>
          <div className="flex items-center justify-center gap-1 mt-1">
            <span className="text-2xl font-display font-bold">+</span>
            <input
              type="number"
              value={character.aptidao}
              onChange={(e) => onUpdate("aptidao", parseInt(e.target.value) || 0)}
              className="w-16 bg-transparent text-2xl font-display font-bold text-center
                       border-b-2 border-primary/30 focus:border-primary focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
