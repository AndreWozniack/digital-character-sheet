import { useCharacter } from "@/hooks/useCharacter";
import { HeaderSection } from "./HeaderSection";
import { AttributeSection } from "./AttributeSection";
import { KeywordsSection } from "./KeywordsSection";
import { InventarioSection } from "./InventarioSection";
import { QuemSouEuSection } from "./QuemSouEuSection";
import { HabilidadesSection } from "./HabilidadesSection";
import { GeometricBorder } from "./GeometricBorder";
import { RotateCcw, Download, Upload, Menu, X } from "lucide-react";
import { useRef, useState } from "react";

export function CharacterSheet() {
  const { character, updateField, setCharacter, resetCharacter } = useCharacter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleExport = () => {
    const dataStr = JSON.stringify(character, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${character.nome || "personagem"}-calafrio.json`;
    a.click();
    URL.revokeObjectURL(url);
    setShowMobileMenu(false);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        setCharacter(imported);
        setShowMobileMenu(false);
      } catch (err) {
        alert("Erro ao importar arquivo. Verifique se é um JSON válido.");
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm("Tem certeza que deseja resetar a ficha? Todos os dados serão perdidos.")) {
      resetCharacter();
      setShowMobileMenu(false);
    }
  };

  return (
    <div className="min-h-screen bg-background calafrio-geometric-pattern">
      <div className="container mx-auto py-3 sm:py-4 lg:py-8 px-2 sm:px-4">
        {/* Toolbar - Desktop */}
        <div className="hidden sm:flex justify-end gap-2 mb-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-3 py-1.5 border border-primary/30 
                     text-sm hover:bg-secondary transition-colors font-display"
            title="Importar personagem"
          >
            <Upload className="w-4 h-4" />
            <span>Importar</span>
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
            <span>Exportar</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-3 py-1.5 border border-destructive/30 
                     text-destructive text-sm hover:bg-destructive/10 transition-colors font-display"
            title="Resetar ficha"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Resetar</span>
          </button>
        </div>

        {/* Toolbar - Mobile */}
        <div className="sm:hidden flex justify-end mb-3">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 border border-primary/30 hover:bg-secondary transition-colors"
          >
            {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="sm:hidden mb-4 bg-card border border-primary/20 p-3 space-y-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-primary/30 
                       text-sm hover:bg-secondary transition-colors font-display"
            >
              <Upload className="w-4 h-4" />
              Importar Personagem
            </button>
            <button
              onClick={handleExport}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-primary/30 
                       text-sm hover:bg-secondary transition-colors font-display"
            >
              <Download className="w-4 h-4" />
              Exportar Personagem
            </button>
            <button
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-destructive/30 
                       text-destructive text-sm hover:bg-destructive/10 transition-colors font-display"
            >
              <RotateCcw className="w-4 h-4" />
              Resetar Ficha
            </button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />

        {/* Ficha */}
        <div className="bg-card border-2 border-primary shadow-2xl">
          {/* Página 1 */}
          <div className="p-3 sm:p-4 lg:p-8 space-y-4 sm:space-y-6">
            {/* Header com nome e stats */}
            <HeaderSection character={character} onUpdate={updateField} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Mobile: Atributos primeiro */}
              <div className="lg:hidden space-y-4">
                <AttributeSection character={character} onUpdate={updateField} />
                <KeywordsSection character={character} onUpdate={updateField} />
              </div>

              {/* Coluna esquerda - Inventário */}
              <InventarioSection character={character} onUpdate={updateField} />

              {/* Coluna direita - Atributos e Palavras-chave (Desktop) */}
              <div className="hidden lg:block space-y-6">
                <AttributeSection character={character} onUpdate={updateField} />
                <KeywordsSection character={character} onUpdate={updateField} />
              </div>
            </div>
          </div>

          <GeometricBorder />

          {/* Página 2 */}
          <div className="p-3 sm:p-4 lg:p-8 space-y-4 sm:space-y-6 border-t-2 border-primary">
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
