'use client';

import { type KosListItem, formatPrice } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Star,
  MapPin,
  Heart,
  Wifi,
  Car,
  Dumbbell,
  WashingMachine,
  Users,
  BedDouble,
  Zap,
  Monitor,
  ShowerHead,
  CookingPot,
  Refrigerator,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface KosCardProps {
  kos: KosListItem;
  index?: number;
}

const facilityIcons: Record<string, React.ReactNode> = {
  'WiFi': <Wifi className="h-3 w-3" />,
  'Parkir': <Car className="h-3 w-3" />,
  'Gym': <Dumbbell className="h-3 w-3" />,
  'Laundry': <WashingMachine className="h-3 w-3" />,
  'Kasur': <BedDouble className="h-3 w-3" />,
  'AC': <Zap className="h-3 w-3" />,
  'Meja Belajar': <Monitor className="h-3 w-3" />,
  'Kamar Mandi Dalam': <ShowerHead className="h-3 w-3" />,
  'Dapur': <CookingPot className="h-3 w-3" />,
  'Kulkas': <Refrigerator className="h-3 w-3" />,
};

export default function KosCard({ kos, index = 0 }: KosCardProps) {
  const selectKos = useAppStore((s) => s.selectKos);
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    selectKos(kos.id, kos.name, kos.imageUrl, '', '');
  };

  const facilityList = (kos.facilities || [])
    .map((f) => f.facility?.name)
    .filter(Boolean) as string[];

  const shownFacilities = facilityList.slice(0, 4);
  const moreCount = facilityList.length - 4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group cursor-pointer"
    >
      <Card
        className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm hover:shadow-xl hover:shadow-emerald-900/[0.07] dark:hover:shadow-emerald-900/[0.15] transition-all duration-500"
        onClick={handleClick}
      >
        {/* Image Area */}
        <div className="relative h-52 overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40">
          {kos.imageUrl ? (
            <img
              src={kos.imageUrl}
              alt={kos.name}
              className="img-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <MapPin className="h-10 w-10 text-emerald-300 dark:text-emerald-700" />
            </div>
          )}

          {/* Gradient overlay from bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* Availability badge - top left */}
          <div className="absolute top-3 left-3">
            {kos.availableRooms > 0 ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-xs font-semibold backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                TERSEDIA
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-red-500/90 text-white text-xs font-semibold backdrop-blur-sm">
                FULL
              </span>
            )}
          </div>

          {/* Favorite button - top right */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 dark:bg-black/30 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-all duration-200 shadow-sm"
          >
            <Heart
              className={`h-4 w-4 transition-colors duration-200 ${
                liked ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'
              }`}
            />
          </button>

          {/* Price tag - bottom left on image */}
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm text-emerald-700 dark:text-emerald-300 text-sm font-bold shadow-sm">
              {formatPrice(kos.priceFrom)}
              <span className="text-xs font-normal text-emerald-600/70 dark:text-emerald-400/70 ml-0.5">/bln</span>
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5">
          {/* Title */}
          <h3 className="font-semibold text-lg line-clamp-1 text-foreground mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
            {kos.name}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
            <span className="line-clamp-1">{kos.district}, {kos.city}</span>
          </div>

          {/* Facilities row */}
          {shownFacilities.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap mb-4">
              {shownFacilities.map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted/80 text-muted-foreground text-xs font-medium"
                  title={name}
                >
                  {facilityIcons[name] || <Users className="h-3 w-3" />}
                  <span>{name}</span>
                </span>
              ))}
              {moreCount > 0 && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-muted/80 text-muted-foreground text-xs font-medium">
                  +{moreCount}
                </span>
              )}
            </div>
          )}

          {/* Bottom row: Rating + Button */}
          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-foreground">
                {kos.avgRating ? kos.avgRating.toFixed(1) : 'N/A'}
              </span>
              {kos.reviewCount !== undefined && kos.reviewCount > 0 && (
                <span className="text-xs text-muted-foreground">({kos.reviewCount})</span>
              )}
            </div>
            <Button
              size="sm"
              className="rounded-full px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-semibold shadow-sm shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
            >
              Lihat Detail
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
