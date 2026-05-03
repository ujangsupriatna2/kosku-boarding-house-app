'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Home, Mail, Lock, User, Phone, Building, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function AuthView() {
  const { currentView, setView, setUser } = useAppStore();

  // Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginShow, setLoginShow] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  // Register
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState('user');
  const [regShow, setRegShow] = useState(false);
  const [regLoading, setRegLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast.error('Email dan password harus diisi');
      return;
    }
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
    if (!regName || !regEmail || !regPassword) {
      toast.error('Nama, email, dan password harus diisi');
      return;
    }
    if (regPassword.length < 6) {
      toast.error('Password minimal 6 karakter');
      return;
    }
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

  const activeTab = currentView === 'register' ? 'register' : 'login';

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center">
              <Home className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">{activeTab === 'login' ? 'Selamat Datang Kembali' : 'Buat Akun Baru'}</h1>
          <p className="text-muted-foreground mt-1">
            {activeTab === 'login'
              ? 'Masuk untuk melanjutkan'
              : 'Daftar dan temukan kos impianmu'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={(v) => setView(v as any)}>
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="login" className="flex-1">Masuk</TabsTrigger>
                  <TabsTrigger value="register" className="flex-1">Daftar</TabsTrigger>
                </TabsList>

                {/* Login */}
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="loginEmail">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="loginEmail"
                          type="email"
                          placeholder="email@contoh.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="loginPassword">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="loginPassword"
                          type={loginShow ? 'text' : 'password'}
                          placeholder="Masukkan password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="pl-9 pr-9"
                        />
                        <button
                          type="button"
                          onClick={() => setLoginShow(!loginShow)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {loginShow ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      disabled={loginLoading}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white w-full"
                    >
                      {loginLoading ? 'Memproses...' : 'Masuk'}
                    </Button>
                  </form>
                </TabsContent>

                {/* Register */}
                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <Label htmlFor="regName">Nama Lengkap</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="regName"
                          placeholder="Nama lengkap"
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="regEmail">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="regEmail"
                          type="email"
                          placeholder="email@contoh.com"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="regPhone">No. Telepon (opsional)</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="regPhone"
                          placeholder="08xxxxxxxxxx"
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="regPassword">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="regPassword"
                          type={regShow ? 'text' : 'password'}
                          placeholder="Minimal 6 karakter"
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          className="pl-9 pr-9"
                        />
                        <button
                          type="button"
                          onClick={() => setRegShow(!regShow)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {regShow ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <Label>Daftar Sebagai</Label>
                      <Select value={regRole} onValueChange={setRegRole}>
                        <SelectTrigger>
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
                      className="bg-emerald-600 hover:bg-emerald-700 text-white w-full"
                    >
                      {regLoading ? 'Memproses...' : 'Daftar'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
