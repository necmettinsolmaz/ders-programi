// src/app/components/atoms/Input.tsx (GÜNCELLENDİ)

import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'number' | 'email' | 'password';
}

const Input: React.FC<InputProps> = ({ className = '', ...rest }) => {
  // Yumuşak köşeler ve Teal renginde odaklanma efekti
  const baseStyles = "w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 box-border transition-all";
  
  return (
    <input 
      className={`${baseStyles} ${className}`}
      {...rest}
    />
  );
};

export default Input;