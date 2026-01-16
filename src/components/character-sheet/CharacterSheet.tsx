import { useCharacter } from "@/hooks/useCharacter";
import { HeaderSection } from "./HeaderSection";
import { AttributeSection } from "./AttributeSection";
import { KeywordsSection } from "./KeywordsSection";
import { InventarioSection } from "./InventarioSection";
import { QuemSouEuSection } from "./QuemSouEuSection";
import { HabilidadesSection } from "./HabilidadesSection";
import { GeometricBorder } from "./GeometricBorder";
import { RotateCcw, Download, Upload } from "lucide-react";
import { useRef } from "react";

export function CharacterSheet() {
  const { character, updateField, setCharacter, resetCharacter } = useCharacter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const dataStr = JSON.stringify(character, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${character.nome || "personagem"}-calafrio.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        setCharacter(imported);
      } catch (err) {
        alert("Erro ao importar arquivo. Verifique se é um JSON válido.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-background calafrio-geometric-pattern">
      <div className="container mx-auto py-4 lg:py-8 px-2 lg:px-4">
        {/* Toolbar */}
        <div className="flex justify-end gap-2 mb-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-3 py-1.5 border border-primary/30 
                     text-sm hover:bg-secondary transition-colors font-display"
            title="Importar personagem"
          >
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Importar</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-3 py-1.5 border border-primary/30 
                     text-sm hover:bg-secondary transition-colors font-display"
            title="Exportar personagem"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Exportar</span>
          </button>
          <button
            onClick={resetCharacter}
            className="flex items-center gap-2 px-3 py-1.5 border border-destructive/30 
                     text-destructive text-sm hover:bg-destructive/10 transition-colors font-display"
            title="Resetar ficha"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Resetar</span>
          </button>
        </div>

        {/* Ficha */}
        <div className="bg-card border-2 border-primary shadow-2xl">
          {/* Página 1 */}
          <div className="p-4 lg:p-8 space-y-6">
            {/* Header com nome e stats */}
            <HeaderSection character={character} onUpdate={updateField} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Coluna esquerda - Inventário */}
              <InventarioSection character={character} onUpdate={updateField} />

              {/* Coluna direita - Atributos e Palavras-chave */}
              <div className="space-y-6">
                <AttributeSection character={character} onUpdate={updateField} />
                <KeywordsSection character={character} onUpdate={updateField} />
              </div>
            </div>
          </div>

          <GeometricBorder />

          {/* Página 2 */}
          <div className="p-4 lg:p-8 space-y-6 border-t-2 border-primary">
            <QuemSouEuSection character={character} onUpdate={updateField} />
            <HabilidadesSection character={character} onUpdate={updateField} />
          </div>

          <GeometricBorder />
        </div>

        {/* Footer */}
        <div className="text-center mt-4 text-xs text-muted-foreground font-display">
          CALAFRIO TTRPG — Ficha Digital
        </div>
      </div>
    </div>
  );
}
