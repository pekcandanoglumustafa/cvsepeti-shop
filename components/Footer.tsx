import Link from "next/link";
import { MapPin, Clock, Mail } from "lucide-react";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIconSvg() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[var(--surface)] text-[var(--text)] border-t border-[var(--line)] mt-20">
      <div className="hazard-stripe" />
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h3 className="font-display text-2xl font-bold mb-3">
            CV<span className="text-[var(--gold)]">SEPETİ</span>
          </h3>
          <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
            Trafik güvenliği, su yalıtımı ve iş güvenliği malzemeleri konusunda
            geniş ürün kataloğu sunuyoruz.
          </p>
        </div>

        <div>
          <h4 className="tag-stencil text-sm mb-4 text-[var(--gold)]">
            Hızlı Bağlantılar
          </h4>
          <ul className="space-y-2 text-sm text-[var(--ink-soft)]">
            <li><Link href="/urunler" className="hover:text-[var(--gold)]">Tüm Ürünler</Link></li>
            <li><Link href="/sepet" className="hover:text-[var(--gold)]">Sepetim</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="tag-stencil text-sm mb-4 text-[var(--gold)]">
            İletişim
          </h4>
          <ul className="space-y-3 text-sm text-[var(--ink-soft)]">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <span>Konya Teknokent</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock size={16} className="mt-0.5 shrink-0" />
              <span>Pazartesi - Cuma</span>
            </li>
            <li className="flex items-start gap-2">
              <Mail size={16} className="mt-0.5 shrink-0" />
              <a href="mailto:mustafa@cvsepeti.com" className="hover:text-[var(--gold)]">
                mustafa@cvsepeti.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="tag-stencil text-sm mb-4 text-[var(--gold)]">
            Bizi Takip Edin
          </h4>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/cvsepetii/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-[var(--line)] rounded-sm hover:bg-[var(--gold)] hover:border-[var(--gold)] hover:text-[var(--ink)] transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.linkedin.com/company/cv-sepeti/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-[var(--line)] rounded-sm hover:bg-[var(--gold)] hover:border-[var(--gold)] hover:text-[var(--ink)] transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIconSvg />
            </a>
          </div>
          <p className="text-xs text-[var(--ink-soft)] mt-6">
            Ödemeleriniz iyzico güvencesiyle korunmaktadır.
          </p>
        </div>
      </div>
      <div className="border-t border-[var(--line)] py-4 text-center text-xs text-[var(--ink-soft)]">
        © {new Date().getFullYear()} CV Sepeti. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
