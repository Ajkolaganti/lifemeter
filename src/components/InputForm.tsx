import React, { useState } from 'react';
import { UserData } from '../types';
import { countries } from '../data/countries';

interface InputFormProps {
  userData: UserData;
  onSubmit: (data: UserData) => void;
}

export function InputForm({ userData, onSubmit }: InputFormProps) {
  const [showLifestyle, setShowLifestyle] = useState(false);
  const [formData, setFormData] = useState<UserData>(userData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Birth Date</label>
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Birth Time</label>
            <input
              type="time"
              value={formData.birthTime}
              onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <select
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value as UserData['gender'] })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="button"
            onClick={() => setShowLifestyle(!showLifestyle)}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            {showLifestyle ? '- Hide' : '+ Add'} Lifestyle Factors
          </button>
        </div>

        {showLifestyle && (
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-semibold text-gray-700">Lifestyle Factors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Smoking</label>
                <select
                  value={formData.lifestyle?.smoking ? 'yes' : 'no'}
                  onChange={(e) => setFormData({
                    ...formData,
                    lifestyle: {
                      ...formData.lifestyle,
                      smoking: e.target.value === 'yes'
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Exercise Frequency</label>
                <select
                  value={formData.lifestyle?.exerciseFrequency}
                  onChange={(e) => setFormData({
                    ...formData,
                    lifestyle: {
                      ...formData.lifestyle,
                      exerciseFrequency: e.target.value as UserData['lifestyle']['exerciseFrequency']
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="none">None</option>
                  <option value="light">Light</option>
                  <option value="moderate">Moderate</option>
                  <option value="heavy">Heavy</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Diet Quality</label>
                <select
                  value={formData.lifestyle?.diet}
                  onChange={(e) => setFormData({
                    ...formData,
                    lifestyle: {
                      ...formData.lifestyle,
                      diet: e.target.value as UserData['lifestyle']['diet']
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="poor">Poor</option>
                  <option value="average">Average</option>
                  <option value="good">Good</option>
                  <option value="excellent">Excellent</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
        >
          Calculate Life Countdown
        </button>
      </div>
    </form>
  );
}