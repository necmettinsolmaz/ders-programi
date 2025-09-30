// src/app/state/scheduleReducer.ts

import { IAppState, TeacherName } from "../lib/types/scheduleTypes";

// --- 1. Başlangıç Durumu ---
// Uygulama ilk yüklendiğinde kullanılacak boş/varsayılan durum
export const initialAppState: IAppState = {
    teachers: ['Örn: Ali Hoca'], // Örnek veri ile başlatıyoruz
    classes: ['Örn: 9A', 'Örn: 10B'],
    courses: [{ name: 'Örn: Matematik', totalHours: 4 }],
    assignmentRules: [],
    scheduleData: {}, // Boş program tablosu
};

// --- 2. Eylemlerin (Actions) Tanımlanması ---
// Uygulamanın yapabileceği tüm durum değiştirme eylemleri (TypeScript ile kesin tip)

export type AppActions = 
    | { type: 'ADD_TEACHER'; payload: TeacherName }
    | { type: 'REMOVE_TEACHER'; payload: TeacherName }
    | { type: 'ADD_CLASS'; payload: ClassName } // YENİ EYLEM
    | { type: 'REMOVE_CLASS'; payload: ClassName } // YENİ EYLEM
    // Diğer tüm eylemler buraya eklenecektir (ADD_CLASS, ADD_COURSE, vb.)
    ;

// --- 3. Reducer Fonksiyonu ---
// Durumu (state) ve eylemi (action) alarak yeni durumu döndürür

export const scheduleReducer = (state: IAppState, action: AppActions): IAppState => {
    switch (action.type) {
        
        case 'ADD_TEACHER':
            // Eğer öğretmen zaten varsa ekleme
            if (state.teachers.includes(action.payload)) {
                return state; 
            }
            return {
                ...state,
                teachers: [...state.teachers, action.payload],
            };

        case 'REMOVE_TEACHER':
            // Öğretmen listeden çıkarılır
            return {
                ...state,
                teachers: state.teachers.filter(t => t !== action.payload),
                // Not: Kural ve program verilerini de güncellememiz gerekecek, ancak şimdilik basit tutuyoruz.
            };
             case 'ADD_CLASS':
            if (state.classes.includes(action.payload)) {
                return state; 
            }
            return {
                ...state,
                classes: [...state.classes, action.payload],
            };

        case 'REMOVE_CLASS':
            return {
                ...state,
                classes: state.classes.filter(c => c !== action.payload),
                // Not: Sınıf silindiğinde program ve kurallar da temizlenmelidir.
            };
        // Diğer case'ler (sınıf, ders, kural ekleme/silme) daha sonra eklenecek.
        default:
            return state;
    }
};