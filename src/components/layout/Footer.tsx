import { Home, Mail, Phone, MapPin, Instagram, Twitter, Facebook, Send } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="mt-auto relative">
      {/* Wave SVG separator */}
      <div className="relative">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          preserveAspectRatio="none"
        >
          <path
            d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V100H0V40Z"
            className="fill-neutral-900 dark:fill-neutral-950"
          />
        </svg>
      </div>

      <div className="bg-neutral-900 dark:bg-neutral-950 text-white">
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* About */}
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <Home className="h-5 w-5 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-xl font-bold tracking-tight">KosKu</span>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                KosKu adalah platform pencarian kos terpercaya di Indonesia. Temukan kos impianmu dengan mudah, aman, dan transparan.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-3">
                {[
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Twitter, label: 'Twitter' },
                  { icon: Facebook, label: 'Facebook' },
                ].map((social) => (
                  <button
                    key={social.label}
                    className="w-10 h-10 rounded-xl bg-neutral-800 hover:bg-emerald-600 flex items-center justify-center transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4 text-neutral-400 hover:text-white" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-5">Link Cepat</h3>
              <ul className="space-y-3">
                {[
                  { label: 'Cari Kos', href: '#' },
                  { label: 'Cara Kerja', href: '#' },
                  { label: 'Kota Populer', href: '#' },
                  { label: 'Tentang Kami', href: '#' },
                  { label: 'Kebijakan Privasi', href: '#' },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-neutral-400 hover:text-emerald-400 transition-colors duration-200 text-sm flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-emerald-400 transition-colors" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-lg mb-5">Resources</h3>
              <ul className="space-y-3">
                {[
                  { label: 'FAQ', href: '#' },
                  { label: 'Panduan Pemilik Kos', href: '#' },
                  { label: 'Panduan Pencari Kos', href: '#' },
                  { label: 'Blog', href: '#' },
                  { label: 'Syarat & Ketentuan', href: '#' },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-neutral-400 hover:text-emerald-400 transition-colors duration-200 text-sm flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-neutral-600 group-hover:bg-emerald-400 transition-colors" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Newsletter */}
            <div>
              <h3 className="font-semibold text-lg mb-5">Hubungi Kami</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2.5 text-neutral-400 text-sm">
                  <Mail className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>support@kosku.id</span>
                </li>
                <li className="flex items-center gap-2.5 text-neutral-400 text-sm">
                  <Phone className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>+62 812 3456 7890</span>
                </li>
                <li className="flex items-start gap-2.5 text-neutral-400 text-sm">
                  <MapPin className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Jl. Teknologi No. 1, Bandung, Jawa Barat 40135</span>
                </li>
              </ul>

              {/* Newsletter */}
              <div>
                <p className="text-sm text-neutral-400 mb-2">Berlangganan newsletter</p>
                <div className="flex gap-2">
                  <Input
                    placeholder="Email kamu"
                    className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 rounded-xl h-10 text-sm focus-visible:ring-emerald-500"
                    type="email"
                  />
                  <Button
                    size="sm"
                    className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shrink-0 px-3"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <Separator className="bg-neutral-800" />
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-neutral-500">
              &copy; {new Date().getFullYear()} KosKu. Semua hak cipta dilindungi.
            </p>
            <div className="flex items-center gap-4 text-sm text-neutral-500">
              <a href="#" className="hover:text-neutral-300 transition-colors">Kebijakan Privasi</a>
              <span className="w-1 h-1 rounded-full bg-neutral-700" />
              <a href="#" className="hover:text-neutral-300 transition-colors">Syarat Layanan</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
