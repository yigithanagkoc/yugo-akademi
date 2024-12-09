import React from 'react';
import { useAdminStore } from '../../store/adminStore';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

export default function HeroEditor() {
  const { heroSection, updateHeroSection } = useAdminStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission is handled automatically through the store
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Ana Sayfa Düzenleme</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Başlık</Label>
          <Input
            id="title"
            value={heroSection.title}
            onChange={(e) => updateHeroSection({ title: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subtitle">Alt Başlık</Label>
          <Input
            id="subtitle"
            value={heroSection.subtitle}
            onChange={(e) => updateHeroSection({ subtitle: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageUrl">Görsel URL</Label>
          <Input
            id="imageUrl"
            value={heroSection.imageUrl}
            onChange={(e) => updateHeroSection({ imageUrl: e.target.value })}
          />
        </div>

        <Button type="submit">Değişiklikleri Kaydet</Button>
      </form>
    </div>
  );
}