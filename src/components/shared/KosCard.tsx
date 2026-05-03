'use client';

import { type KosListItem, formatPrice } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Users, Wifi, Car, Dumbbell, WashingMachine } from 'lucide-react';
import { motion } from 'framer-motion';

interface KosCardProps {
  kos: KosListItem;
}

const facilityIcons: Record<string, React.ReactNode> = {
  'WiFi': <Wifi className="h-3.5 w-3.5" />,
  'Parkir': <Car className="h-3.5 w-3.5" />,
  'Gym': <Dumbbell className="h-3.5 w-3.5" />,
  'Laundry': <WashingMachine className="h-3.5 w-3.5" />,
};

export default function KosCard({ kos }: KosCardProps) {
  const selectKos = useAppStore((s) => s.selectKos);

  const handleClick = () => {
    selectKos(kos.id, kos.name, kos.imageUrl, '', '');
  };

  const facilityList = (kos.facilities || [])
    .slice(0, 4)
    .map((f) => f.facility?.name)
    .filter(Boolean) as string[];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className="overflow-hidden cursor-pointer rounded-xl shadow-sm hover:shadow-md transition-shadow border-0"
        onClick={handleClick}
      >
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950 dark:to-teal-950">
          {kos.imageUrl ? (
            <img
              src={kos.imageUrl}
              alt={kos.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <MapPin className="h-10 w-10 text-emerald-400 opacity-50" />
            </div>
          )}
          {kos.availableRooms > 0 && (
            <Badge className="absolute top-3 left-3 bg-emerald-600 text-white text-xs">
              {kos.availableRooms} Kamar Tersedia
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
          {/* Name & Location */}
          <h3 className="font-semibold text-base line-clamp-1 mb-1">{kos.name}</h3>
          <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="line-clamp-1">
              {kos.district}, {kos.city}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-0.5">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium">
                {kos.avgRating ? kos.avgRating.toFixed(1) : 'N/A'}
              </span>
            </div>
            {kos.reviewCount !== undefined && kos.reviewCount > 0 && (
              <span className="text-xs text-muted-foreground">
                ({kos.reviewCount} ulasan)
              </span>
            )}
          </div>

          {/* Facilities */}
          {facilityList.length > 0 && (
            <div className="flex items-center gap-2 mb-3 text-muted-foreground">
              {facilityList.map((name) => (
                <div
                  key={name}
                  className="flex items-center gap-0.5"
                  title={name}
                >
                  {facilityIcons[name] || <Users className="h-3.5 w-3.5" />}
                  <span className="text-xs hidden sm:inline">{name}</span>
                </div>
              ))}
            </div>
          )}

          {/* Price */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Mulai dari</p>
              <p className="text-lg font-bold text-emerald-600">
                {formatPrice(kos.priceFrom)}
                <span className="text-xs font-normal text-muted-foreground">/bulan</span>
              </p>
            </div>
            <Button
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
            >
              Lihat Detail
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
