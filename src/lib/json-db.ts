import { v4 as uuidv4 } from 'uuid';

// ============================================================
// Seed Data (deterministic IDs for cross-references)
// ============================================================

interface UserRecord {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string | null;
  role: 'user' | 'owner';
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

interface FacilityRecord {
  id: string;
  name: string;
  icon: string | null;
}

interface KosFacilityRecord {
  kosId: string;
  facilityId: string;
}

interface KosRecord {
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
}

interface RoomRecord {
  id: string;
  kosId: string;
  name: string;
  type: string;
  price: number;
  size: string | null;
  isAvailable: boolean;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ReviewRecord {
  id: string;
  userId: string;
  kosId: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}

interface BookingRecord {
  id: string;
  userId: string;
  kosId: string;
  roomId: string;
  checkInDate: string;
  duration: number;
  totalPrice: number;
  status: 'pending' | 'paid' | 'confirmed' | 'cancelled' | 'completed';
  paymentMethod: string | null;
  paymentProof: string | null;
  createdAt: string;
  updatedAt: string;
}

interface SurveyRecord {
  id: string;
  userId: string;
  kosId: string;
  scheduledDate: string;
  scheduledTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

interface PromoRecord {
  id: string;
  kosId: string;
  title: string;
  description: string;
  imageUrl: string | null;
  startDate: string;
  endDate: string;
  discount: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ChatMessageRecord {
  id: string;
  senderId: string;
  receiverId: string;
  kosId: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface DBData {
  users: UserRecord[];
  facilities: FacilityRecord[];
  kosFacilities: KosFacilityRecord[];
  kos: KosRecord[];
  rooms: RoomRecord[];
  reviews: ReviewRecord[];
  bookings: BookingRecord[];
  surveys: SurveyRecord[];
  promos: PromoRecord[];
  chatMessages: ChatMessageRecord[];
}

const now = new Date().toISOString();

function generateId(): string {
  return uuidv4();
}

const seedData: DBData = {
  users: [
    {
      id: 'owner-1',
      email: 'pemilik@kos.com',
      password: '$2b$10$ckfj9WwZWfo9KXQFyAiwfOcb.su71kdcECNAEwjkfjI3hlBvx0r7O',
      name: 'Budi Santoso',
      phone: '081234567890',
      role: 'owner',
      avatar: null,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
    {
      id: 'owner-2',
      email: 'pemilik2@kos.com',
      password: '$2b$10$ckfj9WwZWfo9KXQFyAiwfOcb.su71kdcECNAEwjkfjI3hlBvx0r7O',
      name: 'Siti Rahayu',
      phone: '081298765432',
      role: 'owner',
      avatar: null,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
    {
      id: 'owner-3',
      email: 'pemilik3@kos.com',
      password: '$2b$10$ckfj9WwZWfo9KXQFyAiwfOcb.su71kdcECNAEwjkfjI3hlBvx0r7O',
      name: 'Ahmad Wijaya',
      phone: '081355566677',
      role: 'owner',
      avatar: null,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
    {
      id: 'user-1',
      email: 'user@kos.com',
      password: '$2b$10$QBMp6GWA3I6qKneHEjrh/uiXoCSTiIRFBb20UD4Qzrk.npdab5oA2',
      name: 'Rina Pratiwi',
      phone: '085612345678',
      role: 'user',
      avatar: null,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
    {
      id: 'user-2',
      email: 'user2@kos.com',
      password: '$2b$10$QBMp6GWA3I6qKneHEjrh/uiXoCSTiIRFBb20UD4Qzrk.npdab5oA2',
      name: 'Doni Saputra',
      phone: '085698765432',
      role: 'user',
      avatar: null,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
    {
      id: 'user-3',
      email: 'user3@kos.com',
      password: '$2b$10$QBMp6GWA3I6qKneHEjrh/uiXoCSTiIRFBb20UD4Qzrk.npdab5oA2',
      name: 'Maya Anggraini',
      phone: '085611122233',
      role: 'user',
      avatar: null,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
  ],

  facilities: [
    { id: 'fac-1', name: 'WiFi', icon: 'Wifi' },
    { id: 'fac-2', name: 'AC', icon: 'AirVent' },
    { id: 'fac-3', name: 'Kamar Mandi Dalam', icon: 'Bath' },
    { id: 'fac-4', name: 'Parkir Motor', icon: 'Bike' },
    { id: 'fac-5', name: 'Parkir Mobil', icon: 'Car' },
    { id: 'fac-6', name: 'Dapur Bersama', icon: 'CookingPot' },
    { id: 'fac-7', name: 'Laundry', icon: 'Shirt' },
    { id: 'fac-8', name: 'CCTV', icon: 'Camera' },
    { id: 'fac-9', name: 'Keamanan 24 Jam', icon: 'Shield' },
    { id: 'fac-10', name: 'Rooftop', icon: 'Building' },
    { id: 'fac-11', name: 'Kolam Renang', icon: 'Waves' },
    { id: 'fac-12', name: 'Gym', icon: 'Dumbbell' },
    { id: 'fac-13', name: 'Mesin Cuci', icon: 'WashingMachine' },
    { id: 'fac-14', name: 'Listrik Token', icon: 'Zap' },
    { id: 'fac-15', name: 'Air PDAM', icon: 'Droplets' },
  ],

  kosFacilities: [
    // Kos 1 (kos-1): Harmoni Putri
    { kosId: 'kos-1', facilityId: 'fac-1' },
    { kosId: 'kos-1', facilityId: 'fac-2' },
    { kosId: 'kos-1', facilityId: 'fac-3' },
    { kosId: 'kos-1', facilityId: 'fac-4' },
    { kosId: 'kos-1', facilityId: 'fac-6' },
    { kosId: 'kos-1', facilityId: 'fac-8' },
    { kosId: 'kos-1', facilityId: 'fac-9' },
    { kosId: 'kos-1', facilityId: 'fac-14' },
    { kosId: 'kos-1', facilityId: 'fac-15' },
    // Kos 2 (kos-2): Green Living - all facilities
    { kosId: 'kos-2', facilityId: 'fac-1' },
    { kosId: 'kos-2', facilityId: 'fac-2' },
    { kosId: 'kos-2', facilityId: 'fac-3' },
    { kosId: 'kos-2', facilityId: 'fac-4' },
    { kosId: 'kos-2', facilityId: 'fac-5' },
    { kosId: 'kos-2', facilityId: 'fac-6' },
    { kosId: 'kos-2', facilityId: 'fac-7' },
    { kosId: 'kos-2', facilityId: 'fac-8' },
    { kosId: 'kos-2', facilityId: 'fac-9' },
    { kosId: 'kos-2', facilityId: 'fac-10' },
    { kosId: 'kos-2', facilityId: 'fac-11' },
    { kosId: 'kos-2', facilityId: 'fac-12' },
    { kosId: 'kos-2', facilityId: 'fac-13' },
    { kosId: 'kos-2', facilityId: 'fac-14' },
    { kosId: 'kos-2', facilityId: 'fac-15' },
    // Kos 3 (kos-3): Mahasiswa
    { kosId: 'kos-3', facilityId: 'fac-1' },
    { kosId: 'kos-3', facilityId: 'fac-4' },
    { kosId: 'kos-3', facilityId: 'fac-6' },
    { kosId: 'kos-3', facilityId: 'fac-8' },
    { kosId: 'kos-3', facilityId: 'fac-9' },
    { kosId: 'kos-3', facilityId: 'fac-13' },
    { kosId: 'kos-3', facilityId: 'fac-14' },
    { kosId: 'kos-3', facilityId: 'fac-15' },
    // Kos 4 (kos-4): Premium Utama
    { kosId: 'kos-4', facilityId: 'fac-1' },
    { kosId: 'kos-4', facilityId: 'fac-2' },
    { kosId: 'kos-4', facilityId: 'fac-3' },
    { kosId: 'kos-4', facilityId: 'fac-4' },
    { kosId: 'kos-4', facilityId: 'fac-5' },
    { kosId: 'kos-4', facilityId: 'fac-7' },
    { kosId: 'kos-4', facilityId: 'fac-8' },
    { kosId: 'kos-4', facilityId: 'fac-9' },
    { kosId: 'kos-4', facilityId: 'fac-10' },
    { kosId: 'kos-4', facilityId: 'fac-14' },
    { kosId: 'kos-4', facilityId: 'fac-15' },
    // Kos 5 (kos-5): Asri Residence
    { kosId: 'kos-5', facilityId: 'fac-1' },
    { kosId: 'kos-5', facilityId: 'fac-3' },
    { kosId: 'kos-5', facilityId: 'fac-4' },
    { kosId: 'kos-5', facilityId: 'fac-6' },
    { kosId: 'kos-5', facilityId: 'fac-7' },
    { kosId: 'kos-5', facilityId: 'fac-8' },
    { kosId: 'kos-5', facilityId: 'fac-9' },
    { kosId: 'kos-5', facilityId: 'fac-14' },
    { kosId: 'kos-5', facilityId: 'fac-15' },
    // Kos 6 (kos-6): Eksklusif Grand - all facilities
    { kosId: 'kos-6', facilityId: 'fac-1' },
    { kosId: 'kos-6', facilityId: 'fac-2' },
    { kosId: 'kos-6', facilityId: 'fac-3' },
    { kosId: 'kos-6', facilityId: 'fac-4' },
    { kosId: 'kos-6', facilityId: 'fac-5' },
    { kosId: 'kos-6', facilityId: 'fac-6' },
    { kosId: 'kos-6', facilityId: 'fac-7' },
    { kosId: 'kos-6', facilityId: 'fac-8' },
    { kosId: 'kos-6', facilityId: 'fac-9' },
    { kosId: 'kos-6', facilityId: 'fac-10' },
    { kosId: 'kos-6', facilityId: 'fac-11' },
    { kosId: 'kos-6', facilityId: 'fac-12' },
    { kosId: 'kos-6', facilityId: 'fac-13' },
    { kosId: 'kos-6', facilityId: 'fac-14' },
    { kosId: 'kos-6', facilityId: 'fac-15' },
    // Kos 7 (kos-7): Putri Melati
    { kosId: 'kos-7', facilityId: 'fac-1' },
    { kosId: 'kos-7', facilityId: 'fac-3' },
    { kosId: 'kos-7', facilityId: 'fac-4' },
    { kosId: 'kos-7', facilityId: 'fac-6' },
    { kosId: 'kos-7', facilityId: 'fac-8' },
    { kosId: 'kos-7', facilityId: 'fac-9' },
    { kosId: 'kos-7', facilityId: 'fac-15' },
    // Kos 8 (kos-8): Pahlawan Ekonomi
    { kosId: 'kos-8', facilityId: 'fac-1' },
    { kosId: 'kos-8', facilityId: 'fac-4' },
    { kosId: 'kos-8', facilityId: 'fac-6' },
    { kosId: 'kos-8', facilityId: 'fac-8' },
    { kosId: 'kos-8', facilityId: 'fac-13' },
    { kosId: 'kos-8', facilityId: 'fac-14' },
    { kosId: 'kos-8', facilityId: 'fac-15' },
  ],

  kos: [
    {
      id: 'kos-1',
      name: 'Kos Harmoni Putri',
      description: 'Kos putri modern dengan fasilitas lengkap di pusat kota. Lingkungan aman dan bersih, dekat dengan kampus dan pusat perbelanjaan. Tersedia berbagai tipe kamar dari standar hingga premium.',
      address: 'Jl. Merdeka No. 15, Kel. Sukamaju',
      city: 'Bandung',
      district: 'Coblong',
      latitude: -6.8845,
      longitude: 107.6133,
      ownerId: 'owner-1',
      imageUrl: '/kos-1.png',
      priceFrom: 1500000,
      priceTo: 3500000,
      totalRooms: 24,
      availableRooms: 8,
      rules: JSON.stringify(['Putri only', 'Tidak boleh membawa hewan peliharaan', 'Jam malam 22:00', 'Tidak boleh merokok di dalam kamar']),
      roomTypes: JSON.stringify(['Standard', 'Deluxe', 'Premium']),
      createdAt: '2024-06-01T00:00:00.000Z',
      updatedAt: '2024-06-01T00:00:00.000Z',
    },
    {
      id: 'kos-2',
      name: 'Kos Green Living',
      description: 'Kos eksklusif dengan konsep green living. Bangunan baru dengan desain minimalis modern. Dilengkapi rooftop garden, kolam renang, dan gym. Cocok untuk profesional muda.',
      address: 'Jl. Sudirman No. 88, Kel. Kebayoran',
      city: 'Jakarta',
      district: 'Kebayoran Baru',
      latitude: -6.2443,
      longitude: 106.7841,
      ownerId: 'owner-2',
      imageUrl: '/kos-2.png',
      priceFrom: 3000000,
      priceTo: 6000000,
      totalRooms: 36,
      availableRooms: 12,
      rules: JSON.stringify(['Campuran', 'Check-out maksimal 12:00', 'Deposit 1 bulan', 'Kontrak minimal 3 bulan']),
      roomTypes: JSON.stringify(['Studio', '1 Bedroom', 'Suite']),
      createdAt: '2024-06-02T00:00:00.000Z',
      updatedAt: '2024-06-02T00:00:00.000Z',
    },
    {
      id: 'kos-3',
      name: 'Kos Mahasiswa Sejahtera',
      description: 'Kos murah dan strategis untuk mahasiswa. Lokasi dekat kampus UNPAD dan ITB. Fasilitas memadai dengan harga terjangkau. Suasana kekeluargaan dan mendukung aktivitas belajar.',
      address: 'Jl. Dago No. 42, Kel. Lebakgede',
      city: 'Bandung',
      district: 'Coblong',
      latitude: -6.8904,
      longitude: 107.6108,
      ownerId: 'owner-1',
      imageUrl: '/kos-3.png',
      priceFrom: 800000,
      priceTo: 1800000,
      totalRooms: 30,
      availableRooms: 5,
      rules: JSON.stringify(['Putra only', 'Tidak membawa tamu setelah jam 21:00', 'Menjaga kebersihan bersama', 'Tidak boleh membuat kebisingan']),
      roomTypes: JSON.stringify(['Standard', 'Standard Plus']),
      createdAt: '2024-06-03T00:00:00.000Z',
      updatedAt: '2024-06-03T00:00:00.000Z',
    },
    {
      id: 'kos-4',
      name: 'Kos Premium Utama',
      description: 'Kos premium dengan standar hotel bintang 3. Setiap kamar dilengkapi AC, kamar mandi dalam, dan balkon pribadi. Keamanan 24 jam dengan CCTV. Lokasi premium di jantung kota.',
      address: 'Jl. Gatot Subroto No. 55, Kel. Petisah',
      city: 'Medan',
      district: 'Medan Petisah',
      latitude: 3.5952,
      longitude: 98.6722,
      ownerId: 'owner-3',
      imageUrl: '/kos-4.png',
      priceFrom: 2500000,
      priceTo: 5000000,
      totalRooms: 20,
      availableRooms: 3,
      rules: JSON.stringify(['Campuran (terpisah lantai)', 'Deposit 2 bulan', 'Kontrak minimal 6 bulan', 'Dilarang merokok di area dalam']),
      roomTypes: JSON.stringify(['Deluxe', 'Executive', 'Suite']),
      createdAt: '2024-06-04T00:00:00.000Z',
      updatedAt: '2024-06-04T00:00:00.000Z',
    },
    {
      id: 'kos-5',
      name: 'Kos Asri Residence',
      description: 'Kos dengan suasana asri dan tenang, dikelilingi taman hijau. Ideal untuk pekerja dan mahasiswa yang menginginkan lingkungan nyaman. Fasilitas dapur bersama dan laundry tersedia.',
      address: 'Jl. Diponegoro No. 23, Kel. Darmo',
      city: 'Surabaya',
      district: 'Wonokromo',
      latitude: -7.2756,
      longitude: 112.7425,
      ownerId: 'owner-2',
      imageUrl: '/kos-5.png',
      priceFrom: 1200000,
      priceTo: 2500000,
      totalRooms: 18,
      availableRooms: 7,
      rules: JSON.stringify(['Campuran', 'Kontrak minimal 1 bulan', 'Menjaga ketenangan setelah 21:00', 'Mematuhi aturan kebersihan']),
      roomTypes: JSON.stringify(['Standard', 'Deluxe']),
      createdAt: '2024-06-05T00:00:00.000Z',
      updatedAt: '2024-06-05T00:00:00.000Z',
    },
    {
      id: 'kos-6',
      name: 'Kos Eksklusif Grand',
      description: 'Kos eksklusif terbaru dengan desain kontemporer. Dilengkapi smart home system, co-working space, dan lounge area. Pilihan tepat untuk eksekutif muda dan profesional.',
      address: 'Jl. Rasuna Said No. 10, Kel. Kuningan',
      city: 'Jakarta',
      district: 'Setiabudi',
      latitude: -6.2297,
      longitude: 106.8265,
      ownerId: 'owner-3',
      imageUrl: '/kos-6.png',
      priceFrom: 4000000,
      priceTo: 8000000,
      totalRooms: 28,
      availableRooms: 10,
      rules: JSON.stringify(['Campuran', 'Deposit 2 bulan', 'Kontrak minimal 6 bulan', 'Check-in/check-out harus melalui resepsionis']),
      roomTypes: JSON.stringify(['Studio', '1 Bedroom', 'Penthouse']),
      createdAt: '2024-06-06T00:00:00.000Z',
      updatedAt: '2024-06-06T00:00:00.000Z',
    },
    {
      id: 'kos-7',
      name: 'Kos Putri Melati',
      description: 'Kos putri nyaman dengan suasana seperti rumah sendiri. Lokasi strategis dekat dengan mall dan rumah sakit. Dilengkapi dapur bersama dan taman.',
      address: 'Jl. Veteran No. 67, Kel. Ketawanggede',
      city: 'Malang',
      district: 'Lowokwaru',
      latitude: -7.9666,
      longitude: 112.6326,
      ownerId: 'owner-1',
      imageUrl: '/kos-7.png',
      priceFrom: 1000000,
      priceTo: 2200000,
      totalRooms: 15,
      availableRooms: 4,
      rules: JSON.stringify(['Putri only', 'Tidak boleh membawa tamu laki-laki', 'Jam malam 21:30', 'Kontrak minimal 3 bulan']),
      roomTypes: JSON.stringify(['Standard', 'Deluxe']),
      createdAt: '2024-06-07T00:00:00.000Z',
      updatedAt: '2024-06-07T00:00:00.000Z',
    },
    {
      id: 'kos-8',
      name: 'Kos Pahlawan Ekonomi',
      description: 'Kos ekonomis namun tetap nyaman dan bersih. Cocok untuk karyawan dan mahasiswa dengan budget terbatas. Akses mudah ke transportasi umum dan fasilitas publik.',
      address: 'Jl. Pahlawan No. 100, Kel. Buring',
      city: 'Malang',
      district: 'Kedungkandang',
      latitude: -7.9879,
      longitude: 112.6344,
      ownerId: 'owner-2',
      imageUrl: '/kos-8.png',
      priceFrom: 600000,
      priceTo: 1200000,
      totalRooms: 25,
      availableRooms: 9,
      rules: JSON.stringify(['Putra only', 'Menjaga kebersihan', 'Tidak boleh membawa hewan peliharaan', 'Pembayaran tepat waktu']),
      roomTypes: JSON.stringify(['Standard', 'Standard Plus']),
      createdAt: '2024-06-08T00:00:00.000Z',
      updatedAt: '2024-06-08T00:00:00.000Z',
    },
  ],

  rooms: [
    // Kos 1 rooms
    { id: 'room-1-1', kosId: 'kos-1', name: 'Standard A', type: 'Standard', price: 1500000, size: '3x3 m', isAvailable: true, imageUrl: null, createdAt: '2024-06-01T00:00:00.000Z', updatedAt: '2024-06-01T00:00:00.000Z' },
    { id: 'room-1-2', kosId: 'kos-1', name: 'Standard B', type: 'Standard', price: 1500000, size: '3x3 m', isAvailable: true, imageUrl: null, createdAt: '2024-06-01T00:00:00.000Z', updatedAt: '2024-06-01T00:00:00.000Z' },
    { id: 'room-1-3', kosId: 'kos-1', name: 'Standard C', type: 'Standard', price: 1500000, size: '3x3 m', isAvailable: false, imageUrl: null, createdAt: '2024-06-01T00:00:00.000Z', updatedAt: '2024-06-01T00:00:00.000Z' },
    { id: 'room-1-4', kosId: 'kos-1', name: 'Deluxe A', type: 'Deluxe', price: 2500000, size: '3.5x4 m', isAvailable: true, imageUrl: null, createdAt: '2024-06-01T00:00:00.000Z', updatedAt: '2024-06-01T00:00:00.000Z' },
    { id: 'room-1-5', kosId: 'kos-1', name: 'Deluxe B', type: 'Deluxe', price: 2500000, size: '3.5x4 m', isAvailable: true, imageUrl: null, createdAt: '2024-06-01T00:00:00.000Z', updatedAt: '2024-06-01T00:00:00.000Z' },
    { id: 'room-1-6', kosId: 'kos-1', name: 'Premium A', type: 'Premium', price: 3500000, size: '4x5 m', isAvailable: true, imageUrl: null, createdAt: '2024-06-01T00:00:00.000Z', updatedAt: '2024-06-01T00:00:00.000Z' },
    // Kos 2 rooms
    { id: 'room-2-1', kosId: 'kos-2', name: 'Studio 101', type: 'Studio', price: 3000000, size: '4x5 m', isAvailable: true, imageUrl: null, createdAt: '2024-06-02T00:00:00.000Z', updatedAt: '2024-06-02T00:00:00.000Z' },
    { id: 'room-2-2', kosId: 'kos-2', name: 'Studio 102', type: 'Studio', price: 3000000, size: '4x5 m', isAvailable: false, imageUrl: null, createdAt: '2024-06-02T00:00:00.000Z', updatedAt: '2024-06-02T00:00:00.000Z' },
    { id: 'room-2-3', kosId: 'kos-2', name: '1 BR 201', type: '1 Bedroom', price: 4500000, size: '5x6 m', isAvailable: true, imageUrl: null, createdAt: '2024-06-02T00:00:00.000Z', updatedAt: '2024-06-02T00:00:00.000Z' },
    { id: 'room-2-4', kosId: 'kos-2', name: '1 BR 202', type: '1 Bedroom', price: 4500000, size: '5x6 m', isAvailable: true, imageUrl: null, createdAt: '2024-06-02T00:00:00.000Z', updatedAt: '2024-06-02T00:00:00.000Z' },
    { id: 'room-2-5', kosId: 'kos-2', name: 'Suite 301', type: 'Suite', price: 6000000, size: '6x7 m', isAvailable: true, imageUrl: null, createdAt: '2024-06-02T00:00:00.000Z', updatedAt: '2024-06-02T00:00:00.000Z' },
    // Kos 3 rooms
    { id: 'room-3-1', kosId: 'kos-3', name: 'Std-1A', type: 'Standard', price: 800000, size: '2.5x3 m', isAvailable: true, imageUrl: null, createdAt: '2024-06-03T00:00:00.000Z', updatedAt: '2024-06-03T00:00:00.000Z' },
    { id: 'room-3-2', kosId: 'kos-3', name: 'Std-1B', type: 'Standard', price: 800000, size: '2.5x3 m', isAvailable: false, imageUrl: null, createdAt: '2024-06-03T00:00:00.000Z', updatedAt: '2024-06-03T00:00:00.000Z' },
    { id: 'room-3-3', kosId: 'kos-3', name: 'Std-2A', type: 'Standard Plus', price: 1200000, size: '3x3.5 m', isAvailable: true, imageUrl: null, createdAt: '2024-06-03T00:00:00.000Z', updatedAt: '2024-06-03T00:00:00.000Z' },
    { id: 'room-3-4', kosId: 'kos-3', name: 'Std-2B', type: 'Standard Plus', price: 1200000, size: '3x3.5 m', isAvailable: false, imageUrl: null, createdAt: '2024-06-03T00:00:00.000Z', updatedAt: '2024-06-03T00:00:00.000Z' },
    { id: 'room-3-5', kosId: 'kos-3', name: 'Std-3A', type: 'Standard', price: 850000, size: '2.5x3 m', isAvailable: true, imageUrl: null, createdAt: '2024-06-03T00:00:00.000Z', updatedAt: '2024-06-03T00:00:00.000Z' },
    // Kos 4 rooms
    { id: 'room-4-1', kosId: 'kos-4', name: 'Deluxe D1', type: 'Deluxe', price: 2500000, size: '4x5 m', isAvailable: false, imageUrl: null, createdAt: '2024-06-04T00:00:00.000Z', updatedAt: '2024-06-04T00:00:00.000Z' },
    { id: 'room-4-2', kosId: 'kos-4', name: 'Deluxe D2', type: 'Deluxe', price: 2500000, size: '4x5 m', isAvailable: false, imageUrl: null, createdAt: '2024-06-04T00:00:00.000Z', updatedAt: '2024-06-04T00:00:00.000Z' },
    { id: 'room-4-3', kosId: 'kos-4', name: 'Executive E1', type: 'Executive', price: 4000000, size: '5x6 m', isAvailable: true, imageUrl: null, createdAt: '2024-06-04T00:00:00.000Z', updatedAt: '2024-06-04T00:00:00.000Z' },
    { id: 'room-4-4', kosId: 'kos-4', name: 'Suite S1', type: 'Suite', price: 5000000, size: '6x8 m', isAvailable: true, imageUrl: null, createdAt: '2024-06-04T00:00:00.000Z', updatedAt: '2024-06-04T00:00:00.000Z' },
    // Kos 5 rooms
    { id: 'room-5-1', kosId: 'kos-5', name: 'Std-A1', type: 'Standard', price: 1200000, size: '3x3 m', isAvailable: true, imageUrl: null, createdAt: '2024-06-05T00:00:00.000Z', updatedAt: '2024-06-05T00:00:00.000Z' },
    { id: 'room-5-2', kosId: 'kos-5', name: 'Std-A2', type: 'Standard', price: 1200000, size: '3x3 m', isAvailable: true, imageUrl: null, createdAt: '2024-06-05T00:00:00.000Z', updatedAt: '2024-06-05T00:00:00.000Z' },
    { id: 'room-5-3', kosId: 'kos-5', name: 'Dlx-B1', type: 'Deluxe', price: 2000000, size: '4x4 m', isAvailable: true, imageUrl: null, createdAt: '2024-06-05T00:00:00.000Z', updatedAt: '2024-06-05T00:00:00.000Z' },
    { id: 'room-5-4', kosId: 'kos-5', name: 'Dlx-B2', type: 'Deluxe', price: 2000000, size: '4x4 m', isAvailable: false, imageUrl: null, createdAt: '2024-06-05T00:00:00.000Z', updatedAt: '2024-06-05T00:00:00.000Z' },
    { id: 'room-5-5', kosId: 'kos-5', name: 'Std-A3', type: 'Standard', price: 1200000, size: '3x3 m', isAvailable: true, imageUrl: null, createdAt: '2024-06-05T00:00:00.000Z', updatedAt: '2024-06-05T00:00:00.000Z' },
    // Kos 6 rooms
    { id: 'room-6-1', kosId: 'kos-6', name: 'Studio G-01', type: 'Studio', price: 4000000, size: '4x5 m', isAvailable: true, imageUrl: null, createdAt: '2024-06-06T00:00:00.000Z', updatedAt: '2024-06-06T00:00:00.000Z' },
    { id: 'room-6-2', kosId: 'kos-6', name: 'Studio G-02', type: 'Studio', price: 4000000, size: '4x5 m', isAvailable: true, imageUrl: null, createdAt: '2024-06-06T00:00:00.000Z', updatedAt: '2024-06-06T00:00:00.000Z' },
    { id: 'room-6-3', kosId: 'kos-6', name: '1BR G-03', type: '1 Bedroom', price: 5500000, size: '5x6 m', isAvailable: true, imageUrl: null, createdAt: '2024-06-06T00:00:00.000Z', updatedAt: '2024-06-06T00:00:00.000Z' },
    { id: 'room-6-4', kosId: 'kos-6', name: '1BR G-04', type: '1 Bedroom', price: 5500000, size: '5x6 m', isAvailable: false, imageUrl: null, createdAt: '2024-06-06T00:00:00.000Z', updatedAt: '2024-06-06T00:00:00.000Z' },
    { id: 'room-6-5', kosId: 'kos-6', name: 'PH G-05', type: 'Penthouse', price: 8000000, size: '8x10 m', isAvailable: true, imageUrl: null, createdAt: '2024-06-06T00:00:00.000Z', updatedAt: '2024-06-06T00:00:00.000Z' },
    // Kos 7 rooms
    { id: 'room-7-1', kosId: 'kos-7', name: 'Std-M1', type: 'Standard', price: 1000000, size: '3x3 m', isAvailable: true, imageUrl: null, createdAt: '2024-06-07T00:00:00.000Z', updatedAt: '2024-06-07T00:00:00.000Z' },
    { id: 'room-7-2', kosId: 'kos-7', name: 'Std-M2', type: 'Standard', price: 1000000, size: '3x3 m', isAvailable: false, imageUrl: null, createdAt: '2024-06-07T00:00:00.000Z', updatedAt: '2024-06-07T00:00:00.000Z' },
    { id: 'room-7-3', kosId: 'kos-7', name: 'Dlx-M1', type: 'Deluxe', price: 1800000, size: '3.5x4 m', isAvailable: true, imageUrl: null, createdAt: '2024-06-07T00:00:00.000Z', updatedAt: '2024-06-07T00:00:00.000Z' },
    { id: 'room-7-4', kosId: 'kos-7', name: 'Dlx-M2', type: 'Deluxe', price: 1800000, size: '3.5x4 m', isAvailable: true, imageUrl: null, createdAt: '2024-06-07T00:00:00.000Z', updatedAt: '2024-06-07T00:00:00.000Z' },
    // Kos 8 rooms
    { id: 'room-8-1', kosId: 'kos-8', name: 'Std-E1', type: 'Standard', price: 600000, size: '2.5x3 m', isAvailable: true, imageUrl: null, createdAt: '2024-06-08T00:00:00.000Z', updatedAt: '2024-06-08T00:00:00.000Z' },
    { id: 'room-8-2', kosId: 'kos-8', name: 'Std-E2', type: 'Standard', price: 600000, size: '2.5x3 m', isAvailable: true, imageUrl: null, createdAt: '2024-06-08T00:00:00.000Z', updatedAt: '2024-06-08T00:00:00.000Z' },
    { id: 'room-8-3', kosId: 'kos-8', name: 'Std-E3', type: 'Standard', price: 650000, size: '2.5x3 m', isAvailable: true, imageUrl: null, createdAt: '2024-06-08T00:00:00.000Z', updatedAt: '2024-06-08T00:00:00.000Z' },
    { id: 'room-8-4', kosId: 'kos-8', name: 'StdP-E1', type: 'Standard Plus', price: 1000000, size: '3x3 m', isAvailable: false, imageUrl: null, createdAt: '2024-06-08T00:00:00.000Z', updatedAt: '2024-06-08T00:00:00.000Z' },
    { id: 'room-8-5', kosId: 'kos-8', name: 'Std-E4', type: 'Standard', price: 600000, size: '2.5x3 m', isAvailable: true, imageUrl: null, createdAt: '2024-06-08T00:00:00.000Z', updatedAt: '2024-06-08T00:00:00.000Z' },
  ],

  reviews: [
    { id: 'review-1', userId: 'user-1', kosId: 'kos-1', rating: 4, comment: 'Kos bersih dan nyaman, fasilitas lengkap. Pemilik ramah dan responsif.', createdAt: '2024-07-01T10:00:00.000Z', updatedAt: '2024-07-01T10:00:00.000Z' },
    { id: 'review-2', userId: 'user-2', kosId: 'kos-1', rating: 5, comment: 'Sangat puas! Lingkungan aman, dekat dengan kampus. WiFi cepat.', createdAt: '2024-07-02T14:00:00.000Z', updatedAt: '2024-07-02T14:00:00.000Z' },
    { id: 'review-3', userId: 'user-3', kosId: 'kos-2', rating: 5, comment: 'Kos terbaik yang pernah saya tinggali. Kolam renang dan gym jadi nilai plus!', createdAt: '2024-07-03T09:00:00.000Z', updatedAt: '2024-07-03T09:00:00.000Z' },
    { id: 'review-4', userId: 'user-1', kosId: 'kos-3', rating: 4, comment: 'Harga terjangkau, lokasi strategis. Cuma kamarnya agak sempit.', createdAt: '2024-07-04T11:00:00.000Z', updatedAt: '2024-07-04T11:00:00.000Z' },
    { id: 'review-5', userId: 'user-2', kosId: 'kos-3', rating: 3, comment: 'Lumayan untuk harganya. Air kadang mati tapi overall oke.', createdAt: '2024-07-05T16:00:00.000Z', updatedAt: '2024-07-05T16:00:00.000Z' },
    { id: 'review-6', userId: 'user-3', kosId: 'kos-4', rating: 5, comment: 'Premium banget! Kamar luas, keamanan ketat. Worth the price.', createdAt: '2024-07-06T08:00:00.000Z', updatedAt: '2024-07-06T08:00:00.000Z' },
    { id: 'review-7', userId: 'user-1', kosId: 'kos-5', rating: 4, comment: 'Taman dan lingkungan asri bikin betah. Recommended!', createdAt: '2024-07-07T13:00:00.000Z', updatedAt: '2024-07-07T13:00:00.000Z' },
    { id: 'review-8', userId: 'user-2', kosId: 'kos-6', rating: 5, comment: 'Fasilitas super lengkap, smart home system keren. Pelayanan top.', createdAt: '2024-07-08T15:00:00.000Z', updatedAt: '2024-07-08T15:00:00.000Z' },
    { id: 'review-9', userId: 'user-3', kosId: 'kos-6', rating: 4, comment: 'Kos mewah dengan harga sepadan. Co-working space sangat berguna.', createdAt: '2024-07-09T10:00:00.000Z', updatedAt: '2024-07-09T10:00:00.000Z' },
    { id: 'review-10', userId: 'user-1', kosId: 'kos-7', rating: 4, comment: 'Suasana seperti rumah sendiri. Sesama penghuni baik-baik.', createdAt: '2024-07-10T12:00:00.000Z', updatedAt: '2024-07-10T12:00:00.000Z' },
    { id: 'review-11', userId: 'user-2', kosId: 'kos-8', rating: 3, comment: 'Untuk harga segini sudah oke. Lokasi dekat angkot.', createdAt: '2024-07-11T14:00:00.000Z', updatedAt: '2024-07-11T14:00:00.000Z' },
    { id: 'review-12', userId: 'user-3', kosId: 'kos-1', rating: 4, comment: 'Dapur bersama bersih, laundry terjangkau. Recommended!', createdAt: '2024-07-12T09:00:00.000Z', updatedAt: '2024-07-12T09:00:00.000Z' },
  ],

  bookings: [
    { id: 'booking-1', userId: 'user-1', kosId: 'kos-1', roomId: 'room-1-3', checkInDate: '2025-01-15', duration: 6, totalPrice: 9000000, status: 'confirmed', paymentMethod: 'transfer', paymentProof: null, createdAt: '2025-01-10T00:00:00.000Z', updatedAt: '2025-01-15T00:00:00.000Z' },
    { id: 'booking-2', userId: 'user-3', kosId: 'kos-2', roomId: 'room-2-2', checkInDate: '2025-02-01', duration: 12, totalPrice: 36000000, status: 'confirmed', paymentMethod: 'ewallet', paymentProof: null, createdAt: '2025-01-25T00:00:00.000Z', updatedAt: '2025-02-01T00:00:00.000Z' },
    { id: 'booking-3', userId: 'user-2', kosId: 'kos-3', roomId: 'room-3-2', checkInDate: '2025-03-01', duration: 6, totalPrice: 4800000, status: 'completed', paymentMethod: 'transfer', paymentProof: null, createdAt: '2025-02-20T00:00:00.000Z', updatedAt: '2025-09-01T00:00:00.000Z' },
    { id: 'booking-4', userId: 'user-1', kosId: 'kos-4', roomId: 'room-4-1', checkInDate: '2025-01-10', duration: 6, totalPrice: 15000000, status: 'paid', paymentMethod: 'ewallet', paymentProof: null, createdAt: '2025-01-05T00:00:00.000Z', updatedAt: '2025-01-10T00:00:00.000Z' },
  ],

  surveys: [
    { id: 'survey-1', userId: 'user-1', kosId: 'kos-1', scheduledDate: '2025-07-20', scheduledTime: '10:00', status: 'confirmed', notes: 'Ingin melihat kamar Deluxe', createdAt: '2025-07-15T00:00:00.000Z', updatedAt: '2025-07-15T00:00:00.000Z' },
    { id: 'survey-2', userId: 'user-2', kosId: 'kos-2', scheduledDate: '2025-07-22', scheduledTime: '14:00', status: 'pending', notes: 'Survey untuk studio room', createdAt: '2025-07-16T00:00:00.000Z', updatedAt: '2025-07-16T00:00:00.000Z' },
    { id: 'survey-3', userId: 'user-3', kosId: 'kos-5', scheduledDate: '2025-07-18', scheduledTime: '11:00', status: 'completed', notes: null, createdAt: '2025-07-14T00:00:00.000Z', updatedAt: '2025-07-18T00:00:00.000Z' },
  ],

  promos: [
    { id: 'promo-1', kosId: 'kos-1', title: '🎉 Diskon Akhir Tahun!', description: 'Dapatkan diskon 20% untuk kontrak 6 bulan pertama! Promo berlaku hingga akhir bulan. Segera booking sebelum kehabisan!', imageUrl: null, startDate: '2025-05-01', endDate: '2027-12-31', discount: 20, isActive: true, createdAt: '2025-07-01T00:00:00.000Z', updatedAt: '2025-07-01T00:00:00.000Z' },
    { id: 'promo-2', kosId: 'kos-2', title: '🔥 Grand Opening Green Living', description: 'Free biaya deposit untuk 50 pendaftar pertama! Nikmati fasilitas premium dengan penawaran spesial.', imageUrl: null, startDate: '2025-05-01', endDate: '2027-08-15', discount: 15, isActive: true, createdAt: '2025-07-01T00:00:00.000Z', updatedAt: '2025-07-01T00:00:00.000Z' },
    { id: 'promo-3', kosId: 'kos-6', title: '✨ Summer Special Deal', description: 'Book sekarang dan dapatkan 1 bulan gratis! Tersedia untuk tipe Studio dan 1 Bedroom.', imageUrl: null, startDate: '2025-05-15', endDate: '2027-07-31', discount: 25, isActive: true, createdAt: '2025-06-15T00:00:00.000Z', updatedAt: '2025-06-15T00:00:00.000Z' },
  ],

  chatMessages: [
    { id: 'chat-1', senderId: 'user-1', receiverId: 'owner-1', kosId: 'kos-1', message: 'Halo kak, mau tanya kamar Deluxe masih tersedia?', isRead: true, createdAt: '2025-07-10T10:00:00.000Z' },
    { id: 'chat-2', senderId: 'owner-1', receiverId: 'user-1', kosId: 'kos-1', message: 'Halo! Masih tersedia kak. Mau jadwalkan survei?', isRead: true, createdAt: '2025-07-10T10:05:00.000Z' },
    { id: 'chat-3', senderId: 'user-1', receiverId: 'owner-1', kosId: 'kos-1', message: 'Boleh kak, kapan bisa datang?', isRead: true, createdAt: '2025-07-10T10:10:00.000Z' },
    { id: 'chat-4', senderId: 'owner-1', receiverId: 'user-1', kosId: 'kos-1', message: 'Bisa hari Sabtu atau Minggu kak, jam 10-16. Silakan booking survei di aplikasi ya!', isRead: false, createdAt: '2025-07-10T10:15:00.000Z' },
  ],
};

// ============================================================
// JSON Database Class
// ============================================================

class JsonDB {
  private data: DBData;

  constructor() {
    this.data = JSON.parse(JSON.stringify(seedData));
  }

  // ---- Helper methods ----
  private generateId(): string {
    return uuidv4();
  }

  findUserById(id: string): UserRecord | undefined {
    return this.data.users.find((u) => u.id === id);
  }

  // ---- USER operations ----

  findUserByEmail(email: string): UserRecord | undefined {
    return this.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  createUser(data: {
    email: string;
    password: string;
    name: string;
    phone?: string | null;
    role?: string;
  }): UserRecord {
    const now = new Date().toISOString();
    const user: UserRecord = {
      id: this.generateId(),
      email: data.email,
      password: data.password,
      name: data.name,
      phone: data.phone || null,
      role: (data.role as 'user' | 'owner') || 'user',
      avatar: null,
      createdAt: now,
      updatedAt: now,
    };
    this.data.users.push(user);
    return user;
  }

  // ---- KOS operations ----

  findKosById(id: string): KosRecord | undefined {
    return this.data.kos.find((k) => k.id === id);
  }

  findKosMany(params: {
    search?: string;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    facility?: string;
    page?: number;
    limit?: number;
  }): { data: any[]; total: number } {
    const { search, city, minPrice, maxPrice, facility, page = 1, limit = 10 } = params;
    let filtered = [...this.data.kos];

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (k) => k.name.toLowerCase().includes(q) || k.city.toLowerCase().includes(q)
      );
    }

    if (city) {
      const q = city.toLowerCase();
      filtered = filtered.filter((k) => k.city.toLowerCase().includes(q));
    }

    if (minPrice !== undefined) {
      filtered = filtered.filter((k) => k.priceFrom >= minPrice);
    }

    if (maxPrice !== undefined) {
      filtered = filtered.filter((k) => k.priceTo <= maxPrice);
    }

    if (facility) {
      const q = facility.toLowerCase();
      const kosIdsWithFacility = new Set(
        this.data.kosFacilities
          .filter((kf) => {
            const fac = this.data.facilities.find((f) => f.id === kf.facilityId);
            return fac && fac.name.toLowerCase().includes(q);
          })
          .map((kf) => kf.kosId)
      );
      filtered = filtered.filter((k) => kosIdsWithFacility.has(k.id));
    }

    // Sort by createdAt desc
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const total = filtered.length;
    const skip = (page - 1) * limit;
    const paginated = filtered.slice(skip, skip + limit);

    const data = paginated.map((kos) => {
      const reviews = this.data.reviews.filter((r) => r.kosId === kos.id);
      const rooms = this.data.rooms.filter((r) => r.kosId === kos.id);
      const facilities = this.data.kosFacilities
        .filter((kf) => kf.kosId === kos.id)
        .map((kf) => {
          const fac = this.data.facilities.find((f) => f.id === kf.facilityId);
          return fac ? { kosId: kos.id, facilityId: fac.id, facility: fac } : null;
        })
        .filter(Boolean);

      const avgRating =
        reviews.length > 0
          ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10
          : 0;

      const availableRoomCount = rooms.filter((r) => r.isAvailable).length;

      return {
        ...kos,
        avgRating,
        reviewCount: reviews.length,
        availableRoomCount,
        facilities,
        _count: { rooms: rooms.length },
        reviews: undefined,
      };
    });

    return { data, total };
  }

  findKosByOwnerId(ownerId: string): any[] {
    return this.data.kos
      .filter((k) => k.ownerId === ownerId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map((kos) => {
        const rooms = this.data.rooms.filter((r) => r.kosId === kos.id);
        const bookings = this.data.bookings.filter((b) => b.kosId === kos.id);
        const reviews = this.data.reviews.filter((r) => r.kosId === kos.id);

        return {
          ...kos,
          _count: {
            rooms: rooms.length,
            bookings: bookings.length,
            reviews: reviews.length,
          },
        };
      });
  }

  createKos(data: {
    ownerId: string;
    name: string;
    description?: string;
    address: string;
    city: string;
    district?: string;
    latitude?: number;
    longitude?: number;
    imageUrl?: string;
    priceFrom?: number;
    priceTo?: number;
    totalRooms?: number;
    rules?: string;
    roomTypes?: string;
  }): KosRecord {
    const now = new Date().toISOString();
    const kos: KosRecord = {
      id: this.generateId(),
      name: data.name,
      description: data.description || '',
      address: data.address,
      city: data.city,
      district: data.district || '',
      latitude: data.latitude || null,
      longitude: data.longitude || null,
      ownerId: data.ownerId,
      imageUrl: data.imageUrl || null,
      priceFrom: data.priceFrom || 0,
      priceTo: data.priceTo || 0,
      totalRooms: data.totalRooms || 0,
      availableRooms: data.totalRooms || 0,
      rules: data.rules || null,
      roomTypes: data.roomTypes || null,
      createdAt: now,
      updatedAt: now,
    };
    this.data.kos.push(kos);
    return kos;
  }

  getKosDetailWithRelations(id: string): any | null {
    const kos = this.findKosById(id);
    if (!kos) return null;

    const owner = this.findUserById(kos.ownerId);
    const facilities = this.data.kosFacilities
      .filter((kf) => kf.kosId === kos.id)
      .map((kf) => {
        const fac = this.data.facilities.find((f) => f.id === kf.facilityId);
        return fac ? { kosId: kos.id, facilityId: fac.id, facility: fac } : null;
      })
      .filter(Boolean);

    const rooms = this.data.rooms
      .filter((r) => r.kosId === kos.id)
      .sort((a, b) => a.price - b.price);

    const reviews = this.data.reviews
      .filter((r) => r.kosId === kos.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map((r) => {
        const user = this.findUserById(r.userId);
        return {
          ...r,
          user: user ? { id: user.id, name: user.name, avatar: user.avatar } : null,
        };
      });

    const promos = this.data.promos
      .filter((p) => p.kosId === kos.id && p.isActive)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const avgRating =
      reviews.length > 0
        ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10
        : 0;

    return {
      ...kos,
      owner: owner
        ? { id: owner.id, email: owner.email, name: owner.name, phone: owner.phone, avatar: owner.avatar, role: owner.role }
        : null,
      facilities,
      rooms,
      reviews,
      promos,
      avgRating,
      reviewCount: reviews.length,
    };
  }

  // ---- ROOM operations ----

  findRoomById(id: string): RoomRecord | undefined {
    return this.data.rooms.find((r) => r.id === id);
  }

  findRoom(params: { id?: string; kosId?: string; name?: string; isAvailable?: boolean }): RoomRecord | undefined {
    return this.data.rooms.find((r) => {
      if (params.id && r.id !== params.id) return false;
      if (params.kosId && r.kosId !== params.kosId) return false;
      if (params.name && r.name !== params.name) return false;
      if (params.isAvailable !== undefined && r.isAvailable !== params.isAvailable) return false;
      return true;
    });
  }

  updateRoom(id: string, data: Partial<RoomRecord>): RoomRecord | undefined {
    const idx = this.data.rooms.findIndex((r) => r.id === id);
    if (idx === -1) return undefined;
    this.data.rooms[idx] = { ...this.data.rooms[idx], ...data, updatedAt: new Date().toISOString() };
    return this.data.rooms[idx];
  }

  getRoomsByKosId(kosId: string): RoomRecord[] {
    return this.data.rooms.filter((r) => r.kosId === kosId);
  }

  // ---- REVIEW operations ----

  findReviewsByKosId(kosId: string): any[] {
    return this.data.reviews
      .filter((r) => r.kosId === kosId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map((r) => {
        const user = this.findUserById(r.userId);
        return {
          ...r,
          user: user ? { id: user.id, name: user.name, avatar: user.avatar } : null,
        };
      });
  }

  findReviewByUserAndKos(userId: string, kosId: string): ReviewRecord | undefined {
    return this.data.reviews.find((r) => r.userId === userId && r.kosId === kosId);
  }

  createReview(data: {
    userId: string;
    kosId: string;
    rating: number;
    comment?: string;
  }): any {
    const now = new Date().toISOString();
    const review: ReviewRecord = {
      id: this.generateId(),
      userId: data.userId,
      kosId: data.kosId,
      rating: data.rating,
      comment: data.comment || null,
      createdAt: now,
      updatedAt: now,
    };
    this.data.reviews.push(review);

    const user = this.findUserById(review.userId);
    return {
      ...review,
      user: user ? { id: user.id, name: user.name, avatar: user.avatar } : null,
    };
  }

  // ---- BOOKING operations ----

  createBooking(data: {
    userId: string;
    kosId: string;
    roomId: string;
    checkInDate: string;
    duration: number;
    paymentMethod?: string;
  }): any {
    const room = this.findRoomById(data.roomId);
    if (!room) return null;

    const totalPrice = room.price * data.duration;
    const now = new Date().toISOString();

    const booking: BookingRecord = {
      id: this.generateId(),
      userId: data.userId,
      kosId: data.kosId,
      roomId: data.roomId,
      checkInDate: data.checkInDate,
      duration: data.duration,
      totalPrice,
      status: 'pending',
      paymentMethod: data.paymentMethod || null,
      paymentProof: null,
      createdAt: now,
      updatedAt: now,
    };
    this.data.bookings.push(booking);

    // Set room to unavailable
    this.updateRoom(data.roomId, { isAvailable: false });

    // Update kos availableRooms
    const kosIdx = this.data.kos.findIndex((k) => k.id === data.kosId);
    if (kosIdx !== -1 && this.data.kos[kosIdx].availableRooms > 0) {
      this.data.kos[kosIdx].availableRooms -= 1;
    }

    const user = this.findUserById(booking.userId);
    const kos = this.findKosById(booking.kosId);
    const roomUpdated = this.findRoomById(booking.roomId);

    return {
      ...booking,
      user: user ? { id: user.id, name: user.name, email: user.email } : null,
      kos: kos ? { id: kos.id, name: kos.name } : null,
      room: roomUpdated ? { id: roomUpdated.id, name: roomUpdated.name, type: roomUpdated.type } : null,
    };
  }

  findBookingsByUserId(userId: string): any[] {
    return this.data.bookings
      .filter((b) => b.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map((b) => {
        const kos = this.findKosById(b.kosId);
        const room = this.findRoomById(b.roomId);
        const user = this.findUserById(b.userId);

        return {
          ...b,
          kos: kos ? { id: kos.id, name: kos.name, imageUrl: kos.imageUrl, city: kos.city, district: kos.district } : null,
          room: room ? { id: room.id, name: room.name, type: room.type } : null,
          user: user ? { id: user.id, name: user.name, email: user.email } : null,
        };
      });
  }

  findBookingById(id: string): BookingRecord | undefined {
    return this.data.bookings.find((b) => b.id === id);
  }

  updateBookingStatus(id: string, status: string): any {
    const idx = this.data.bookings.findIndex((b) => b.id === id);
    if (idx === -1) return null;

    const booking = this.data.bookings[idx];
    booking.status = status as BookingRecord['status'];
    booking.updatedAt = new Date().toISOString();

    // If cancelled, restore room availability
    if (status === 'cancelled') {
      this.updateRoom(booking.roomId, { isAvailable: true });
      // Update kos availableRooms
      const kosIdx = this.data.kos.findIndex((k) => k.id === booking.kosId);
      if (kosIdx !== -1) {
        this.data.kos[kosIdx].availableRooms += 1;
      }
    }

    const kos = this.findKosById(booking.kosId);
    const room = this.findRoomById(booking.roomId);
    const user = this.findUserById(booking.userId);

    return {
      ...booking,
      kos: kos ? { id: kos.id, name: kos.name, imageUrl: kos.imageUrl } : null,
      room: room ? { id: room.id, name: room.name, type: room.type } : null,
      user: user ? { id: user.id, name: user.name, email: user.email } : null,
    };
  }

  // ---- SURVEY operations ----

  createSurvey(data: {
    userId: string;
    kosId: string;
    scheduledDate: string;
    scheduledTime: string;
    notes?: string;
  }): any {
    const now = new Date().toISOString();
    const survey: SurveyRecord = {
      id: this.generateId(),
      userId: data.userId,
      kosId: data.kosId,
      scheduledDate: data.scheduledDate,
      scheduledTime: data.scheduledTime,
      notes: data.notes || null,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    };
    this.data.surveys.push(survey);

    const user = this.findUserById(survey.userId);
    const kos = this.findKosById(survey.kosId);

    return {
      ...survey,
      user: user ? { id: user.id, name: user.name, email: user.email, phone: user.phone } : null,
      kos: kos ? { id: kos.id, name: kos.name, address: kos.address } : null,
    };
  }

  // ---- PROMO operations ----

  findActivePromos(): any[] {
    const today = new Date().toISOString().split('T')[0];

    return this.data.promos
      .filter((p) => p.isActive && p.endDate >= today)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map((p) => {
        const kos = this.findKosById(p.kosId);
        return {
          ...p,
          kos: kos ? { id: kos.id, name: kos.name, imageUrl: kos.imageUrl, city: kos.city } : null,
        };
      });
  }

  // ---- CHAT operations ----

  findChatMessages(userId: string, otherUserId: string, kosId?: string): any[] {
    let messages = this.data.chatMessages.filter((m) => {
      const isBetween = 
        (m.senderId === userId && m.receiverId === otherUserId) ||
        (m.senderId === otherUserId && m.receiverId === userId);
      if (!isBetween) return false;
      if (kosId && m.kosId !== kosId) return false;
      return true;
    });

    messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    // Mark as read
    this.data.chatMessages.forEach((m) => {
      if (m.senderId === otherUserId && m.receiverId === userId && !m.isRead) {
        m.isRead = true;
      }
    });

    return messages.map((m) => {
      const sender = this.findUserById(m.senderId);
      const receiver = this.findUserById(m.receiverId);
      return {
        ...m,
        sender: sender ? { id: sender.id, name: sender.name, avatar: sender.avatar } : null,
        receiver: receiver ? { id: receiver.id, name: receiver.name, avatar: receiver.avatar } : null,
      };
    });
  }

  createChatMessage(data: {
    senderId: string;
    receiverId: string;
    kosId?: string;
    message: string;
  }): any {
    const msg: ChatMessageRecord = {
      id: this.generateId(),
      senderId: data.senderId,
      receiverId: data.receiverId,
      kosId: data.kosId || null,
      message: data.message,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    this.data.chatMessages.push(msg);

    const sender = this.findUserById(msg.senderId);
    const receiver = this.findUserById(msg.receiverId);

    return {
      ...msg,
      sender: sender ? { id: sender.id, name: sender.name, avatar: sender.avatar } : null,
      receiver: receiver ? { id: receiver.id, name: receiver.name, avatar: receiver.avatar } : null,
    };
  }

  // ---- Utility ----
  getOwnerKosWithCounts(ownerId: string): any[] {
    return this.data.kos
      .filter((k) => k.ownerId === ownerId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map((kos) => {
        const rooms = this.data.rooms.filter((r) => r.kosId === kos.id);
        const bookings = this.data.bookings.filter((b) => b.kosId === kos.id);
        const reviews = this.data.reviews.filter((r) => r.kosId === kos.id);

        return {
          ...kos,
          _count: {
            rooms: rooms.length,
            bookings: bookings.length,
            reviews: reviews.length,
          },
        };
      });
  }
}

// Singleton instance for Vercel serverless
const globalForDb = globalThis as unknown as {
  jsonDb: JsonDB | undefined;
};

export const db = globalForDb.jsonDb ?? new JsonDB();

if (process.env.NODE_ENV !== 'production') {
  globalForDb.jsonDb = db;
}
