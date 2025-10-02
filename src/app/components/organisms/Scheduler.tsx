// src/app/components/organisms/Scheduler.tsx (GÜNCELLENDİ: Atama Mantığı ve Hook Entegrasyonu)
'use client';

import React from 'react';
import { DAYS_OF_WEEK, PERIODS } from '@/app/lib/constants';
import Heading from '../atoms/Heading';
import { useSchedule } from '@/app/state/ScheduleProvider';
import { useScheduleSlot } from '@/app/hooks/useScheduleSlot'; // YENİ HOOK İMPORT EDİLDİ

const Scheduler: React.FC = () => {
  const { state } = useSchedule();
  
  // Stiller aynı kalacak
  const headerStyle = "p-1.5 border text-center text-xs font-semibold bg-gray-100 text-gray-700 uppercase tracking-wider";
  // Hücre stilini biraz değiştiriyoruz (h-14)
  const cellStyle = "p-1 border border-gray-200 h-14 align-top text-[0.6rem] leading-none transition duration-150 relative"; 

  // Dinamik sütun genişliği hesaplaması
  const dayColumnWidth = `w-[calc(100%/${DAYS_OF_WEEK.length + 1})]`; 

  return (
    <div className="p-0"> 
      <Heading level={2} className="!mb-2 text-center text-teal-700 text-xl">
        Haftalık Ders Programı
      </Heading>

      <p className="text-xs text-gray-600 mb-2 text-center">
        Tanımlı Kural Sayısı: <span className="font-bold">{state.assignmentRules.length}</span>
      </p>

      <div className="shadow-lg rounded-xl overflow-hidden"> 
        <table className="w-full border-collapse bg-white table-fixed"> 
          <thead>
            <tr>
              {/* Köşe Hücresi (Saat/Gün) */}
              <th className={`${headerStyle} w-[50px] border-l-0 border-t-0 bg-gray-200`}>Saat</th>
              
              {/* GÜNLER ARTIK SÜTUN BAŞLIKLARI */}
              {DAYS_OF_WEEK.map(day => (
                <th key={day} className={`${headerStyle} ${dayColumnWidth}`}>
                  {day} 
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* SAATLER ARTIK SATIR OLACAK */}
            {PERIODS.map(period => (
              <tr key={period} className="hover:bg-teal-50">
                
                {/* Saat Numarası */}
                <td className={`${cellStyle} bg-gray-50 font-bold text-gray-800 text-xs text-center border-l-0`}>
                  {period}.
                </td>
                
                {/* Gün Hücreleri (Ders Atamaları) */}
                {DAYS_OF_WEEK.map(day => {
                    // **Kritik Kısım: Her hücre için Hook kullanma**
                    const { slot, 
                        isAssigned, 
                        unassignSlot, 
                        handleDragOver, 
                        handleDrop,
                        handleDragEnter, 
                        handleDragLeave,   
                        isDraggingOver 
                    } = useScheduleSlot(day, period);
                    
                    // Hücre dolduğunda atanmış bilgileri
                    const courseInfo = isAssigned ? 
                        `${slot.course} (${slot.class})` : 
                        null;
                    const teacherInfo = isAssigned ? slot.teacher : null;
                    // YENİ: Vurgulama sınıfını dinamik olarak belirle
                    let tdClass = isAssigned 
                        ? 'bg-teal-100 hover:bg-teal-200' 
                        : 'hover:bg-gray-100';
                    
                    if (isDraggingOver) {
                        // Eğer sürükleniyorsa, yeşil bir halka ile vurgula
                        tdClass = 'bg-green-100 border-2 border-green-500 ring-2 ring-green-500'; 
                    }
                    return (
    <td 
        key={`${period}-${day}`} 
        className={`${cellStyle} ${tdClass}`} 
        onDragOver={handleDragOver}
        onDrop={handleDrop} 
        onDragEnter={handleDragEnter}  
        onDragLeave={handleDragLeave}     
    >
        {isAssigned ? (
            // isAssigned olduğu durum: Sürüklemeyi bu div'e ekliyoruz
            <div 
                className="w-full text-xs cursor-move hover:bg-teal-500 transition-colors relative group"                
                // *** SÜRÜKLEME ÖZELLİKLERİ EKLENDİ ***
                draggable={true}
                onDragStart={(e) => {
                    // Taşıma verilerini buraya yerleştiriyoruz
                    e.dataTransfer.setData("moveSlotId", slot.id); 
                    e.dataTransfer.setData("moveDay", slot.day); 
                    e.dataTransfer.setData("movePeriod", slot.period.toString()); 
                    e.currentTarget.classList.add('opacity-40', 'border-dashed'); 
                }}
                onDragEnd={(e) => {
                    e.currentTarget.classList.remove('opacity-40', 'border-dashed');
                }}
                // *** SÜRÜKLEME ÖZELLİKLERİ EKLENDİ ***

                onClick={unassignSlot} // Tıklayarak silme hala çalışsın
            >
                {/* Ders Adı ve Sınıf (slot nesnesinden çekilmeli) */}
                <span className="font-bold block truncate">
                    {slot.class}-{slot.course} 
                </span>
                
                {/* Öğretmen Adı */}
                <span className="text-[0.6rem] block truncate">
                    {slot.teacher}
                </span>
                
                {/* Silme butonu (Mouse üzerine gelince görünür) */}
                <span 
                    className="absolute top-0 right-0 p-1 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 text-xs z-10"
                    // Silme butonuna tıklandığında *sadece* silme fonksiyonu çalışmalı, sürükleme olayları etkilenmemeli.
                    onClick={(e) => {
                        e.stopPropagation(); // Parent div'in onClick'ini (unassignSlot) engelle
                        unassignSlot();
                    }}
                >
                    X
                </span>
            </div>
        ) : (
            <span className="text-gray-400 text-[0.5rem]">
                (Boş)
            </span>
        )}
    </td>
);
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Scheduler;