import { Home, Mail, Phone, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="mt-auto bg-neutral-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 text-xl font-bold mb-4">
              <Home className="h-5 w-5 text-emerald-400" />
              <span className="text-emerald-400">KosKu</span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              KosKu adalah platform pencarian kos terpercaya di Indonesia.
              Temukan kos impianmu dengan mudah, aman, dan transparan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Link Cepat</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors">
                  Cari Kos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors">
                  Cara Kerja
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors">
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors">
                  Syarat & Ketentuan
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Hubungi Kami</h3>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>support@kosku.id</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Jl. Teknologi No. 1, Bandung, Jawa Barat 40135</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-neutral-800" />

        <div className="text-center text-sm text-neutral-500">
          <p>&copy; {new Date().getFullYear()} KosKu. Semua hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
