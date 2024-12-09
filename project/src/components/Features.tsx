import React from 'react';
import { useAdminStore } from '../store/adminStore';
import { BookOpen, Target, Users, Clock } from 'lucide-react';

const iconMap = {
  BookOpen,
  Target,
  Users,
  Clock,
};

export default function Features() {
  const { features } = useAdminStore();

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-indigo-600 font-semibold text-sm tracking-wide uppercase">
            Neden YUGO AKADEMİ?
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">
            LGS Başarısı İçin Özel Çözümler
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Deneyimli öğretmen kadromuz ve özel ders programlarımızla öğrencinizin başarısı için çalışıyoruz
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <div key={feature.id} className="flex gap-4 p-6 rounded-xl hover:bg-gray-50 transition-all">
                <div className="flex-shrink-0">
                  <Icon className="h-8 w-8 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}