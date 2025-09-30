// src/components/atoms/Button.tsx

import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // Children: Butonun içindeki metin veya ikon
  children: React.ReactNode; 
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className = '', ...rest }) => {
  // Projenizin CSS'indeki '.button' stillerini Tailwind ile yakalamaya çalıştık
  const baseStyles = "px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed";

  return (
    <button className={`${baseStyles} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;