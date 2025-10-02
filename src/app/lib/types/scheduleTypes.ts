// src/app/lib/types/scheduleTypes.ts

// --- 1. Temel Giriş Verileri ---

export interface ICourse {
    name: string; // Ders Adı (Örn: Matematik)
    totalHours: number; // Haftalık Toplam Saat (Örn: 4)
}

export type TeacherName = string;
export type ClassName = string;
export type DayName = 'Pazartesi' | 'Salı' | 'Çarşamba' | 'Perşembe' | 'Cuma' | 'Cumartesi' | 'Pazar';
export type HourKey = string; // '1', '2', '3' gibi saat numarası

// --- 2. Kural ve Atama Verileri ---

// Bir öğretmenin belirli bir dersi belirli bir sınıfa verebilme kuralı
export interface IAssignmentRule {
    teacher: TeacherName;
    course: string;
    class: ClassName;
    totalHours: number; // Dersin kuraldaki toplam saati
    remainingHours: number; // Atama yapıldıkça kalan saat
}

// Program tablosundaki tek bir atanmış ders hücresinin içeriği
export interface ILessonSlot {
    course: string; // Hangi ders
    class: ClassName; // Hangi sınıfa veriliyor
    // Opsiyonel: Diğer kısıtlamalar için id eklenebilir
}

// --- 3. Program Veri Yapısı (ScheduleData) ---

// Bir gün içindeki tüm saatlerin verisi (Key: '1', '2'...)
export type DaySchedule = Record<HourKey, ILessonSlot | undefined>;

// Bir öğretmenin tüm haftalık programı (Key: 'Pazartesi', 'Salı'...)
export type TeacherSchedule = Record<DayName, DaySchedule>;

// Ana Program Veri Yapısı (Key: Öğretmen Adı)
export type ScheduleData = Record<TeacherName, TeacherSchedule>;


// --- 4. Uygulama Genel Durumu ---

// Uygulamanın Local Storage'a kaydedeceği veya global state'te tutacağı TÜM veriler
export interface IAppState {
    teachers: TeacherName[];
    classes: ClassName[];
    courses: ICourse[];
    assignmentRules: IAssignmentRule[];
    scheduleData: ScheduleData;
    schedule: IScheduleSlot[];
    // Uygulama ayarları eklenebilir (Örn: maxDailyHours: 8)
}
// Tabloya yapılan tek bir ders atamasını temsil eder
export interface IScheduleSlot {
    id: string;        // Benzersiz slot ID'si (Silme/Güncelleme için)
    ruleId: string;    // Atanan kuralın ID'si
    teacher: string;   // Öğretmen adı (Hücrede göstermek için)
    class: string;     // Sınıf adı (Hücrede göstermek için)
    course: string;    // Ders adı (Hücrede göstermek için)
    day: string;       // Hangi gün (Örn: "Salı")
    period: number;    // Hangi saat (Örn: 5)
}