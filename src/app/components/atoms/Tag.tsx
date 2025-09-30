// src/components/atoms/Tag.tsx

import React from 'react';

interface TagProps {
  children: React.ReactNode; // Etiketin içindeki içerik (Örn: "Matematik")
  onRemove?: () => void; // Silme butonu tıklandığında çalışacak fonksiyon
  className?: string; // Ekstra stil sınıfları
}

const Tag: React.FC<TagProps> = ({ children, onRemove, className = '' }) => {
  return (
    <span 
      // Tailwind ile projenizin temel stillerine uygun hale getirildi (Vanilla CSS'teki .tag stiline benzer)
      className={`inline-flex items-center text-sm font-medium px-3 py-1 rounded-full mr-2 mb-2 whitespace-nowrap
        ${onRemove ? 'pr-6' : ''} 
        bg-teal-100 text-teal-800 relative shadow-sm ${className}`}
    >
      {children}
      {onRemove && (
        // Silme butonu (Vanilla JS'teki .remove-item-btn stilini yakaladık)
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-0.5 right-0.5 ml-2 p-0.5 rounded-full bg-red-500 text-white leading-none text-xs w-4 h-4 hover:bg-red-600 transition-colors flex items-center justify-center"
          aria-label="Kaldır"
        >
          x
        </button>
      )}
    </span>
  );
};

export default Tag;