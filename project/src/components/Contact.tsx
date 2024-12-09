import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useAdminStore } from '../store/adminStore';

export default function Contact() {
  const addContact = useAdminStore((state) => state.addContact);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    addContact({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
    });

    // Reset form
    (e.target as HTMLFormElement).reset();
    alert('Mesajınız başarıyla gönderildi. Size en kısa sürede dönüş yapacağız.');
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-indigo-600 font-semibold text-sm tracking-wide uppercase">
            İletişim
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">
            Bizimle İletişime Geçin
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sorularınız için bize ulaşın. Size yardımcı olmaktan mutluluk duyarız.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Adınız Soyadınız"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-posta
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="ornek@email.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="0555 555 5555"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mesajınız
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Mesajınızı yazın..."
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Gönder
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-4 p-6 rounded-lg hover:bg-gray-50 transition-all">
              <Mail className="h-6 w-6 text-indigo-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-1">E-posta</h3>
                <p className="text-gray-600">iletisim@yugokademi.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-6 rounded-lg hover:bg-gray-50 transition-all">
              <Phone className="h-6 w-6 text-indigo-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-1">Telefon</h3>
                <p className="text-gray-600">+90 507 686 5337</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-6 rounded-lg hover:bg-gray-50 transition-all">
              <MapPin className="h-6 w-6 text-indigo-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-1">Adres</h3>
                <p className="text-gray-600">
                  Kafkas Üniversitesi<br />
                
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}