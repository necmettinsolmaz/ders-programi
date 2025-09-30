// src/app/components/organisms/Scheduler.tsx
'use client';

import React from 'react';
import { DAYS_OF_WEEK, PERIODS } from '@/app/lib/constants';
import Heading from '../atoms/Heading';
import { useSchedule } from '@/app/state/ScheduleProvider'; // State'i göstermek için import ettik

const Scheduler: React.FC = () => {
  const { state } = useSchedule();
  
  // Tablonun temel stili
  const tableStyle = "w-full border-collapse shadow-lg bg-white rounded-xl overflow-hidden";
  
  // Başlık (th) stili
  const headerStyle = "p-3 border text-left text-sm font-semibold bg-gray-100 text-gray-700 uppercase tracking-wider";
  
  // Hücre (td) stili
  const cellStyle = "p-3 border border-gray-200 h-20 align-top text-xs";

  // TODO: Gelecekte, Program motoru bu alana yerleştirilecek.
  
  return (
    <div className="p-4">
      <Heading level={2} className="!mb-6 text-center text-teal-700">
        Haftalık Ders Programı (Görselleştirme)
      </Heading>

      {/* Kontrol amaçlı kural sayısını gösterelim */}
      <p className="text-sm text-gray-600 mb-4">
        Tanımlı Atama Kuralı Sayısı: <span className="font-bold">{state.assignmentRules.length}</span>
      </p>

      {/* Program Tablosu */}
      <table className={tableStyle}>
        <thead>
          <tr>
            {/* Köşe Hücresi (Boş) */}
            <th className={`${headerStyle} w-[100px] border-l-0 border-t-0`}>Gün / Saat</th>
            
            {/* Saat Başlıkları */}
            {PERIODS.map(period => (
              <th key={period} className={headerStyle}>
                {period}. Saat
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Günler (Satırlar) */}
          {DAYS_OF_WEEK.map(day => (
            <tr key={day} className="hover:bg-teal-50">
              
              {/* Gün Adı */}
              <td className={`${cellStyle} bg-gray-50 font-bold text-gray-800`}>
                {day}
              </td>
              
              {/* Ders Saatleri Hücreleri */}
              {PERIODS.map(period => (
                <td key={period} className={cellStyle}>
                  {/* Buraya ders atamaları (Örn: MAT-10A / Ayşe Öğretmen) gelecek */}
                  <span className="text-gray-400">Boş</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Scheduler;