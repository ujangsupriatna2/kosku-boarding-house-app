'use client';

import { useAppStore } from '@/lib/store';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PromoPopup from '@/components/layout/PromoPopup';
import HomeView from '@/components/views/HomeView';
import KosDetailView from '@/components/views/KosDetailView';
import AuthView from '@/components/views/AuthView';
import OwnerDashboardView from '@/components/views/OwnerDashboardView';
import MyBookingsView from '@/components/views/MyBookingsView';
import ChatView from '@/components/views/ChatView';
import ProfileView from '@/components/views/ProfileView';
import { AnimatePresence, motion } from 'framer-motion';

const viewComponents: Record<string, React.ComponentType> = {
  'home': HomeView,
  'kos-detail': KosDetailView,
  'login': AuthView,
  'register': AuthView,
  'owner-dashboard': OwnerDashboardView,
  'my-bookings': MyBookingsView,
  'chat': ChatView,
  'profile': ProfileView,
};

export default function Page() {
  const currentView = useAppStore((s) => s.currentView);

  const ViewComponent = viewComponents[currentView] || HomeView;

  return (
    <div className="min-h-screen flex flex-col">
      <PromoPopup />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            <ViewComponent />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
