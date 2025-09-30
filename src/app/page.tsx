// src/app/page.tsx
'use client';

import Heading from './components/atoms/Heading';
import Sidebar from './components/molecules/Sidebar';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Başlık */}
        <Heading level={1} className="text-center text-gray-800">
          Haftalık Ders Programı Yöneticisi (Geliştirilmiş V4)
        </Heading>

        <div className="mt-6 flex gap-6 h-[calc(100vh-10rem)]">
          
          {/* 1. Kenar Çubuğu (Veri Giriş ve Kurallar) */}
          <div id="sidebar" className="w-1/3 min-w-[350px]">
            <Sidebar />
          </div>

          {/* 2. Ana İçerik (Program Tablosu) */}
          <div id="main-content" className="w-2/3 flex-grow bg-white shadow-xl rounded-lg p-6 overflow-hidden">
            <Heading level={2} className="!mb-4">Haftalık Ders Programı Tablosu</Heading>
            <div className="table-container h-full overflow-y-auto">
                {/* Program Tablosu Bileşeni Buraya Gelecek */}
                <p className="text-gray-500">Öğretmen ve sınıfları tanımladıktan sonra program tablosu burada görüntülenecektir.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}