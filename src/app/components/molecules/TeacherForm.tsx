// src/app/components/molecules/TeacherForm.tsx
'use client';

import React, { useState, FormEvent } from 'react';
import { useSchedule } from '@/app/state/ScheduleProvider'; // State hook'umuzu import ediyoruz
import Heading from '../atoms/Heading';
import FormField from './FormField';
import Button from '../atoms/Button';
import Tag from '../atoms/Tag';

const TeacherForm: React.FC = () => {
  // Context'ten state ve dispatch fonksiyonunu çekiyoruz
  const { state, dispatch } = useSchedule();
  
  const [newTeacherName, setNewTeacherName] = useState('');
  const [error, setError] = useState('');

  const handleAddTeacher = (e: FormEvent) => {
    e.preventDefault();

    const name = newTeacherName.trim();

    if (!name) {
      setError('Öğretmen adı boş bırakılamaz.');
      return;
    }
    if (state.teachers.includes(name)) {
      setError('Bu öğretmen zaten listede var.');
      setNewTeacherName('');
      return;
    }

    // Başarılıysa, Reducer'a ADD_TEACHER eylemini gönderiyoruz
    dispatch({ type: 'ADD_TEACHER', payload: name });
    setNewTeacherName('');
    setError('');
  };

  const handleRemoveTeacher = (name: string) => {
    // Reducer'a REMOVE_TEACHER eylemini gönderiyoruz
    dispatch({ type: 'REMOVE_TEACHER', payload: name });
  };

  return (
    <div>
      <Heading level={3} className="!mb-4">Yeni Öğretmen Ekle</Heading>
      
      <form onSubmit={handleAddTeacher} className="flex gap-4 items-start mb-6">
        <div className="flex-grow">
          {/* FormField Molekülü */}
          <FormField
            label="Öğretmen Adı"
            id="teacher-name"
            errorMessage={error}
            inputProps={{
              type: 'text',
              placeholder: 'Örn: Ahmet Yılmaz',
              value: newTeacherName,
              onChange: (e) => {
                setNewTeacherName(e.target.value);
                setError(''); // Kullanıcı yazmaya başladığında hatayı temizle
              },
            }}
          />
        </div>
        
        {/* Button Atomu */}
        <div className="pt-7"> {/* FormField ile dikey hizalama için padding */}
          <Button type="submit">Ekle</Button>
        </div>
      </form>

      {/* Eklenmiş Öğretmenlerin Listesi */}
      <Heading level={3} className="!mt-8 !mb-4 border-t pt-4">Mevcut Öğretmenler ({state.teachers.length})</Heading>
      
      <div className="flex flex-wrap gap-2">
        {state.teachers.length > 0 ? (
          state.teachers.map((teacher) => (
            // Tag Atomu
            <Tag key={teacher} onRemove={() => handleRemoveTeacher(teacher)}>
              {teacher}
            </Tag>
          ))
        ) : (
          <p className="text-gray-500 text-sm">Henüz öğretmen eklenmedi.</p>
        )}
      </div>
    </div>
  );
};

export default TeacherForm;