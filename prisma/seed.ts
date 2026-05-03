import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function seed() {
  console.log('🌱 Seeding database...');

  // Clean up
  await db.chatMessage.deleteMany();
  await db.booking.deleteMany();
  await db.survey.deleteMany();
  await db.review.deleteMany();
  await db.promo.deleteMany();
  await db.kosFacility.deleteMany();
  await db.room.deleteMany();
  await db.facility.deleteMany();
  await db.kos.deleteMany();
  await db.user.deleteMany();

  // Create Users
  const owner1 = await db.user.create({
    data: {
      email: 'pemilik@kos.com',
      password: 'owner123',
      name: 'Budi Santoso',
      phone: '081234567890',
      role: 'owner',
    },
  });

  const owner2 = await db.user.create({
    data: {
      email: 'pemilik2@kos.com',
      password: 'owner123',
      name: 'Siti Rahayu',
      phone: '081298765432',
      role: 'owner',
    },
  });

  const owner3 = await db.user.create({
    data: {
      email: 'pemilik3@kos.com',
      password: 'owner123',
      name: 'Ahmad Wijaya',
      phone: '081355566677',
      role: 'owner',
    },
  });

  const user1 = await db.user.create({
    data: {
      email: 'user@kos.com',
      password: 'user123',
      name: 'Rina Pratiwi',
      phone: '085612345678',
      role: 'user',
    },
  });

  const user2 = await db.user.create({
    data: {
      email: 'user2@kos.com',
      password: 'user123',
      name: 'Doni Saputra',
      phone: '085698765432',
      role: 'user',
    },
  });

  const user3 = await db.user.create({
    data: {
      email: 'user3@kos.com',
      password: 'user123',
      name: 'Maya Anggraini',
      phone: '085611122233',
      role: 'user',
    },
  });

  // Create Facilities
  const facilities = await Promise.all([
    db.facility.create({ data: { name: 'WiFi', icon: 'Wifi' } }),
    db.facility.create({ data: { name: 'AC', icon: 'AirVent' } }),
    db.facility.create({ data: { name: 'Kamar Mandi Dalam', icon: 'Bath' } }),
    db.facility.create({ data: { name: 'Parkir Motor', icon: 'Bike' } }),
    db.facility.create({ data: { name: 'Parkir Mobil', icon: 'Car' } }),
    db.facility.create({ data: { name: 'Dapur Bersama', icon: 'CookingPot' } }),
    db.facility.create({ data: { name: 'Laundry', icon: 'Shirt' } }),
    db.facility.create({ data: { name: 'CCTV', icon: 'Camera' } }),
    db.facility.create({ data: { name: 'Keamanan 24 Jam', icon: 'Shield' } }),
    db.facility.create({ data: { name: 'Rooftop', icon: 'Building' } }),
    db.facility.create({ data: { name: 'Kolam Renang', icon: 'Waves' } }),
    db.facility.create({ data: { name: 'Gym', icon: 'Dumbbell' } }),
    db.facility.create({ data: { name: 'Mesin Cuci', icon: 'WashingMachine' } }),
    db.facility.create({ data: { name: 'Listrik Token', icon: 'Zap' } }),
    db.facility.create({ data: { name: 'Air PDAM', icon: 'Droplets' } }),
  ]);

  // Create Kos listings
  const kosList = [
    {
      name: 'Kos Harmoni Putri',
      description: 'Kos putri modern dengan fasilitas lengkap di pusat kota. Lingkungan aman dan bersih, dekat dengan kampus dan pusat perbelanjaan. Tersedia berbagai tipe kamar dari standar hingga premium.',
      address: 'Jl. Merdeka No. 15, Kel. Sukamaju',
      city: 'Bandung',
      district: 'Coblong',
      latitude: -6.8845,
      longitude: 107.6133,
      ownerId: owner1.id,
      imageUrl: '/kos-1.png',
      priceFrom: 1500000,
      priceTo: 3500000,
      totalRooms: 24,
      availableRooms: 8,
      rules: JSON.stringify(['Putri only', 'Tidak boleh membawa hewan peliharaan', 'Jam malam 22:00', 'Tidak boleh merokok di dalam kamar']),
      roomTypes: JSON.stringify(['Standard', 'Deluxe', 'Premium']),
    },
    {
      name: 'Kos Green Living',
      description: 'Kos eksklusif dengan konsep green living. Bangunan baru dengan desain minimalis modern. Dilengkapi rooftop garden, kolam renang, dan gym. Cocok untuk profesional muda.',
      address: 'Jl. Sudirman No. 88, Kel. Kebayoran',
      city: 'Jakarta',
      district: 'Kebayoran Baru',
      latitude: -6.2443,
      longitude: 106.7841,
      ownerId: owner2.id,
      imageUrl: '/kos-2.png',
      priceFrom: 3000000,
      priceTo: 6000000,
      totalRooms: 36,
      availableRooms: 12,
      rules: JSON.stringify(['Campuran', 'Check-out maksimal 12:00', 'Deposit 1 bulan', 'Kontrak minimal 3 bulan']),
      roomTypes: JSON.stringify(['Studio', '1 Bedroom', 'Suite']),
    },
    {
      name: 'Kos Mahasiswa Sejahtera',
      description: 'Kos murah dan strategis untuk mahasiswa. Lokasi dekat kampus UNPAD dan ITB. Fasilitas memadai dengan harga terjangkau. Suasana kekeluargaan dan mendukung aktivitas belajar.',
      address: 'Jl. Dago No. 42, Kel. Lebakgede',
      city: 'Bandung',
      district: 'Coblong',
      latitude: -6.8904,
      longitude: 107.6108,
      ownerId: owner1.id,
      imageUrl: '/kos-3.png',
      priceFrom: 800000,
      priceTo: 1800000,
      totalRooms: 30,
      availableRooms: 5,
      rules: JSON.stringify(['Putra only', 'Tidak membawa tamu setelah jam 21:00', 'Menjaga kebersihan bersama', 'Tidak boleh membuat kebisingan']),
      roomTypes: JSON.stringify(['Standard', 'Standard Plus']),
    },
    {
      name: 'Kos Premium Utama',
      description: 'Kos premium dengan standar hotel bintang 3. Setiap kamar dilengkapi AC, kamar mandi dalam, dan balkon pribadi. Keamanan 24 jam dengan CCTV. Lokasi premium di jantung kota.',
      address: 'Jl. Gatot Subroto No. 55, Kel. Petisah',
      city: 'Medan',
      district: 'Medan Petisah',
      latitude: 3.5952,
      longitude: 98.6722,
      ownerId: owner3.id,
      imageUrl: '/kos-4.png',
      priceFrom: 2500000,
      priceTo: 5000000,
      totalRooms: 20,
      availableRooms: 3,
      rules: JSON.stringify(['Campuran (terpisah lantai)', 'Deposit 2 bulan', 'Kontrak minimal 6 bulan', 'Dilarang merokok di area dalam']),
      roomTypes: JSON.stringify(['Deluxe', 'Executive', 'Suite']),
    },
    {
      name: 'Kos Asri Residence',
      description: 'Kos dengan suasana asri dan tenang, dikelilingi taman hijau. Ideal untuk pekerja dan mahasiswa yang menginginkan lingkungan nyaman. Fasilitas dapur bersama dan laundry tersedia.',
      address: 'Jl. Diponegoro No. 23, Kel. Darmo',
      city: 'Surabaya',
      district: 'Wonokromo',
      latitude: -7.2756,
      longitude: 112.7425,
      ownerId: owner2.id,
      imageUrl: '/kos-5.png',
      priceFrom: 1200000,
      priceTo: 2500000,
      totalRooms: 18,
      availableRooms: 7,
      rules: JSON.stringify(['Campuran', 'Kontrak minimal 1 bulan', 'Menjaga ketenangan setelah 21:00', 'Mematuhi aturan kebersihan']),
      roomTypes: JSON.stringify(['Standard', 'Deluxe']),
    },
    {
      name: 'Kos Eksklusif Grand',
      description: 'Kos eksklusif terbaru dengan desain kontemporer. Dilengkapi smart home system, co-working space, dan lounge area. Pilihan tepat untuk eksekutif muda dan profesional.',
      address: 'Jl. Rasuna Said No. 10, Kel. Kuningan',
      city: 'Jakarta',
      district: 'Setiabudi',
      latitude: -6.2297,
      longitude: 106.8265,
      ownerId: owner3.id,
      imageUrl: '/kos-6.png',
      priceFrom: 4000000,
      priceTo: 8000000,
      totalRooms: 28,
      availableRooms: 10,
      rules: JSON.stringify(['Campuran', 'Deposit 2 bulan', 'Kontrak minimal 6 bulan', 'Check-in/check-out harus melalui resepsionis']),
      roomTypes: JSON.stringify(['Studio', '1 Bedroom', 'Penthouse']),
    },
    {
      name: 'Kos Putri Melati',
      description: 'Kos putri nyaman dengan suasana seperti rumah sendiri. Lokasi strategis dekat dengan mall dan rumah sakit. Dilengkapi dapur bersama dan taman.',
      address: 'Jl. Veteran No. 67, Kel. Ketawanggede',
      city: 'Malang',
      district: 'Lowokwaru',
      latitude: -7.9666,
      longitude: 112.6326,
      ownerId: owner1.id,
      imageUrl: '/kos-7.png',
      priceFrom: 1000000,
      priceTo: 2200000,
      totalRooms: 15,
      availableRooms: 4,
      rules: JSON.stringify(['Putri only', 'Tidak boleh membawa tamu laki-laki', 'Jam malam 21:30', 'Kontrak minimal 3 bulan']),
      roomTypes: JSON.stringify(['Standard', 'Deluxe']),
    },
    {
      name: 'Kos Pahlawan Ekonomi',
      description: 'Kos ekonomis namun tetap nyaman dan bersih. Cocok untuk karyawan dan mahasiswa dengan budget terbatas. Akses mudah ke transportasi umum dan fasilitas publik.',
      address: 'Jl. Pahlawan No. 100, Kel. Buring',
      city: 'Malang',
      district: 'Kedungkandang',
      latitude: -7.9879,
      longitude: 112.6344,
      ownerId: owner2.id,
      imageUrl: '/kos-8.png',
      priceFrom: 600000,
      priceTo: 1200000,
      totalRooms: 25,
      availableRooms: 9,
      rules: JSON.stringify(['Putra only', 'Menjaga kebersihan', 'Tidak boleh membawa hewan peliharaan', 'Pembayaran tepat waktu']),
      roomTypes: JSON.stringify(['Standard', 'Standard Plus']),
    },
  ];

  const createdKos = [];
  for (const kos of kosList) {
    const created = await db.kos.create({ data: kos });
    createdKos.push(created);
  }

  // Assign facilities to kos
  const facilityMap = [
    [0, 1, 2, 3, 5, 7, 8, 13, 14],       // Kos 1
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], // Kos 2
    [0, 3, 5, 7, 8, 12, 13, 14],          // Kos 3
    [0, 1, 2, 3, 4, 6, 7, 8, 9, 13, 14], // Kos 4
    [0, 2, 3, 5, 6, 7, 8, 13, 14],        // Kos 5
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], // Kos 6
    [0, 2, 3, 5, 7, 8, 14],               // Kos 7
    [0, 3, 5, 7, 12, 13, 14],             // Kos 8
  ];

  for (let i = 0; i < createdKos.length; i++) {
    const fIds = facilityMap[i];
    for (const fId of fIds) {
      await db.kosFacility.create({
        data: {
          kosId: createdKos[i].id,
          facilityId: facilities[fId].id,
        },
      });
    }
  }

  // Create Rooms for each kos
  const roomTemplates = [
    // Kos 1: Harmoni Putri
    [
      { name: 'Standard A', type: 'Standard', price: 1500000, size: '3x3 m', isAvailable: true },
      { name: 'Standard B', type: 'Standard', price: 1500000, size: '3x3 m', isAvailable: true },
      { name: 'Standard C', type: 'Standard', price: 1500000, size: '3x3 m', isAvailable: false },
      { name: 'Deluxe A', type: 'Deluxe', price: 2500000, size: '3.5x4 m', isAvailable: true },
      { name: 'Deluxe B', type: 'Deluxe', price: 2500000, size: '3.5x4 m', isAvailable: true },
      { name: 'Premium A', type: 'Premium', price: 3500000, size: '4x5 m', isAvailable: true },
    ],
    // Kos 2: Green Living
    [
      { name: 'Studio 101', type: 'Studio', price: 3000000, size: '4x5 m', isAvailable: true },
      { name: 'Studio 102', type: 'Studio', price: 3000000, size: '4x5 m', isAvailable: false },
      { name: '1 BR 201', type: '1 Bedroom', price: 4500000, size: '5x6 m', isAvailable: true },
      { name: '1 BR 202', type: '1 Bedroom', price: 4500000, size: '5x6 m', isAvailable: true },
      { name: 'Suite 301', type: 'Suite', price: 6000000, size: '6x7 m', isAvailable: true },
    ],
    // Kos 3: Mahasiswa
    [
      { name: 'Std-1A', type: 'Standard', price: 800000, size: '2.5x3 m', isAvailable: true },
      { name: 'Std-1B', type: 'Standard', price: 800000, size: '2.5x3 m', isAvailable: false },
      { name: 'Std-2A', type: 'Standard Plus', price: 1200000, size: '3x3.5 m', isAvailable: true },
      { name: 'Std-2B', type: 'Standard Plus', price: 1200000, size: '3x3.5 m', isAvailable: false },
      { name: 'Std-3A', type: 'Standard', price: 850000, size: '2.5x3 m', isAvailable: true },
    ],
    // Kos 4: Premium Utama
    [
      { name: 'Deluxe D1', type: 'Deluxe', price: 2500000, size: '4x5 m', isAvailable: false },
      { name: 'Deluxe D2', type: 'Deluxe', price: 2500000, size: '4x5 m', isAvailable: false },
      { name: 'Executive E1', type: 'Executive', price: 4000000, size: '5x6 m', isAvailable: true },
      { name: 'Suite S1', type: 'Suite', price: 5000000, size: '6x8 m', isAvailable: true },
    ],
    // Kos 5: Asri Residence
    [
      { name: 'Std-A1', type: 'Standard', price: 1200000, size: '3x3 m', isAvailable: true },
      { name: 'Std-A2', type: 'Standard', price: 1200000, size: '3x3 m', isAvailable: true },
      { name: 'Dlx-B1', type: 'Deluxe', price: 2000000, size: '4x4 m', isAvailable: true },
      { name: 'Dlx-B2', type: 'Deluxe', price: 2000000, size: '4x4 m', isAvailable: false },
      { name: 'Std-A3', type: 'Standard', price: 1200000, size: '3x3 m', isAvailable: true },
    ],
    // Kos 6: Eksklusif Grand
    [
      { name: 'Studio G-01', type: 'Studio', price: 4000000, size: '4x5 m', isAvailable: true },
      { name: 'Studio G-02', type: 'Studio', price: 4000000, size: '4x5 m', isAvailable: true },
      { name: '1BR G-03', type: '1 Bedroom', price: 5500000, size: '5x6 m', isAvailable: true },
      { name: '1BR G-04', type: '1 Bedroom', price: 5500000, size: '5x6 m', isAvailable: false },
      { name: 'PH G-05', type: 'Penthouse', price: 8000000, size: '8x10 m', isAvailable: true },
    ],
    // Kos 7: Putri Melati
    [
      { name: 'Std-M1', type: 'Standard', price: 1000000, size: '3x3 m', isAvailable: true },
      { name: 'Std-M2', type: 'Standard', price: 1000000, size: '3x3 m', isAvailable: false },
      { name: 'Dlx-M1', type: 'Deluxe', price: 1800000, size: '3.5x4 m', isAvailable: true },
      { name: 'Dlx-M2', type: 'Deluxe', price: 1800000, size: '3.5x4 m', isAvailable: true },
    ],
    // Kos 8: Pahlawan Ekonomi
    [
      { name: 'Std-E1', type: 'Standard', price: 600000, size: '2.5x3 m', isAvailable: true },
      { name: 'Std-E2', type: 'Standard', price: 600000, size: '2.5x3 m', isAvailable: true },
      { name: 'Std-E3', type: 'Standard', price: 650000, size: '2.5x3 m', isAvailable: true },
      { name: 'StdP-E1', type: 'Standard Plus', price: 1000000, size: '3x3 m', isAvailable: false },
      { name: 'Std-E4', type: 'Standard', price: 600000, size: '2.5x3 m', isAvailable: true },
    ],
  ];

  for (let i = 0; i < createdKos.length; i++) {
    for (const room of roomTemplates[i]) {
      await db.room.create({
        data: {
          ...room,
          kosId: createdKos[i].id,
        },
      });
    }
  }

  // Create Reviews
  const reviews = [
    { userId: user1.id, kosId: createdKos[0].id, rating: 4, comment: 'Kos bersih dan nyaman, fasilitas lengkap. Pemilik ramah dan responsif.' },
    { userId: user2.id, kosId: createdKos[0].id, rating: 5, comment: 'Sangat puas! Lingkungan aman, dekat dengan kampus. WiFi cepat.' },
    { userId: user3.id, kosId: createdKos[1].id, rating: 5, comment: 'Kos terbaik yang pernah saya tinggali. Kolam renang dan gym jadi nilai plus!' },
    { userId: user1.id, kosId: createdKos[2].id, rating: 4, comment: 'Harga terjangkau, lokasi strategis. Cuma kamarnya agak sempit.' },
    { userId: user2.id, kosId: createdKos[2].id, rating: 3, comment: 'Lumayan untuk harganya. Air kadang mati tapi overall oke.' },
    { userId: user3.id, kosId: createdKos[3].id, rating: 5, comment: 'Premium banget! Kamar luas, keamanan ketat. Worth the price.' },
    { userId: user1.id, kosId: createdKos[4].id, rating: 4, comment: 'Taman dan lingkungan asri bikin betah. Recommended!' },
    { userId: user2.id, kosId: createdKos[5].id, rating: 5, comment: 'Fasilitas super lengkap, smart home system keren. Pelayanan top.' },
    { userId: user3.id, kosId: createdKos[5].id, rating: 4, comment: 'Kos mewah dengan harga sepadan. Co-working space sangat berguna.' },
    { userId: user1.id, kosId: createdKos[6].id, rating: 4, comment: 'Suasana seperti rumah sendiri. Sesama penghuni baik-baik.' },
    { userId: user2.id, kosId: createdKos[7].id, rating: 3, comment: 'Untuk harga segini sudah oke. Lokasi dekat angkot.' },
    { userId: user3.id, kosId: createdKos[0].id, rating: 4, comment: 'Dapur bersama bersih, laundry terjangkau. Recommended!' },
  ];

  for (const review of reviews) {
    await db.review.create({ data: review });
  }

  // Create Bookings
  await db.booking.create({
    data: {
      userId: user1.id,
      kosId: createdKos[0].id,
      roomId: (await db.room.findFirst({ where: { kosId: createdKos[0].id, isAvailable: false } }))!.id,
      checkInDate: '2025-01-15',
      duration: 6,
      totalPrice: 1500000 * 6,
      status: 'confirmed',
      paymentMethod: 'transfer',
    },
  });

  await db.booking.create({
    data: {
      userId: user3.id,
      kosId: createdKos[1].id,
      roomId: (await db.room.findFirst({ where: { kosId: createdKos[1].id, name: 'Studio 102' } }))!.id,
      checkInDate: '2025-02-01',
      duration: 12,
      totalPrice: 3000000 * 12,
      status: 'confirmed',
      paymentMethod: 'ewallet',
    },
  });

  await db.booking.create({
    data: {
      userId: user2.id,
      kosId: createdKos[2].id,
      roomId: (await db.room.findFirst({ where: { kosId: createdKos[2].id, name: 'Std-1B' } }))!.id,
      checkInDate: '2025-03-01',
      duration: 6,
      totalPrice: 800000 * 6,
      status: 'completed',
      paymentMethod: 'transfer',
    },
  });

  await db.booking.create({
    data: {
      userId: user1.id,
      kosId: createdKos[3].id,
      roomId: (await db.room.findFirst({ where: { kosId: createdKos[3].id, name: 'Deluxe D1' } }))!.id,
      checkInDate: '2025-01-10',
      duration: 6,
      totalPrice: 2500000 * 6,
      status: 'paid',
      paymentMethod: 'ewallet',
    },
  });

  // Create Surveys
  await db.survey.create({
    data: {
      userId: user1.id,
      kosId: createdKos[0].id,
      scheduledDate: '2025-07-20',
      scheduledTime: '10:00',
      status: 'confirmed',
      notes: 'Ingin melihat kamar Deluxe',
    },
  });

  await db.survey.create({
    data: {
      userId: user2.id,
      kosId: createdKos[1].id,
      scheduledDate: '2025-07-22',
      scheduledTime: '14:00',
      status: 'pending',
      notes: 'Survey untuk studio room',
    },
  });

  await db.survey.create({
    data: {
      userId: user3.id,
      kosId: createdKos[4].id,
      scheduledDate: '2025-07-18',
      scheduledTime: '11:00',
      status: 'completed',
    },
  });

  // Create Promos
  await db.promo.create({
    data: {
      kosId: createdKos[0].id,
      title: '🎉 Diskon Akhir Tahun!',
      description: 'Dapatkan diskon 20% untuk kontrak 6 bulan pertama! Promo berlaku hingga akhir bulan. Segera booking sebelum kehabisan!',
      startDate: '2025-07-01',
      endDate: '2025-07-31',
      discount: 20,
      isActive: true,
    },
  });

  await db.promo.create({
    data: {
      kosId: createdKos[1].id,
      title: '🔥 Grand Opening Green Living',
      description: 'Free biaya deposit untuk 50 pendaftar pertama! Nikmati fasilitas premium dengan penawaran spesial.',
      startDate: '2025-07-01',
      endDate: '2025-08-15',
      discount: 15,
      isActive: true,
    },
  });

  await db.promo.create({
    data: {
      kosId: createdKos[5].id,
      title: '✨ Summer Special Deal',
      description: 'Book sekarang dan dapatkan 1 bulan gratis! Tersedia untuk tipe Studio dan 1 Bedroom.',
      startDate: '2025-06-15',
      endDate: '2025-07-31',
      discount: 25,
      isActive: true,
    },
  });

  // Create Chat Messages
  await db.chatMessage.create({
    data: {
      senderId: user1.id,
      receiverId: owner1.id,
      kosId: createdKos[0].id,
      message: 'Halo kak, mau tanya kamar Deluxe masih tersedia?',
      isRead: true,
    },
  });

  await db.chatMessage.create({
    data: {
      senderId: owner1.id,
      receiverId: user1.id,
      kosId: createdKos[0].id,
      message: 'Halo! Masih tersedia kak. Mau jadwalkan survei?',
      isRead: true,
    },
  });

  await db.chatMessage.create({
    data: {
      senderId: user1.id,
      receiverId: owner1.id,
      kosId: createdKos[0].id,
      message: 'Boleh kak, kapan bisa datang?',
      isRead: true,
    },
  });

  await db.chatMessage.create({
    data: {
      senderId: owner1.id,
      receiverId: user1.id,
      kosId: createdKos[0].id,
      message: 'Bisa hari Sabtu atau Minggu kak, jam 10-16. Silakan booking survei di aplikasi ya!',
      isRead: false,
    },
  });

  console.log('✅ Seed completed successfully!');
  console.log(`  Users: 6`);
  console.log(`  Kos: ${createdKos.length}`);
  console.log(`  Facilities: ${facilities.length}`);
  console.log(`  Reviews: ${reviews.length}`);
  console.log(`  Promos: 3`);
  console.log(`  Surveys: 3`);
  console.log(`  Bookings: 4`);
  console.log(`  Chat Messages: 4`);
}

seed()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
