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
      <div className="bg-secondary/20 border border-primary/20 p-3">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center shrink-0">
            <input
              type="number"
              value={character.corpo}
              onChange={(e) => onUpdate("corpo", Math.max(0, Math.min(10, parseInt(e.target.value) || 0)))}
              min={0}
              max={10}
              className="w-6 text-center bg-transparent font-display font-bold text-lg focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <SectionHeader variant="small">Corpo</SectionHeader>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 pl-0 sm:pl-12">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm font-semibold">Defesa (PD):</span>
            <div className="border-2 border-primary px-3 py-1 min-w-[50px] text-center">
              <span className="font-display font-bold">{character.defesa}</span>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">= 3 + (CORPO × 3)</span>
        </div>
        
        <div className="mt-2 pl-0 sm:pl-12">
          <input
            type="range"
            min="0"
            max="10"
            value={character.corpo}
            onChange={(e) => onUpdate("corpo", parseInt(e.target.value))}
            className="w-full accent-primary h-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>
      </div>

      {/* Mente */}
      <div className="bg-secondary/20 border border-primary/20 p-3">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center shrink-0">
            <input
              type="number"
              value={character.mente}
              onChange={(e) => onUpdate("mente", Math.max(0, Math.min(10, parseInt(e.target.value) || 0)))}
              min={0}
              max={10}
              className="w-6 text-center bg-transparent font-display font-bold text-lg focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <SectionHeader variant="small">Mente</SectionHeader>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 pl-0 sm:pl-12">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm font-semibold">Memória (PM):</span>
            <div className="border-2 border-primary px-3 py-1 min-w-[50px] text-center">
              <span className="font-display font-bold">{character.memoria}</span>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">= MENTE × 6</span>
        </div>
        
        <div className="mt-2 pl-0 sm:pl-12">
          <input
            type="range"
            min="0"
            max="10"
            value={character.mente}
            onChange={(e) => onUpdate("mente", parseInt(e.target.value))}
            className="w-full accent-primary h-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>
      </div>

      {/* Alma */}
      <div className="bg-secondary/20 border border-primary/20 p-3">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center shrink-0">
            <input
              type="number"
              value={character.alma}
              onChange={(e) => onUpdate("alma", Math.max(0, Math.min(10, parseInt(e.target.value) || 0)))}
              min={0}
              max={10}
              className="w-6 text-center bg-transparent font-display font-bold text-lg focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <SectionHeader variant="small">Alma</SectionHeader>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 pl-0 sm:pl-12">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm font-semibold">Ânimum (PA):</span>
            <div className="border-2 border-primary px-3 py-1 min-w-[50px] text-center">
              <span className="font-display font-bold">{character.energiaAnima}</span>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">= ALMA × 9</span>
        </div>
        
        <div className="mt-2 pl-0 sm:pl-12">
          <input
            type="range"
            min="0"
            max="10"
            value={character.alma}
            onChange={(e) => onUpdate("alma", parseInt(e.target.value))}
            className="w-full accent-primary h-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
