import { cn } from "@/lib/utils";

interface StatInputProps {
  value: number | string;
  onChange?: (value: string) => void;
  label?: string;
  suffix?: string;
  prefix?: string;
  readOnly?: boolean;
  type?: "number" | "text";
  className?: string;
  inputClassName?: string;
  min?: number;
  max?: number;
}

export function StatInput({
  value,
  onChange,
  label,
  suffix,
  prefix,
  readOnly = false,
  type = "number",
  className,
  inputClassName,
  min,
  max,
}: StatInputProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {label && (
        <span className="font-display text-sm font-semibold whitespace-nowrap">
          {label}
        </span>
      )}
      <div className="flex items-center gap-1">
        {prefix && <span className="text-muted-foreground">{prefix}</span>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          readOnly={readOnly}
          min={min}
          max={max}
          className={cn(
            "w-12 bg-transparent border-b-2 border-primary/30",
            "focus:border-primary focus:outline-none",
            "px-1 py-0.5 text-center font-body text-lg",
            "transition-colors duration-200",
            readOnly && "cursor-default text-muted-foreground",
            inputClassName
          )}
        />
        {suffix && <span className="text-muted-foreground text-sm">{suffix}</span>}
      </div>
    </div>
  );
}

interface DualStatInputProps {
  atual: number;
  max: number;
  onAtualChange?: (value: number) => void;
  onMaxChange?: (value: number) => void;
  label: string;
  maxReadOnly?: boolean;
}

export function DualStatInput({
  atual,
  max,
  onAtualChange,
  onMaxChange,
  label,
  maxReadOnly = false,
}: DualStatInputProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-display text-sm font-semibold whitespace-nowrap min-w-[100px]">
        {label}:
      </span>
      <div className="flex items-center gap-1">
        <input
          type="number"
          value={atual}
          onChange={(e) => onAtualChange?.(parseInt(e.target.value) || 0)}
          min={0}
          max={max}
          className={cn(
            "w-12 bg-transparent border-b-2 border-primary/30",
            "focus:border-primary focus:outline-none",
            "px-1 py-0.5 text-center font-body text-lg",
            "transition-colors duration-200"
          )}
        />
        <span className="text-primary font-bold">/</span>
        <input
          type="number"
          value={max}
          onChange={(e) => onMaxChange?.(parseInt(e.target.value) || 0)}
          readOnly={maxReadOnly}
          min={0}
          className={cn(
            "w-12 bg-transparent border-b-2 border-primary/30",
            "focus:border-primary focus:outline-none",
            "px-1 py-0.5 text-center font-body text-lg",
            "transition-colors duration-200",
            maxReadOnly && "cursor-default text-muted-foreground"
          )}
        />
      </div>
    </div>
  );
}
