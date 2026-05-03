'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  User,
  Mail,
  Phone,
  Building,
  LogOut,
  LayoutDashboard,
  Pencil,
  Save,
  Shield,
} from 'lucide-react';
import { toast } from 'sonner';

export default function ProfileView() {
  const { user, setView, setUser, goBack } = useAppStore();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    if (!name.trim()) {
      toast.error('Nama tidak boleh kosong');
      return;
    }
    setSaving(true);
    // Since there's no dedicated profile update endpoint, we simulate it
    // In a real app this would PATCH /api/auth/profile
    setTimeout(() => {
      setUser({ ...user, name: name.trim(), phone: phone || null });
      setEditing(false);
      toast.success('Profil berhasil diperbarui!');
      setSaving(false);
    }, 500);
  };

  const handleLogout = () => {
    setUser(null);
    setView('home');
    toast.success('Berhasil keluar');
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <User className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
        <h2 className="text-lg font-medium text-muted-foreground">Silakan Login</h2>
        <p className="text-sm text-muted-foreground mt-1">Masuk untuk melihat profil kamu.</p>
        <Button onClick={() => setView('login')} className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white">
          Masuk
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Profil Saya</h1>
        <p className="text-muted-foreground mt-1">Kelola informasi akun kamu</p>
      </div>

      <Card className="border-0 shadow-sm mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-2xl">
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <Badge
                className={`mt-1 text-xs border-0 ${
                  user.role === 'owner'
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400'
                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                }`}
              >
                {user.role === 'owner' ? 'Pemilik Kos' : 'Pencari Kos'}
              </Badge>
            </div>
          </div>

          <Separator className="mb-6" />

          {editing ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="profileName">Nama</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="profileName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="profileEmail">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="profileEmail"
                    value={user.email}
                    disabled
                    className="pl-9 bg-muted"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Email tidak dapat diubah</p>
              </div>
              <div>
                <Label htmlFor="profilePhone">No. Telepon</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="profilePhone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1"
                >
                  <Save className="h-4 w-4" />
                  {saving ? 'Menyimpan...' : 'Simpan'}
                </Button>
                <Button variant="outline" onClick={() => { setEditing(false); setName(user.name); setPhone(user.phone || ''); }}>
                  Batal
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Nama</p>
                  <p className="font-medium">{user.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">No. Telepon</p>
                  <p className="font-medium">{user.phone || 'Belum diisi'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Role</p>
                  <p className="font-medium">{user.role === 'owner' ? 'Pemilik Kos' : 'Pencari Kos'}</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="gap-1 mt-2"
                onClick={() => setEditing(true)}
              >
                <Pencil className="h-4 w-4" />
                Edit Profil
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 space-y-2">
          {user.role === 'owner' && (
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => setView('owner-dashboard')}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard Pemilik
            </Button>
          )}
          <Button
            variant="outline"
            className="w-full justify-start gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
