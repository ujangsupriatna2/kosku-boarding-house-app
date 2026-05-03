'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Home,
  Menu,
  CalendarCheck,
  LayoutDashboard,
  MessageCircle,
  User,
  LogOut,
  ChevronDown,
  Search,
  X,
  Sun,
  Moon,
  Compass,
  Clock,
  Phone,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WA_LINK = 'https://wa.me/6282240066466';

// Hydration-safe mounted check using useSyncExternalStore
const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useIsMounted();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full h-9 w-9"
      aria-label="Toggle theme"
    >
      {mounted ? (
        resolvedTheme === 'dark' ? (
          <Sun className="h-4 w-4 text-foreground" />
        ) : (
          <Moon className="h-4 w-4 text-foreground" />
        )
      ) : (
        <Moon className="h-4 w-4 text-foreground" />
      )}
    </Button>
  );
}

export default function Navbar() {
  const { user, currentView, setView, setUser, scrollToSection } = useAppStore();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useIsMounted();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (view: string) => {
    setView(view as any);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setView('home');
    setMobileOpen(false);
  };

  const scrollTo = (sectionId: string) => {
    // If already on home view, scroll directly
    if (currentView === 'home') {
      const el = document.getElementById(sectionId);
      if (el) {
        const navHeight = 64;
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    } else {
      // Navigate to home first, then scroll
      setView('home');
      // Use requestAnimationFrame to wait for view render
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            const navHeight = 64;
            const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        });
      });
    }
    setMobileOpen(false);
  };

  const handleNavClick = (link: (typeof navLinks)[number]) => {
    if (link.section) {
      scrollTo(link.section);
      return;
    }
    if (link.href) {
      window.open(link.href, '_blank');
      setMobileOpen(false);
      return;
    }
    navigate(link.view!);
  };

  const navLinks = [
    { label: 'Home', icon: Home, view: 'home' },
    { label: 'Kota Populer', icon: Compass, section: 'section-kota' },
    { label: 'Cara Kerja', icon: Clock, section: 'section-cara-kerja' },
    { label: 'Kontak', icon: Phone, section: 'section-kontak' },
    ...(user
      ? [
          { label: 'Booking Saya', icon: CalendarCheck, view: 'my-bookings' },
          ...(user.role === 'owner'
            ? [{ label: 'Dashboard', icon: LayoutDashboard, view: 'owner-dashboard' }]
            : []),
          { label: 'Chat', icon: MessageCircle, view: 'chat' },
        ]
      : []),
  ];

  const isActive = (view: string) => currentView === view;

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ease-out ${
        scrolled
          ? 'glass border-b border-white/20 dark:border-white/5 shadow-lg shadow-black/[0.03]'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-2.5 group"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transition-shadow duration-300">
            <Home className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-emerald-600 dark:text-emerald-400">Kos</span>
            <span className="text-foreground">Ku</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link)}
              className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
            >
              <span
                className={
                  link.view && isActive(link.view)
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-muted-foreground hover:text-foreground'
                }
              >
                {link.label}
              </span>
              {link.view && isActive(link.view) && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-500"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Desktop Auth + Theme Toggle */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border hover:bg-accent/50 transition-colors duration-200">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-teal-500 text-white text-xs font-semibold">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium max-w-[100px] truncate text-foreground">{user.name}</span>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 rounded-xl p-2 bg-card text-foreground border-border">
                <DropdownMenuItem onClick={() => navigate('profile')} className="rounded-lg px-3 py-2.5 cursor-pointer">
                  <User className="h-4 w-4 mr-2.5 text-muted-foreground" />
                  <div className="flex flex-col">
                    <span className="text-sm">Profil Saya</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuItem onClick={handleLogout} className="rounded-lg px-3 py-2.5 text-red-600 focus:text-red-600 cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2.5" />
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => navigate('login')}
                className="rounded-full px-5 text-sm font-medium"
              >
                Masuk
              </Button>
              <Button
                onClick={() => navigate('register')}
                className="rounded-full px-5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 text-sm font-medium"
              >
                Daftar
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="rounded-full">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 p-0 bg-card text-foreground">
            {/* Header */}
            <div className="px-6 pt-8 pb-4">
              <SheetTitle className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <Home className="h-5 w-5 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-xl font-bold tracking-tight">
                  <span className="text-emerald-600 dark:text-emerald-400">Kos</span>
                  <span className="text-foreground">Ku</span>
                </span>
              </SheetTitle>
            </div>

            <Separator className="mx-6 bg-border" />

            {/* Nav Links */}
            <nav className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 ${
                    link.view && isActive(link.view)
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </button>
              ))}
            </nav>

            <Separator className="mx-6 bg-border" />

            {/* Auth Section */}
            <div className="px-4 py-4">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-teal-500 text-white font-semibold">
                        {user.name?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('profile')}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <User className="h-4 w-4" />
                    Profil Saya
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Keluar
                  </button>
                </div>
              ) : (
                <div className="space-y-2 px-4">
                  <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">Akun</p>
                  <Button
                    variant="outline"
                    onClick={() => navigate('login')}
                    className="w-full rounded-xl h-11 font-medium"
                  >
                    Masuk
                  </Button>
                  <Button
                    onClick={() => navigate('register')}
                    className="w-full rounded-xl h-11 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-500/25 font-medium"
                  >
                    Daftar Gratis
                  </Button>
                </div>
              )}

              {/* Mobile Theme Toggle */}
              <div className="mt-4 px-4">
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200"
                >
                  {mounted && resolvedTheme === 'dark' ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                  {mounted && resolvedTheme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
