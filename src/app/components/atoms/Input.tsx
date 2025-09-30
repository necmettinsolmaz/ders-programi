// src/app/components/atoms/Input.tsx

import React, { InputHTMLAttributes } from 'react';

// Input'un alabileceği tüm standart HTML özelliklerini genişletiyoruz
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // TypeScript ile type'ı zorunlu kılabiliriz (isteğe bağlı)
  type?: 'text' | 'number' | 'email' | 'password';
}

const Input: React.FC<InputProps> = ({ className = '', ...rest }) => {
  // Projenizin CSS'indeki '.input' stillerini Tailwind ile standart hale getirdik.
  const baseStyles = "w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 box-border transition-shadow";
  
  return (
    <input 
      className={`${baseStyles} ${className}`}
      {...rest}
    />
  );
};

export default Input;