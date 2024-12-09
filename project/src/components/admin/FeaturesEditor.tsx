import React, { useState } from 'react';
import { useAdminStore } from '../../store/adminStore';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Plus, Trash2, Save } from 'lucide-react';
import { toast } from './ui/toast';

export default function FeaturesEditor() {
  const { features, updateFeatures } = useAdminStore();
  const [hasChanges, setHasChanges] = useState(false);
  const [localFeatures, setLocalFeatures] = useState(features);

  const saveChanges = () => {
    updateFeatures(localFeatures);
    setHasChanges(false);
    toast.success('Değişiklikler kaydedildi');
  };

  const addFeature = () => {
    const newFeature = {
      id: Math.random().toString(36).substr(2, 9),
      title: '',
      description: '',
      icon: 'BookOpen',
    };
    setLocalFeatures([...localFeatures, newFeature]);
    setHasChanges(true);
  };

  const removeFeature = (id: string) => {
    setLocalFeatures(localFeatures.filter(feature => feature.id !== id));
    setHasChanges(true);
  };

  const updateFeature = (id: string, field: string, value: string) => {
    setLocalFeatures(
      localFeatures.map(feature =>
        feature.id === id ? { ...feature, [field]: value } : feature
      )
    );
    setHasChanges(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Özellikler Düzenleme</h2>
        <div className="flex gap-2">
          {hasChanges && (
            <Button onClick={saveChanges} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Değişiklikleri Kaydet
            </Button>
          )}
          <Button onClick={addFeature} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Yeni Özellik Ekle
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {localFeatures.map((feature) => (
          <div
            key={feature.id}
            className="border p-4 rounded-lg space-y-4 relative"
          >
            <button
              onClick={() => removeFeature(feature.id)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-5 w-5" />
            </button>

            <div className="space-y-2">
              <Label htmlFor={`title-${feature.id}`}>Başlık</Label>
              <Input
                id={`title-${feature.id}`}
                value={feature.title}
                onChange={(e) => updateFeature(feature.id, 'title', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`description-${feature.id}`}>Açıklama</Label>
              <Input
                id={`description-${feature.id}`}
                value={feature.description}
                onChange={(e) => updateFeature(feature.id, 'description', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`icon-${feature.id}`}>İkon</Label>
              <select
                id={`icon-${feature.id}`}
                value={feature.icon}
                onChange={(e) => updateFeature(feature.id, 'icon', e.target.value)}
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
              >
                <option value="BookOpen">Kitap</option>
                <option value="Users">Kullanıcılar</option>
                <option value="Target">Hedef</option>
                <option value="Clock">Saat</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}