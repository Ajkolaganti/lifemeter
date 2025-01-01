import React from 'react';
import { Clock } from 'lucide-react';

export function Header() {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Clock className="w-12 h-12 text-indigo-600" />
        <h1 className="text-4xl font-bold text-gray-900">Life Countdown</h1>
      </div>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Discover your personal timeline based on demographics and lifestyle factors.
        Get insights into your life journey with real-time countdowns.
      </p>
    </header>
  );
}