// src/app/components/molecules/Tab.tsx
import React from 'react';

interface TabProps {
  label: string; // Sekmede görünecek yazı (Örn: "Öğretmenler")
  isActive: boolean; // Aktif sekme mi?
  onClick: () => void; // Tıklandığında çalışacak fonksiyon
}

const Tab: React.FC<TabProps> = ({ label, isActive, onClick }) => {
  const activeClasses = 'bg-white text-green-700 border-green-700 font-bold';
  const inactiveClasses = 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200';

  return (
    <button
      onClick={onClick}
      className={`
        flex-1 py-2 px-4 text-sm border-b-2 transition-colors duration-150 ease-in-out
        ${isActive ? activeClasses : inactiveClasses}
      `}
    >
      {label}
    </button>
  );
};

export default Tab;