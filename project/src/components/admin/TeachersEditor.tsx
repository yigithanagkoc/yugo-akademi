import React, { useState } from 'react';
import { useAdminStore } from '../../store/adminStore';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Plus, Trash2, Upload, Save } from 'lucide-react';
import { toast } from './ui/toast';

export default function TeachersEditor() {
  const { teachers, updateTeachers } = useAdminStore();
  const [hasChanges, setHasChanges] = useState(false);
  const [localTeachers, setLocalTeachers] = useState(teachers);

  const saveChanges = () => {
    updateTeachers(localTeachers);
    setHasChanges(false);
    toast.success('Değişiklikler kaydedildi');
  };

  const addTeacher = () => {
    const newTeacher = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      subject: '',
      image: '',
      description: '',
      experience: '',
      specialization: '',
      achievements: '',
    };
    setLocalTeachers([...localTeachers, newTeacher]);
    setHasChanges(true);
  };

  const removeTeacher = (id: string) => {
    setLocalTeachers(localTeachers.filter(teacher => teacher.id !== id));
    setHasChanges(true);
  };

  const updateTeacher = (id: string, field: string, value: string) => {
    setLocalTeachers(
      localTeachers.map(teacher =>
        teacher.id === id ? { ...teacher, [field]: value } : teacher
      )
    );
    setHasChanges(true);
  };

  const handleImageUpload = async (id: string, file: File) => {
    if (file) {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          setLocalTeachers(
            localTeachers.map(teacher =>
              teacher.id === id
                ? {
                    ...teacher,
                    image: reader.result as string,
                    imageFile: file,
                  }
                : teacher
            )
          );
          setHasChanges(true);
        };
        reader.readAsDataURL(file);
        toast.success('Fotoğraf yüklendi');
      } catch (error) {
        toast.error('Fotoğraf yüklenirken bir hata oluştu');
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Öğretmenler Düzenleme</h2>
        <div className="flex gap-2">
          {hasChanges && (
            <Button onClick={saveChanges} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Değişiklikleri Kaydet
            </Button>
          )}
          <Button onClick={addTeacher} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Yeni Öğretmen Ekle
          </Button>
        </div>
      </div>

      {/* Rest of the component remains the same */}
      <div className="space-y-6">
        {localTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className="border p-4 rounded-lg space-y-4 relative"
          >
            <button
              onClick={() => removeTeacher(teacher.id)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-5 w-5" />
            </button>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`name-${teacher.id}`}>Ad Soyad</Label>
                <Input
                  id={`name-${teacher.id}`}
                  value={teacher.name}
                  onChange={(e) => updateTeacher(teacher.id, 'name', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`subject-${teacher.id}`}>Branş</Label>
                <Input
                  id={`subject-${teacher.id}`}
                  value={teacher.subject}
                  onChange={(e) => updateTeacher(teacher.id, 'subject', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`image-${teacher.id}`}>Fotoğraf</Label>
                <div className="flex items-center gap-4">
                  {teacher.image && (
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(teacher.id, file);
                      }}
                    />
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                      <Upload className="h-4 w-4" />
                      Fotoğraf Yükle
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`description-${teacher.id}`}>Açıklama</Label>
                <textarea
                  id={`description-${teacher.id}`}
                  value={teacher.description}
                  onChange={(e) => updateTeacher(teacher.id, 'description', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`experience-${teacher.id}`}>Deneyim</Label>
                <Input
                  id={`experience-${teacher.id}`}
                  value={teacher.experience}
                  onChange={(e) => updateTeacher(teacher.id, 'experience', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`specialization-${teacher.id}`}>Uzmanlık</Label>
                <Input
                  id={`specialization-${teacher.id}`}
                  value={teacher.specialization}
                  onChange={(e) => updateTeacher(teacher.id, 'specialization', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`achievements-${teacher.id}`}>Başarılar</Label>
                <Input
                  id={`achievements-${teacher.id}`}
                  value={teacher.achievements}
                  onChange={(e) => updateTeacher(teacher.id, 'achievements', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}