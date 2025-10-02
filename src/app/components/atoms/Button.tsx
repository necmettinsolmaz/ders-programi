// src/app/components/atoms/Button.tsx (GÜNCELLENDİ)

import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode; 
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className = '', ...rest }) => {
  // Daha modern, gölgeli ve belirgin stil
  const baseStyles = "px-4 py-2 bg-teal-600 text-white font-medium rounded-lg shadow-md hover:bg-teal-700 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-95";

  return (
    <button className={`${baseStyles} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;