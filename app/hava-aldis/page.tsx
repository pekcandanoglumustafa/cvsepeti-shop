import Image from "next/image";
import { ShieldCheck, Award, Settings } from "lucide-react";

export const metadata = { title: "Hava ALDIS | CV Sepeti" };

export default function AldisPage() {
  return (
    <main>
      <section className="relative bg-[var(--ink)] text-[var(--paper)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 grid sm:grid-cols-2 gap-10 items-center">
          <div>
            <span className="tag-stencil text-[var(--safety-orange)] text-sm">
              %100 Yerli ve Milli
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-bold mt-3 leading-tight">
              Hava ALDIS Sinyal Lambası
            </h1>
            <p className="mt-5 text-[var(--paper-deep)] leading-relaxed">
              Tamamen kendi öz kaynaklarımızla, ilk olarak Antalya Sahil
              Komutanlığı için geliştirdiğimiz yüksek askeri standartlara sahip
              ALDIS ürünümüz, sivil ve askeri hava kontrol kulelerinde
              kullanılmaktadır. Kriz anlarında hava kulesi ile uçak ve
              helikopter gibi hava araçları arasında Yeşil-Kırmızı-Beyaz ışık
              kodları aracılığıyla iletişim sağlanarak hava araçlarının güvenle
              iniş yapması sağlanır.
            </p>
          </div>
          <div className="relative h-72 sm:h-96 border border-[#3A3F4B]">
            <Image
              src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=796,fit=crop/YBg473MrO1cZj0bv/chatgpt-image-5-agiu-2025-15_01_16-dOqDL24Ra6hNoBkw.png"
              alt="ALDIS Hava Sinyal Lambası"
              fill
              className="object-cover"
              unoptimized
              priority
            />
          </div>
        </div>
        <div className="hazard-stripe" />
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14 grid sm:grid-cols-3 gap-8">
        <div>
          <ShieldCheck className="text-[var(--safety-orange)] mb-3" size={32} />
          <h3 className="font-display text-lg font-bold mb-2">
            Referansımız: Antalya Hava Üssü
          </h3>
          <p className="text-sm text-[var(--ink-soft)]">
            T.C. Sahil Güvenlik Komutanlığı Antalya Hava Üssü için özel olarak
            üretilmiştir. Şerefli Türk Ordusu'na tedarik hizmeti vermekten
            gurur duyuyoruz.
          </p>
        </div>
        <div>
          <Award className="text-[var(--safety-orange)] mb-3" size={32} />
          <h3 className="font-display text-lg font-bold mb-2">
            En Yüksek Standartta Kalite
          </h3>
          <p className="text-sm text-[var(--ink-soft)]">
            Türk Ordusu her zaman en yüksek standartlara sahip ürünleri kullanır.
            IP56 koruma sınıfı ile her koşulda güvenilir performans.
          </p>
        </div>
        <div>
          <Settings className="text-[var(--safety-orange)] mb-3" size={32} />
          <h3 className="font-display text-lg font-bold mb-2">
            Talebe Özel Üretim
          </h3>
          <p className="text-sm text-[var(--ink-soft)]">
            Sahil Güvenlik Komutanlığı'nın talep ve istekleri doğrultusunda üst
            düzey kalite ile özel olarak üretilmiştir.
          </p>
        </div>
      </section>

      <section className="bg-white border-t border-[var(--line)]">
        <div className="max-w-3xl mx-auto px-4 py-14 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
            Teklif Almak İçin Bizimle İletişime Geçin
          </h2>
          <p className="text-[var(--ink-soft)] mb-6">
            ALDIS sinyal lambası ve diğer havacılık ürünleri hakkında bilgi
            almak için WhatsApp veya telefon üzerinden bize ulaşabilirsiniz.
          </p>
          <a
            href="https://wa.me/905076584245?text=ALDIS%20%C3%BCr%C3%BCn%C3%BC%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[var(--safety-orange)] text-white px-6 py-3.5 font-display tag-stencil text-sm hover:bg-[var(--safety-orange-dark)] transition-colors"
          >
            WhatsApp'tan Teklif Al
          </a>
        </div>
      </section>
    </main>
  );
}
