import { create } from 'zustand';

interface UIState {
  theme: 'light' | 'dark' | 'system';
  language: string;
  onboardingComplete: boolean;
  toastMessage: string | null;
  toastType: 'success' | 'error' | 'info' | 'warning';

  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLanguage: (language: string) => void;
  setOnboardingComplete: (complete: boolean) => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  hideToast: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'light',
  language: 'en',
  onboardingComplete: false,
  toastMessage: null,
  toastType: 'info',

  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
  setOnboardingComplete: (complete) => set({ onboardingComplete: complete }),
  showToast: (message, type = 'info') =>
    set({ toastMessage: message, toastType: type }),
  hideToast: () => set({ toastMessage: null }),
}));
