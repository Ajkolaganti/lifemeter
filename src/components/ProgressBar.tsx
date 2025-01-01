import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  gradient: string;
}

export function ProgressBar({ current, total, gradient }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="space-y-3">
      <div className="relative h-8 bg-gray-900/50 rounded-xl overflow-hidden backdrop-blur-sm">
        {/* Base progress bar */}
        <div
          className={`absolute top-0 left-0 h-full ${gradient} rounded-xl origin-left animate-grow`}
          style={{ width: `${percentage}%` }}
        >
          {/* Percentage text */}
          <div className="h-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {percentage.toFixed(1)}%
            </span>
          </div>

          {/* Animated shine overlay */}
          <div className="absolute inset-0 animate-shimmer">
            <div 
              className="h-full w-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
          </div>
        </div>
      </div>

      <div className="text-[11px] px-1 opacity-60 text-gray-400">
        {current.toLocaleString()} of {total.toLocaleString()} days
      </div>
    </div>
  );
} 