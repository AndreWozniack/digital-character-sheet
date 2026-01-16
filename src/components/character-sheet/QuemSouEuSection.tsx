import { Character } from "@/types/character";
import { SectionHeader } from "./SectionHeader";

interface QuemSouEuSectionProps {
  character: Character;
  onUpdate: <K extends keyof Character>(field: K, value: Character[K]) => void;
}

export function QuemSouEuSection({ character, onUpdate }: QuemSouEuSectionProps) {
  return (
    <div className="space-y-3">
      <SectionHeader>Quem sou eu?</SectionHeader>

      <textarea
        value={character.descricao}
        onChange={(e) => onUpdate("descricao", e.target.value)}
        placeholder="Descreva seu personagem, sua história, motivações e segredos..."
        className="w-full min-h-[120px] bg-secondary/30 border border-primary/20 p-3
                 focus:border-primary focus:outline-none font-body text-sm
                 transition-colors duration-200 resize-none"
      />
    </div>
  );
}
