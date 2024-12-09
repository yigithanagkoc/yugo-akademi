import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { useAuthStore } from '../../store/authStore';
import Login from './Login';
import HeroEditor from './HeroEditor';
import ContactList from './ContactList';
import FeaturesEditor from './FeaturesEditor';
import TeachersEditor from './TeachersEditor';
import PricingEditor from './PricingEditor';
import FooterEditor from './FooterEditor';

export default function AdminPanel() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Login />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <Button onClick={handleLogout} variant="outline">
            Çıkış Yap
          </Button>
        </div>
        
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList>
            <TabsTrigger value="hero">Ana Sayfa</TabsTrigger>
            <TabsTrigger value="features">Özellikler</TabsTrigger>
            <TabsTrigger value="teachers">Öğretmenler</TabsTrigger>
            <TabsTrigger value="pricing">Paketler</TabsTrigger>
            <TabsTrigger value="footer">Footer</TabsTrigger>
            <TabsTrigger value="contacts">İletişim Formları</TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <HeroEditor />
          </TabsContent>

          <TabsContent value="features">
            <FeaturesEditor />
          </TabsContent>

          <TabsContent value="teachers">
            <TeachersEditor />
          </TabsContent>

          <TabsContent value="pricing">
            <PricingEditor />
          </TabsContent>

          <TabsContent value="footer">
            <FooterEditor />
          </TabsContent>

          <TabsContent value="contacts">
            <ContactList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}