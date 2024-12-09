import React, { useState } from 'react';
import { useAdminStore } from '../../store/adminStore';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Save } from 'lucide-react';
import { toast } from './ui/toast';

export default function FooterEditor() {
  const { footerContact, updateFooterContact } = useAdminStore();
  const [hasChanges, setHasChanges] = useState(false);
  const [localContact, setLocalContact] = useState(footerContact);

  const saveChanges = () => {
    updateFooterContact(localContact);
    setHasChanges(false);
    toast.success('İletişim bilgileri güncellendi');
  };

  const handleChange = (field: string, value: string) => {
    setLocalContact((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Footer İletişim Bilgileri</h2>
        {hasChanges && (
          <Button onClick={saveChanges} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Değişiklikleri Kaydet
          </Button>
        )}
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">E-posta</Label>
          <Input
            id="email"
            type="email"
            value={localContact.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="ornek@email.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefon</Label>
          <Input
            id="phone"
            type="tel"
            value={localContact.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+90 XXX XXX XX XX"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Adres</Label>
          <textarea
            id="address"
            value={localContact.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg min-h-[100px]"
            placeholder="Tam adres"
          />
        </div>
      </div>
    </div>
  );
}