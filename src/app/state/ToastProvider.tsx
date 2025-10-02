// src/app/state/ToastProvider.tsx
'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface IToast {
    id: number;
    message: string;
    type: ToastType;
}

interface IToastContext {
    addToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<IToastContext | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

// Basit Toast Bileşeni
const Toast: React.FC<IToast> = ({ message, type }) => {
    const baseStyle = "p-3 my-2 rounded-lg shadow-xl text-white font-semibold flex items-center";
    
    let colorStyle = "";
    switch (type) {
        case 'success':
            colorStyle = 'bg-green-500';
            break;
        case 'error':
            colorStyle = 'bg-red-500';
            break;
        case 'warning':
            colorStyle = 'bg-yellow-500';
            break;
        default: // 'info'
            colorStyle = 'bg-blue-500';
            break;
    }

    return (
        <div className={`${baseStyle} ${colorStyle} animate-slideIn transition-all duration-300`}>
            {message}
        </div>
    );
};

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toasts, setToasts] = useState<IToast[]>([]);

    const addToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = Date.now();
        const newToast: IToast = { id, message, type };
        
        setToasts(prev => [...prev, newToast]);

        // 4 saniye sonra bildirimi kaldır
        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, 4000);
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            
            {/* Bildirimlerin Görüneceği Alan */}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2">
                {toasts.map(toast => (
                    <Toast key={toast.id} {...toast} />
                ))}
            </div>
        </ToastContext.Provider>
    );
};