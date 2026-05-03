'use client';

import { useState, useEffect, useRef } from 'react';
import { useAppStore } from '@/lib/store';
import {
  type Kos,
  type Room,
  type ReviewWithUser,
  formatPrice,
  formatDate,
} from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  Star,
  MapPin,
  User,
  MessageCircle,
  CheckCircle,
  XCircle,
  Wifi,
  Car,
  Dumbbell,
  WashingMachine,
  BedDouble,
  Monitor,
  Refrigerator,
  CookingPot,
  ShowerHead,
  CalendarDays,
  Clock,
  Send,
  Zap,
  Users,
  Share2,
  Shield,
  ChevronRight,
  CalendarHeart,
  Wallet,
  Building2,
} from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const facilityIconMap: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="h-5 w-5" />,
  'Parkir': <Car className="h-5 w-5" />,
  'Gym': <Dumbbell className="h-5 w-5" />,
  'Laundry': <WashingMachine className="h-5 w-5" />,
  'Kasur': <BedDouble className="h-5 w-5" />,
  'AC': <Zap className="h-5 w-5" />,
  'Meja Belajar': <Monitor className="h-5 w-5" />,
  'Kulkas': <Refrigerator className="h-5 w-5" />,
  'Dapur': <CookingPot className="h-5 w-5" />,
  'Kamar Mandi Dalam': <ShowerHead className="h-5 w-5" />,
};

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00',
];

const durationOptions = [
  { value: 1, label: '1 Bulan' },
  { value: 3, label: '3 Bulan' },
  { value: 6, label: '6 Bulan' },
  { value: 12, label: '12 Bulan' },
];

function StarRating({ rating, onChange, readonly = false }: { rating: number; onChange?: (r: number) => void; readonly?: boolean }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(i)}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
        >
          <Star
            className={`h-5 w-5 ${
              i <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default function KosDetailView() {
  const {
    selectedKosId,
    goBack,
    user,
    openChat,
  } = useAppStore();

  const [kos, setKos] = useState<Kos | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tentang');

  // Review form
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  // Booking dialog
  const [bookingRoom, setBookingRoom] = useState<Room | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingDuration, setBookingDuration] = useState(1);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingMethod, setBookingMethod] = useState('ewallet');
  const [submittingBooking, setSubmittingBooking] = useState(false);

  // Survey form
  const [surveyDate, setSurveyDate] = useState('');
  const [surveyTime, setSurveyTime] = useState('');
  const [surveyNotes, setSurveyNotes] = useState('');
  const [submittingSurvey, setSubmittingSurvey] = useState(false);

  const reviewsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedKosId) return;
    setLoading(true);
    setActiveTab('tentang');
    fetchKos();
  }, [selectedKosId]);

  const fetchKos = async () => {
    try {
      const res = await fetch(`/api/kos/${selectedKosId}`);
      if (res.ok) {
        const data = await res.json();
        setKos(data);
      }
    } catch {
      toast.error('Gagal memuat data kos');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenBooking = (room: Room) => {
    if (!user) {
      toast.error('Silakan login terlebih dahulu');
      return;
    }
    setBookingRoom(room);
    setBookingDuration(1);
    setBookingDate('');
    setBookingMethod('ewallet');
    setBookingOpen(true);
  };

  const handleBooking = async () => {
    if (!user || !bookingRoom || !selectedKosId) return;
    if (!bookingDate) {
      toast.error('Pilih tanggal check-in');
      return;
    }
    setSubmittingBooking(true);
    try {
      const res = await fetch(`/api/kos/${selectedKosId}/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          roomId: bookingRoom.id,
          checkInDate: bookingDate,
          duration: bookingDuration,
          paymentMethod: bookingMethod,
        }),
      });
      if (res.ok) {
        toast.success('Booking berhasil dibuat!');
        setBookingOpen(false);
        fetchKos();
      } else {
        const err = await res.json();
        toast.error(err.error || 'Gagal membuat booking');
      }
    } catch {
      toast.error('Terjadi kesalahan');
    } finally {
      setSubmittingBooking(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!user || !selectedKosId) return;
    if (reviewRating === 0) {
      toast.error('Pilih rating');
      return;
    }
    setSubmittingReview(true);
    try {
      const res = await fetch(`/api/kos/${selectedKosId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          rating: reviewRating,
          comment: reviewComment,
        }),
      });
      if (res.ok) {
        toast.success('Ulasan berhasil ditambahkan!');
        setReviewRating(0);
        setReviewComment('');
        fetchKos();
      } else {
        const err = await res.json();
        toast.error(err.error || 'Gagal menambahkan ulasan');
      }
    } catch {
      toast.error('Terjadi kesalahan');
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleSubmitSurvey = async () => {
    if (!user || !selectedKosId) return;
    if (!surveyDate || !surveyTime) {
      toast.error('Pilih tanggal dan waktu survei');
      return;
    }
    setSubmittingSurvey(true);
    try {
      const res = await fetch(`/api/kos/${selectedKosId}/survey`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          scheduledDate: surveyDate,
          scheduledTime: surveyTime,
          notes: surveyNotes,
        }),
      });
      if (res.ok) {
        toast.success('Survei berhasil dijadwalkan!');
        setSurveyDate('');
        setSurveyTime('');
        setSurveyNotes('');
      } else {
        const err = await res.json();
        toast.error(err.error || 'Gagal menjadwalkan survei');
      }
    } catch {
      toast.error('Terjadi kesalahan');
    } finally {
      setSubmittingSurvey(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-80 w-full rounded-2xl mb-6" />
        <Skeleton className="h-8 w-2/3 mb-3 rounded-lg" />
        <Skeleton className="h-4 w-1/2 mb-6 rounded-lg" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Skeleton className="h-96 w-full rounded-2xl" />
          </div>
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!kos) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">Kos tidak ditemukan</p>
        <Button variant="ghost" onClick={goBack} className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
      </div>
    );
  }

  const rulesList = kos.rules
    ? kos.rules.split(',').map((r) => r.trim()).filter(Boolean)
    : [];

  const roomTypes = kos.roomTypes
    ? kos.roomTypes.split(',').map((r) => r.trim()).filter(Boolean)
    : [];

  const totalPrice = bookingRoom
    ? bookingRoom.price * bookingDuration
    : 0;

  const reviews = kos.reviews || [];
  const avgRating = kos.avgRating || 0;

  // Rating distribution
  const ratingDist = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { star, count, pct };
  });

  return (
    <div>
      {/* ===== HERO BANNER ===== */}
      <div className="relative h-72 md:h-96 overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40">
        {kos.imageUrl ? (
          <img src={kos.imageUrl} alt={kos.name} className="img-cover" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <MapPin className="h-12 w-12 text-emerald-300 dark:text-emerald-700" />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Back button - floating glass */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={goBack}
          className="absolute top-4 left-4 md:top-6 md:left-6 w-10 h-10 rounded-full glass border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors shadow-lg"
        >
          <ArrowLeft className="h-5 w-5" />
        </motion.button>

        {/* Share button - floating glass */}
        <motion.button
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full glass border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors shadow-lg"
        >
          <Share2 className="h-5 w-5" />
        </motion.button>

        {/* Content on overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-4xl font-bold text-white tracking-tight">{kos.name}</h1>
                <div className="flex items-center gap-1 text-white/70 mt-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm md:text-base">{kos.address}, {kos.district}, {kos.city}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* Price badge */}
                <span className="px-4 py-2 rounded-full bg-white/15 backdrop-blur-md text-white font-semibold text-sm border border-white/20">
                  {formatPrice(kos.priceFrom)} - {formatPrice(kos.priceTo)}<span className="font-normal text-white/70">/bln</span>
                </span>
                {/* Availability */}
                {kos.availableRooms > 0 ? (
                  <span className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-emerald-500/90 text-white text-sm font-semibold">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    Tersedia
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-red-500/90 text-white text-sm font-semibold">
                    <XCircle className="h-4 w-4" />
                    Penuh
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-6">
        {/* ===== OWNER CARD ===== */}
        {kos.owner && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="mb-6 rounded-2xl border-border/60 shadow-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center justify-between p-4 md:p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-500/20">
                      <User className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-lg">{kos.owner.name}</p>
                      <p className="text-sm text-muted-foreground">Pemilik Kos</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {user && user.id !== kos.ownerId && (
                      <Button
                        className="rounded-full px-5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-500/20 font-medium"
                        onClick={() => openChat(kos.ownerId, kos.owner.name, kos.id)}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Chat Pemilik
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ===== QUICK INFO BAR ===== */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
        >
          {[
            { icon: Star, label: 'Rating', value: avgRating ? avgRating.toFixed(1) : 'N/A', color: 'text-amber-500' },
            { icon: MessageCircle, label: 'Ulasan', value: kos.reviewCount || 0, color: 'text-emerald-500' },
            { icon: BedDouble, label: 'Kamar', value: `${kos.availableRooms}/${kos.totalRooms}`, color: 'text-teal-500' },
            { icon: Wallet, label: 'Mulai Dari', value: formatPrice(kos.priceFrom), color: 'text-emerald-600' },
          ].map((info) => (
            <Card key={info.label} className="rounded-xl border-border/60 shadow-sm">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center shrink-0">
                  <info.icon className={`h-5 w-5 ${info.color}`} />
                </div>
                <div className="min-w-0">
                  <p className={`font-bold text-foreground ${typeof info.value === 'string' && info.value.includes('Rp') ? 'text-base md:text-lg' : 'text-lg'}`}>
                    {info.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{info.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* ===== TABS ===== */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-md py-2 -mx-4 px-4 border-b border-border/40 mb-6">
            <TabsList className="w-full flex bg-muted/50 rounded-xl h-11 overflow-x-auto scrollbar-hide p-1">
              {['tentang', 'fasilitas', 'kamar', 'ulasan', 'survei'].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="flex-1 rounded-lg text-sm font-medium capitalize data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 transition-all"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* TENTANG TAB */}
          <TabsContent value="tentang">
            <div className="space-y-6">
              {/* Description */}
              <Card className="rounded-2xl border-border/60 shadow-sm">
                <CardContent className="p-6 md:p-8">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-emerald-500" />
                    Tentang Kos
                  </h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {kos.description || 'Tidak ada deskripsi.'}
                  </p>
                </CardContent>
              </Card>

              {/* Room Types */}
              {roomTypes.length > 0 && (
                <Card className="rounded-2xl border-border/60 shadow-sm">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <BedDouble className="h-5 w-5 text-emerald-500" />
                      Tipe Kamar
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {roomTypes.map((type) => (
                        <span
                          key={type}
                          className="px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-sm font-medium border border-emerald-100 dark:border-emerald-900"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Rules */}
              <Card className="rounded-2xl border-border/60 shadow-sm">
                <CardContent className="p-6 md:p-8">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-emerald-500" />
                    Peraturan
                  </h3>
                  {rulesList.length > 0 ? (
                    <ul className="space-y-3">
                      {rulesList.map((rule, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground">
                          <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                          </div>
                          <span className="text-sm leading-relaxed">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground text-sm">Tidak ada peraturan khusus.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* FASILITAS TAB */}
          <TabsContent value="fasilitas">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {(kos.facilities || []).map((kf, i) => {
                const name = kf.facility?.name || 'Lainnya';
                return (
                  <motion.div
                    key={kf.facilityId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="rounded-2xl border-border/60 shadow-sm hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-300 h-full">
                      <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                          {facilityIconMap[name] || <Zap className="h-5 w-5" />}
                        </div>
                        <span className="text-sm font-medium text-foreground">{name}</span>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
              {(!kos.facilities || kos.facilities.length === 0) && (
                <p className="text-muted-foreground col-span-full text-center py-12">
                  Belum ada fasilitas terdaftar.
                </p>
              )}
            </div>
          </TabsContent>

          {/* KAMAR TAB */}
          <TabsContent value="kamar">
            <div className="space-y-4">
              {(kos.rooms || []).map((room, i) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="rounded-2xl border-border/60 shadow-sm hover:shadow-md transition-all duration-300">
                    <CardContent className="p-5 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 flex items-center justify-center shrink-0">
                            <BedDouble className="h-8 w-8 text-emerald-500" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{room.name}</h3>
                            <p className="text-sm text-muted-foreground">{room.type}</p>
                            {room.size && (
                              <p className="text-xs text-muted-foreground mt-0.5">{room.size}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-xl font-bold text-emerald-600">
                              {formatPrice(room.price)}
                              <span className="text-xs font-normal text-muted-foreground">/bulan</span>
                            </p>
                            <Badge
                              className={`text-xs border-0 mt-1 ${
                                room.isAvailable
                                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                                  : 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'
                              }`}
                            >
                              {room.isAvailable ? 'Tersedia' : 'Terisi'}
                            </Badge>
                          </div>
                          <Button
                            disabled={!room.isAvailable}
                            onClick={() => handleOpenBooking(room)}
                            className="rounded-full px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-500/20 font-medium"
                          >
                            Booking
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              {(!kos.rooms || kos.rooms.length === 0) && (
                <div className="text-center py-16 text-muted-foreground">
                  <BedDouble className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>Belum ada kamar terdaftar.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* ULASAN TAB */}
          <TabsContent value="ulasan">
            <div className="space-y-6">
              {/* Average Rating */}
              {reviews.length > 0 && (
                <Card className="rounded-2xl border-border/60 shadow-sm">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-8">
                      {/* Left: Big rating */}
                      <div className="flex flex-col items-center justify-center md:pr-8 md:border-r md:border-border/60">
                        <p className="text-6xl font-bold text-foreground">{avgRating.toFixed(1)}</p>
                        <StarRating rating={Math.round(avgRating)} readonly />
                        <p className="text-sm text-muted-foreground mt-2">{reviews.length} ulasan</p>
                      </div>
                      {/* Right: Distribution */}
                      <div className="flex-1 space-y-2.5">
                        {ratingDist.map(({ star, count, pct }) => (
                          <div key={star} className="flex items-center gap-3">
                            <span className="text-sm font-medium w-4 text-right">{star}</span>
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 shrink-0" />
                            <div className="flex-1 h-2.5 rounded-full bg-muted overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 0.5, delay: star * 0.1 }}
                                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500"
                              />
                            </div>
                            <span className="text-sm text-muted-foreground w-8">{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Individual reviews */}
              {reviews.map((review, i) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="rounded-2xl border-border/60 shadow-sm">
                    <CardContent className="p-5 md:p-6">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10 shrink-0">
                          <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-teal-500 text-white text-xs font-semibold">
                            {review.user?.name?.charAt(0).toUpperCase() || 'A'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <h4 className="font-semibold">{review.user?.name || 'Anonim'}</h4>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(review.createdAt)}
                            </span>
                          </div>
                          <StarRating rating={review.rating} readonly />
                          {review.comment && (
                            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{review.comment}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              {reviews.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                  <Star className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>Belum ada ulasan.</p>
                </div>
              )}

              <div ref={reviewsEndRef} />

              {/* Write review form */}
              {user && (
                <Card className="rounded-2xl border-2 border-emerald-100 dark:border-emerald-900/50 shadow-sm">
                  <CardContent className="p-5 md:p-6 space-y-5">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Send className="h-5 w-5 text-emerald-500" />
                      Tulis Ulasan
                    </h3>
                    <div>
                      <Label className="mb-2 block text-sm font-medium">Rating</Label>
                      <StarRating rating={reviewRating} onChange={setReviewRating} />
                    </div>
                    <div>
                      <Label htmlFor="reviewComment" className="text-sm font-medium">Komentar</Label>
                      <Textarea
                        id="reviewComment"
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Bagikan pengalamanmu..."
                        rows={3}
                        className="mt-1.5 rounded-xl"
                      />
                    </div>
                    <Button
                      onClick={handleSubmitReview}
                      disabled={submittingReview || reviewRating === 0}
                      className="rounded-full px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-500/20 font-medium"
                    >
                      {submittingReview ? 'Mengirim...' : 'Kirim Ulasan'}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* SURVEI TAB */}
          <TabsContent value="survei">
            <Card className="rounded-2xl border-border/60 shadow-sm max-w-lg overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-6 md:p-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                    <CalendarHeart className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Jadwalkan Survei</h3>
                    <p className="text-sm text-muted-foreground">
                      Lihat langsung kos ini sebelum memutuskan.
                    </p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6 md:p-8 space-y-5">
                <div>
                  <Label htmlFor="surveyDate" className="text-sm font-medium">Tanggal Survei</Label>
                  <Input
                    id="surveyDate"
                    type="date"
                    value={surveyDate}
                    onChange={(e) => setSurveyDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="mt-1.5 rounded-xl h-11"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Waktu Survei</Label>
                  <Select value={surveyTime} onValueChange={setSurveyTime}>
                    <SelectTrigger className="mt-1.5 rounded-xl h-11">
                      <SelectValue placeholder="Pilih waktu" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t} WIB
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="surveyNotes" className="text-sm font-medium">Catatan (opsional)</Label>
                  <Textarea
                    id="surveyNotes"
                    value={surveyNotes}
                    onChange={(e) => setSurveyNotes(e.target.value)}
                    placeholder="Ada pertanyaan atau catatan khusus?"
                    rows={3}
                    className="mt-1.5 rounded-xl"
                  />
                </div>
                <Button
                  onClick={handleSubmitSurvey}
                  disabled={submittingSurvey || !surveyDate || !surveyTime || !user}
                  className="w-full rounded-xl h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-500/20 font-semibold"
                >
                  {submittingSurvey ? 'Mengirim...' : 'Jadwalkan Survei'}
                </Button>
                {!user && (
                  <p className="text-xs text-muted-foreground text-center">
                    Silakan login untuk menjadwalkan survei.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* ===== BOOKING DIALOG ===== */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl p-0 overflow-hidden">
          {/* Dialog header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
            <DialogTitle className="text-lg font-semibold">Booking Kamar</DialogTitle>
            <p className="text-emerald-100 text-sm mt-1">Lengkapi data booking kamu</p>
          </div>

          {bookingRoom && (
            <div className="p-6 space-y-5">
              {/* Room summary */}
              <div className="bg-muted/50 rounded-xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 flex items-center justify-center shrink-0">
                  <BedDouble className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-semibold">{bookingRoom.name}</h4>
                  <p className="text-sm text-muted-foreground">{bookingRoom.type}</p>
                </div>
              </div>

              {/* Check-in date */}
              <div>
                <Label htmlFor="bookingDate" className="text-sm font-medium flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-emerald-500" />
                  Tanggal Check-in
                </Label>
                <Input
                  id="bookingDate"
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="mt-1.5 rounded-xl h-11"
                />
              </div>

              {/* Duration - pill buttons */}
              <div>
                <Label className="text-sm font-medium flex items-center gap-1.5 mb-3">
                  <Clock className="h-4 w-4 text-emerald-500" />
                  Durasi Sewa
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  {durationOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setBookingDuration(opt.value)}
                      className={`py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                        bookingDuration === opt.value
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400'
                          : 'bg-muted/50 border-border text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment method - visual cards */}
              <div>
                <Label className="text-sm font-medium flex items-center gap-1.5 mb-3">
                  <Wallet className="h-4 w-4 text-emerald-500" />
                  Metode Pembayaran
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setBookingMethod('ewallet')}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      bookingMethod === 'ewallet'
                        ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30'
                        : 'border-border hover:border-emerald-200'
                    }`}
                  >
                    <div className="text-2xl mb-1">📱</div>
                    <p className="text-sm font-semibold">E-Wallet</p>
                    <p className="text-xs text-muted-foreground">GoPay / OVO / Dana</p>
                  </button>
                  <button
                    onClick={() => setBookingMethod('transfer')}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      bookingMethod === 'transfer'
                        ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30'
                        : 'border-border hover:border-emerald-200'
                    }`}
                  >
                    <div className="text-2xl mb-1">🏦</div>
                    <p className="text-sm font-semibold">Transfer Bank</p>
                    <p className="text-xs text-muted-foreground">BCA / BNI / Mandiri</p>
                  </button>
                </div>
              </div>

              <Separator />

              {/* Total */}
              <div className="bg-muted/30 rounded-xl p-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
                  <span>{formatPrice(bookingRoom.price)} × {bookingDuration} bulan</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total</span>
                  <span className="text-2xl font-bold text-emerald-600">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <Button
                onClick={handleBooking}
                disabled={submittingBooking || !bookingDate}
                className="w-full rounded-xl h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25 font-semibold text-base"
              >
                {submittingBooking ? 'Memproses...' : 'Konfirmasi Booking'}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
