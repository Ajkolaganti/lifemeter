import { useState, useEffect } from 'react';
import { TimeData } from '../types';

export function useCountdown(targetDate: Date): TimeData {
  const [timeLeft, setTimeLeft] = useState<TimeData>(calculateTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = calculateTimeLeft(targetDate);
      setTimeLeft(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

function calculateTimeLeft(targetDate: Date): TimeData {
  const difference = targetDate.getTime() - new Date().getTime();
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  };
}