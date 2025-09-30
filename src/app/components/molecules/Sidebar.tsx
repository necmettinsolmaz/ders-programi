
// src/app/components/molecules/Sidebar.tsx


import React, { useState } from 'react';
import Heading from '../atoms/Heading';
import Tab from './Tab';
import TeacherForm from './TeacherForm'; 
import ClassForm from './ClassForm';


// Sekmelerimizi tanımlıyoruz
const tabs = [
  { id: 'teachers', label: '1. Öğretmenler' },
  { id: 'classes', label: '2. Sınıflar' },
  { id: 'courses', label: '3. Dersler' },
  { id: 'rules', label: '4. Atama Kuralları' },
];

const Sidebar: React.FC = () => {
  // Aktif sekmeyi tutmak için yerel state (şimdilik)
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'teachers':
        return <TeacherForm />; 
      case 'classes':
        return <ClassForm />; 
      case 'courses':
        return <div>Ders ve Saat Yönetimi Formu Buraya Gelecek.</div>;
      case 'rules':
        return <div>Atama Kuralı Tanımlama Formu Buraya Gelecek.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-white shadow-2xl rounded-xl p-6 h-full flex flex-col"> 
      <Heading level={2} className="!mb-0 !pb-2">Veri Girişleri ve Kurallar</Heading>
      
      {/* Sekme Başlıkları */}
      <div className="flex border-b border-gray-200 mt-4 -mx-4 px-4">
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            label={tab.label}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>

      {/* Sekme İçeriği */}
      <div className="p-4 mt-2 overflow-y-auto flex-grow">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Sidebar;