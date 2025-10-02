// src/app/components/atoms/Select.tsx

import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({ options, placeholder, className, ...props }) => {
  return (
    <div className="relative w-full">
      <select
        className={`w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 px-3 
                   text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500 
                   focus:border-teal-500 transition-all ${className}`}
        {...props}
      >
        {/* Placeholder (Yer Tutucu) */}
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        
        {/* Seçenekler */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {/* Özel Ok Simgesi (Estetik için) */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

export default Select;