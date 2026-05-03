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
} from 'lucide-react';
import { toast } from 'sonner';

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

function StarRating({ rating, onChange, readonly = false }: { rating: number; onChange?: (r: number) => void; readonly?: boolean }) {
  return (
    <div className="flex items-center gap-1">
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
              i <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
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
    selectedKosName,
    selectedKosImage,
    selectedKosOwnerId,
    selectedKosOwnerIdName,
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
        <Skeleton className="h-64 w-full rounded-xl mb-6" />
        <Skeleton className="h-8 w-2/3 mb-3" />
        <Skeleton className="h-4 w-1/2 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Skeleton className="h-96 w-full rounded-xl" />
          </div>
          <Skeleton className="h-96 w-full rounded-xl" />
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

  const totalPrice = bookingRoom
    ? bookingRoom.price * bookingDuration
    : 0;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={goBack} className="mb-4 -ml-2">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Kembali
      </Button>

      {/* Hero Image */}
      <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950 dark:to-teal-950">
        {kos.imageUrl ? (
          <img src={kos.imageUrl} alt={kos.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <MapPin className="h-12 w-12 text-emerald-400 opacity-50" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">{kos.name}</h1>
              <div className="flex items-center gap-1 text-white/80 mt-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{kos.address}, {kos.district}, {kos.city}</span>
              </div>
            </div>
            <div className="flex gap-2">
              {kos.availableRooms > 0 ? (
                <Badge className="bg-emerald-500 text-white border-0">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Tersedia
                </Badge>
              ) : (
                <Badge className="bg-red-500 text-white border-0">
                  <XCircle className="h-3 w-3 mr-1" />
                  Penuh
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Price & Rating Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-1">
          <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
          <span className="font-semibold">{kos.avgRating ? kos.avgRating.toFixed(1) : 'N/A'}</span>
          {kos.reviewCount !== undefined && (
            <span className="text-sm text-muted-foreground">({kos.reviewCount} ulasan)</span>
          )}
        </div>
        <Separator orientation="vertical" className="h-5" />
        <div>
          <span className="text-xl font-bold text-emerald-600">
            {formatPrice(kos.priceFrom)} - {formatPrice(kos.priceTo)}
          </span>
          <span className="text-sm text-muted-foreground"> /bulan</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          {kos.availableRooms}/{kos.totalRooms} kamar tersedia
        </div>
      </div>

      {/* Owner Info Card */}
      {kos.owner && (
        <Card className="mb-6 border-0 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                <User className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="font-medium">{kos.owner.name}</p>
                <p className="text-sm text-muted-foreground">Pemilik Kos</p>
              </div>
            </div>
            {user && user.id !== kos.ownerId && (
              <Button
                variant="outline"
                className="border-emerald-300 text-emerald-600 hover:bg-emerald-50 gap-1"
                onClick={() => openChat(kos.ownerId, kos.owner.name, kos.id)}
              >
                <MessageCircle className="h-4 w-4" />
                Chat Pemilik
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full flex bg-muted/50 mb-6 overflow-x-auto">
          <TabsTrigger value="tentang" className="flex-1">Tentang</TabsTrigger>
          <TabsTrigger value="fasilitas" className="flex-1">Fasilitas</TabsTrigger>
          <TabsTrigger value="kamar" className="flex-1">Kamar</TabsTrigger>
          <TabsTrigger value="ulasan" className="flex-1">Ulasan</TabsTrigger>
          <TabsTrigger value="survei" className="flex-1">Survei</TabsTrigger>
        </TabsList>

        {/* TENTANG */}
        <TabsContent value="tentang">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Deskripsi</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {kos.description || 'Tidak ada deskripsi.'}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold text-lg mb-2">Peraturan</h3>
                {rulesList.length > 0 ? (
                  <ul className="space-y-2">
                    {rulesList.map((rule, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">Tidak ada peraturan khusus.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FASILITAS */}
        <TabsContent value="fasilitas">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {(kos.facilities || []).map((kf) => {
              const name = kf.facility?.name || 'Lainnya';
              return (
                <Card key={kf.facilityId} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600">
                      {facilityIconMap[name] || <Zap className="h-5 w-5" />}
                    </div>
                    <span className="text-sm font-medium">{name}</span>
                  </CardContent>
                </Card>
              );
            })}
            {(!kos.facilities || kos.facilities.length === 0) && (
              <p className="text-muted-foreground col-span-full text-center py-8">
                Belum ada fasilitas terdaftar.
              </p>
            )}
          </div>
        </TabsContent>

        {/* KAMAR */}
        <TabsContent value="kamar">
          <div className="space-y-4">
            {(kos.rooms || []).map((room) => (
              <Card key={room.id} className="border-0 shadow-sm">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950 dark:to-teal-950 flex items-center justify-center shrink-0">
                        <BedDouble className="h-8 w-8 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{room.name}</h3>
                        <p className="text-sm text-muted-foreground">{room.type}</p>
                        {room.size && (
                          <p className="text-xs text-muted-foreground">{room.size}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-lg font-bold text-emerald-600">
                          {formatPrice(room.price)}
                          <span className="text-xs font-normal text-muted-foreground">/bulan</span>
                        </p>
                        <Badge
                          className={`text-xs border-0 ${
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
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        Booking
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {(!kos.rooms || kos.rooms.length === 0) && (
              <div className="text-center py-12 text-muted-foreground">
                <BedDouble className="h-12 w-12 mx-auto mb-2 opacity-30" />
                <p>Belum ada kamar terdaftar.</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* ULASAN */}
        <TabsContent value="ulasan">
          <div className="space-y-4">
            {/* Existing reviews */}
            {(kos.reviews || []).map((review) => (
              <Card key={review.id} className="border-0 shadow-sm">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center shrink-0">
                      <User className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{review.user?.name || 'Anonim'}</h4>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(review.createdAt)}
                        </span>
                      </div>
                      <StarRating rating={review.rating} readonly />
                      {review.comment && (
                        <p className="text-sm text-muted-foreground mt-2">{review.comment}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {(!kos.reviews || kos.reviews.length === 0) && (
              <div className="text-center py-12 text-muted-foreground">
                <Star className="h-12 w-12 mx-auto mb-2 opacity-30" />
                <p>Belum ada ulasan.</p>
              </div>
            )}

            <div ref={reviewsEndRef} />

            {/* Write review form */}
            {user && (
              <Card className="border-0 shadow-sm border-t-2 border-t-emerald-200">
                <CardContent className="p-4 md:p-6 space-y-4">
                  <h3 className="font-semibold">Tulis Ulasan</h3>
                  <div>
                    <Label className="mb-2 block">Rating</Label>
                    <StarRating rating={reviewRating} onChange={setReviewRating} />
                  </div>
                  <div>
                    <Label htmlFor="reviewComment">Komentar</Label>
                    <Textarea
                      id="reviewComment"
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Bagikan pengalamanmu..."
                      rows={3}
                    />
                  </div>
                  <Button
                    onClick={handleSubmitReview}
                    disabled={submittingReview || reviewRating === 0}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    {submittingReview ? 'Mengirim...' : 'Kirim Ulasan'}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* SURVEI */}
        <TabsContent value="survei">
          <Card className="border-0 shadow-sm max-w-lg">
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">Jadwalkan Survei</h3>
                <p className="text-sm text-muted-foreground">
                  Pilih waktu yang nyaman untuk melihat langsung kos ini.
                </p>
              </div>
              <div>
                <Label htmlFor="surveyDate">Tanggal</Label>
                <Input
                  id="surveyDate"
                  type="date"
                  value={surveyDate}
                  onChange={(e) => setSurveyDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <Label>Waktu</Label>
                <Select value={surveyTime} onValueChange={setSurveyTime}>
                  <SelectTrigger>
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
                <Label htmlFor="surveyNotes">Catatan (opsional)</Label>
                <Textarea
                  id="surveyNotes"
                  value={surveyNotes}
                  onChange={(e) => setSurveyNotes(e.target.value)}
                  placeholder="Ada pertanyaan atau catatan khusus?"
                  rows={3}
                />
              </div>
              <Button
                onClick={handleSubmitSurvey}
                disabled={submittingSurvey || !surveyDate || !surveyTime || !user}
                className="bg-emerald-600 hover:bg-emerald-700 text-white w-full"
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

      {/* Booking Dialog */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-emerald-600">Booking Kamar</DialogTitle>
          </DialogHeader>
          {bookingRoom && (
            <div className="space-y-4 mt-2">
              <div className="bg-muted/50 rounded-xl p-4">
                <h4 className="font-semibold">{bookingRoom.name}</h4>
                <p className="text-sm text-muted-foreground">{bookingRoom.type}</p>
                <p className="text-lg font-bold text-emerald-600 mt-1">
                  {formatPrice(bookingRoom.price)}
                  <span className="text-xs font-normal text-muted-foreground">/bulan</span>
                </p>
              </div>

              <div>
                <Label htmlFor="bookingDate">Tanggal Check-in</Label>
                <Input
                  id="bookingDate"
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <Label>Durasi Sewa</Label>
                <Select value={String(bookingDuration)} onValueChange={(v) => setBookingDuration(Number(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
                      <SelectItem key={m} value={String(m)}>
                        {m} Bulan
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Metode Pembayaran</Label>
                <Select value={bookingMethod} onValueChange={setBookingMethod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ewallet">E-Wallet (GoPay/OVO/Dana)</SelectItem>
                    <SelectItem value="transfer">Transfer Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="text-xl font-bold text-emerald-600">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <Button
                onClick={handleBooking}
                disabled={submittingBooking || !bookingDate}
                className="bg-emerald-600 hover:bg-emerald-700 text-white w-full"
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
