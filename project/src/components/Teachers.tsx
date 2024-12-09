import React from 'react';
import { useAdminStore } from '../store/adminStore';
import { Award, Star, Users } from 'lucide-react';

export default function Teachers() {
  const { teachers } = useAdminStore();

  return (
    <section id="teachers" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-indigo-600 font-semibold text-sm tracking-wide uppercase">
            Uzman Kadromuz
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">
            Alanında Uzman Öğretmenlerimiz
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Deneyimli ve uzman öğretmen kadromuzla öğrencilerimizin başarısı için çalışıyoruz
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
              <div className="relative">
                <img 
                  src={teacher.image} 
                  alt={teacher.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white text-xl font-bold">{teacher.name}</h3>
                  <p className="text-white/90">{teacher.subject}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{teacher.description}</p>
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-5 w-5 text-indigo-600" />
                  <span className="text-gray-700">{teacher.experience}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Star className="h-5 w-5 text-indigo-600" />
                  <span className="text-gray-700">{teacher.specialization}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-indigo-600" />
                  <span className="text-gray-700">{teacher.achievements}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}