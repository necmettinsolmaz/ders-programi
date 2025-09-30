// src/app/components/molecules/RuleForm.tsx
'use client';

import React, { useState, FormEvent, useMemo } from 'react';
import { useSchedule } from '@/app/state/ScheduleProvider';
import Heading from '../atoms/Heading';
import Button from '../atoms/Button';
import Tag from '../atoms/Tag';
import FormField from './FormField'; // FormField molekülü
import Select from '../atoms/Select'; // Yeni Select atomu
import { IAssignmentRule } from '@/app/lib/types/scheduleTypes'; // Tip importu

const RuleForm: React.FC = () => {
  const { state, dispatch } = useSchedule();
  
  // Seçim durumları
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [error, setError] = useState('');

  // Select bileşeni için seçenek listelerini formatlama (Memoize ederek optimizasyon yapıyoruz)
  const teacherOptions = useMemo(() => 
    state.teachers.map(t => ({ value: t, label: t })), 
    [state.teachers]
  );
  
  const classOptions = useMemo(() => 
    state.classes.map(c => ({ value: c, label: c })), 
    [state.classes]
  );
  
  // Dersler için label olarak ders adını, value olarak ders adını kullanalım (ICourse'dan dönüşüm)
  const courseOptions = useMemo(() => 
    state.courses.map(c => ({ value: c.name, label: `${c.name} (${c.totalHours}s)` })), 
    [state.courses]
  );

  const handleAddRule = (e: FormEvent) => {
    e.preventDefault();
    // 1. Seçilen Dersin saatini state'ten buluyoruz
    const courseData = state.courses.find(c => c.name === selectedCourse);
    if (!selectedTeacher || !selectedClass || !selectedCourse || !courseData) {
      setError('Lütfen tüm alanları seçin ve geçerli bir ders seçin.');
      return;
    }
    // Saat bilgisini buradan çekiyoruz:
    const hours = courseData.totalHours; 
    // Kuralın zaten var olup olmadığını kontrol et
    const existingRule = state.assignmentRules.find(
        r => r.teacher === selectedTeacher && r.class === selectedClass && r.course === selectedCourse
    );

    if (existingRule) {
      setError('Bu kural (Öğretmen, Sınıf ve Ders kombinasyonu) zaten tanımlanmış.');
      return;
    }

    const newRule: IAssignmentRule = {
      id: Date.now().toString(), // Basit bir ID ataması
      teacher: selectedTeacher,
      class: selectedClass,
      course: selectedCourse,
      hours: hours, // Saat, RuleForm'daki input yerine CourseData'dan alındı
    };

    // Reducer'a yeni bir eylem (Action) göndermemiz gerekecek
    dispatch({ type: 'ADD_RULE', payload: newRule }); 
    
    // Formu temizle
    setSelectedTeacher('');
    setSelectedClass('');
    setSelectedCourse('');
    setError('');
  };

  const handleRemoveRule = (ruleId: string) => {
    dispatch({ type: 'REMOVE_RULE', payload: ruleId });
  };

  return (
    <div>
      <Heading level={3} className="!mt-0 !mb-2">Yeni Atama Kuralı Tanımla</Heading>
      
      <form onSubmit={handleAddRule} className="flex flex-col gap-2 mb-4 p-3 border rounded-lg bg-gray-50">
        
        
        {/* 1. Öğretmen Seçimi: FormField kaldırıldı */}
        <div className="mb-2">
            <label htmlFor="rule-teacher" className="block text-sm font-medium text-gray-700 mb-1">
                1. Öğretmen
            </label>
            <Select
                id="rule-teacher"
                options={teacherOptions}
                placeholder="Öğretmen Seçiniz"
                value={selectedTeacher}
                onChange={(e) => {
                    setSelectedTeacher(e.target.value);
                    setError('');
                }}
                disabled={teacherOptions.length === 0}
            />
        </div>
        
       {/* 2. Sınıf Seçimi: FormField kaldırıldı */}
        <div className="mb-2">
            <label htmlFor="rule-class" className="block text-sm font-medium text-gray-700 mb-1">
                2. Sınıf
            </label>
            <Select
                id="rule-class"
                options={classOptions}
                placeholder="Sınıf Seçiniz"
                value={selectedClass}
                onChange={(e) => {
                    setSelectedClass(e.target.value);
                    setError('');
                }}
                disabled={classOptions.length === 0}
            />
        </div>

       {/* 3. Ders Seçimi: FormField kaldırıldı */}
        <div className="mb-2">
            <label htmlFor="rule-course" className="block text-sm font-medium text-gray-700 mb-1">
                3. Ders
            </label>
            <Select
                id="rule-course"
                options={courseOptions}
                placeholder="Ders Seçiniz"
                value={selectedCourse}
                onChange={(e) => {
                    setSelectedCourse(e.target.value);
                    setError('');
                }}
                disabled={courseOptions.length === 0}
            />
        </div>
       
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <Button type="submit" className="mt-2" disabled={teacherOptions.length === 0 || classOptions.length === 0 || courseOptions.length === 0}>
            Kuralı Ekle
        </Button>
      </form>

      {/* Eklenmiş Kurallar Listesi */}
      <Heading level={3} className="!mt-3 !mb-2 border-t pt-2">Tanımlı Kurallar ({state.assignmentRules.length})</Heading>
      
      <div className="flex flex-wrap content-start gap-2 h-60 overflow-y-auto pr-2"> 
        {state.assignmentRules.length > 0 ? (
          state.assignmentRules.map((rule) => (
            <Tag 
                key={rule.id} 
                onRemove={() => handleRemoveRule(rule.id)}
                badgeContent={rule.hours}
            >
              {`${rule.teacher} / ${rule.class} / ${rule.course}`}
            </Tag>
          ))
        ) : (
          <p className="text-gray-500 text-sm">Henüz kural tanımlanmadı. Lütfen önce Öğretmen, Sınıf ve Ders ekleyin.</p>
        )}
      </div>
    </div>
  );
};

export default RuleForm;