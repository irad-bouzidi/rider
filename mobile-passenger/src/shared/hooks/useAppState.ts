import { useState, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export function useAppState() {
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      setAppState(state);
    });

    return () => subscription.remove();
  }, []);

  return {
    isForeground: appState === 'active',
    isBackground: appState === 'background' || appState === 'inactive',
    appState,
  };
}
