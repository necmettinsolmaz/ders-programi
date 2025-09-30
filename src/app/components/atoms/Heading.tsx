// src/components/atoms/Heading.tsx

import React from 'react';

// Tip güvenliği için hangi seviyelerin kabul edileceğini tanımlıyoruz
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: HeadingLevel; // h1, h2, h3...
  children: React.ReactNode;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ level, children, className = '', ...rest }) => {
  // Seviyeye göre doğru HTML etiketini dinamik olarak seçeriz
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  // Seviyeye göre temel boyutlandırmayı Tailwind ile ayarlayalım
  const baseStyles = {
    1: 'text-3xl font-bold mb-6',
    2: 'text-xl font-semibold mb-4 border-b pb-2', // Sidebar'daki h2'ler için ideal
    3: 'text-lg font-semibold mb-3',
    // Diğer seviyeler için varsayılan boyutlar
  }[level];

  return (
    <Tag className={`${baseStyles} ${className}`} {...rest}>
      {children}
    </Tag>
  );
};

export default Heading;