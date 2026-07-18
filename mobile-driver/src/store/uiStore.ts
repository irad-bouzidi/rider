import { create } from 'zustand';
interface UIState {
  theme: 'light' | 'dark' | 'system'; language: string; toastMessage: string | null;
  toastType: 'success' | 'error' | 'info' | 'warning';
  setTheme: (t: 'light' | 'dark' | 'system') => void; setLanguage: (l: string) => void;
  showToast: (msg: string, t?: 'success' | 'error' | 'info' | 'warning') => void; hideToast: () => void;
}
export const useUIStore = create<UIState>((set) => ({
  theme: 'light', language: 'en', toastMessage: null, toastType: 'info',
  setTheme: (theme) => set({ theme }), setLanguage: (language) => set({ language }),
  showToast: (message, type = 'info') => set({ toastMessage: message, toastType: type }),
  hideToast: () => set({ toastMessage: null }),
}));
