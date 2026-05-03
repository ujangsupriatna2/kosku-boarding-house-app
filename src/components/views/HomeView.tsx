'use client';

import { useState, useEffect } from 'react';
import { type KosListItem, type Promo, formatPrice } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import KosCard from '@/components/shared/KosCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
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
  Sparkles,
  ArrowRight,
  Shield,
  HeadphonesIcon,
  Clock,
  Compass,
  Quote,
  Home,
  Percent,
} from 'lucide-react';
import { motion } from 'framer-motion';

const cities = [
  { name: 'Bandung', icon: '🏔️', count: '120+' },
  { name: 'Jakarta', icon: '🏙️', count: '200+' },
  { name: 'Surabaya', icon: '🌊', count: '95+' },
  { name: 'Medan', icon: '🌴', count: '80+' },
  { name: 'Malang', icon: '🍂', count: '65+' },
];

const howSteps = [
  {
    icon: Search,
    title: 'Cari Kos',
    desc: 'Temukan kos impianmu berdasarkan lokasi, harga, dan fasilitas yang kamu inginkan.',
  },
  {
    icon: Eye,
    title: 'Bandingkan',
    desc: 'Bandingkan berbagai pilihan kos dan baca ulasan dari penghuni sebelumnya.',
  },
  {
    icon: CalendarCheck,
    title: 'Booking Online',
    desc: 'Pesan kamar yang kamu inginkan secara online dengan proses yang mudah dan cepat.',
  },
  {
    icon: Home,
    title: 'Tempati',
    desc: 'Mulai tinggal di kos barumu dan nikmati pengalaman baru.',
  },
];

const testimonials = [
  {
    name: 'Rina Wijaya',
    avatar: 'RW',
    rating: 5,
    comment: 'KosKu sangat membantu saya menemukan kos yang nyaman dekat kampus. Proses bookingnya super mudah!',
    date: '2 minggu lalu',
    role: 'Mahasiswa',
  },
  {
    name: 'Budi Santoso',
    avatar: 'BS',
    rating: 5,
    comment: 'Sebagai pemilik kos, KosKu membantu saya mendapatkan penghuni baru dengan cepat. Platform terbaik!',
    date: '1 bulan lalu',
    role: 'Pemilik Kos',
  },
  {
    name: 'Sari Dewi',
    avatar: 'SD',
    rating: 4,
    comment: 'Fasilitas kos sesuai dengan yang tertera di aplikasi. Ulasan dari penghuni lain sangat membantu.',
    date: '3 minggu lalu',
    role: 'Pekerja',
  },
];

const quickTags = ['Putri', 'Campuran', 'AC', 'WiFi', 'Dekat Kampus', 'Parkir'];

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
  };

  const handleCityClick = (city: string) => {
    setSearchCity(city);
    fetchKos(city, searchPrice);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* ===== a) HERO SECTION ===== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden animated-gradient">
        {/* Decorative blurred circles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-emerald-200/15 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '0.5s' }} />
        </div>

        {/* Decorative floating icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Home className="absolute top-[15%] left-[8%] h-8 w-8 text-white/15 animate-float" style={{ animationDelay: '0s' }} />
          <Building className="absolute top-[25%] right-[12%] h-10 w-10 text-white/10 animate-float" style={{ animationDelay: '1.5s' }} />
          <MapPin className="absolute bottom-[30%] left-[15%] h-6 w-6 text-white/15 animate-float" style={{ animationDelay: '0.8s' }} />
          <Star className="absolute top-[60%] right-[20%] h-7 w-7 text-white/10 animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative container mx-auto px-4 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-sm font-medium border border-white/20">
                <Sparkles className="h-4 w-4 text-yellow-300" />
                Platform Kos #1 di Indonesia
              </span>
            </motion.div>

            {/* H1 */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              Temukan{' '}
              <span className="bg-gradient-to-r from-yellow-200 via-emerald-200 to-teal-200 bg-clip-text text-transparent">
                Kos Impianmu
              </span>{' '}
              di Seluruh Indonesia
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-emerald-50/80 mb-10 max-w-xl mx-auto leading-relaxed">
              Cari, bandingkan, dan booking kos terbaik dengan mudah. Ribuan kos tersedia di 50+ kota.
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white dark:bg-neutral-900 rounded-2xl p-3 shadow-2xl shadow-black/20 flex flex-col md:flex-row gap-3 max-w-2xl mx-auto"
            >
              <div className="flex-1">
                <Select value={searchCity} onValueChange={setSearchCity}>
                  <SelectTrigger className="w-full border-0 shadow-none bg-muted/50 rounded-xl h-12">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
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
                  <SelectTrigger className="w-full border-0 shadow-none bg-muted/50 rounded-xl h-12">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-emerald-600 shrink-0" />
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
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 h-12 rounded-xl shadow-lg shadow-emerald-500/25 font-semibold transition-all duration-300"
              >
                <Search className="h-4 w-4 mr-2" />
                Cari Kos
              </Button>
            </motion.div>

            {/* Quick Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-2"
            >
              <span className="text-sm text-white/60 font-medium">Populer:</span>
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    fetchKos('', '');
                  }}
                  className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium hover:bg-white/20 transition-colors border border-white/10"
                >
                  {tag}
                </button>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Stats row - floating glass cards */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-4 lg:px-8 pb-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                { icon: Building, label: 'Kos Tersedia', value: '500+' },
                { icon: Users, label: 'Penghuni Puas', value: '10K+' },
                { icon: MapPin, label: 'Kota', value: '50+' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                  className="glass rounded-2xl border border-white/20 shadow-lg px-6 py-5 text-center dark:border-white/10"
                >
                  <stat.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== b) FEATURED KOS SECTION ===== */}
      <section className="container mx-auto px-4 lg:px-8 py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-1 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Pilihan Terbaik</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Kos Pilihan Untukmu</h2>
            <p className="text-muted-foreground mt-2 text-lg">Temukan kos terbaik yang sesuai dengan kebutuhanmu</p>
          </div>
          <Button
            variant="ghost"
            className="text-emerald-600 gap-1 hidden sm:flex rounded-full"
            onClick={() => {
              setSearchCity('');
              setSearchPrice('');
              fetchKos();
            }}
          >
            Lihat Semua
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>

        {kosLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-52 w-full rounded-2xl" />
                <Skeleton className="h-5 w-3/4 rounded-lg" />
                <Skeleton className="h-4 w-1/2 rounded-lg" />
                <Skeleton className="h-6 w-1/3 rounded-lg" />
              </div>
            ))}
          </div>
        ) : kosList.length === 0 ? (
          <div className="text-center py-20">
            <Building className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">Belum ada kos yang tersedia</h3>
            <p className="text-sm text-muted-foreground mt-1">Coba ubah filter pencarian kamu</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kosList.map((kos, i) => (
              <KosCard key={kos.id} kos={kos} index={i} />
            ))}
          </div>
        )}

        <div className="sm:hidden mt-8 text-center">
          <Button
            variant="outline"
            className="text-emerald-600 gap-1 w-full rounded-xl h-12 font-medium"
            onClick={() => {
              setSearchCity('');
              setSearchPrice('');
              fetchKos();
            }}
          >
            Lihat Semua Kos
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* ===== c) KOTA POPULER SECTION ===== */}
      <section className="bg-muted/40 py-20 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-1 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Eksplorasi</span>
              <div className="h-1 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Kota Populer</h2>
            <p className="text-muted-foreground mt-2 text-lg">Cari kos di kota-kota favorit mahasiswa & pekerja</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {cities.map((city, i) => (
              <motion.button
                key={city.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCityClick(city.name)}
                className="bg-card rounded-2xl border border-border/60 shadow-sm p-6 text-center hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-lg group"
              >
                <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform duration-300">{city.icon}</span>
                <p className="font-semibold text-foreground">{city.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{city.count} kos</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== d) CARA KERJA SECTION ===== */}
      <section className="container mx-auto px-4 lg:px-8 py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-1 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
            <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Mudah & Cepat</span>
            <div className="h-1 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Cara Kerja KosKu</h2>
          <p className="text-muted-foreground mt-2 text-lg">Pesan kos impianmu dalam 4 langkah sederhana</p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Dotted connecting line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 border-t-2 border-dashed border-emerald-200 dark:border-emerald-800" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {howSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="text-center relative"
              >
                <div className="relative inline-flex items-center justify-center mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                    <step.icon className="h-7 w-7 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white dark:bg-neutral-900 border-2 border-emerald-500 flex items-center justify-center text-xs font-bold text-emerald-600">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px] mx-auto">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== e) PROMO SECTION ===== */}
      {!promoLoading && promos.length > 0 && (
        <section className="relative overflow-hidden py-20 md:py-24">
          <div className="absolute inset-0 animated-gradient opacity-95" />
          <div className="relative container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-8"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">🔥 Promo Terkini</h2>
                <p className="text-emerald-50/70 mt-1">Jangan lewatkan penawaran spesial</p>
              </div>
            </motion.div>

            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {promos.map((promo, i) => (
                <motion.div
                  key={promo.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="min-w-[300px] md:min-w-[340px] snap-start flex-shrink-0"
                >
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-lg">
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-white text-lg">{promo.title}</h3>
                        {promo.discount && (
                          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-400/20 text-yellow-200 text-xs font-bold">
                            <Percent className="h-3 w-3" />
                            {promo.discount}% OFF
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-emerald-50/70 leading-relaxed">{promo.description}</p>
                      {promo.kos && (
                        <p className="text-xs text-emerald-50/50 mt-3 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {promo.kos.name}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== f) TESTIMONIAL/REVIEW SECTION ===== */}
      <section className="container mx-auto px-4 lg:px-8 py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-1 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
            <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Testimoni</span>
            <div className="h-1 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Apa Kata Mereka?</h2>
          <p className="text-muted-foreground mt-2 text-lg">Ribuan pengguna telah mempercayai KosKu</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={i === 1 ? 'md:-mt-4' : ''}
            >
              <Card className="h-full rounded-2xl border-border/60 shadow-sm hover:shadow-lg transition-all duration-300 p-6 relative">
                <Quote className="h-8 w-8 text-emerald-100 dark:text-emerald-900/30 absolute top-4 right-4" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-emerald-500/20">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`h-4 w-4 ${
                        s <= t.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200 dark:text-gray-700'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.comment}</p>
                <p className="text-xs text-muted-foreground/60 mt-4">{t.date}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== g) CTA SECTION ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-300/10 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 lg:px-8 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* Decorative icons */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <Home className="h-8 w-8 text-white/20 animate-float" />
              <Building className="h-10 w-10 text-white/30 animate-float" style={{ animationDelay: '1s' }} />
              <Compass className="h-8 w-8 text-white/20 animate-float" style={{ animationDelay: '2s' }} />
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Siap Menemukan Kos Impianmu?
            </h2>
            <p className="text-emerald-50/70 mb-10 text-lg max-w-lg mx-auto leading-relaxed">
              Bergabung dengan ribuan penghuni yang telah menemukan kos terbaik melalui KosKu.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="rounded-full px-8 bg-white text-emerald-700 hover:bg-emerald-50 font-semibold h-12 shadow-xl shadow-black/10 transition-all duration-300"
                onClick={() => setView('home')}
              >
                <Search className="h-4 w-4 mr-2" />
                Mulai Cari Kos
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-white/30 text-white hover:bg-white/10 font-semibold h-12 transition-all duration-300"
                onClick={() => setView('register')}
              >
                Daftar Sekarang
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
