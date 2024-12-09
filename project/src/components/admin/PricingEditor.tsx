import React, { useState } from 'react';
import { useAdminStore } from '../../store/adminStore';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Plus, Trash2, GripVertical, Save } from 'lucide-react';
import { toast } from './ui/toast';

export default function PricingEditor() {
  const { pricingPackages, updatePricingPackages } = useAdminStore();
  const [hasChanges, setHasChanges] = useState(false);
  const [localPackages, setLocalPackages] = useState(pricingPackages);

  const saveChanges = () => {
    updatePricingPackages(localPackages);
    setHasChanges(false);
    toast.success('Değişiklikler kaydedildi');
  };

  const addPackage = () => {
    const newPackage = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      features: [''],
      isPopular: false,
    };
    setLocalPackages([...localPackages, newPackage]);
    setHasChanges(true);
  };

  const removePackage = (id: string) => {
    setLocalPackages(localPackages.filter(pkg => pkg.id !== id));
    setHasChanges(true);
  };

  const updatePackage = (id: string, field: string, value: any) => {
    setLocalPackages(
      localPackages.map(pkg =>
        pkg.id === id ? { ...pkg, [field]: value } : pkg
      )
    );
    setHasChanges(true);
  };

  const addFeature = (packageId: string) => {
    setLocalPackages(
      localPackages.map(pkg =>
        pkg.id === packageId
          ? { ...pkg, features: [...pkg.features, ''] }
          : pkg
      )
    );
    setHasChanges(true);
  };

  const updateFeature = (packageId: string, index: number, value: string) => {
    setLocalPackages(
      localPackages.map(pkg =>
        pkg.id === packageId
          ? {
              ...pkg,
              features: pkg.features.map((feature, i) =>
                i === index ? value : feature
              ),
            }
          : pkg
      )
    );
    setHasChanges(true);
  };

  const removeFeature = (packageId: string, index: number) => {
    setLocalPackages(
      localPackages.map(pkg =>
        pkg.id === packageId
          ? {
              ...pkg,
              features: pkg.features.filter((_, i) => i !== index),
            }
          : pkg
      )
    );
    setHasChanges(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Paketler Düzenleme</h2>
        <div className="flex gap-2">
          {hasChanges && (
            <Button onClick={saveChanges} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Değişiklikleri Kaydet
            </Button>
          )}
          <Button onClick={addPackage} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Yeni Paket Ekle
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {localPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="border p-4 rounded-lg space-y-4 relative"
          >
            <button
              onClick={() => removePackage(pkg.id)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-5 w-5" />
            </button>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`name-${pkg.id}`}>Paket Adı</Label>
                  <Input
                    id={`name-${pkg.id}`}
                    value={pkg.name}
                    onChange={(e) => updatePackage(pkg.id, 'name', e.target.value)}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`popular-${pkg.id}`}
                    checked={pkg.isPopular}
                    onChange={(e) => updatePackage(pkg.id, 'isPopular', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor={`popular-${pkg.id}`}>En Popüler Paket</Label>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Özellikler</Label>
                  <Button
                    onClick={() => addFeature(pkg.id)}
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Özellik Ekle
                  </Button>
                </div>

                <div className="space-y-2">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <GripVertical className="h-5 w-5 text-gray-400" />
                      <Input
                        value={feature}
                        onChange={(e) =>
                          updateFeature(pkg.id, index, e.target.value)
                        }
                        placeholder="Özellik açıklaması"
                      />
                      <button
                        onClick={() => removeFeature(pkg.id, index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}