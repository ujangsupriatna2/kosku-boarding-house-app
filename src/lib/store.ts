import { create } from 'zustand';
import { type User, type ViewType } from '@/lib/types';

interface AppState {
  // Auth
  user: User | null;
  
  // Navigation
  currentView: ViewType;
  previousView: ViewType | null;
  
  // Selected items
  selectedKosId: string | null;
  selectedKosName: string | null;
  selectedKosImage: string | null;
  selectedKosOwnerId: string | null;
  selectedKosOwnerIdName: string | null;
  
  // Chat
  chatTargetUserId: string | null;
  chatTargetUserName: string | null;
  chatKosId: string | null;
  
  // Promo popup
  promoPopupDismissed: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setView: (view: ViewType) => void;
  goBack: () => void;
  selectKos: (id: string, name: string, image: string | null, ownerId: string, ownerName: string) => void;
  openChat: (targetUserId: string, targetUserName: string, kosId: string) => void;
  dismissPromoPopup: () => void;
  reset: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  currentView: 'home',
  previousView: null,
  selectedKosId: null,
  selectedKosName: null,
  selectedKosImage: null,
  selectedKosOwnerId: null,
  selectedKosOwnerIdName: null,
  chatTargetUserId: null,
  chatTargetUserName: null,
  chatKosId: null,
  promoPopupDismissed: false,

  setUser: (user) => set({ user }),
  
  setView: (view) => {
    const current = get().currentView;
    set({ currentView: view, previousView: current });
  },

  goBack: () => {
    const prev = get().previousView || 'home';
    set({ currentView: prev, previousView: 'home' });
  },

  selectKos: (id, name, image, ownerId, ownerName) => {
    const current = get().currentView;
    set({
      selectedKosId: id,
      selectedKosName: name,
      selectedKosImage: image,
      selectedKosOwnerId: ownerId,
      selectedKosOwnerIdName: ownerName,
      currentView: 'kos-detail',
      previousView: current,
    });
  },

  openChat: (targetUserId, targetUserName, kosId) => {
    set({
      chatTargetUserId: targetUserId,
      chatTargetUserName: targetUserName,
      chatKosId: kosId,
      currentView: 'chat',
      previousView: get().currentView,
    });
  },

  dismissPromoPopup: () => set({ promoPopupDismissed: true }),

  reset: () => set({
    user: null,
    currentView: 'home',
    previousView: null,
    selectedKosId: null,
    selectedKosName: null,
    selectedKosImage: null,
    selectedKosOwnerId: null,
    selectedKosOwnerIdName: null,
    chatTargetUserId: null,
    chatTargetUserName: null,
    chatKosId: null,
  }),
}));
