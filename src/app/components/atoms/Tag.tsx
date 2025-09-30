// src/app/components/atoms/Tag.tsx (GÜNCELLENDİ: Badge özelliği eklendi)

import React from 'react';

interface TagProps {
  children: React.ReactNode; 
  onRemove?: () => void;
  className?: string; 
  badgeContent?: string | number; // YENİ: İsteğe bağlı rozet içeriği
}

const Tag: React.FC<TagProps> = ({ children, onRemove, badgeContent, className = '' }) => {
  // onRemove varsa tag'in sağ boşluğu 6, badge varsa 8 olmalı (çift kontrol)
  const paddingRight = onRemove && badgeContent ? 'pr-10' : (onRemove ? 'pr-6' : (badgeContent ? 'pr-5' : 'pr-3'));
  
  return (
    <span 
      // rounded-lg ve temel stiller
      className={`inline-flex items-center text-sm font-medium py-1 mr-2 mb-2 whitespace-nowrap
        bg-teal-500 text-white relative shadow-sm rounded-lg ${className} ${paddingRight}`}
    >
      
      {/* Etiket Metni */}
      <span className="pl-3 pr-2">
        {children}
      </span>

      {/* ROZET / BADGE EKLENDİ */}
      {badgeContent && (
        <span 
          // Saati gösteren küçük ve şık rozet stili
          className="absolute right-0 top-0 bottom-0 text-xs font-bold flex items-center justify-start 
                     bg-teal-700 text-white py-1 px-1.5 rounded-r-lg"
          style={{ width: onRemove ? '2.5rem' : 'auto' }} // Silme butonu varsa daha geniş alan bırak
        >
            {badgeContent}
        </span>
      )}

      {/* Silme Butonu */}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 ml-2 p-0.5 rounded-full 
                     bg-red-600 text-white leading-none text-xs w-4 h-4 hover:bg-red-700 transition-colors 
                     flex items-center justify-center z-10" // z-10 ile badge'in önünde kalmasını sağladık
          aria-label="Kaldır"
        >
          x
        </button>
      )}
    </span>
  );
};

export default Tag;