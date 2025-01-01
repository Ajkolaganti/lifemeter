// Data sourced from World Bank (2021) and WHO statistics
export const countryLifeExpectancy: Record<string, {
  male: number;
  female: number;
  description: string;
}> = {
  US: {
    male: 73.5,
    female: 79.3,
    description: "Based on CDC data (2021), influenced by healthcare access and lifestyle factors"
  },
  GB: {
    male: 79.0,
    female: 82.9,
    description: "NHS statistics (2021), reflecting universal healthcare impact"
  },
  JP: {
    male: 81.5,
    female: 87.6,
    description: "Highest life expectancy globally, attributed to diet and healthcare"
  },
  IN: {
    male: 69.6,
    female: 72.4,
    description: "Based on Indian demographic data, varying by region and socioeconomic factors"
  },
  CA: {
    male: 80.2,
    female: 84.1,
    description: "Strong healthcare system and high quality of life standards"
  },
  AU: {
    male: 80.9,
    female: 85.0,
    description: "High standard of living and advanced healthcare infrastructure"
  },
  DE: {
    male: 78.7,
    female: 83.5,
    description: "Advanced healthcare system and strong social support"
  },
  FR: {
    male: 79.2,
    female: 85.3,
    description: "Universal healthcare and Mediterranean lifestyle influence"
  },
  IT: {
    male: 80.1,
    female: 84.7,
    description: "Mediterranean diet and strong family support system"
  },
  ES: {
    male: 80.0,
    female: 85.7,
    description: "Mediterranean lifestyle and social connectivity"
  },
  SE: {
    male: 80.8,
    female: 84.3,
    description: "High quality of life and strong social welfare system"
  },
  NO: {
    male: 81.0,
    female: 84.5,
    description: "Advanced healthcare and high standard of living"
  },
  NZ: {
    male: 80.0,
    female: 83.5,
    description: "Quality healthcare and active lifestyle emphasis"
  },
  SG: {
    male: 81.4,
    female: 85.9,
    description: "Advanced medical care and strong public health policies"
  },
  KR: {
    male: 79.7,
    female: 85.7,
    description: "Modern healthcare system and technological advancement"
  },
  // Add more countries as needed...
};

export function getLifeExpectancy(countryCode: string, gender: string): {
  years: number;
  description: string;
  factors: string[];
} {
  const defaultExpectancy = {
    male: 70,
    female: 75,
    description: "Based on global average life expectancy"
  };

  const countryData = countryLifeExpectancy[countryCode] || defaultExpectancy;
  const baseExpectancy = gender === 'female' ? countryData.female : countryData.male;

  // Common factors affecting life expectancy
  const factors = [
    "Healthcare system quality",
    "Diet and lifestyle",
    "Environmental factors",
    "Socioeconomic conditions",
    "Genetic predisposition"
  ];

  return {
    years: baseExpectancy,
    description: countryData.description,
    factors
  };
} 