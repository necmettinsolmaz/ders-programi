// src/app/components/atoms/AssignedSlotCard.tsx (YENİ DOSYA)
'use client';

import React from 'react';
import { IScheduleSlot } from '@/app/lib/types/scheduleTypes';

interface AssignedSlotCardProps {
    slot: IScheduleSlot;
}

const AssignedSlotCard: React.FC<AssignedSlotCardProps> = ({ slot }) => {

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        // Taşıdığımız şeyin BİR ATAMA OLDUĞUNU ve hangi slottan geldiğini belirtiyoruz
        e.dataTransfer.setData("moveSlotId", slot.id); 
        e.dataTransfer.setData("moveDay", slot.day); 
        e.dataTransfer.setData("movePeriod", slot.period.toString()); 
        
        // Kart sürüklendiğinde soluklaşma ekle
        e.currentTarget.classList.add('opacity-40', 'border-dashed'); 
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        // Sürükleme bittiğinde sınıfları kaldır
        e.currentTarget.classList.remove('opacity-40', 'border-dashed');
    };

    return (
        <div
            draggable={true} // Sürüklemeyi etkinleştir
            onDragStart={handleDragStart} 
            onDragEnd={handleDragEnd}
        >
            <div className="font-bold truncate">{slot.class}-{slot.course}</div>
            <div className="text-[0.6rem] truncate">{slot.teacher}</div>
        </div>
    );
};

export default AssignedSlotCard;