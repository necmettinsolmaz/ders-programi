// src/app/state/ScheduleProvider.tsx
'use client';

import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { IAppState } from '../lib/types/scheduleTypes';
import { scheduleReducer, initialAppState, AppActions } from './scheduleReducer';

// 1. Context Tiplerini Tanımlama
interface ScheduleContextType {
    state: IAppState;
    dispatch: React.Dispatch<AppActions>;
}

// 2. Context Oluşturma
export const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

// 3. Provider Bileşeni
interface ScheduleProviderProps {
    children: ReactNode;
}

export const ScheduleProvider: React.FC<ScheduleProviderProps> = ({ children }) => {
    // useReducer Hook'u ile durum ve dispatch fonksiyonu oluşturulur
    const [state, dispatch] = useReducer(scheduleReducer, initialAppState);

    return (
        <ScheduleContext.Provider value={{ state, dispatch }}>
            {children}
        </ScheduleContext.Provider>
    );
};

// 4. Custom Hook: Bileşenlerin Context'i kolayca kullanması için
export const useSchedule = () => {
    const context = useContext(ScheduleContext);
    if (context === undefined) {
        throw new Error('useSchedule must be used within a ScheduleProvider');
    }
    return context;
};