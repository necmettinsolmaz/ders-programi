// src/app/components/atoms/Heading.tsx (GÜNCELLENDİ)

import React from 'react';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: HeadingLevel; 
  children: React.ReactNode;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ level, children, className = '', ...rest }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  // Modern stil güncellemeleri
  const baseStyles = {
    1: 'text-3xl font-extrabold text-gray-900 mb-8 border-b border-gray-100 pb-2', // Uygulama ana başlığı
    2: 'text-xl font-bold text-gray-800 mb-4', // Bölüm başlıkları (Sidebar, Tablo)
    3: 'text-lg font-semibold text-gray-700 mb-3', // Form/Liste başlıkları
    4: 'text-base font-medium text-gray-600 mb-2',
  }[level];

  return (
    <Tag className={`${baseStyles} ${className}`} {...rest}>
      {children}
    </Tag>
  );
};

export default Heading;