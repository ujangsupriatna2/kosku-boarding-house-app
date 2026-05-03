'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { type Promo } from '@/lib/types';
import { formatPrice } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tag, X, Percent } from 'lucide-react';

export default function PromoPopup() {
  const promoPopupDismissed = useAppStore((s) => s.promoPopupDismissed);
  const dismissPromoPopup = useAppStore((s) => s.dismissPromoPopup);
  const [open, setOpen] = useState(false);
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (promoPopupDismissed) return;
    const fetchPromos = async () => {
      try {
        const res = await fetch('/api/promos');
        if (res.ok) {
          const data = await res.json();
          setPromos(Array.isArray(data) ? data : data.data || []);
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
        setOpen(true);
      }
    };
    fetchPromos();
  }, [promoPopupDismissed]);

  const handleDismiss = () => {
    setOpen(false);
    dismissPromoPopup();
  };

  if (promoPopupDismissed) return null;

  return (
    <Dialog open={open && !promoPopupDismissed} onOpenChange={(v) => { if (!v) handleDismiss(); }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-emerald-600">
            <Tag className="h-5 w-5" />
            Promo Spesial
          </DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-24 w-full rounded-xl" />
              <Skeleton className="h-24 w-full rounded-xl" />
            </div>
          ) : promos.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Percent className="h-10 w-10 mx-auto mb-2 opacity-40" />
              <p>Belum ada promo saat ini</p>
              <p className="text-sm mt-1">Cek kembali nanti!</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {promos.map((promo) => (
                <div
                  key={promo.id}
                  className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm">{promo.title}</h4>
                        {promo.discount && (
                          <Badge className="bg-emerald-600 text-white text-xs">
                            Diskon {promo.discount}%
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {promo.description}
                      </p>
                      {promo.kos && (
                        <p className="text-xs text-muted-foreground mt-1">
                          📍 {promo.kos.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={handleDismiss} className="gap-1">
            <X className="h-4 w-4" />
            Tutup
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
