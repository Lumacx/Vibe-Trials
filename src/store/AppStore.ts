import { create, StateCreator } from 'zustand';
import { AccountInterface } from 'starknet';

interface AppStoreState {
  connectedAccount: AccountInterface | null;
  isConnected: boolean;
}

interface AppStoreActions {
  setConnectedAccount: (account: AccountInterface | null) => void;
}

type AppStore = AppStoreState & AppStoreActions;

const appStoreCreator: StateCreator<AppStore> = (set) => ({
  connectedAccount: null,
  isConnected: false,
  setConnectedAccount: (account: AccountInterface | null) =>
    set({ connectedAccount: account, isConnected: !!account }),
});

export const useAppStore = create<AppStore>(appStoreCreator);
