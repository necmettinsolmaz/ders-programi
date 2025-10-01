// src/app/components/molecules/Sidebar.tsx (GÜNCEL HALİ: useSchedule ve Toast Entegrasyonu)

'use client';
import React, { useState } from 'react';
import Heading from '../atoms/Heading';
import Tab from './Tab';
import TeacherForm from './TeacherForm'; 
import ClassForm from './ClassForm';
import CourseForm from './CourseForm';
import RuleForm from './RuleForm';
import { useToast } from '@/app/state/ToastProvider'; 
import { useSchedule } from '@/app/state/ScheduleProvider'; // YENİ IMPORT
import { IAssignmentRule } from '@/app/lib/types/scheduleTypes'; // YENİ IMPORT

// Sekmelerimizi tanımlıyoruz
const tabs = [
  { id: 'teachers', label: '1. Öğretmenler' },
  { id: 'classes', label: '2. Sınıflar' },
  { id: 'courses', label: '3. Dersler' },
  { id: 'rules', label: '4. Atama Kuralları' },
];

const Sidebar: React.FC = () => {
  // Hook'ları al
  const { state, dispatch } = useSchedule(); // Dispatch için useSchedule gerekli
  const { addToast } = useToast(); 
  
  // Aktif sekmeyi tutmak için yerel state
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  // Kural ekleme işleyicisi (RuleForm'a gönderilecek)
  const handleAddRule = (newRule: IAssignmentRule) => {
    // 1. Dispatch ile kuralı ekle
    dispatch({ type: 'ADD_RULE', payload: newRule });
    
    // 2. Başarı bildirimini göster
    addToast('Yeni atama kuralı başarıyla eklendi.', 'success');
  };
  
  // Kural kaldırma işleyicisi (RuleForm'a gönderilecek)
  const handleRemoveRule = (ruleId: string, ruleName: string) => {
    dispatch({ type: 'REMOVE_RULE', payload: ruleId });
    addToast(`Kural başarıyla kaldırıldı: ${ruleName}`, 'info');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'teachers':
        return <TeacherForm />; 
      case 'classes':
        return <ClassForm />; 
      case 'courses':
        return <CourseForm />; 
      case 'rules':
        // RuleForm'a gerekli prop'ları gönder
        return (
            <RuleForm 
                onAddRule={handleAddRule} 
                onRemoveRule={handleRemoveRule}
            />
        ); 
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