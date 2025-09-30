// src/app/components/organisms/Scheduler.tsx (GÜNCELLENMİŞ VE OPTİMİZE EDİLMİŞ)
'use client';

import React from 'react';
import { DAYS_OF_WEEK, PERIODS } from '@/app/lib/constants'; // DAYS_OF_WEEK: 6, PERIODS: 12
import Heading from '../atoms/Heading';
import { useSchedule } from '@/app/state/ScheduleProvider'; 

const Scheduler: React.FC = () => {
  const { state } = useSchedule();
  
  // Başlık (th) stili: Padding ve font minimuma indirildi
  const headerStyle = "p-1.5 border text-center text-xs font-semibold bg-gray-100 text-gray-700 uppercase tracking-wider";
  
  // Hücre (td) stili: Padding ve yükseklik minimuma indirildi, font çok küçük
  const cellStyle = "p-1 border border-gray-200 h-10 align-top text-[0.6rem] leading-none"; 

  // Dinamik sütun genişliği hesaplaması (1 köşe sütunu + 6 gün sütunu)
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
                {DAYS_OF_WEEK.map(day => (
                  // Hücrelerin benzersiz anahtarı: Örneğin 1. Saat Salı Günü
                  <td key={`${period}-${day}`} className={cellStyle}>
                    {/* Buraya ders atamaları (MAT-10A / Ayşe) gelecek */}
                    <span className="text-gray-400"></span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Scheduler;