import React from 'react';
import { useAdminStore, ContactStatus } from '../../store/adminStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export default function ContactList() {
  const { contacts, updateContactStatus } = useAdminStore();

  const statusColors: Record<ContactStatus, string> = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    undecided: 'bg-purple-100 text-purple-800',
    inactive: 'bg-red-100 text-red-800',
  };

  const statusLabels: Record<ContactStatus, string> = {
    active: 'Aktif',
    pending: 'Beklemede',
    undecided: 'Kararsız',
    inactive: 'Pasif',
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">İletişim Formları</h2>
      
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="border p-4 rounded-lg flex items-center justify-between"
          >
            <div>
              <h3 className="font-semibold">{contact.name}</h3>
              <p className="text-sm text-gray-600">{contact.email}</p>
              <p className="text-sm text-gray-600">{contact.phone}</p>
              <p className="text-sm text-gray-700 mt-2">{contact.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDate(contact.createdAt)}
              </p>
            </div>

            <Select
              value={contact.status}
              onValueChange={(value: ContactStatus) =>
                updateContactStatus(contact.id, value)
              }
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(statusLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    <span className={statusColors[value as ContactStatus]}>
                      {label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}

        {contacts.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            Henüz iletişim formu gönderilmemiş.
          </p>
        )}
      </div>
    </div>
  );
}