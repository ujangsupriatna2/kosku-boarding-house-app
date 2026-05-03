'use client';

import { useState, useEffect } from 'react';
import { type KosListItem, type Promo, formatPrice } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import KosCard from '@/components/shared/KosCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  Building,
  Users,
  MapPin,
  Star,
  CalendarCheck,
  CreditCard,
  ChevronRight,
  Tag,
  Eye,
  Compass,
} from 'lucide-react';
import { motion } from 'framer-motion';

const cities = [
  { name: 'Bandung', icon: '🏔️', count: '120+' },
  { name: 'Jakarta', icon: '🏙️', count: '200+' },
  { name: 'Surabaya', icon: '🌊', count: '95+' },
  { name: 'Medan', icon: '🌴', count: '80+' },
  { name: 'Malang', icon: '🍂', count: '65+' },
];

const steps = [
  {
    icon: Search,
    title: 'Cari Kos',
    desc: 'Temukan kos impianmu berdasarkan lokasi, harga, dan fasilitas.',
  },
  {
    icon: Eye,
    title: 'Lihat Detail',
    desc: 'Pelajari fasilitas, kamar, dan ulasan dari penghuni lain.',
  },
  {
    icon: CalendarCheck,
    title: 'Booking',
    desc: 'Pesan kamar yang kamu inginkan dengan mudah dan cepat.',
  },
  {
    icon: CreditCard,
    title: 'Bayar',
    desc: 'Lakukan pembayaran dengan metode yang tersedia.',
  },
];

export default function HomeView() {
  const setView = useAppStore((s) => s.setView);

  const [kosList, setKosList] = useState<KosListItem[]>([]);
  const [kosLoading, setKosLoading] = useState(true);
  const [promos, setPromos] = useState<Promo[]>([]);
  const [promoLoading, setPromoLoading] = useState(true);

  const [searchCity, setSearchCity] = useState('');
  const [searchPrice, setSearchPrice] = useState('');

  useEffect(() => {
    fetchKos();
    fetchPromos();
  }, []);

  const fetchKos = async (city?: string, maxPrice?: string) => {
    setKosLoading(true);
    try {
      const params = new URLSearchParams();
      if (city && city !== 'all') params.set('city', city);
      if (maxPrice) params.set('maxPrice', maxPrice);
      params.set('limit', '6');
      const res = await fetch(`/api/kos?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setKosList(Array.isArray(data) ? data : data.data || []);
      }
    } catch {
      // silently fail
    } finally {
      setKosLoading(false);
    }
  };

  const fetchPromos = async () => {
    setPromoLoading(true);
    try {
      const res = await fetch('/api/promos');
      if (res.ok) {
        const data = await res.json();
        setPromos(Array.isArray(data) ? data : data.data || []);
      }
    } catch {
      // silently fail
    } finally {
      setPromoLoading(false);
    }
  };

  const handleSearch = () => {
    fetchKos(searchCity, searchPrice);
    setView('home');
  };

  const handleCityClick = (city: string) => {
    setSearchCity(city);
    fetchKos(city, searchPrice);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-300 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-400 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 py-20 md:py-28 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Temukan Kos Impianmu
            </h1>
            <p className="text-lg md:text-xl text-emerald-100 mb-8">
              Platform pencarian kos terpercaya di Indonesia
            </p>

            {/* Search Bar */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-3 shadow-2xl flex flex-col md:flex-row gap-3 max-w-2xl mx-auto">
              <div className="flex-1">
                <Select value={searchCity} onValueChange={setSearchCity}>
                  <SelectTrigger className="w-full border-0 shadow-sm bg-muted/50">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-emerald-600" />
                      <SelectValue placeholder="Pilih Kota" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kota</SelectItem>
                    {cities.map((c) => (
                      <SelectItem key={c.name} value={c.name}>
                        {c.icon} {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Select value={searchPrice} onValueChange={setSearchPrice}>
                  <SelectTrigger className="w-full border-0 shadow-sm bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-emerald-600" />
                      <SelectValue placeholder="Range Harga" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Harga</SelectItem>
                    <SelectItem value="1000000">Di bawah Rp 1.000.000</SelectItem>
                    <SelectItem value="2000000">Di bawah Rp 2.000.000</SelectItem>
                    <SelectItem value="3000000">Di bawah Rp 3.000.000</SelectItem>
                    <SelectItem value="5000000">Di bawah Rp 5.000.000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleSearch}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8"
              >
                <Search className="h-4 w-4 mr-2" />
                Cari
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { icon: Building, label: 'Kos Tersedia', value: '500+' },
            { icon: Users, label: 'Penghuni Puas', value: '10K+' },
            { icon: MapPin, label: 'Kota', value: '50+' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="bg-white dark:bg-card rounded-xl shadow-lg p-6 text-center border"
            >
              <stat.icon className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== FEATURED KOS SECTION ===== */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Kos Pilihan</h2>
            <p className="text-muted-foreground mt-1">Temukan kos terbaik untukmu</p>
          </div>
          <Button
            variant="ghost"
            className="text-emerald-600 gap-1 hidden sm:flex"
            onClick={() => {
              setSearchCity('');
              setSearchPrice('');
              fetchKos();
            }}
          >
            Lihat Semua Kos
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {kosLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-6 w-1/3" />
              </div>
            ))}
          </div>
        ) : kosList.length === 0 ? (
          <div className="text-center py-16">
            <Building className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">
              Belum ada kos yang tersedia
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Coba ubah filter pencarian kamu
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kosList.map((kos) => (
              <KosCard key={kos.id} kos={kos} />
            ))}
          </div>
        )}

        <div className="sm:hidden mt-6 text-center">
          <Button
            variant="outline"
            className="text-emerald-600 gap-1 w-full"
            onClick={() => {
              setSearchCity('');
              setSearchPrice('');
              fetchKos();
            }}
          >
            Lihat Semua Kos
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* ===== PROMO SECTION ===== */}
      {!promoLoading && promos.length > 0 && (
        <section className="bg-emerald-50 dark:bg-emerald-950/30 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              🔥 Promo Terkini
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {promos.map((promo) => (
                <div
                  key={promo.id}
                  className="min-w-[300px] snap-start bg-white dark:bg-card rounded-xl border shadow-sm overflow-hidden flex-shrink-0"
                >
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{promo.title}</h3>
                      {promo.discount && (
                        <Badge className="bg-white/20 text-white border-0">
                          {promo.discount}% OFF
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground">{promo.description}</p>
                    {promo.kos && (
                      <p className="text-xs text-muted-foreground mt-2">
                        📍 {promo.kos.name}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== HOW IT WORKS SECTION ===== */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">Cara Kerja</h2>
          <p className="text-muted-foreground mt-1">
            Pesan kos dalam 4 langkah mudah
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center mx-auto mb-4">
                <step.icon className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="text-sm font-bold text-emerald-600 mb-1">
                Langkah {i + 1}
              </div>
              <h3 className="font-semibold mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== CITIES SECTION ===== */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">Kota Populer</h2>
          <p className="text-muted-foreground mt-1">
            Cari kos di kota-kota terpopuler
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {cities.map((city) => (
            <motion.button
              key={city.name}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCityClick(city.name)}
              className="bg-white dark:bg-card rounded-xl border shadow-sm p-5 text-center hover:border-emerald-300 transition-colors"
            >
              <span className="text-3xl mb-2 block">{city.icon}</span>
              <p className="font-semibold">{city.name}</p>
              <p className="text-xs text-muted-foreground">{city.count} kos</p>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Siap Menemukan Kos Impianmu?
          </h2>
          <p className="text-emerald-100 mb-6 max-w-md mx-auto">
            Bergabung dengan ribuan penghuni yang telah menemukan kos terbaik melalui KosKu.
          </p>
          <Button
            size="lg"
            className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold"
            onClick={() => setView('register')}
          >
            Mulai Sekarang
            <Compass className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
