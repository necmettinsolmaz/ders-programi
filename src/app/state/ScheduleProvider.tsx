// src/app/state/ScheduleProvider.tsx
'use client';

import React, { createContext, useReducer, useContext, ReactNode,useEffect} from 'react';
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
const LOCAL_STORAGE_KEY = 'dersProgramiState';

export const ScheduleProvider: React.FC<ScheduleProviderProps> = ({ children }) => {
    // useReducer Hook'u ile durum ve dispatch fonksiyonu oluşturulur
    const [state, dispatch] = useReducer(scheduleReducer, initialAppState, (initial) => {
    // 1. İLK BAŞLATMA: LocalStorage'dan yükle
    if (typeof window !== 'undefined') {
      const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedState) {
        try {
          // JSON.parse başarılı olursa saklanan veriyi döndür
          return JSON.parse(storedState);
        } catch (e) {
          console.error("Local storage verisi bozuk:", e);
          // Hata olursa varsayılan başlangıç durumunu kullan
          return initial; 
        }
      }
    }
    // Veri yoksa veya sunucuda (SSR) çalışıyorsa varsayılan durumu kullan
    return initial;
    });
     // 2. STATE DEĞİŞİKLİĞİ: Her state değiştiğinde LocalStorage'a kaydet
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);
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
export default ScheduleProvider