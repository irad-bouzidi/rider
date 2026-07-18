import { create } from 'zustand';

interface SupportTicket {
  id: string;
  subject: string;
  status: 'open' | 'closed' | 'pending';
  lastMessage: string;
  createdAt: string;
}

interface SupportState {
  tickets: SupportTicket[];
  setTickets: (tickets: SupportTicket[]) => void;
  addTicket: (ticket: SupportTicket) => void;
}

export const useSupportStore = create<SupportState>((set) => ({
  tickets: [],
  setTickets: (tickets) => set({ tickets }),
  addTicket: (ticket) => set((state) => ({ tickets: [...state.tickets, ticket] })),
}));
