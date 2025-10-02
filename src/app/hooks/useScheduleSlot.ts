import { useSchedule } from '@/app/state/ScheduleProvider';
import { useCallback, useMemo, useState } from 'react';
import { IScheduleSlot } from '@/app/lib/types/scheduleTypes';
import { useToast } from '@/app/state/ToastProvider';

export const useScheduleSlot = (day: string, period: number) => {
    const { state, dispatch } = useSchedule();
    const { addToast } = useToast();
    // YENİ STATE: Hücrenin üzerine sürükleniyor mu?
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    
    // 1. Bu hücredeki atamayı bul
    const slot = useMemo(() => {
        if (!state.schedule) {
            return undefined;
        }
        return state.schedule.find(s => s.day === day && s.period === period);
    }, [state.schedule, day, period]); 

    const isAssigned = !!slot; // Slot varsa, isAssigned true olur.
    
    // YENİ: Sürükleme Girişi (DragEnter) ve Çıkışı (DragLeave) İşleyicileri
    const handleDragEnter = useCallback((e: React.DragEvent<HTMLTableCellElement>) => {
        e.preventDefault();
        // Sadece boş hücreler veya dolu hücreler (taşıma hedefi) için vurgulama yapabiliriz.
        // Şimdilik sadece boşsa vurgulayalım.
        if (!isAssigned) {
            setIsDraggingOver(true); 
        }
    }, [isAssigned]);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLTableCellElement>) => {
        e.preventDefault();
        setIsDraggingOver(false); 
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent<HTMLTableCellElement>) => {
        e.preventDefault(); 
    }, []);
    
    // 2. Ders Bırakma (Drop) İşleyicisi
    const handleDrop = useCallback((e: React.DragEvent<HTMLTableCellElement>) => {
        e.preventDefault();
        setIsDraggingOver(false); 

        // B. TAŞIMA KONTROLÜ (ÖNCELİKLİ)
        // Kartın içinde sürüklenen veriyi kontrol et (AssignedSlotCard/Scheduler'dan gelen)
        const moveSlotId = e.dataTransfer.getData("moveSlotId");
        
        if (moveSlotId) {
            // Eğer hücre zaten doluysa, üzerine taşıma YASAKTIR.
            if (isAssigned) {
                addToast('Bu saat zaten dolu. Taşıma işlemi için boş bir hücre seçiniz.', 'warning');
                return;
            }

            // TAŞIMA İŞLEMİ
            const oldDay = e.dataTransfer.getData("moveDay");
            const oldPeriod = e.dataTransfer.getData("movePeriod");
            
            // Taşıma eylemini dispatch et
            dispatch({ 
                type: 'MOVE_SLOT', 
                payload: { 
                    slotId: moveSlotId, 
                    newDay: day, 
                    newPeriod: period,
                    oldDay: oldDay,
                    oldPeriod: parseInt(oldPeriod)
                } 
            });
            addToast('Atama başarıyla taşındı.', 'info');
            return; // Taşıma işlemi bitti, aşağıya inmeye gerek yok.
        }


        // C. YENİ ATAMA KONTROLÜ (Taşıma yoksa ve hücre doluysa, yeni atamaya izin verme)
        if (isAssigned) {
             addToast('Bu saat zaten dolu. Önceki atamayı silin.', 'warning');
             return;
        }

        // D. Kural Atama Mantığı (AssignmentCard'dan gelen kural)
        const ruleId = e.dataTransfer.getData("ruleId");
        if (!ruleId) {
            // Eğer ne kural ne de taşıma verisi yoksa, hata ver
            console.error("Hata: Sürüklenen bir kural veya atama ID'si bulunamadı.");
            return;
        }

        const rule = state.assignmentRules.find(r => r.id === ruleId);
        
        if (rule) {
            // 1. Öğretmen Çakışması Kontrolü
            const teacherConflict = state.schedule.find(
                s => s.teacher === rule.teacher && s.day === day && s.period === period
            );
            if (teacherConflict) {
                addToast(`ÇAKIŞMA: ${rule.teacher} öğretmen, ${day} ${period}. saatte zaten bir derse atanmıştır.`, 'error'); 
                return;
            }

            // 2. Sınıf Çakışması Kontrolü
            const classConflict = state.schedule.find(
                s => s.class === rule.class && s.day === day && s.period === period
            );
            if (classConflict) {
                addToast(`ÇAKIŞMA: ${rule.class} sınıfı, ${day} ${period}. saatte zaten bir derse atanmıştır.`, 'error'); 
                return;
            }
            
            // 3. Yeni bir program slotu objesi oluştur
            const newSlot: IScheduleSlot = {
                id: Date.now().toString(), 
                ruleId: rule.id,
                teacher: rule.teacher,
                class: rule.class,
                course: rule.course,
                day: day,
                period: period,
            };

            // 4. Atama eylemini dispatch et
            dispatch({ type: 'ASSIGN_SLOT', payload: newSlot });
            addToast(`Başarılı: ${rule.course} dersi programa atandı.`, 'success'); 
        }
    }, [isAssigned, state.assignmentRules, state.schedule, day, period, dispatch, addToast]); 

    // 3. Ders Kaldırma (Unassign) İşleyicisi
    const unassignSlot = useCallback(() => {
        if (slot) {
            dispatch({ type: 'UNASSIGN_SLOT', payload: slot.id });
        }
    }, [slot, dispatch]);
    
    // Hook'un döndürdüğü değerler
    return {
        slot,
        isAssigned,
        unassignSlot,
        handleDragOver,
        handleDrop,
        handleDragEnter,    
        handleDragLeave,    
        isDraggingOver,     
    };
};
