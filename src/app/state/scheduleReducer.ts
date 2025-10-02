import { IAppState, TeacherName, ClassName, ICourse, IAssignmentRule, IScheduleSlot } from "../lib/types/scheduleTypes"; 

// --- 1. Başlangıç Durumu ---
// Uygulama ilk yüklendiğinde kullanılacak boş/varsayılan durum
export const initialAppState: IAppState = {
    teachers: ['Örn: Ali Hoca'], // Örnek veri ile başlatıyoruz
    classes: ['Örn: 9A', 'Örn: 10B'],
    courses: [{ name: 'Örn: Matematik', totalHours: 4 }],
    assignmentRules: [],
    scheduleData: {}, // Boş program tablosu
    schedule: [],
};

// MOVE_SLOT aksiyonu için payload tipi
interface MoveSlotPayload {
    slotId: string;
    newDay: string;
    newPeriod: number;
    oldDay: string; // Opsiyonel, hata ayıklama için faydalı
    oldPeriod: number; // Opsiyonel, hata ayıklama için faydalı
}

// --- 2. Eylemlerin (Actions) Tanımlanması ---
export type AppActions = 
    | { type: 'ADD_TEACHER'; payload: TeacherName }
    | { type: 'REMOVE_TEACHER'; payload: TeacherName }
    | { type: 'ADD_CLASS'; payload: ClassName }
    | { type: 'REMOVE_CLASS'; payload: ClassName }
    | { type: 'ADD_COURSE'; payload: ICourse }
    | { type: 'REMOVE_COURSE'; payload: string }
    | { type: 'ADD_RULE'; payload: IAssignmentRule }
    | { type: 'REMOVE_RULE'; payload: string }
    | { type: 'ASSIGN_SLOT'; payload: IScheduleSlot }
    | { type: 'UNASSIGN_SLOT'; payload: string } 
    | { type: 'MOVE_SLOT'; payload: MoveSlotPayload } // YENİ TAŞIMA AKSİYONU
    ;

// --- 3. Reducer Fonksiyonu ---
export const scheduleReducer = (state: IAppState, action: AppActions): IAppState => {
    switch (action.type) {
        
        // ... (ADD_TEACHER, REMOVE_TEACHER, ADD_CLASS, REMOVE_CLASS, ADD_COURSE, REMOVE_COURSE, ADD_RULE, REMOVE_RULE kısımları aynı kalır)
        
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
            };
            
        case 'ADD_COURSE':
            if (state.courses.some(c => c.name === action.payload.name)) {
                return state; 
            }
            return {
                ...state,
                courses: [...state.courses, action.payload],
            };

        case 'REMOVE_COURSE':
            return {
                ...state,
                courses: state.courses.filter(c => c.name !== action.payload),
            };
            
        case 'ADD_RULE':
            return {
                ...state,
                assignmentRules: [...state.assignmentRules, action.payload],
            };

        case 'REMOVE_RULE':
            // Kural silindiğinde, bu kurala ait tüm atamaları da programdan kaldır
            return { 
                ...state, 
                assignmentRules: state.assignmentRules.filter(rule => rule.id !== action.payload),
                schedule: state.schedule.filter(slot => slot.ruleId !== action.payload),
            };


        case 'ASSIGN_SLOT':
            // Yeni program slotunu program dizisine ekle
            return {
                ...state,
                schedule: [...state.schedule, action.payload],
            };
            
        case 'UNASSIGN_SLOT':
            // Verilen ID'ye sahip program slotunu kaldır
            return {
                ...state,
                schedule: state.schedule.filter(slot => slot.id !== action.payload),
            };
            
        case 'MOVE_SLOT': {
            const { slotId, newDay, newPeriod } = action.payload;

            // 1. Taşınacak slotu bul
            const slotToMove = state.schedule.find(s => s.id === slotId);

            if (!slotToMove) {
                console.error('Taşınacak slot bulunamadı:', slotId);
                return state;
            }

            // 2. Schedule'dan eski slotu kaldır
            const scheduleWithoutOldSlot = state.schedule.filter(s => s.id !== slotId);

            // 3. Yeni slot objesini oluştur (ID, kural ve diğer bilgiler aynı kalır, sadece yer değişir)
            const newSlot: IScheduleSlot = {
                ...slotToMove,
                day: newDay,
                period: newPeriod,
            };

            // 4. Yeni schedule state'ini oluştur
            const newSchedule = [...scheduleWithoutOldSlot, newSlot];

            // Taşıma işleminde, dersin ataması devam ettiği için kalan saatler (ruleHours) değişmez.
            return {
                ...state,
                schedule: newSchedule,
            };
        }


        default:
            return state;
    }
};
