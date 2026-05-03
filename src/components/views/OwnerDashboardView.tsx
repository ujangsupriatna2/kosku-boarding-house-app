'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import {
  type Kos,
  type Booking,
  formatPrice,
  formatDate,
  getStatusColor,
  getStatusLabel,
} from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import {
  Building,
  BedDouble,
  CalendarCheck,
  DollarSign,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  MapPin,
  Eye,
} from 'lucide-react';
import { toast } from 'sonner';

export default function OwnerDashboardView() {
  const { user, setView, goBack } = useAppStore();

  const [activeTab, setActiveTab] = useState('kos');
  const [kosList, setKosList] = useState<Kos[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingKos, setLoadingKos] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);

  // Add/Edit Kos dialog
  const [kosDialogOpen, setKosDialogOpen] = useState(false);
  const [editKos, setEditKos] = useState<Kos | null>(null);
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formDistrict, setFormDistrict] = useState('');
  const [formPriceFrom, setFormPriceFrom] = useState('');
  const [formPriceTo, setFormPriceTo] = useState('');
  const [formTotalRooms, setFormTotalRooms] = useState('');
  const [formRules, setFormRules] = useState('');
  const [submittingKos, setSubmittingKos] = useState(false);

  useEffect(() => {
    if (user) {
      fetchKos();
      fetchBookings();
    }
  }, [user]);

  const fetchKos = async () => {
    if (!user) return;
    setLoadingKos(true);
    try {
      const res = await fetch(`/api/owner/kos?ownerId=${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setKosList(Array.isArray(data) ? data : data.data || []);
      }
    } catch {
      // silently fail
    } finally {
      setLoadingKos(false);
    }
  };

  const fetchBookings = async () => {
    setLoadingBookings(false);
  };

  const openAddKos = () => {
    setEditKos(null);
    setFormName('');
    setFormDesc('');
    setFormAddress('');
    setFormCity('');
    setFormDistrict('');
    setFormPriceFrom('');
    setFormPriceTo('');
    setFormTotalRooms('');
    setFormRules('');
    setKosDialogOpen(true);
  };

  const openEditKos = (kos: Kos) => {
    setEditKos(kos);
    setFormName(kos.name);
    setFormDesc(kos.description);
    setFormAddress(kos.address);
    setFormCity(kos.city);
    setFormDistrict(kos.district);
    setFormPriceFrom(String(kos.priceFrom));
    setFormPriceTo(String(kos.priceTo));
    setFormTotalRooms(String(kos.totalRooms));
    setFormRules(kos.rules || '');
    setKosDialogOpen(true);
  };

  const handleSubmitKos = async () => {
    if (!user) return;
    if (!formName || !formAddress || !formCity) {
      toast.error('Nama, alamat, dan kota harus diisi');
      return;
    }
    setSubmittingKos(true);
    try {
      const res = await fetch('/api/owner/kos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ownerId: user.id,
          name: formName,
          description: formDesc,
          address: formAddress,
          city: formCity,
          district: formDistrict,
          priceFrom: Number(formPriceFrom) || 0,
          priceTo: Number(formPriceTo) || 0,
          totalRooms: Number(formTotalRooms) || 0,
          rules: formRules || null,
        }),
      });
      if (res.ok) {
        toast.success(editKos ? 'Kos berhasil diperbarui!' : 'Kos berhasil ditambahkan!');
        setKosDialogOpen(false);
        fetchKos();
      } else {
        const err = await res.json();
        toast.error(err.error || 'Gagal menyimpan kos');
      }
    } catch {
      toast.error('Terjadi kesalahan');
    } finally {
      setSubmittingKos(false);
    }
  };

  if (!user || user.role !== 'owner') {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Building className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
        <h2 className="text-lg font-medium text-muted-foreground">Akses Ditolak</h2>
        <p className="text-sm text-muted-foreground mt-1">Hanya pemilik kos yang bisa mengakses dashboard ini.</p>
        <Button variant="ghost" onClick={goBack} className="mt-4">Kembali</Button>
      </div>
    );
  }

  const totalRooms = kosList.reduce((acc, k) => acc + (k.totalRooms || 0), 0);
  const totalBookings = kosList.reduce((acc, k) => acc + ((k as any)._count?.bookings || 0), 0);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard Pemilik</h1>
          <p className="text-muted-foreground mt-1">Kelola kos dan booking kamu</p>
        </div>
        <Button
          onClick={openAddKos}
          className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Tambah Kos</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Building, label: 'Total Kos', value: kosList.length, color: 'text-emerald-600' },
          { icon: BedDouble, label: 'Total Kamar', value: totalRooms, color: 'text-teal-600' },
          { icon: CalendarCheck, label: 'Booking Masuk', value: totalBookings, color: 'text-amber-600' },
          { icon: DollarSign, label: 'Kota', value: new Set(kosList.map((k) => k.city)).size, color: 'text-purple-600' },
        ].map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <stat.icon className={`h-8 w-8 ${stat.color} mb-2`} />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="kos">Kos Saya</TabsTrigger>
          <TabsTrigger value="bookings">Booking Masuk</TabsTrigger>
        </TabsList>

        {/* Kos Saya */}
        <TabsContent value="kos">
          {loadingKos ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-32 w-full rounded-xl" />
              ))}
            </div>
          ) : kosList.length === 0 ? (
            <div className="text-center py-16">
              <Building className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground">Belum ada kos</h3>
              <p className="text-sm text-muted-foreground mt-1">Tambahkan kos pertamamu!</p>
              <Button onClick={openAddKos} className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Kos
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {kosList.map((kos) => (
                <Card key={kos.id} className="border-0 shadow-sm">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950 dark:to-teal-950 flex items-center justify-center shrink-0 overflow-hidden">
                          {kos.imageUrl ? (
                            <img src={kos.imageUrl} alt={kos.name} className="w-full h-full object-cover" />
                          ) : (
                            <Building className="h-8 w-8 text-emerald-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{kos.name}</h3>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{kos.district}, {kos.city}</span>
                          </div>
                          <p className="text-sm text-emerald-600 font-medium mt-1">
                            {formatPrice(kos.priceFrom)} - {formatPrice(kos.priceTo)}
                          </p>
                          <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                            <span>{kos.totalRooms} kamar</span>
                            <span>{kos.availableRooms} tersedia</span>
                            {(kos as any).avgRating && <span>⭐ {(kos as any).avgRating.toFixed(1)}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            useAppStore.getState().selectKos(kos.id, kos.name, kos.imageUrl, kos.ownerId, '');
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Lihat
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => openEditKos(kos)}>
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Booking Masuk */}
        <TabsContent value="bookings">
          {loadingBookings ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <CalendarCheck className="h-12 w-12 mx-auto mb-2 opacity-30" />
              <p>Booking masuk akan muncul di sini</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Add/Edit Kos Dialog */}
      <Dialog open={kosDialogOpen} onOpenChange={setKosDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-emerald-600">
              {editKos ? 'Edit Kos' : 'Tambah Kos Baru'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label htmlFor="formName">Nama Kos</Label>
              <Input id="formName" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Nama kos" />
            </div>
            <div>
              <Label htmlFor="formDesc">Deskripsi</Label>
              <Textarea id="formDesc" value={formDesc} onChange={(e) => setFormDesc(e.target.value)} placeholder="Deskripsi kos" rows={3} />
            </div>
            <div>
              <Label htmlFor="formAddress">Alamat</Label>
              <Input id="formAddress" value={formAddress} onChange={(e) => setFormAddress(e.target.value)} placeholder="Alamat lengkap" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="formCity">Kota</Label>
                <Input id="formCity" value={formCity} onChange={(e) => setFormCity(e.target.value)} placeholder="Kota" />
              </div>
              <div>
                <Label htmlFor="formDistrict">Kecamatan</Label>
                <Input id="formDistrict" value={formDistrict} onChange={(e) => setFormDistrict(e.target.value)} placeholder="Kecamatan" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="formPriceFrom">Harga Dari (Rp)</Label>
                <Input id="formPriceFrom" type="number" value={formPriceFrom} onChange={(e) => setFormPriceFrom(e.target.value)} placeholder="500000" />
              </div>
              <div>
                <Label htmlFor="formPriceTo">Harga Sampai (Rp)</Label>
                <Input id="formPriceTo" type="number" value={formPriceTo} onChange={(e) => setFormPriceTo(e.target.value)} placeholder="1500000" />
              </div>
            </div>
            <div>
              <Label htmlFor="formTotalRooms">Total Kamar</Label>
              <Input id="formTotalRooms" type="number" value={formTotalRooms} onChange={(e) => setFormTotalRooms(e.target.value)} placeholder="10" />
            </div>
            <div>
              <Label htmlFor="formRules">Peraturan (pisahkan dengan koma)</Label>
              <Textarea id="formRules" value={formRules} onChange={(e) => setFormRules(e.target.value)} placeholder="Tidak merokok, Tidak membawa hewan peliharaan" rows={2} />
            </div>
            <Button
              onClick={handleSubmitKos}
              disabled={submittingKos}
              className="bg-emerald-600 hover:bg-emerald-700 text-white w-full"
            >
              {submittingKos ? 'Menyimpan...' : editKos ? 'Simpan Perubahan' : 'Tambah Kos'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
