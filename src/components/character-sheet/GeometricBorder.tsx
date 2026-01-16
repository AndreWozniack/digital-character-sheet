export function GeometricBorder() {
  return (
    <div className="w-full h-8 flex items-center justify-center overflow-hidden select-none">
      <div className="flex">
        {Array.from({ length: 30 }).map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 24 24"
            className="w-6 h-6 text-primary"
            fill="currentColor"
          >
            <path d="M12 2L22 12L12 22L2 12L12 2Z" />
            <path d="M12 6L18 12L12 18L6 12L12 6Z" fill="white" />
          </svg>
        ))}
      </div>
    </div>
  );
}
