import { create } from 'zustand';
import { PaymentMethod, Wallet, PromoCode } from '../shared/types/payment';

interface PaymentState {
  methods: PaymentMethod[];
  selectedMethodId: string | null;
  wallet: Wallet | null;
  activePromo: PromoCode | null;

  setMethods: (methods: PaymentMethod[]) => void;
  addMethod: (method: PaymentMethod) => void;
  removeMethod: (id: string) => void;
  setSelectedMethod: (id: string) => void;
  setWallet: (wallet: Wallet) => void;
  setActivePromo: (promo: PromoCode | null) => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  methods: [],
  selectedMethodId: null,
  wallet: null,
  activePromo: null,

  setMethods: (methods) => set({ methods }),
  addMethod: (method) =>
    set((state) => ({ methods: [...state.methods, method] })),
  removeMethod: (id) =>
    set((state) => ({
      methods: state.methods.filter((m) => m.id !== id),
      selectedMethodId:
        state.selectedMethodId === id ? null : state.selectedMethodId,
    })),
  setSelectedMethod: (id) => set({ selectedMethodId: id }),
  setWallet: (wallet) => set({ wallet }),
  setActivePromo: (promo) => set({ activePromo: promo }),
}));
