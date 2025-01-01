interface Quote {
  text: string;
  author: string;
  category: 'motivation' | 'health' | 'time' | 'life' | 'success' | 'wisdom';
  translations?: {
    [key: string]: {
      text: string;
      author: string;
    };
  };
}

export const dailyQuotes: Quote[] = [
  {
    text: "Life is not merely being alive, but being well.",
    author: "Marcus Valerius Martial",
    category: "health",
    translations: {
      es: {
        text: "La vida no es simplemente estar vivo, sino estar bien.",
        author: "Marco Valerio Marcial"
      }
    }
  },
  {
    text: "The greatest wealth is health.",
    author: "Virgil",
    category: "health",
    translations: {
      es: {
        text: "La mayor riqueza es la salud.",
        author: "Virgilio"
      }
    }
  },
  {
    text: "Time and health are two precious assets that we don't recognize and appreciate until they have been depleted.",
    author: "Denis Waitley",
    category: "health"
  },
  {
    text: "Don't count the days, make the days count.",
    author: "Muhammad Ali",
    category: "time"
  },
  {
    text: "The future depends on what you do today.",
    author: "Mahatma Gandhi",
    category: "motivation"
  },
  {
    text: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs",
    category: "time"
  },
  {
    text: "Health is not valued until sickness comes.",
    author: "Thomas Fuller",
    category: "health"
  },
  {
    text: "Take care of your body. It's the only place you have to live.",
    author: "Jim Rohn",
    category: "health"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "success"
  },
  {
    text: "Every moment is a fresh beginning.",
    author: "T.S. Eliot",
    category: "motivation"
  },
  // ... Add more quotes (about 355 more)
];

interface QuoteOptions {
  language?: string;
  category?: string;
}

export function getDailyQuote(options: QuoteOptions = {}): Quote {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  let quote = dailyQuotes[dayOfYear % dailyQuotes.length];
  
  // If language is specified and translation exists, return translated version
  if (options.language && quote.translations?.[options.language]) {
    return {
      ...quote,
      text: quote.translations[options.language].text,
      author: quote.translations[options.language].author
    };
  }

  return quote;
}

export function shareQuote(quote: Quote) {
  if (navigator.share) {
    navigator.share({
      title: 'Daily Inspiration',
      text: `"${quote.text}" - ${quote.author}`,
      url: window.location.href
    }).catch(console.error);
  } else {
    // Fallback to copying to clipboard
    const text = `"${quote.text}" - ${quote.author}`;
    navigator.clipboard.writeText(text).then(() => {
      alert('Quote copied to clipboard!');
    }).catch(console.error);
  }
} 