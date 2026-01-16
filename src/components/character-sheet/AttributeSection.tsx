import { Character } from "@/types/character";
import { SectionHeader } from "./SectionHeader";

interface AttributeSectionProps {
  character: Character;
  onUpdate: <K extends keyof Character>(field: K, value: Character[K]) => void;
}

export function AttributeSection({ character, onUpdate }: AttributeSectionProps) {
  return (
    <div className="space-y-4">
      {/* Corpo */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center">
            <span className="font-display font-bold text-lg">
              {character.corpo}
            </span>
          </div>
          <div className="flex-1">
            <SectionHeader>Corpo</SectionHeader>
          </div>
        </div>
        <p className="text-xs text-muted-foreground pl-12">
          +3PD por nível atribuído
        </p>
        <div className="flex items-center gap-2 pl-12">
          <span className="font-display text-sm font-semibold">Defesa (PD):</span>
          <div className="border-2 border-primary px-3 py-1 min-w-[60px] text-center">
            <span className="font-display font-bold">{character.defesa}</span>
          </div>
          <span className="text-xs text-muted-foreground">= 3 + (CORPO × 3)</span>
        </div>
        <div className="pl-12">
          <input
            type="range"
            min="0"
            max="10"
            value={character.corpo}
            onChange={(e) => onUpdate("corpo", parseInt(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
      </div>

      {/* Mente */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center">
            <span className="font-display font-bold text-lg">
              {character.mente}
            </span>
          </div>
          <div className="flex-1">
            <SectionHeader>Mente</SectionHeader>
          </div>
        </div>
        <p className="text-xs text-muted-foreground pl-12">
          +6 PM por nível atribuído
        </p>
        <div className="flex items-center gap-2 pl-12">
          <span className="font-display text-sm font-semibold">Memória (PM):</span>
          <div className="border-2 border-primary px-3 py-1 min-w-[60px] text-center">
            <span className="font-display font-bold">{character.memoria}</span>
          </div>
          <span className="text-xs text-muted-foreground">= MENTE × 6</span>
        </div>
        <div className="pl-12">
          <input
            type="range"
            min="0"
            max="10"
            value={character.mente}
            onChange={(e) => onUpdate("mente", parseInt(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
      </div>

      {/* Alma */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center">
            <span className="font-display font-bold text-lg">
              {character.alma}
            </span>
          </div>
          <div className="flex-1">
            <SectionHeader>Alma</SectionHeader>
          </div>
        </div>
        <p className="text-xs text-muted-foreground pl-12">
          +9 PA por nível atribuído
        </p>
        <div className="flex items-center gap-2 pl-12">
          <span className="font-display text-sm font-semibold">Ânimum (PA):</span>
          <div className="border-2 border-primary px-3 py-1 min-w-[60px] text-center">
            <span className="font-display font-bold">{character.energiaAnima}</span>
          </div>
          <span className="text-xs text-muted-foreground">= ALMA × 9</span>
        </div>
        <div className="pl-12">
          <input
            type="range"
            min="0"
            max="10"
            value={character.alma}
            onChange={(e) => onUpdate("alma", parseInt(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
      </div>
    </div>
  );
}
