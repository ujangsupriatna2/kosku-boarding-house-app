'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Home,
  Mail,
  Lock,
  User,
  Phone,
  Building,
  Eye,
  EyeOff,
  Shield,
  Star,
  Users,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthView() {
  const { currentView, setView, setUser } = useAppStore();

  // Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginShow, setLoginShow] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginErrors, setLoginErrors] = useState<{ email?: string; password?: string }>({});

  // Register
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState('user');
  const [regShow, setRegShow] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [regErrors, setRegErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  const activeTab = currentView === 'register' ? 'register' : 'login';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { email?: string; password?: string } = {};
    if (!loginEmail) errors.email = 'Email harus diisi';
    if (!loginPassword) errors.password = 'Password harus diisi';
    setLoginErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoginLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user || data);
        setView('home');
        toast.success('Login berhasil!');
      } else {
        const err = await res.json();
        toast.error(err.error || 'Email atau password salah');
      }
    } catch {
      toast.error('Terjadi kesalahan');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; email?: string; password?: string } = {};
    if (!regName) errors.name = 'Nama harus diisi';
    if (!regEmail) errors.email = 'Email harus diisi';
    if (!regPassword) errors.password = 'Password harus diisi';
    else if (regPassword.length < 6) errors.password = 'Password minimal 6 karakter';
    setRegErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setRegLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          phone: regPhone || null,
          password: regPassword,
          role: regRole,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user || data);
        setView('home');
        toast.success('Registrasi berhasil! Selamat datang!');
      } else {
        const err = await res.json();
        toast.error(err.error || 'Registrasi gagal');
      }
    } catch {
      toast.error('Terjadi kesalahan');
    } finally {
      setRegLoading(false);
    }
  };

  const features = [
    { icon: Shield, label: 'Aman & Terpercaya' },
    { icon: Star, label: 'Rating Transparan' },
    { icon: Users, label: '10K+ Pengguna' },
    { icon: MapPin, label: '50+ Kota' },
  ];

  return (
    <div className="min-h-[85vh] flex items-stretch">
      {/* Left Panel - Decoration (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[50%] relative overflow-hidden animated-gradient">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-teal-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <Home className="absolute top-[20%] left-[15%] h-10 w-10 text-white/15 animate-float" style={{ animationDelay: '0s' }} />
          <Building className="absolute top-[35%] right-[15%] h-12 w-12 text-white/10 animate-float" style={{ animationDelay: '1.5s' }} />
          <Star className="absolute bottom-[30%] left-[25%] h-8 w-8 text-white/15 animate-float" style={{ animationDelay: '0.8s' }} />
          <MapPin className="absolute bottom-[20%] right-[25%] h-9 w-9 text-white/10 animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <Home className="h-7 w-7 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold text-white">KosKu</span>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h2 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-4 tracking-tight">
              Temukan Kos<br />
              <span className="text-emerald-200">Impianmu</span>
            </h2>
            <p className="text-emerald-100/70 text-lg leading-relaxed mb-10">
              Platform kos terpercaya di Indonesia. Cari, bandingkan, dan booking kos terbaik.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid grid-cols-2 gap-4"
          >
            {features.map((feat) => (
              <div
                key={feat.label}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10"
              >
                <feat.icon className="h-5 w-5 text-white/80" />
                <span className="text-sm text-white/80 font-medium">{feat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 lg:py-0 bg-muted/30">
        <div className="w-full max-w-md">
          {/* Mobile decoration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden text-center mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <Home className="h-7 w-7 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              <span className="text-emerald-600 dark:text-emerald-400">Kos</span><span className="text-foreground">Ku</span>
            </h2>
            <p className="text-muted-foreground text-sm mt-1">Platform Kos #1 di Indonesia</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-6 md:p-8">
                {/* Tab header */}
                <div className="text-center mb-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h1 className="text-2xl font-bold tracking-tight">
                        {activeTab === 'login' ? 'Selamat Datang Kembali' : 'Buat Akun Baru'}
                      </h1>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {activeTab === 'login'
                          ? 'Masuk untuk melanjutkan'
                          : 'Daftar dan temukan kos impianmu'}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <Tabs value={activeTab} onValueChange={(v) => { setView(v as any); setLoginErrors({}); setRegErrors({}); }}>
                  <TabsList className="w-full mb-6 rounded-xl h-11 bg-muted/80 p-1">
                    <TabsTrigger value="login" className="flex-1 rounded-lg text-sm font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-foreground transition-all">
                      Masuk
                    </TabsTrigger>
                    <TabsTrigger value="register" className="flex-1 rounded-lg text-sm font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-foreground transition-all">
                      Daftar
                    </TabsTrigger>
                  </TabsList>

                  {/* Login Form */}
                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <Label htmlFor="loginEmail" className="text-sm font-medium">Email</Label>
                        <div className="relative mt-1.5">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="loginEmail"
                            type="email"
                            placeholder="email@contoh.com"
                            value={loginEmail}
                            onChange={(e) => { setLoginEmail(e.target.value); setLoginErrors(prev => ({ ...prev, email: undefined })); }}
                            className={`pl-10 h-11 rounded-xl ${loginErrors.email ? 'border-red-300 dark:border-red-700' : ''}`}
                          />
                        </div>
                        {loginErrors.email && <p className="text-xs text-red-500 mt-1">{loginErrors.email}</p>}
                      </div>
                      <div>
                        <Label htmlFor="loginPassword" className="text-sm font-medium">Password</Label>
                        <div className="relative mt-1.5">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="loginPassword"
                            type={loginShow ? 'text' : 'password'}
                            placeholder="Masukkan password"
                            value={loginPassword}
                            onChange={(e) => { setLoginPassword(e.target.value); setLoginErrors(prev => ({ ...prev, password: undefined })); }}
                            className={`pl-10 pr-10 h-11 rounded-xl ${loginErrors.password ? 'border-red-300 dark:border-red-700' : ''}`}
                          />
                          <button
                            type="button"
                            onClick={() => setLoginShow(!loginShow)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {loginShow ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        {loginErrors.password && <p className="text-xs text-red-500 mt-1">{loginErrors.password}</p>}
                      </div>
                      <Button
                        type="submit"
                        disabled={loginLoading}
                        className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25 font-semibold transition-all duration-300"
                      >
                        {loginLoading ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Memproses...
                          </span>
                        ) : (
                          'Masuk'
                        )}
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Register Form */}
                  <TabsContent value="register">
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div>
                        <Label htmlFor="regName" className="text-sm font-medium">Nama Lengkap</Label>
                        <div className="relative mt-1.5">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="regName"
                            placeholder="Nama lengkap"
                            value={regName}
                            onChange={(e) => { setRegName(e.target.value); setRegErrors(prev => ({ ...prev, name: undefined })); }}
                            className={`pl-10 h-11 rounded-xl ${regErrors.name ? 'border-red-300 dark:border-red-700' : ''}`}
                          />
                        </div>
                        {regErrors.name && <p className="text-xs text-red-500 mt-1">{regErrors.name}</p>}
                      </div>
                      <div>
                        <Label htmlFor="regEmail" className="text-sm font-medium">Email</Label>
                        <div className="relative mt-1.5">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="regEmail"
                            type="email"
                            placeholder="email@contoh.com"
                            value={regEmail}
                            onChange={(e) => { setRegEmail(e.target.value); setRegErrors(prev => ({ ...prev, email: undefined })); }}
                            className={`pl-10 h-11 rounded-xl ${regErrors.email ? 'border-red-300 dark:border-red-700' : ''}`}
                          />
                        </div>
                        {regErrors.email && <p className="text-xs text-red-500 mt-1">{regErrors.email}</p>}
                      </div>
                      <div>
                        <Label htmlFor="regPhone" className="text-sm font-medium">No. Telepon <span className="text-muted-foreground font-normal">(opsional)</span></Label>
                        <div className="relative mt-1.5">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="regPhone"
                            placeholder="08xxxxxxxxxx"
                            value={regPhone}
                            onChange={(e) => setRegPhone(e.target.value)}
                            className="pl-10 h-11 rounded-xl"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="regPassword" className="text-sm font-medium">Password</Label>
                        <div className="relative mt-1.5">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="regPassword"
                            type={regShow ? 'text' : 'password'}
                            placeholder="Minimal 6 karakter"
                            value={regPassword}
                            onChange={(e) => { setRegPassword(e.target.value); setRegErrors(prev => ({ ...prev, password: undefined })); }}
                            className={`pl-10 pr-10 h-11 rounded-xl ${regErrors.password ? 'border-red-300 dark:border-red-700' : ''}`}
                          />
                          <button
                            type="button"
                            onClick={() => setRegShow(!regShow)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {regShow ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        {regErrors.password && <p className="text-xs text-red-500 mt-1">{regErrors.password}</p>}
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Daftar Sebagai</Label>
                        <Select value={regRole} onValueChange={setRegRole}>
                          <SelectTrigger className="mt-1.5 h-11 rounded-xl">
                            <div className="flex items-center gap-2">
                              {regRole === 'owner' ? (
                                <Building className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <User className="h-4 w-4 text-muted-foreground" />
                              )}
                              <SelectValue />
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">Pencari Kos</SelectItem>
                            <SelectItem value="owner">Pemilik Kos</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        type="submit"
                        disabled={regLoading}
                        className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25 font-semibold transition-all duration-300"
                      >
                        {regLoading ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Memproses...
                          </span>
                        ) : (
                          'Daftar'
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                <Separator className="my-5" />

                {/* Social login (decorative) */}
                <div className="space-y-3">
                  <p className="text-xs text-center text-muted-foreground font-medium uppercase tracking-wider">Atau masuk dengan</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="rounded-xl h-11 font-medium" type="button">
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" className="rounded-xl h-11 font-medium" type="button">
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                      </svg>
                      Apple
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
