import React from 'react';
import { CountdownTimer } from './CountdownTimer';
import { useCountdown } from '../hooks/useCountdown';
import { UserData } from '../types';
import { calculateLifeExpectancy } from '../utils/calculations';
import { Share2, RefreshCw } from 'lucide-react';
import { shareResults } from '../utils/sharing';

interface CountdownContainerProps {
  userData: UserData;
  onReset: () => void;
}

export function CountdownContainer({ userData, onReset }: CountdownContainerProps) {
  const birthDate = new Date(userData.birthDate + 'T' + userData.birthTime);
  const lifeExpectancyYears = calculateLifeExpectancy(userData);
  const lifeEndDate = new Date(birthDate.getTime() + lifeExpectancyYears * 365.25 * 24 * 60 * 60 * 1000);
  
  const lifeExpectancy = useCountdown(lifeEndDate);
  const nextBirthday = useCountdown(new Date(new Date().getFullYear() + 1, birthDate.getMonth(), birthDate.getDate()));
  const monthEnd = useCountdown(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59));
  const yearEnd = useCountdown(new Date(2025, 11, 31, 23, 59, 59));

  const metrics = {
    lifeExpectancy,
    nextBirthday,
    currentMonth: monthEnd,
    currentYear: yearEnd
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end gap-4 mb-8">
        <button
          onClick={() => shareResults(metrics)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
        >
          <Share2 size={18} />
          Share
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
        >
          <RefreshCw size={18} />
          Update Info
        </button>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
        <CountdownTimer
          title="Life Expectancy"
          time={lifeExpectancy}
          glowColor="rgba(236, 72, 153, 0.5)"
        />
        <CountdownTimer
          title="Next Birthday"
          time={nextBirthday}
          glowColor="rgba(56, 189, 248, 0.5)"
        />
        <CountdownTimer
          title="Month End"
          time={monthEnd}
          glowColor="rgba(168, 85, 247, 0.5)"
        />
        <CountdownTimer
          title="Year End"
          time={yearEnd}
          glowColor="rgba(34, 197, 94, 0.5)"
        />
      </div>

      <div className="mt-8 text-center text-gray-400 text-sm max-w-2xl mx-auto">
        <p>Note: Life expectancy calculations are based on statistical averages and should not be considered as individual predictions. Many factors influence longevity, including genetics, lifestyle choices, and access to healthcare.</p>
      </div>
    </div>
  );
}