import React from 'react';

interface TimeUnitProps {
  label: string;
  value: number;
}

export function TimeUnit({ label, value }: TimeUnitProps) {
  const formattedValue = value.toString().padStart(2, '0');

  return (
    <div className="text-center group perspective-1000">
      <div className="relative transform transition-all duration-300 group-hover:scale-110">
        <div className="relative">
          {/* Background glow */}
          <div className="absolute inset-0 bg-blue-500/10 blur-lg rounded-full transform -translate-y-1/2 animate-pulse-slow opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* Number */}
          <div
            className="relative text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r 
                     from-blue-400 to-purple-400 transition-all duration-300
                     group-hover:from-blue-300 group-hover:to-purple-300"
            style={{
              WebkitTextStroke: '0.5px rgba(255,255,255,0.1)',
              transform: 'translateZ(20px)',
            }}
          >
            {formattedValue}
          </div>
        </div>
      </div>
      <div className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mt-1 transition-colors group-hover:text-gray-300">
        {label}
      </div>
    </div>
  );
}