// src/app/components/molecules/AssignmentPicker.tsx
'use client';

import React, { useMemo } from 'react';
import { useSchedule } from '@/app/state/ScheduleProvider';
import Heading from '../atoms/Heading';
import AssignmentCard from '../atoms/AssignmentCard';
import { IAssignmentRule } from '@/app/lib/types/scheduleTypes';

const AssignmentPicker: React.FC = () => {
  const { state } = useSchedule();

  // Kalan saatleri hesaplamak için atama kurallarını ve programlanmış saatleri kullanıyoruz.
  const rulesWithRemainingHours = useMemo(() => {
    // YENİ GÜVENLİK KONTROLÜ: state.schedule'ın varlığını kontrol et
    if (!state.schedule) {
        return state.assignmentRules.map(rule => ({
            ...rule,
            remainingHours: rule.hours // Eğer schedule yoksa, tüm saatler kalan olarak gösterilir
        }));
    }
    return state.assignmentRules.map(rule => {
      // Bu kuralın program tablosunda kaç kez kullanıldığını sayalım.
      const assignedCount = state.schedule.filter(
        (slot) => slot.ruleId === rule.id
      ).length;

      // Kalan saat = Toplam saat - Kullanılan saat
      const remainingHours = rule.hours - assignedCount;

      return {
        ...rule,
        remainingHours,
      } as IAssignmentRule & { remainingHours: number }; // remainingHours tipini ekledik
    }).sort((a, b) => {
        // Tamamlanmış kuralları sona at
        if (a.remainingHours === 0 && b.remainingHours > 0) return 1;
        if (a.remainingHours > 0 && b.remainingHours === 0) return -1;
        // Kalan saat sayısına göre azalan sırada sırala
        return b.remainingHours - a.remainingHours;
    });
  }, [state.assignmentRules, state.schedule]); // Kurallar veya program değiştiğinde yeniden hesapla

  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <Heading level={3} className="!mt-0 !mb-2 text-teal-700">
        Ders Atama Listesi ({rulesWithRemainingHours.length} Kural)
      </Heading>
      <p className="text-xs text-gray-500 mb-2">
        Kalan ders saatlerini tabloya sürükleyip bırakın.
      </p>

      {/* Atama Kartları Listesi */}
      <div className="h-64 overflow-y-auto pr-2">
        {rulesWithRemainingHours.length === 0 ? (
          <p className="text-gray-500 text-sm">Önce Atama Kuralları sekmesinden kural tanımlayın.</p>
        ) : (
          rulesWithRemainingHours.map(rule => (
            <AssignmentCard
              key={rule.id}
              ruleId={rule.id}
              teacher={rule.teacher}
              class={rule.class}
              course={rule.course}
              remainingHours={rule.remainingHours}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AssignmentPicker;