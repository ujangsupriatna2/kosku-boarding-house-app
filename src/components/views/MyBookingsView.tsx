'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import {
  type Booking,
  formatPrice,
  formatDate,
  getStatusColor,
  getStatusLabel,
} from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  CalendarCheck,
  BedDouble,
  MapPin,
  CalendarDays,
  Clock,
  X,
} from 'lucide-react';
import { toast } from 'sonner';

export default function MyBookingsView() {
  const { user, setView } = useAppStore();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/bookings?userId=${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setBookings(Array.isArray(data) ? data : data.data || []);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId: string) => {
    setCancelling(bookingId);
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled' }),
      });
      if (res.ok) {
        toast.success('Booking berhasil dibatalkan');
        fetchBookings();
      } else {
        const err = await res.json();
        toast.error(err.error || 'Gagal membatalkan booking');
      }
    } catch {
      toast.error('Terjadi kesalahan');
    } finally {
      setCancelling(null);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <CalendarCheck className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
        <h2 className="text-lg font-medium text-muted-foreground">Silakan Login</h2>
        <p className="text-sm text-muted-foreground mt-1">Masuk untuk melihat booking kamu.</p>
        <Button onClick={() => setView('login')} className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white">
          Masuk
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Booking Saya</h1>
        <p className="text-muted-foreground mt-1">Kelola semua booking kamu</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-36 w-full rounded-xl" />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-16">
          <CalendarCheck className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground">Belum Ada Booking</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Mulai cari dan booking kos impianmu!
          </p>
          <Button
            onClick={() => setView('home')}
            className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Cari Kos
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking.id} className="border-0 shadow-sm">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Image */}
                  <div className="w-full md:w-32 h-32 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950 dark:to-teal-950 flex items-center justify-center shrink-0 overflow-hidden">
                    {booking.kos?.imageUrl ? (
                      <img
                        src={booking.kos.imageUrl}
                        alt={booking.kos.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <MapPin className="h-8 w-8 text-emerald-400 opacity-50" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {booking.kos?.name || 'Kos'}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <BedDouble className="h-3.5 w-3.5" />
                          <span>{booking.room?.name || 'Kamar'} - {booking.room?.type || ''}</span>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(booking.status)} text-xs`}>
                        {getStatusLabel(booking.status)}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        <span>Check-in: {formatDate(booking.checkInDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{booking.duration} bulan</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-emerald-600">
                        {formatPrice(booking.totalPrice)}
                      </p>
                      {(booking.status === 'pending' || booking.status === 'paid') && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-950 gap-1"
                          onClick={() => handleCancel(booking.id)}
                          disabled={cancelling === booking.id}
                        >
                          <X className="h-4 w-4" />
                          {cancelling === booking.id ? 'Membatalkan...' : 'Batalkan'}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
