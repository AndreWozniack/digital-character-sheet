import { cn } from "@/lib/utils";

interface DiamondCheckboxProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md";
}

export function DiamondCheckbox({ 
  checked, 
  onChange, 
  disabled = false,
  size = "md" 
}: DiamondCheckboxProps) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange?.(!checked)}
      disabled={disabled}
      className={cn(
        "rotate-45 border-2 border-primary transition-all duration-200",
        size === "sm" && "w-3 h-3",
        size === "md" && "w-4 h-4",
        checked && "bg-primary",
        !disabled && "hover:bg-primary/50 cursor-pointer",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      aria-checked={checked}
      role="checkbox"
    />
  );
}

interface DiamondPairProps {
  value: number; // 0, 1, or 2
  onChange?: (value: number) => void;
  max?: number;
}

export function DiamondPair({ value, onChange, max = 2 }: DiamondPairProps) {
  const handleClick = (index: number) => {
    if (!onChange) return;
    // Se clicar no mesmo que já está preenchido, desmarcar
    if (value === index + 1) {
      onChange(index);
    } else {
      onChange(index + 1);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, index) => (
        <DiamondCheckbox
          key={index}
          checked={value > index}
          onChange={() => handleClick(index)}
          size="sm"
        />
      ))}
    </div>
  );
}
