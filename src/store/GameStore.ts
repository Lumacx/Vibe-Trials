import { create } from 'zustand';
import { AccountInterface } from 'starknet';

interface GameStoreState {
  connectedAccount: AccountInterface | null;
  isConnected: boolean;
  // Add your game state variables here
  // Example: score: number;
}

interface GameStoreActions {
  setConnectedAccount: (account: AccountInterface | null) => void;
  // Add your game state actions here
  // Example: incrementScore: (amount: number) => void;
}

type GameStore = GameStoreState & GameStoreActions;

export const useGameStore = create<GameStore>((set) => ({
  connectedAccount: null,
  isConnected: false,
  setConnectedAccount: (account) => set({ connectedAccount: account, isConnected: !!account }),
  // Initialize your game state variables here
  // Example: score: 0,

// Implement your game state actions here
  // Example: incrementScore: (amount) => set((state) => ({ score: state.score + amount})),
}));
