// src/app/lib/constants.ts

// Haftanın günleri (Scheduler'ın satırları)
export const DAYS_OF_WEEK = [
  'Salı',
  'Çarşamba',
  'Perşembe',
  'Cuma',
  'Cumartesi',
  'Pazar',
];

// Günlük ders saatleri (Scheduler'ın sütunları). Program, en fazla 8 ders saati olacak şekilde tasarlanmıştır.
export const PERIODS = [1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12]; 

// Haftalık toplam ders saati
export const TOTAL_WEEKLY_HOURS = DAYS_OF_WEEK.length * PERIODS.length; // 5 * 8 = 40