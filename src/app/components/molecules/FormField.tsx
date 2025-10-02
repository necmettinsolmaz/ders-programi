// src/app/components/molecules/FormField.tsx

import React from 'react';
// '../atoms/Input' yerine 'components' klasörü altındaki yolu kullanıyoruz.
import Input from '../atoms/Input'; 

interface FormFieldProps {
  label: string;
  id: string; 
  errorMessage?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, id, errorMessage, inputProps, className = '' }) => {
  return (
    <div className={`mb-2 ${className}`}>
      {/* Label Atomu */}
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      
      {/* Input Atomu */}
      <Input
        id={id}
        className={errorMessage ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
        {...inputProps}
      />

      {/* Hata Mesajı */}
      {errorMessage && (
        <p className="mt-1 text-sm text-red-600" id={`${id}-error`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default FormField;