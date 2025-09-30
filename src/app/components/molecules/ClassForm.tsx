// src/app/components/molecules/ClassForm.tsx
'use client';

import React, { useState, FormEvent } from 'react';
import { useSchedule } from '@/app/state/ScheduleProvider';
import Heading from '../atoms/Heading';
import FormField from './FormField';
import Button from '../atoms/Button';
import Tag from '../atoms/Tag';
import { ClassName } from '@/app/lib/types/scheduleTypes'; // Tip güvenliği için import

const ClassForm: React.FC = () => {
  const { state, dispatch } = useSchedule();
  
  const [newClassName, setNewClassName] = useState('');
  const [error, setError] = useState('');

  const handleAddClass = (e: FormEvent) => {
    e.preventDefault();

    const name = newClassName.trim().toUpperCase(); // Sınıf isimlerini büyük harf yapalım (Örn: 9A)

    if (!name) {
      setError('Sınıf adı boş bırakılamaz.');
      return;
    }
    if (state.classes.includes(name)) {
      setError('Bu sınıf zaten listede var.');
      setNewClassName('');
      return;
    }

    // Gerekirse sınıf isminin formatını kontrol eden regex eklenebilir (Örn: 9A, 10B gibi)

    // Reducer'a yeni bir eylem (Action) göndermemiz gerekecek
    // Şimdilik 'ADD_CLASS' eylemini kullanıyoruz, sonra Reducer'a ekleyeceğiz.
    dispatch({ type: 'ADD_CLASS', payload: name }); 
    setNewClassName('');
    setError('');
  };

  const handleRemoveClass = (name: ClassName) => {
    // Reducer'a yeni bir eylem (Action) göndermemiz gerekecek
    dispatch({ type: 'REMOVE_CLASS', payload: name });
  };

  return (
    <div>
      <Heading level={3} className="!mb-4">Yeni Sınıf Ekle</Heading>
      
      <form onSubmit={handleAddClass} className="flex gap-4 items-start mb-6">
        <div className="flex-grow">
          <FormField
            label="Sınıf Adı"
            id="class-name"
            errorMessage={error}
            inputProps={{
              type: 'text',
              placeholder: 'Örn: 10A, 9B, 12-Fen',
              value: newClassName,
              onChange: (e) => {
                setNewClassName(e.target.value);
                setError('');
              },
            }}
          />
        </div>
        
        <div className="pt-7">
          <Button type="submit">Ekle</Button>
        </div>
      </form>

      <Heading level={3} className="!mt-8 !mb-4 border-t pt-4">Mevcut Sınıflar ({state.classes.length})</Heading>
      
      <div className="flex flex-wrap gap-2">
        {state.classes.length > 0 ? (
          state.classes.map((className) => (
            <Tag key={className} onRemove={() => handleRemoveClass(className)}>
              {className}
            </Tag>
          ))
        ) : (
          <p className="text-gray-500 text-sm">Henüz sınıf eklenmedi.</p>
        )}
      </div>
    </div>
  );
};

export default ClassForm;