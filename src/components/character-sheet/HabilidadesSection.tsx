import { Character, HabilidadeParanormal, HabilidadeUnica, getCustoMemorizacao } from "@/types/character";
import { SectionHeader } from "./SectionHeader";
import { DiamondPair } from "./DiamondCheckbox";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface HabilidadesSectionProps {
  character: Character;
  onUpdate: <K extends keyof Character>(field: K, value: Character[K]) => void;
}

export function HabilidadesSection({ character, onUpdate }: HabilidadesSectionProps) {
  const [showAddParanormal, setShowAddParanormal] = useState(false);
  const [showAddUnica, setShowAddUnica] = useState(false);
  const [expandedParanormal, setExpandedParanormal] = useState<string | null>(null);
  const [expandedUnica, setExpandedUnica] = useState<string | null>(null);

  const addHabilidadeParanormal = (hab: Omit<HabilidadeParanormal, "id">) => {
    const newHab: HabilidadeParanormal = {
      ...hab,
      id: crypto.randomUUID(),
    };
    onUpdate("habilidadesParanormais", [...character.habilidadesParanormais, newHab]);
    setShowAddParanormal(false);
  };

  const updateHabilidadeParanormal = (id: string, updates: Partial<HabilidadeParanormal>) => {
    onUpdate(
      "habilidadesParanormais",
      character.habilidadesParanormais.map((h) =>
        h.id === id ? { ...h, ...updates } : h
      )
    );
  };

  const removeHabilidadeParanormal = (id: string) => {
    onUpdate(
      "habilidadesParanormais",
      character.habilidadesParanormais.filter((h) => h.id !== id)
    );
  };

  const addHabilidadeUnica = (hab: Omit<HabilidadeUnica, "id">) => {
    const newHab: HabilidadeUnica = {
      ...hab,
      id: crypto.randomUUID(),
    };
    onUpdate("habilidadesUnicas", [...character.habilidadesUnicas, newHab]);
    setShowAddUnica(false);
  };

  const updateHabilidadeUnica = (id: string, updates: Partial<HabilidadeUnica>) => {
    onUpdate(
      "habilidadesUnicas",
      character.habilidadesUnicas.map((h) =>
        h.id === id ? { ...h, ...updates } : h
      )
    );
  };

  const removeHabilidadeUnica = (id: string) => {
    onUpdate(
      "habilidadesUnicas",
      character.habilidadesUnicas.filter((h) => h.id !== id)
    );
  };

  return (
    <div className="space-y-6">
      {/* Habilidades Paranormais */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <SectionHeader>Habilidades Paranormais</SectionHeader>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-display">
              Ecos psíquicos: <strong>{character.ecosPsiquicos}</strong> / {character.nivel}
            </span>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block border border-primary/20">
          <div className="grid grid-cols-12 gap-2 bg-secondary/50 px-3 py-2 text-xs font-display uppercase tracking-wider">
            <div className="col-span-1">Apr.</div>
            <div className="col-span-1">Grau</div>
            <div className="col-span-3">Nome</div>
            <div className="col-span-1">Custo</div>
            <div className="col-span-5">Descrição</div>
            <div className="col-span-1"></div>
          </div>

          {character.habilidadesParanormais.map((hab) => (
            <div
              key={hab.id}
              className="grid grid-cols-12 gap-2 px-3 py-2 border-t border-primary/10 items-center"
            >
              <div className="col-span-1">
                <DiamondPair
                  value={hab.aprimoramentos}
                  onChange={(v) => updateHabilidadeParanormal(hab.id, { aprimoramentos: v })}
                />
              </div>
              <div className="col-span-1">
                <select
                  value={hab.grau}
                  onChange={(e) =>
                    updateHabilidadeParanormal(hab.id, {
                      grau: parseInt(e.target.value) as 0 | 1 | 2 | 3,
                      custo: getCustoMemorizacao(parseInt(e.target.value) as 0 | 1 | 2 | 3),
                    })
                  }
                  className="w-full bg-transparent border-b border-primary/30 text-center 
                           focus:border-primary focus:outline-none text-sm"
                >
                  <option value={0}>0</option>
                  <option value={1}>I</option>
                  <option value={2}>II</option>
                  <option value={3}>III</option>
                </select>
              </div>
              <div className="col-span-3">
                <input
                  type="text"
                  value={hab.nome}
                  onChange={(e) => updateHabilidadeParanormal(hab.id, { nome: e.target.value })}
                  className="w-full bg-transparent border-b border-primary/30 px-1
                           focus:border-primary focus:outline-none text-sm"
                />
              </div>
              <div className="col-span-1 text-center text-sm text-muted-foreground">
                {hab.custo} PM
              </div>
              <div className="col-span-5">
                <input
                  type="text"
                  value={hab.descricao}
                  onChange={(e) => updateHabilidadeParanormal(hab.id, { descricao: e.target.value })}
                  className="w-full bg-transparent border-b border-primary/30 px-1
                           focus:border-primary focus:outline-none text-sm"
                />
              </div>
              <div className="col-span-1 flex justify-end">
                <button
                  onClick={() => removeHabilidadeParanormal(hab.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {showAddParanormal ? (
            <AddParanormalForm
              onAdd={addHabilidadeParanormal}
              onCancel={() => setShowAddParanormal(false)}
            />
          ) : (
            <button
              onClick={() => setShowAddParanormal(true)}
              className="w-full py-2 border-t border-primary/10 text-muted-foreground 
                       hover:bg-secondary/50 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">Adicionar Habilidade</span>
            </button>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-2">
          {character.habilidadesParanormais.map((hab) => (
            <div key={hab.id} className="border border-primary/20 bg-secondary/20">
              <div
                onClick={() => setExpandedParanormal(expandedParanormal === hab.id ? null : hab.id)}
                className="w-full p-3 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div onClick={(e) => e.stopPropagation()}>
                    <DiamondPair
                      value={hab.aprimoramentos}
                      onChange={(v) => updateHabilidadeParanormal(hab.id, { aprimoramentos: v })}
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-display font-semibold text-sm">
                      {hab.nome || "Sem nome"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Grau {["0", "I", "II", "III"][hab.grau]} • {hab.custo} PM
                    </div>
                  </div>
                </div>
                {expandedParanormal === hab.id ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              
              {expandedParanormal === hab.id && (
                <div className="px-3 pb-3 space-y-3 border-t border-primary/10 pt-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Nome</label>
                    <input
                      type="text"
                      value={hab.nome}
                      onChange={(e) => updateHabilidadeParanormal(hab.id, { nome: e.target.value })}
                      className="w-full bg-card border border-primary/30 px-2 py-1.5 text-sm mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-muted-foreground">Grau</label>
                      <select
                        value={hab.grau}
                        onChange={(e) =>
                          updateHabilidadeParanormal(hab.id, {
                            grau: parseInt(e.target.value) as 0 | 1 | 2 | 3,
                            custo: getCustoMemorizacao(parseInt(e.target.value) as 0 | 1 | 2 | 3),
                          })
                        }
                        className="w-full bg-card border border-primary/30 px-2 py-1.5 text-sm mt-1"
                      >
                        <option value={0}>0</option>
                        <option value={1}>I</option>
                        <option value={2}>II</option>
                        <option value={3}>III</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Custo</label>
                      <div className="bg-secondary border border-primary/30 px-2 py-1.5 text-sm mt-1 text-center">
                        {hab.custo} PM
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Descrição</label>
                    <textarea
                      value={hab.descricao}
                      onChange={(e) => updateHabilidadeParanormal(hab.id, { descricao: e.target.value })}
                      className="w-full bg-card border border-primary/30 px-2 py-1.5 text-sm mt-1 min-h-[60px] resize-none"
                    />
                  </div>
                  <button
                    onClick={() => removeHabilidadeParanormal(hab.id)}
                    className="w-full py-2 text-sm text-destructive border border-destructive/30 
                             hover:bg-destructive/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remover
                  </button>
                </div>
              )}
            </div>
          ))}

          {showAddParanormal ? (
            <AddParanormalFormMobile
              onAdd={addHabilidadeParanormal}
              onCancel={() => setShowAddParanormal(false)}
            />
          ) : (
            <button
              onClick={() => setShowAddParanormal(true)}
              className="w-full py-3 border border-primary/20 border-dashed text-muted-foreground 
                       hover:bg-secondary/50 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">Adicionar Habilidade</span>
            </button>
          )}
        </div>
      </div>

      {/* Habilidades Únicas */}
      <div className="space-y-3">
        <SectionHeader>Habilidades Únicas</SectionHeader>

        {/* Desktop Table */}
        <div className="hidden md:block border border-primary/20">
          <div className="grid grid-cols-12 gap-2 bg-secondary/50 px-3 py-2 text-xs font-display uppercase tracking-wider">
            <div className="col-span-1">Apr.</div>
            <div className="col-span-3">Nome</div>
            <div className="col-span-7">Descrição</div>
            <div className="col-span-1"></div>
          </div>

          {character.habilidadesUnicas.map((hab) => (
            <div
              key={hab.id}
              className="grid grid-cols-12 gap-2 px-3 py-2 border-t border-primary/10 items-center"
            >
              <div className="col-span-1">
                <DiamondPair
                  value={hab.aprimoramentos}
                  onChange={(v) => updateHabilidadeUnica(hab.id, { aprimoramentos: v })}
                />
              </div>
              <div className="col-span-3">
                <input
                  type="text"
                  value={hab.nome}
                  onChange={(e) => updateHabilidadeUnica(hab.id, { nome: e.target.value })}
                  className="w-full bg-transparent border-b border-primary/30 px-1
                           focus:border-primary focus:outline-none text-sm"
                />
              </div>
              <div className="col-span-7">
                <input
                  type="text"
                  value={hab.descricao}
                  onChange={(e) => updateHabilidadeUnica(hab.id, { descricao: e.target.value })}
                  className="w-full bg-transparent border-b border-primary/30 px-1
                           focus:border-primary focus:outline-none text-sm"
                />
              </div>
              <div className="col-span-1 flex justify-end">
                <button
                  onClick={() => removeHabilidadeUnica(hab.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {showAddUnica ? (
            <AddUnicaForm
              onAdd={addHabilidadeUnica}
              onCancel={() => setShowAddUnica(false)}
            />
          ) : (
            <button
              onClick={() => setShowAddUnica(true)}
              className="w-full py-2 border-t border-primary/10 text-muted-foreground 
                       hover:bg-secondary/50 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">Adicionar Habilidade</span>
            </button>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-2">
          {character.habilidadesUnicas.map((hab) => (
            <div key={hab.id} className="border border-primary/20 bg-secondary/20">
              <div
                onClick={() => setExpandedUnica(expandedUnica === hab.id ? null : hab.id)}
                className="w-full p-3 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div onClick={(e) => e.stopPropagation()}>
                    <DiamondPair
                      value={hab.aprimoramentos}
                      onChange={(v) => updateHabilidadeUnica(hab.id, { aprimoramentos: v })}
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-display font-semibold text-sm">
                      {hab.nome || "Sem nome"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Custo: 3 PA
                    </div>
                  </div>
                </div>
                {expandedUnica === hab.id ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              
              {expandedUnica === hab.id && (
                <div className="px-3 pb-3 space-y-3 border-t border-primary/10 pt-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Nome</label>
                    <input
                      type="text"
                      value={hab.nome}
                      onChange={(e) => updateHabilidadeUnica(hab.id, { nome: e.target.value })}
                      className="w-full bg-card border border-primary/30 px-2 py-1.5 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Descrição</label>
                    <textarea
                      value={hab.descricao}
                      onChange={(e) => updateHabilidadeUnica(hab.id, { descricao: e.target.value })}
                      className="w-full bg-card border border-primary/30 px-2 py-1.5 text-sm mt-1 min-h-[60px] resize-none"
                    />
                  </div>
                  <button
                    onClick={() => removeHabilidadeUnica(hab.id)}
                    className="w-full py-2 text-sm text-destructive border border-destructive/30 
                             hover:bg-destructive/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remover
                  </button>
                </div>
              )}
            </div>
          ))}

          {showAddUnica ? (
            <AddUnicaFormMobile
              onAdd={addHabilidadeUnica}
              onCancel={() => setShowAddUnica(false)}
            />
          ) : (
            <button
              onClick={() => setShowAddUnica(true)}
              className="w-full py-3 border border-primary/20 border-dashed text-muted-foreground 
                       hover:bg-secondary/50 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">Adicionar Habilidade</span>
            </button>
          )}
        </div>
        
        <p className="text-xs text-muted-foreground italic">
          * Habilidades únicas sempre custam 3 PA para serem utilizadas
        </p>
      </div>
    </div>
  );
}

// Desktop form for paranormal
function AddParanormalForm({
  onAdd,
  onCancel,
}: {
  onAdd: (hab: Omit<HabilidadeParanormal, "id">) => void;
  onCancel: () => void;
}) {
  const [nome, setNome] = useState("");
  const [grau, setGrau] = useState<0 | 1 | 2 | 3>(1);
  const [descricao, setDescricao] = useState("");

  const handleSubmit = () => {
    if (nome.trim()) {
      onAdd({
        nome: nome.trim(),
        grau,
        custo: getCustoMemorizacao(grau),
        descricao: descricao.trim(),
        aprimoramentos: 0,
      });
    }
  };

  return (
    <div className="p-3 border-t border-primary/10 bg-secondary/30 space-y-3">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-2">
          <label className="text-xs text-muted-foreground">Grau</label>
          <select
            value={grau}
            onChange={(e) => setGrau(parseInt(e.target.value) as 0 | 1 | 2 | 3)}
            className="w-full bg-card border border-primary/30 px-2 py-1 text-sm"
          >
            <option value={0}>0</option>
            <option value={1}>I</option>
            <option value={2}>II</option>
            <option value={3}>III</option>
          </select>
        </div>
        <div className="col-span-4">
          <label className="text-xs text-muted-foreground">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full bg-card border border-primary/30 px-2 py-1 text-sm"
            placeholder="Nome da habilidade"
          />
        </div>
        <div className="col-span-6">
          <label className="text-xs text-muted-foreground">Descrição</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full bg-card border border-primary/30 px-2 py-1 text-sm"
            placeholder="Descrição do efeito"
          />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          className="px-3 py-1 text-sm bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}

// Mobile form for paranormal
function AddParanormalFormMobile({
  onAdd,
  onCancel,
}: {
  onAdd: (hab: Omit<HabilidadeParanormal, "id">) => void;
  onCancel: () => void;
}) {
  const [nome, setNome] = useState("");
  const [grau, setGrau] = useState<0 | 1 | 2 | 3>(1);
  const [descricao, setDescricao] = useState("");

  const handleSubmit = () => {
    if (nome.trim()) {
      onAdd({
        nome: nome.trim(),
        grau,
        custo: getCustoMemorizacao(grau),
        descricao: descricao.trim(),
        aprimoramentos: 0,
      });
    }
  };

  return (
    <div className="p-3 border border-primary/20 bg-secondary/30 space-y-3">
      <div className="space-y-3">
        <div>
          <label className="text-xs text-muted-foreground">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full bg-card border border-primary/30 px-2 py-2 text-sm mt-1"
            placeholder="Nome da habilidade"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Grau</label>
          <select
            value={grau}
            onChange={(e) => setGrau(parseInt(e.target.value) as 0 | 1 | 2 | 3)}
            className="w-full bg-card border border-primary/30 px-2 py-2 text-sm mt-1"
          >
            <option value={0}>0 (0 PM)</option>
            <option value={1}>I (3 PM)</option>
            <option value={2}>II (6 PM)</option>
            <option value={3}>III (12 PM)</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full bg-card border border-primary/30 px-2 py-2 text-sm mt-1 min-h-[60px] resize-none"
            placeholder="Descrição do efeito"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onCancel}
          className="flex-1 py-2 text-sm text-muted-foreground border border-primary/20 hover:bg-secondary transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 py-2 text-sm bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}

// Desktop form for única
function AddUnicaForm({
  onAdd,
  onCancel,
}: {
  onAdd: (hab: Omit<HabilidadeUnica, "id">) => void;
  onCancel: () => void;
}) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSubmit = () => {
    if (nome.trim()) {
      onAdd({
        nome: nome.trim(),
        descricao: descricao.trim(),
        aprimoramentos: 0,
      });
    }
  };

  return (
    <div className="p-3 border-t border-primary/10 bg-secondary/30 space-y-3">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-4">
          <label className="text-xs text-muted-foreground">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full bg-card border border-primary/30 px-2 py-1 text-sm"
            placeholder="Nome da habilidade"
          />
        </div>
        <div className="col-span-8">
          <label className="text-xs text-muted-foreground">Descrição</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full bg-card border border-primary/30 px-2 py-1 text-sm"
            placeholder="Descrição do efeito"
          />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          className="px-3 py-1 text-sm bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}

// Mobile form for única
function AddUnicaFormMobile({
  onAdd,
  onCancel,
}: {
  onAdd: (hab: Omit<HabilidadeUnica, "id">) => void;
  onCancel: () => void;
}) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSubmit = () => {
    if (nome.trim()) {
      onAdd({
        nome: nome.trim(),
        descricao: descricao.trim(),
        aprimoramentos: 0,
      });
    }
  };

  return (
    <div className="p-3 border border-primary/20 bg-secondary/30 space-y-3">
      <div className="space-y-3">
        <div>
          <label className="text-xs text-muted-foreground">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full bg-card border border-primary/30 px-2 py-2 text-sm mt-1"
            placeholder="Nome da habilidade"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full bg-card border border-primary/30 px-2 py-2 text-sm mt-1 min-h-[60px] resize-none"
            placeholder="Descrição do efeito"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onCancel}
          className="flex-1 py-2 text-sm text-muted-foreground border border-primary/20 hover:bg-secondary transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 py-2 text-sm bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}
