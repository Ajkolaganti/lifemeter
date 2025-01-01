interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div 
      className={`
        relative overflow-hidden
        bg-gradient-to-br from-gray-900/90 to-black/90
        backdrop-blur-xl
        border border-gray-800/50
        rounded-xl p-6
        shadow-xl
        transition-all duration-300
        hover:scale-[1.02]
        hover:border-blue-500/30
        group
        ${className}
      `}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Glow effect */}
      <div className="absolute -inset-px bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 blur animate-glow" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 