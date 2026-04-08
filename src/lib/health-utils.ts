export interface DailyEntry {
  date: string;
  water: number;
  sleep: number;
  steps: number;
  score: number;
}

export const GOALS = {
  water: 8,    // glasses
  sleep: 8,    // hours
  steps: 10000 // steps
};

export function calculateScore(water: number, sleep: number, steps: number): number {
  const waterScore = Math.min(water / GOALS.water, 1) * 35;
  const sleepScore = Math.min(sleep / GOALS.sleep, 1) * 35;
  const stepsScore = Math.min(steps / GOALS.steps, 1) * 30;
  return Math.round(waterScore + sleepScore + stepsScore);
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Fair";
  return "Needs Improvement";
}

export function getScoreColor(score: number): string {
  if (score >= 70) return "hsl(var(--health-score-good))";
  if (score >= 40) return "hsl(var(--health-score-mid))";
  return "hsl(var(--health-score-low))";
}

const TIPS = [
  "💧 Drink a glass of water first thing in the morning",
  "🚶 Take a 10-minute walk after meals to aid digestion",
  "😴 Maintain a consistent sleep schedule, even on weekends",
  "🍎 Eat at least 5 servings of fruits and vegetables daily",
  "🧘 Practice deep breathing for 5 minutes to reduce stress",
  "📱 Reduce screen time 1 hour before bed for better sleep",
  "🏃 Aim for at least 30 minutes of physical activity daily",
  "🥤 Replace sugary drinks with water or herbal tea",
  "🧠 Take short breaks every hour to rest your mind",
  "🌞 Get some sunlight exposure in the morning",
  "🥗 Prepare healthy meals in advance to avoid junk food",
  "💪 Do simple stretches at your desk every 2 hours",
];

export function getRandomTips(count: number = 3): string[] {
  const shuffled = [...TIPS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function loadHistory(): DailyEntry[] {
  try {
    const data = localStorage.getItem("health-history");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveEntry(entry: DailyEntry): DailyEntry[] {
  const history = loadHistory();
  const existingIndex = history.findIndex(e => e.date === entry.date);
  if (existingIndex >= 0) {
    history[existingIndex] = entry;
  } else {
    history.unshift(entry);
  }
  const trimmed = history.slice(0, 7);
  localStorage.setItem("health-history", JSON.stringify(trimmed));
  return trimmed;
}
