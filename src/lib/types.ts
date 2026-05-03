// Types for the Kos Application

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  role: 'user' | 'owner';
  avatar?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Kos {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  district: string;
  latitude: number | null;
  longitude: number | null;
  ownerId: string;
  imageUrl: string | null;
  priceFrom: number;
  priceTo: number;
  totalRooms: number;
  availableRooms: number;
  rules: string | null;
  roomTypes: string | null;
  createdAt: string;
  updatedAt: string;
  // Joined
  owner?: Omit<User, 'password'>;
  facilities?: KosFacility[];
  rooms?: Room[];
  reviews?: ReviewWithUser[];
  promos?: Promo[];
  _count?: { reviews: number; rooms: number };
  _avg?: { rating: number };
  avgRating?: number;
  reviewCount?: number;
}

export interface KosListItem {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  district: string;
  imageUrl: string | null;
  priceFrom: number;
  priceTo: number;
  totalRooms: number;
  availableRooms: number;
  roomTypes: string | null;
  facilities?: KosFacility[];
  avgRating?: number | null;
  reviewCount?: number;
}

export interface Room {
  id: string;
  kosId: string;
  name: string;
  type: string;
  price: number;
  size: string | null;
  isAvailable: boolean;
  imageUrl?: string | null;
}

export interface Facility {
  id: string;
  name: string;
  icon: string | null;
}

export interface KosFacility {
  kosId: string;
  facilityId: string;
  facility?: Facility;
}

export interface Review {
  id: string;
  userId: string;
  kosId: string;
  rating: number;
  comment: string | null;
  createdAt: string;
}

export interface ReviewWithUser extends Review {
  user?: { name: string; avatar?: string | null };
}

export interface Booking {
  id: string;
  userId: string;
  kosId: string;
  roomId: string;
  checkInDate: string;
  duration: number;
  totalPrice: number;
  status: 'pending' | 'paid' | 'confirmed' | 'cancelled' | 'completed';
  paymentMethod?: string | null;
  paymentProof?: string | null;
  createdAt: string;
  updatedAt: string;
  // Joined
  kos?: { name: string; imageUrl?: string | null };
  room?: { name: string; type: string };
}

export interface Survey {
  id: string;
  userId: string;
  kosId: string;
  scheduledDate: string;
  scheduledTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string | null;
  createdAt: string;
  // Joined
  kos?: { name: string; imageUrl?: string | null };
}

export interface Promo {
  id: string;
  kosId: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  startDate: string;
  endDate: string;
  discount?: number | null;
  isActive: boolean;
  kos?: { name: string; imageUrl?: string | null };
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  kosId?: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
  sender?: { name: string; role: string };
}

export type ViewType = 
  | 'home' 
  | 'kos-detail' 
  | 'login' 
  | 'register' 
  | 'owner-dashboard' 
  | 'my-bookings' 
  | 'chat' 
  | 'profile';

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const formatDateShort = (date: string): string => {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'paid': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
    case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    pending: 'Menunggu',
    paid: 'Dibayar',
    confirmed: 'Dikonfirmasi',
    completed: 'Selesai',
    cancelled: 'Dibatalkan',
  };
  return labels[status] || status;
};
