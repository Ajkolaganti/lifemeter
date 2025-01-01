import React from 'react';
import { TimeUnit } from './TimeUnit';
import { TimeData } from '../types';

interface CountdownTimerProps {
  title: string;
  time: TimeData;
  glowColor: string;
}

export function CountdownTimer({ title, time, glowColor }: CountdownTimerProps) {
  return (
    <div
      className="relative p-8 rounded-2xl backdrop-blur-sm transition-transform hover:scale-105"
      style={{
        background: 'rgba(15, 23, 42, 0.8)',
        boxShadow: `0 0 40px ${glowColor}`,
      }}
    >
      <h2 className="text-2xl font-bold text-white text-center mb-8 tracking-wider">
        {title}
      </h2>
      <div className="grid grid-cols-4 gap-4">
        <TimeUnit label="Days" value={time.days} />
        <TimeUnit label="Hours" value={time.hours} />
        <TimeUnit label="Minutes" value={time.minutes} />
        <TimeUnit label="Seconds" value={time.seconds} />
      </div>
    </div>
  );
}