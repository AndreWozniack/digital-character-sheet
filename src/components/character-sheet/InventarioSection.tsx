import { Character } from "@/types/character";
import { SectionHeader } from "./SectionHeader";

interface InventarioSectionProps {
  character: Character;
  onUpdate: <K extends keyof Character>(field: K, value: Character[K]) => void;
}

export function InventarioSection({ character, onUpdate }: InventarioSectionProps) {
  return (
    <div className="space-y-3 h-full flex flex-col">
      <SectionHeader>Inventário & anotações</SectionHeader>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <span className="font-display text-sm font-semibold">Fundo$:</span>
          <input
            type="text"
            value={character.fundos}
            onChange={(e) => onUpdate("fundos", e.target.value)}
            className="flex-1 bg-transparent border-b-2 border-primary/30 px-2 py-1
                     focus:border-primary focus:outline-none font-body"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-display text-sm font-semibold">E$P:</span>
          <input
            type="text"
            value={character.esp}
            onChange={(e) => onUpdate("esp", e.target.value)}
            className="flex-1 bg-transparent border-b-2 border-primary/30 px-2 py-1
                     focus:border-primary focus:outline-none font-body"
          />
        </div>
      </div>

      <textarea
        value={character.inventario}
        onChange={(e) => onUpdate("inventario", e.target.value)}
        placeholder="Liste seus itens, equipamentos e anotações..."
        className="flex-1 min-h-[200px] w-full bg-secondary/30 border border-primary/20 p-3
                 focus:border-primary focus:outline-none font-body text-sm
                 transition-colors duration-200 resize-none"
      />
    </div>
  );
}
