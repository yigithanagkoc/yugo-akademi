import React from 'react';
import { GraduationCap, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-800">YUGO AKADEMİ</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Ana Sayfa</a>
            <a href="#courses" className="text-gray-600 hover:text-indigo-600 transition-colors">Eğitimler</a>
            <a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">Özellikler</a>
            <a href="#teachers" className="text-gray-600 hover:text-indigo-600 transition-colors">Öğretmenlerimiz</a>
            <a href="#pricing" className="text-gray-600 hover:text-indigo-600 transition-colors">Paketler</a>
            <a href="#contact" className="text-gray-600 hover:text-indigo-600 transition-colors">İletişim</a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-6">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Ana Sayfa</a>
              <a href="#courses" className="text-gray-600 hover:text-indigo-600 transition-colors">Eğitimler</a>
              <a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">Özellikler</a>
              <a href="#teachers" className="text-gray-600 hover:text-indigo-600 transition-colors">Öğretmenlerimiz</a>
              <a href="#pricing" className="text-gray-600 hover:text-indigo-600 transition-colors">Paketler</a>
              <a href="#contact" className="text-gray-600 hover:text-indigo-600 transition-colors">İletişim</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}