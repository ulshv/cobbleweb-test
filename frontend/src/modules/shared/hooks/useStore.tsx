import { ReactNode, createContext, useContext } from 'react';
import { RootStore } from '../store/RootStore';

const store = new RootStore();
const StoreContext = createContext<RootStore>(store);

export function StoreProvider({ children }: { children: ReactNode }) {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);

  if (context === undefined) {
    throw new Error('useStore must be used within StoreProvider');
  }

  return context;
}
