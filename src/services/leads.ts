import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { UserData } from '../types';

export interface Lead {
  email: string;
  birthDate: string;
  country: string;
  gender: string;
  timestamp: number;
}

export async function saveLead(userData: UserData): Promise<void> {
  const lead: Lead = {
    email: userData.email,
    birthDate: userData.birthDate,
    country: userData.country,
    gender: userData.gender,
    timestamp: Date.now()
  };

  try {
    await addDoc(collection(db, 'leads'), lead);
    console.log('Lead saved successfully');
  } catch (error) {
    console.error('Error saving lead:', error);
    throw error;
  }
} 