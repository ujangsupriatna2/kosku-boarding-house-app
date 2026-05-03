'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { type Promo } from '@/lib/types';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tag, X, Percent, ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <Sheet open={open && !promoPopupDismissed} onOpenChange={(v) => { if (!v) handleDismiss(); }}>
      <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] p-0">
        {/* Gradient header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Tag className="h-5 w-5 text-white" />
              </div>
              <div>
                <SheetTitle className="text-white text-lg font-semibold">Promo Spesial</SheetTitle>
                <p className="text-emerald-100 text-sm">Penawaran terbatas untukmu!</p>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[60vh] scrollbar-thin">
          {loading ? (
            <div className="space-y-3 p-2">
              <Skeleton className="h-28 w-full rounded-2xl" />
              <Skeleton className="h-28 w-full rounded-2xl" />
            </div>
          ) : promos.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Percent className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">Belum ada promo saat ini</p>
              <p className="text-sm mt-1">Cek kembali nanti!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {promos.map((promo, i) => (
                <motion.div
                  key={promo.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border border-emerald-100 dark:border-emerald-900/50 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20 p-5 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <h4 className="font-semibold">{promo.title}</h4>
                        {promo.discount && (
                          <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs border-0 rounded-full px-2.5">
                            {promo.discount}% OFF
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {promo.description}
                      </p>
                      {promo.kos && (
                        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                          📍 {promo.kos.name}
                        </p>
                      )}
                    </div>
                  </div>
                  {promo.endDate && (
                    <div className="flex items-center gap-1 mt-3 text-xs text-emerald-600 dark:text-emerald-400">
                      <Clock className="h-3 w-3" />
                      Berlaku hingga {new Date(promo.endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* Action button */}
          <div className="mt-6 px-2 pb-4">
            <Button
              variant="outline"
              onClick={handleDismiss}
              className="w-full rounded-xl h-12 font-medium"
            >
              Tutup
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
