// src/app/components/atoms/Select.tsx

import React, { SelectHTMLAttributes } from 'react';

// Select elementinin options (seçenekler) prop'unu zorunlu kılıyoruz
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  // Eğer hiç seçenek yoksa varsayılan bir uyarı göstermek için ekleyebiliriz
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({ options, placeholder, className = '', ...rest }) => {
  const baseStyles = "w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white cursor-pointer";
  
  return (
    <select
      className={`${baseStyles} ${className}`}
      {...rest}
    >
      {/* Placeholder eklemek için ilk seçeneği dinamik olarak ekleyebiliriz */}
      {placeholder && (
         <option value="" disabled selected>
           {placeholder}
         </option>
      )}

      {/* Her seçenek için map işlemi */}
      {options.map((option) => (
        <option 
          key={option.value} 
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;