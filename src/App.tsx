import React, { useState } from 'react';
import { Background } from './components/Background';
import { CountdownContainer } from './components/CountdownContainer';
import { UserInputModal } from './components/UserInputModal';
import { UserData } from './types';
import { useCountdown } from './hooks/useCountdown';
import { TimeUnit } from './components/TimeUnit';
import { getLifeExpectancy } from './data/lifeExpectancy';
import { getDailyQuote, shareQuote } from './data/dailyQuotes';
import { saveLead } from './services/leads';
import { Card } from './components/Card';
import { AdSense } from './components/AdSense';

function ProgressSection({ title, description, current, total, gradient }: {
  title: string;
  description: string | JSX.Element;
  current: number;
  total: number;
  gradient: string;
}) {
  const percentage = (current / total) * 100;
  
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
      <div className="text-gray-400 text-sm mb-4">{description}</div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-400">{current.toLocaleString()} of {total.toLocaleString()}</span>
        <span className="text-gray-400">{percentage.toFixed(1)}%</span>
      </div>
      <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full ${gradient} rounded-full`}
          style={{ 
            width: `${percentage}%`,
            boxShadow: '0 0 20px rgba(56, 189, 248, 0.5)'
          }}
        />
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent to-gray-800/20" />
      </div>
    </div>
  );
}

function ProgressBar({ current, total, gradient }: { 
  current: number; 
  total: number; 
  gradient: string; 
}) {
  const percentage = (current / total) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-400">
        <span>{current.toLocaleString()} of {total.toLocaleString()}</span>
        <span>{percentage.toFixed(1)}% complete</span>
      </div>
      <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full ${gradient} rounded-full`}
          style={{ 
            width: `${percentage}%`,
            boxShadow: '0 0 20px rgba(56, 189, 248, 0.5)'
          }}
        />
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent to-gray-800/20" />
      </div>
    </div>
  );
}

export function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  // Add countdown hooks
  const monthEnd = useCountdown(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59));
  const yearEnd = useCountdown(new Date(new Date().getFullYear(), 11, 31, 23, 59, 59));

  const calculateLifeMetrics = (userData: UserData) => {
    const birthDate = new Date(userData.birthDate);
    const now = new Date();
    
    const ageInDays = Math.floor((now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
    const ageInYears = ageInDays / 365.25;
    
    // Get country-specific life expectancy
    const expectancyData = getLifeExpectancy(userData.country, userData.gender);
    const daysLeft = (expectancyData.years * 365.25) - ageInDays;
    
    return {
      ageInDays,
      ageInYears: Math.floor(ageInYears),
      daysLeft: Math.floor(daysLeft),
      totalDays: Math.floor(expectancyData.years * 365.25),
      lifeExpectancy: expectancyData.years,
      description: expectancyData.description,
      factors: expectancyData.factors
    };
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <Background />
      <div className="relative z-10">
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-gray-800/50">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              LifeTimer
            </h1>
          </div>
        </header>

        {/* Main Content - Add padding-top to account for fixed header */}
        <div className="pt-20">
          {/* Add AdSense after some content */}
          <div className="my-8">
            <AdSense 
              slot="your-ad-slot-id"
              style={{ display: 'block', textAlign: 'center' }}
            />
          </div>
          {userData ? (
            <div className="container mx-auto px-4 py-12">
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center mb-12">
                  <h1 className="text-4xl font-bold text-white mb-4">Your Life Timeline</h1>
                  <p className="text-gray-400">Based on statistical life expectancy data</p>
                </div>

                <div className="grid gap-6">
                  {/* Life Progress */}
                  {(() => {
                    const metrics = calculateLifeMetrics(userData);
                    return (
                      <>
                        <ProgressSection
                          title="Life Journey Progress"
                          description={
                            <div className="space-y-2">
                              <p>
                                You've lived {metrics.ageInYears} years ({metrics.ageInDays.toLocaleString()} days). 
                                Based on {metrics.description}, your statistical life expectancy is {metrics.lifeExpectancy} years, 
                                giving you approximately {metrics.daysLeft.toLocaleString()} days ahead.
                              </p>
                              <div className="mt-4">
                                <p className="font-semibold text-gray-300">Key Factors Affecting Life Expectancy:</p>
                                <ul className="list-disc list-inside text-sm text-gray-400 mt-2">
                                  {metrics.factors.map((factor, index) => (
                                    <li key={index}>{factor}</li>
                                  ))}
                                </ul>
                              </div>
                              <p className="text-xs text-gray-500 mt-4">
                                Note: This is a statistical estimate based on demographic data. Individual results may vary 
                                significantly based on personal health choices, medical conditions, and other factors.
                              </p>
                            </div>
                          }
                          current={metrics.ageInDays}
                          total={metrics.totalDays}
                          gradient="bg-gradient-to-r from-emerald-500 to-teal-500"
                        />
                        
                        {/* Year Progress */}
                        <ProgressSection
                          title="Current Year Progress"
                          description="Track how much of the current year has elapsed"
                          current={yearEnd.totalDays - yearEnd.days}
                          total={365}
                          gradient="bg-gradient-to-r from-purple-500 to-pink-500"
                        />
                        
                        {/* Month Progress */}
                        <ProgressSection
                          title="Current Month Progress"
                          description="Track how much of the current month has elapsed"
                          current={new Date().getDate()}
                          total={new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()}
                          gradient="bg-gradient-to-r from-cyan-500 to-blue-500"
                        />
                      </>
                    );
                  })()}
                </div>

                <div className="text-center mt-8">
                  <button
                    onClick={() => setUserData(null)}
                    className="px-6 py-3 bg-gray-700 rounded-full text-white font-semibold
                             hover:bg-gray-600 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="container mx-auto px-4 py-8">
              <div className="max-w-2xl mx-auto space-y-8">
                {/* Month End Card */}
                <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                  <Card>
                    <h2 className="text-xl font-semibold text-white mb-4">Time Left in Month</h2>
                    <ProgressBar 
                      current={new Date().getDate()}
                      total={new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()}
                      gradient="bg-gradient-to-r from-cyan-500 to-blue-500"
                    />
                    <div className="flex justify-center space-x-12 mt-4 opacity-60">
                      <TimeUnit label="Days" value={monthEnd.days} />
                      <TimeUnit label="Hours" value={monthEnd.hours} />
                      <TimeUnit label="Minutes" value={monthEnd.minutes} />
                    </div>
                  </Card>
                </div>

                {/* Year End Card */}
                <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  <Card>
                    <h2 className="text-xl font-semibold text-white mb-4">Time Left in Year</h2>
                    <ProgressBar 
                      current={Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (1000 * 60 * 60 * 24))}
                      total={365}
                      gradient="bg-gradient-to-r from-purple-500 to-pink-500"
                    />
                    <div className="flex justify-center space-x-12 mt-4 opacity-60">
                      <TimeUnit label="Days" value={yearEnd.days} />
                      <TimeUnit label="Hours" value={yearEnd.hours} />
                      <TimeUnit label="Minutes" value={yearEnd.minutes} />
                    </div>
                  </Card>
                </div>

                {/* Daily Quote Card */}
                <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                  <Card className="text-center">
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-white">Today's Inspiration</h2>
                      <blockquote className="text-gray-300 italic text-xl">"{getDailyQuote().text}"</blockquote>
                      <p className="text-gray-400">— {getDailyQuote().author}</p>
                      <div className="flex justify-center space-x-4">
                        <button
                          onClick={() => shareQuote(getDailyQuote())}
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Calculate Button */}
                <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                  <div className="text-center mt-12">
                    <button
                      onClick={() => setShowModal(true)}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full
                               text-white font-semibold text-lg transition-all duration-300
                               hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black
                               animate-pulse-slow"
                    >
                      Calculate Your Life Expectancy
                    </button>
                  </div>
                </div>

                {/* Modal */}
                {showModal && (
                  <UserInputModal 
                    onSubmit={async (data) => {
                      try {
                        await saveLead(data);
                        setUserData(data);
                        setShowModal(false);
                      } catch (error) {
                        console.error('Failed to save lead:', error);
                        // Optionally show an error message to the user
                      }
                    }}
                    onClose={() => setShowModal(false)}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}