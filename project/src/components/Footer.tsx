import React from 'react';
import { useAdminStore } from '../store/adminStore';
import { GraduationCap } from 'lucide-react';

export default function Footer() {
  const { footerContact } = useAdminStore();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <GraduationCap className="h-8 w-8 text-indigo-400" />
              <span className="text-2xl font-bold">YUGO AKADEMİ</span>
            </div>
            <p className="text-gray-400">
              Kaliteli eğitim içerikleri ve uzman kadromuzla geleceğinizi şekillendirin.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Erişim</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Ana Sayfa</a></li>
              <li><a href="#courses" className="text-gray-400 hover:text-white transition-colors">Eğitimler</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Özellikler</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Paketler</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Destek</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">SSS</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Yardım Merkezi</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">İletişim</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Gizlilik Politikası</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">İletişim</h3>
            <ul className="space-y-2 text-gray-400">
              <li>{footerContact.email}</li>
              <li>{footerContact.phone}</li>
              <li style={{ whiteSpace: 'pre-line' }}>{footerContact.address}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} YUGO AKADEMİ. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}