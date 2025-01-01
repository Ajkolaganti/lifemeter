export interface TimeData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface UserData {
  birthDate: string;
  birthTime: string;
  country: string;
  gender: 'male' | 'female' | 'other';
  lifestyle?: {
    smoking: boolean;
    exerciseFrequency: 'none' | 'light' | 'moderate' | 'heavy';
    diet: 'poor' | 'average' | 'good' | 'excellent';
  };
}

export interface CountdownMetrics {
  lifeExpectancy: TimeData;
  nextBirthday: TimeData;
  currentMonth: TimeData;
  currentYear: TimeData;
}