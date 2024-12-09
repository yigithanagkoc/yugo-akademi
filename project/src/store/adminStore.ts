import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ContactStatus = 'active' | 'pending' | 'undecided' | 'inactive';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: ContactStatus;
  createdAt: string; // Changed from Date to string
}

interface FooterContact {
  email: string;
  phone: string;
  address: string;
}

interface HeroSection {
  title: string;
  subtitle: string;
  imageUrl: string;
}

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface Teacher {
  id: string;
  name: string;
  subject: string;
  image: string;
  imageFile?: File;
  description: string;
  experience: string;
  specialization: string;
  achievements: string;
}

interface PricingPackage {
  id: string;
  name: string;
  features: string[];
  isPopular: boolean;
}

interface AdminStore {
  contacts: Contact[];
  footerContact: FooterContact;
  heroSection: HeroSection;
  features: Feature[];
  teachers: Teacher[];
  pricingPackages: PricingPackage[];
  updateHeroSection: (data: Partial<HeroSection>) => void;
  updateFeatures: (features: Feature[]) => void;
  updateTeachers: (teachers: Teacher[]) => void;
  updatePricingPackages: (packages: PricingPackage[]) => void;
  updateFooterContact: (contact: FooterContact) => void;
  addContact: (contact: Omit<Contact, 'id' | 'createdAt' | 'status'>) => void;
  updateContactStatus: (id: string, status: ContactStatus) => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      contacts: [],
      footerContact: {
        email: 'iletisim@yugokademi.com',
        phone: '+90 507 686 5337',
        address: 'Levent Mahallesi, İş Kuleleri\nKule-2 Kat:4\n34330 Beşiktaş/İstanbul',
      },
      heroSection: {
        title: 'LGS Başarısı İçin Doğru Adres',
        subtitle: 'YUGO AKADEMİ ile öğrencinizin LGS yolculuğunda yanındayız. Alanında uzman öğretmenlerimiz ve özel ders programlarımızla hedeflenen başarıya ulaşın.',
        imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
      },
      features: [
        {
          id: '1',
          title: 'MEB Müfredatına Uyumlu',
          description: 'Güncel LGS müfredatına uygun ders içerikleri ve soru çözümleri',
          icon: 'BookOpen',
        },
      ],
      teachers: [
        {
          id: '1',
          name: 'Ahmet Yılmaz',
          subject: 'Matematik',
          image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          description: 'Deneyimli matematik öğretmeni',
          experience: '15 yıl deneyim',
          specialization: 'LGS Matematik Uzmanı',
          achievements: '10.000+ öğrenci başarısı',
        },
      ],
      pricingPackages: [
        {
          id: '1',
          name: 'Temel Paket',
          features: [
            'Tüm Dersler Konu Anlatımı',
            'Birebir Soru Çözümü',
            'Haftalık Ödevler',
            'Online Deneme Sınavları',
          ],
          isPopular: false,
        },
      ],
      updateHeroSection: (data) =>
        set((state) => ({
          heroSection: { ...state.heroSection, ...data },
        })),
      updateFeatures: (features) => set({ features }),
      updateTeachers: (teachers) => set({ teachers }),
      updatePricingPackages: (packages) => set({ pricingPackages: packages }),
      updateFooterContact: (contact) => set({ footerContact: contact }),
      addContact: (contactData) =>
        set((state) => ({
          contacts: [
            ...state.contacts,
            {
              id: Math.random().toString(36).substr(2, 9),
              status: 'pending',
              createdAt: new Date().toISOString(), // Store as ISO string
              ...contactData,
            },
          ],
        })),
      updateContactStatus: (id, status) =>
        set((state) => ({
          contacts: state.contacts.map((contact) =>
            contact.id === id ? { ...contact, status } : contact
          ),
        })),
    }),
    {
      name: 'admin-storage',
    }
  )
);