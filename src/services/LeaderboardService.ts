// This service will handle leaderboard logic.
// For the game jam, it might use localStorage for simple persistence.

export interface ScoreEntry { // Added export here
  playerName: string;
  score: number;
}

interface LeaderboardData {
  [game: string]: ScoreEntry[];
}

const localStorageKey = 'vibeTrialsLeaderboard';

export const getScores = (game: string): ScoreEntry[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  const data = localStorage.getItem(localStorageKey);
  const leaderboard: LeaderboardData = data ? JSON.parse(data) : {};
  return leaderboard[game] || [];
};

export const addScore = (game: string, playerName: string, score: number) => {
  if (typeof window === 'undefined') {
    return;
  }
  const data = localStorage.getItem(localStorageKey);
  const leaderboard: LeaderboardData = data ? JSON.parse(data) : {};

  if (!leaderboard[game]) {
    leaderboard[game] = [];
  }

  leaderboard[game].push({ playerName, score });
  leaderboard[game].sort((a, b) => b.score - a.score);
  localStorage.setItem(localStorageKey, JSON.stringify(leaderboard));
};

export const clearScores = () => {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.removeItem(localStorageKey);
};