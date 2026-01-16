import { Character } from "@/types/character";
import { DualStatInput } from "./StatInput";
import { User } from "lucide-react";

interface HeaderSectionProps {
  character: Character;
  onUpdate: <K extends keyof Character>(field: K, value: Character[K]) => void;
}

export function HeaderSection({ character, onUpdate }: HeaderSectionProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Imagem do personagem */}
      <div className="w-32 h-40 lg:w-40 lg:h-48 border-2 border-primary bg-secondary/30 flex items-center justify-center shrink-0">
        {character.imagemUrl ? (
          <img
            src={character.imagemUrl}
            alt="Personagem"
            className="w-full h-full object-cover"
          />
        ) : (
          <User className="w-16 h-16 text-muted-foreground" />
        )}
      </div>

      {/* Info principal */}
      <div className="flex-1 space-y-4">
        {/* Nome */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={character.nome}
            onChange={(e) => onUpdate("nome", e.target.value)}
            placeholder="NOME DO PERSONAGEM"
            className="flex-1 bg-transparent border-b-2 border-primary text-2xl lg:text-3xl
                     font-display font-bold uppercase tracking-wider
                     focus:outline-none placeholder:text-muted-foreground/50"
          />
          <div className="text-right">
            <span className="font-display text-xs text-muted-foreground block">- T T R P G -</span>
            <span className="font-display text-2xl font-black tracking-[0.3em]">CALAFRIO</span>
          </div>
        </div>

        {/* Stats principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DualStatInput
            label="Vida (PV)"
            atual={character.vidaAtual}
            max={character.vidaMax}
            onAtualChange={(v) => onUpdate("vidaAtual", v)}
            maxReadOnly
          />

          <DualStatInput
            label="Ânimum (PA)"
            atual={character.animumAtual}
            max={character.animumMax}
            onAtualChange={(v) => onUpdate("animumAtual", v)}
            maxReadOnly
          />

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-semibold">Aptidão (BA):</span>
              <span className="text-lg">+</span>
              <input
                type="number"
                value={character.aptidao}
                onChange={(e) => onUpdate("aptidao", parseInt(e.target.value) || 0)}
                className="w-12 bg-transparent border-b-2 border-primary/30 px-1 py-0.5 
                         text-center font-body text-lg focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Linha inferior */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2 border-t border-primary/20">
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
            <span className="font-display text-sm font-semibold">Velocidade:</span>
            <div className="border-2 border-primary px-3 py-1 min-w-[50px] text-center">
              <span className="font-display font-bold">{character.velocidade}</span>
            </div>
            <span className="text-xs text-muted-foreground">= 6</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-xs italic">= NÍVEL ATUAL × 6 (PV)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
