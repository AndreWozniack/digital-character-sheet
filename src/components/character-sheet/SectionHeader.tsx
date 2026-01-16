import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "small";
}

export function SectionHeader({ children, className, variant = "default" }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "bg-primary text-primary-foreground font-display font-bold tracking-widest uppercase",
        variant === "default" && "px-4 py-2 text-sm",
        variant === "small" && "px-3 py-1.5 text-xs",
        "relative",
        className
      )}
      style={{
        clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)",
      }}
    >
      {children}
    </div>
  );
}
