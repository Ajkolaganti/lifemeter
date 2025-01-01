import { CountdownMetrics } from '../types';

export function shareResults(metrics: CountdownMetrics) {
  const text = `My Life Countdown:\n` +
    `Years remaining: ${metrics.lifeExpectancy.years}\n` +
    `Days until next birthday: ${metrics.nextBirthday.days}\n` +
    `Calculate yours at [Your Website URL]`;

  if (navigator.share) {
    navigator.share({
      title: 'My Life Countdown',
      text: text,
    }).catch(console.error);
  } else {
    navigator.clipboard.writeText(text)
      .then(() => alert('Results copied to clipboard!'))
      .catch(console.error);
  }
}