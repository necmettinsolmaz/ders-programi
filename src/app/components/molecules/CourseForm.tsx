// src/app/components/molecules/CourseForm.tsx
'use client';

import React, { useState, FormEvent } from 'react';
import { useSchedule } from '@/app/state/ScheduleProvider';
import Heading from '../atoms/Heading';
import FormField from './FormField';
import Button from '../atoms/Button';
import Tag from '../atoms/Tag';
import { ICourse } from '@/app/lib/types/scheduleTypes'; // ICourse tipini import ediyoruz

const CourseForm: React.FC = () => {
  const { state, dispatch } = useSchedule();
  
  const [newCourseName, setNewCourseName] = useState('');
  const [weeklyHours, setWeeklyHours] = useState<number>(0);
  const [error, setError] = useState('');

  const handleAddCourse = (e: FormEvent) => {
    e.preventDefault();

    const name = newCourseName.trim();
    const hours = Number(weeklyHours);

    if (!name || hours <= 0) {
      setError('Ders adı ve haftalık saat (sıfırdan büyük) zorunludur.');
      return;
    }
    if (state.courses.some(c => c.name === name)) {
      setError('Bu ders zaten listede var.');
      setNewCourseName('');
      setWeeklyHours(0);
      return;
    }

    // Başarılıysa, Reducer'a ADD_COURSE eylemini ve payload'u gönderiyoruz
    dispatch({ type: 'ADD_COURSE', payload: { name, totalHours: hours } });
    setNewCourseName('');
    setWeeklyHours(0);
    setError('');
  };

  const handleRemoveCourse = (name: string) => {
    // Reducer'a REMOVE_COURSE eylemini gönderiyoruz
    dispatch({ type: 'REMOVE_COURSE', payload: name });
  };

  return (
    <div>
      <Heading level={3} className="!mt-0 !mb-2">Yeni Ders ve Saat Ekle</Heading>
      
      <form onSubmit={handleAddCourse} className="flex flex-col gap-1 mb-3 p-2 border rounded-lg bg-gray-50">
        
        {/* 1. Ders Adı */}
        <FormField
          label="Ders Adı"
          id="course-name"
          errorMessage={error}
          inputProps={{
            type: 'text',
            placeholder: 'Örn: Fizik',
            value: newCourseName,
            onChange: (e) => {
              setNewCourseName(e.target.value);
              setError('');
            },
          }}
        />

        {/* 2. Haftalık Saat */}
        <FormField
          label="Haftalık Toplam Saat"
          id="weekly-hours"
          errorMessage={error}
          inputProps={{
            type: 'number',
            min: 1,
            max: 10, // Haftalık ders saati için makul bir üst limit koyalım
            value: weeklyHours,
            onChange: (e) => {
              setWeeklyHours(Number(e.target.value));
              setError('');
            },
          }}
        />
        
        <Button type="submit" className="mt-2">Ders Ekle</Button>
      </form>

      {/* Eklenmiş Derslerin Listesi */}
      <Heading level={3} className="!mt-2 !mb-2 border-t pt-4">Mevcut Dersler ({state.courses.length})</Heading>
      
      <div className="flex flex-wrap gap-2">
        {state.courses.length > 0 ? (
          state.courses.map((course) => (
            // Tag Atomu: Ders adı ve saatini birlikte gösteriyoruz
            <Tag 
                key={course.name} 
                onRemove={() => handleRemoveCourse(course.name)}
                badgeContent={`${course.totalHours}`} // Saati badgeContent olarak gönderiyoruz
                >
                {course.name} {/* Sadece ders adı kalıyor */}
            </Tag>
          ))
        ) : (
          <p className="text-gray-500 text-sm">Henüz ders eklenmedi.</p>
        )}
      </div>
    </div>
  );
};

export default CourseForm;