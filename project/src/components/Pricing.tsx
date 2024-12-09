import React from 'react';
import { useAdminStore } from '../store/adminStore';
import { Check, Star } from 'lucide-react';

export default function Pricing() {
  const { pricingPackages } = useAdminStore();
  const whatsappNumber = "+905076865337";
  const whatsappMessage = "Merhaba, YUGO AKADEMİ paketleri hakkında bilgi almak istiyorum.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-indigo-600 font-semibold text-sm tracking-wide uppercase">
            Eğitim Paketleri
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">
            LGS Hazırlık Paketleri
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Öğrencinizin ihtiyaçlarına uygun eğitim paketiyle LGS başarısını yakalayın
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`${
                pkg.isPopular
                  ? 'bg-gradient-to-br from-indigo-600 to-indigo-800 text-white transform scale-105'
                  : 'bg-gradient-to-br from-white to-indigo-50'
              } p-8 rounded-xl shadow-lg border border-indigo-100 hover:shadow-xl transition-all relative`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-4 right-4 bg-yellow-400 text-indigo-900 text-sm font-bold px-4 py-1 rounded-full">
                  EN POPÜLER
                </div>
              )}
              <div className={`${pkg.isPopular ? 'bg-white text-indigo-600' : 'bg-indigo-600 text-white'} px-4 py-2 rounded-lg mb-6 inline-block`}>
                <h3 className="text-2xl font-bold">{pkg.name}</h3>
              </div>
              <div className="space-y-6">
                <div className={`${pkg.isPopular ? 'bg-indigo-700' : 'bg-white'} p-6 rounded-lg shadow-sm`}>
                  <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Star className={`h-5 w-5 ${pkg.isPopular ? 'text-yellow-400' : 'text-yellow-500'}`} />
                    Paket İçeriği
                  </h4>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className={`h-5 w-5 ${pkg.isPopular ? 'text-green-400' : 'text-green-500'}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 w-full py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  pkg.isPopular
                    ? 'bg-white text-indigo-600 hover:bg-gray-100'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                WhatsApp'tan Bilgi Al
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}