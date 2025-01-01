import { UserData } from '../types';
import { countries } from '../data/countries';

export function calculateLifeExpectancy(userData: UserData): number {
  const country = countries.find(c => c.code === userData.country);
  if (!country) return 80; // Default fallback

  let baseExpectancy = userData.gender === 'female' ? country.lifeExpectancy.female : country.lifeExpectancy.male;

  // Apply lifestyle modifiers if available
  if (userData.lifestyle) {
    if (userData.lifestyle.smoking) baseExpectancy -= 10;
    
    switch (userData.lifestyle.exerciseFrequency) {
      case 'heavy': baseExpectancy += 3; break;
      case 'moderate': baseExpectancy += 2; break;
      case 'light': baseExpectancy += 1; break;
      default: break;
    }

    switch (userData.lifestyle.diet) {
      case 'excellent': baseExpectancy += 3; break;
      case 'good': baseExpectancy += 2; break;
      case 'poor': baseExpectancy -= 2; break;
      default: break;
    }
  }

  return baseExpectancy;
}