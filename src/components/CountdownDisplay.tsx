import React from 'react';
import { Timer, Share2, Info } from 'lucide-react';
import { CountdownMetrics } from '../types';

interface CountdownDisplayProps {
  metrics: CountdownMetrics;
  onShare: () => void;
}

export function CountdownDisplay({ metrics, onShare }: CountdownDisplayProps) {
  return (
    <div className="space-y-8 max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Life Expectancy Counter */}
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Timer className="w-5 h-5 text-indigo-600" />
              Estimated Life Remaining
            </h3>
            <button
              onClick={onShare}
              className="text-gray-500 hover:text-gray-700"
              title="Share Results"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Years</span>
              <span className="text-2xl font-bold text-indigo-600">{metrics.lifeExpectancy.years}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${(metrics.lifeExpectancy.years / 100) * 100}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-gray-800">{metrics.lifeExpectancy.months}</div>
              <div className="text-sm text-gray-600">Months</div>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-800">{metrics.lifeExpectancy.days}</div>
              <div className="text-sm text-gray-600">Days</div>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-800">{metrics.lifeExpectancy.hours}</div>
              <div className="text-sm text-gray-600">Hours</div>
            </div>
          </div>
        </div>

        {/* Next Birthday Counter */}
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <h3 className="text-xl font-bold text-gray-800">Next Birthday</h3>
          <div className="grid grid-cols-4 gap-2">
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600">{metrics.nextBirthday.days}</div>
              <div className="text-sm text-gray-600">Days</div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600">{metrics.nextBirthday.hours}</div>
              <div className="text-sm text-gray-600">Hours</div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600">{metrics.nextBirthday.minutes}</div>
              <div className="text-sm text-gray-600">Mins</div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600">{metrics.nextBirthday.seconds}</div>
              <div className="text-sm text-gray-600">Secs</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Month Counter */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Time Left in Current Month</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Days</span>
              <span className="text-xl font-bold text-indigo-600">{metrics.currentMonth.days}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${(metrics.currentMonth.days / 31) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Current Year Counter */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Time Left in Current Year</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Days</span>
              <span className="text-xl font-bold text-indigo-600">{metrics.currentYear.days}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${(metrics.currentYear.days / 365) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <div className="flex gap-2">
          <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
          <div className="text-sm text-blue-800">
            <p className="font-medium">Important Note:</p>
            <p>Life expectancy calculations are based on statistical averages from WHO data and should not be considered as individual predictions. Many factors influence longevity, including genetics, lifestyle choices, and access to healthcare.</p>
          </div>
        </div>
      </div>
    </div>
  );
}