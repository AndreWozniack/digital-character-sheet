import { Character } from "@/types/character";
import { SectionHeader } from "./SectionHeader";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface KeywordsSectionProps {
  character: Character;
  onUpdate: <K extends keyof Character>(field: K, value: Character[K]) => void;
}

export function KeywordsSection({ character, onUpdate }: KeywordsSectionProps) {
  const [newMisc, setNewMisc] = useState("");

  const addMiscelanea = () => {
    if (newMisc.trim()) {
      onUpdate("miscelanea", [...character.miscelanea, newMisc.trim()]);
      setNewMisc("");
    }
  };

  const removeMiscelanea = (index: number) => {
    onUpdate(
      "miscelanea",
      character.miscelanea.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <SectionHeader variant="small">Palavras-chave</SectionHeader>
        <div className="flex-1 h-0.5 bg-primary/20" />
      </div>

      {/* Ocupação */}
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Ocupação
        </label>
        <input
          type="text"
          value={character.ocupacao}
          onChange={(e) => onUpdate("ocupacao", e.target.value)}
          placeholder="Ex: Investigador, Médico..."
          className="w-full bg-secondary/50 border border-primary/20 px-3 py-2 
                     focus:border-primary focus:outline-none font-body
                     transition-colors duration-200"
        />
      </div>

      {/* Personalidade */}
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Personalidade
        </label>
        <input
          type="text"
          value={character.personalidade}
          onChange={(e) => onUpdate("personalidade", e.target.value)}
          placeholder="Ex: Corajoso, Desconfiado..."
          className="w-full bg-secondary/50 border border-primary/20 px-3 py-2 
                     focus:border-primary focus:outline-none font-body
                     transition-colors duration-200"
        />
      </div>

      {/* Miscelânea */}
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground uppercase tracking-wider">
          Miscelânea
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {character.miscelanea.map((item, index) => (
            <span
              key={index}
              className="bg-primary text-primary-foreground px-2 py-1 text-sm font-body
                         flex items-center gap-1"
            >
              {item}
              <button
                onClick={() => removeMiscelanea(index)}
                className="hover:text-destructive transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newMisc}
            onChange={(e) => setNewMisc(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addMiscelanea()}
            placeholder="Adicionar..."
            className="flex-1 bg-secondary/50 border border-primary/20 px-3 py-2 
                       focus:border-primary focus:outline-none font-body text-sm
                       transition-colors duration-200"
          />
          <button
            onClick={addMiscelanea}
            className="bg-primary text-primary-foreground px-3 py-2 
                       hover:bg-primary/80 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
