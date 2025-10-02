// src/app/components/atoms/AssignmentCard.tsx (MODERN VE KOMPAKT TASARIM)

'use client';

import React from 'react';
import Tag from './Tag'; 
import { IAssignmentRule } from '@/app/lib/types/scheduleTypes';

interface AssignmentCardProps extends IAssignmentRule {
  remainingHours: number;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ 
  ruleId, 
  teacher, 
  class: className, 
  course, 
  remainingHours 
}) => {
  
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("ruleId", ruleId);
    e.currentTarget.classList.add('opacity-40', 'border-dashed'); 
  };
  
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('opacity-40', 'border-dashed');
  };
  
  const isCompleted = remainingHours === 0;

  return (
    <div
      id={`assign-${ruleId}`}
      draggable={!isCompleted}
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}     
      className={`
        // Ana kartın stili: Çok az dikey dolgu (p-1), keskin kenarlar (rounded-md)
        p-1 my-1 border rounded-md shadow-sm cursor-grab transition-all duration-200
        ${isCompleted 
          ? 'bg-gray-200 text-gray-500 opacity-60 cursor-not-allowed' 
          : 'bg-white text-gray-800 border-gray-200 hover:shadow-md hover:bg-gray-50'
        }
      `}
    >
      <div className="flex justify-between items-center w-full"> 
        
        {/* Sol Taraf: Ders Adı, Sınıf ve Öğretmen */}
        <div className="flex flex-col flex-grow truncate min-w-0">
            {/* Ders Adı ve Sınıf (Daha belirgin) */}
            <span className="text-xs font-bold truncate">
                {className}-{course}
            </span>
            {/* Öğretmen Adı (Daha silik ve kompakt) */}
            <span className="text-[0.6rem] text-gray-500 truncate mt-0.5">
                {teacher}
            </span>
        </div>
        
        {/* Sağ Taraf: Kalan Saat Rozeti (Tag kullanımı olmadan, tam ortalanmış) */}
        <div 
          // Rozetin stili: Tam daire, tam ortalanmış ve `leading-none` ile dikey hizalama düzeltildi
          className={`
            flex items-center justify-center flex-shrink-0 ml-2
            w-5 h-5 text-xs font-extrabold rounded-full leading-none
            ${isCompleted ? 'bg-gray-400 text-gray-800' : 'bg-teal-600 text-white'} 
          `}
        >
          {remainingHours}
        </div>

      </div>
      
      {/* Not: Tag bileşeni artık kullanılmıyor, yerine sade span'ler kullanıldı. */}
      
    </div>
  );
};

export default AssignmentCard;