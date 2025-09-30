// src/app/page.tsx
'use client';

import Heading from './components/atoms/Heading';
import Sidebar from './components/molecules/Sidebar';
import Scheduler from './components/organisms/Scheduler';
import ScheduleProvider from './state/ScheduleProvider';

export default function HomePage() {
  return (
    // Arka planı biraz daha koyu yapıp, iç içeriği beyaz ve gölgeli tutarak kontrastı artırdık
    <div className="min-h-screen bg-gray-100 p-8"> 
      <div className="max-w-7xl mx-auto">
        
        <Heading level={1} className="text-center text-gray-800">
          Haftalık Ders Programı Yöneticisi (Geliştirilmiş V4)
        </Heading>

        <div className="mt-8 flex gap-8 h-[calc(100vh-8rem)]">
          
          {/* Kenar Çubuğu */}
          <div id="sidebar" className="w-1/3 min-w-[350px]">
            {/* Sidebar bileşeni içindeki gölgeyi Sidebar.tsx'te tanımladık */}
            <Sidebar /> 
          </div>

          {/* Ana İçerik (Program Tablosu) */}
          <div id="main-content" className="w-2/3 flex-grow bg-white shadow-2xl rounded-xl p-4 overflow-y-auto">
            <Scheduler /> 
          </div>
        </div>
      </div>
    </div>
  );
}