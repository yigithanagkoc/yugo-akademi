import React from 'react';
import { useAdminStore } from '../store/adminStore';
import { GraduationCap, BookOpen, Users, Target } from 'lucide-react';

export default function Hero() {
  const { heroSection } = useAdminStore();
  const whatsappNumber = "+905076865337";
  const whatsappMessage = "Merhaba, YUGO AKADEMİ hakkında bilgi almak istiyorum.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="pt-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-4 py-1 rounded-full mb-4 inline-block">
            LGS'ye Hazırlıkta Güvenilir Çözüm Ortağınız
          </span>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {heroSection.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {heroSection.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              WhatsApp'tan Bilgi Al
            </a>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 mt-16">
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <GraduationCap className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Uzman Kadro</h3>
              <p className="text-gray-600">Deneyimli LGS öğretmenleri</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <BookOpen className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Güncel Müfredat</h3>
              <p className="text-gray-600">MEB'e uyumlu içerik</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <Users className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Birebir İlgi</h3>
              <p className="text-gray-600">Kişiye özel eğitim desteği</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <Target className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Başarı Takibi</h3>
              <p className="text-gray-600">Düzenli veli bilgilendirmesi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}