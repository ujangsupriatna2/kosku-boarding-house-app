'use client';

import { useState } from 'react';
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
import {
  Home,
  Menu,
  CalendarCheck,
  LayoutDashboard,
  MessageCircle,
  User,
  LogOut,
  ChevronDown,
} from 'lucide-react';

export default function Navbar() {
  const { user, currentView, setView, setUser } = useAppStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = (view: string) => {
    setView(view as any);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setView('home');
    setMobileOpen(false);
  };

  const navLinks = [
    { label: 'Home', icon: Home, view: 'home' },
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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-2 font-bold text-xl text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          <Home className="h-6 w-6" />
          <span>KosKu</span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Button
              key={link.view}
              variant={currentView === link.view ? 'default' : 'ghost'}
              size="sm"
              onClick={() => navigate(link.view)}
              className={
                currentView === link.view
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }
            >
              <link.icon className="h-4 w-4 mr-1.5" />
              {link.label}
            </Button>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="max-w-[100px] truncate">{user.name}</span>
                  <ChevronDown className="h-3 w-3 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate('profile')}>
                  <User className="h-4 w-4 mr-2" />
                  Profil Saya
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => navigate('login')}>
                Masuk
              </Button>
              <Button
                onClick={() => navigate('register')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Daftar
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="flex items-center gap-2 text-emerald-600 mb-6">
              <Home className="h-5 w-5" />
              KosKu
            </SheetTitle>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Button
                  key={link.view}
                  variant={currentView === link.view ? 'default' : 'ghost'}
                  className={`justify-start gap-2 ${
                    currentView === link.view
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : ''
                  }`}
                  onClick={() => navigate(link.view)}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Button>
              ))}
            </nav>
            <div className="mt-6 border-t pt-4">
              {user ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 mb-2 px-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-emerald-100 text-emerald-700">
                        {user.name?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="justify-start gap-2" onClick={() => navigate('profile')}>
                    <User className="h-4 w-4" />
                    Profil Saya
                  </Button>
                  <Button variant="ghost" className="justify-start gap-2 text-red-600" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    Keluar
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button variant="outline" onClick={() => navigate('login')}>
                    Masuk
                  </Button>
                  <Button
                    onClick={() => navigate('register')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Daftar
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
