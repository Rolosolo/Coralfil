"use client";

import React, { useState, useRef, useEffect } from "react";
import { clsx } from "clsx";

interface CoralSliderProps {
    label: string;
    value: number;
    min?: number;
    max?: number;
    unit?: string;
    step?: number;
    onChange?: (value: number) => void;
    disabled?: boolean;
    showTooltip?: boolean;
}

export function CoralSlider({
    label,
    value,
    min = 0,
    max = 100,
    unit = "",
    step = 1,
    onChange,
    disabled = false,
    showTooltip = true,
}: CoralSliderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);

    const percentage = ((value - min) / (max - min)) * 100;

    const handlePointerDown = (e: React.PointerEvent) => {
        if (disabled) return;
        setIsDragging(true);
        updateValue(e.clientX);
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (isDragging && !disabled) {
            updateValue(e.clientX);
        }
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        if (disabled) return;
        setIsDragging(false);
        e.currentTarget.releasePointerCapture(e.pointerId);
    };

    const updateValue = (clientX: number) => {
        if (trackRef.current) {
            const rect = trackRef.current.getBoundingClientRect();
            const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
            const rawPercentage = x / rect.width;
            const rawValue = min + rawPercentage * (max - min);
            const steppedValue = Math.round(rawValue / step) * step;
            const clampedValue = Math.max(min, Math.min(max, steppedValue)); // Ensure within bounds
            onChange?.(clampedValue);
        }
    };

    return (
        <div className={clsx("relative w-full select-none", disabled && "opacity-50 pointer-events-none grayscale")}>
            <div className="flex justify-between items-end mb-4">
                <label className="text-slate-900 font-semibold flex items-center gap-2">
                    {label}
                    {isDragging && (
                        <span className="text-[10px] font-normal text-white bg-primary px-2 py-0.5 rounded uppercase tracking-wider animate-fade-in">Active Drag</span>
                    )}
                </label>
                <span className={clsx("font-bold text-sm px-2 py-1 rounded-md transition-colors",
                    isDragging ? "text-white bg-primary" : "text-primary bg-slate-100"
                )}>
                    {value}{unit}
                </span>
            </div>

            <div
                className="relative h-10 flex items-center cursor-pointer touch-none"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerEnter={() => setIsHovering(true)}
                onPointerLeave={() => { setIsHovering(false); setIsDragging(false); }}
                ref={trackRef}
            >
                {/* Track Background */}
                <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                    {/* Active Fill */}
                    <div
                        className="h-full bg-gradient-to-r from-[#088396] to-[#26aabf] rounded-full"
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>

                {/* Thumb */}
                <div
                    className={clsx(
                        "absolute flex items-center justify-center size-5 bg-white border-[2px] border-[#088396] rounded-full shadow-md transition-transform duration-200 ease-out",
                        isDragging ? "scale-150 shadow-lg ring-4 ring-primary/10" : isHovering ? "scale-125" : "scale-100"
                    )}
                    style={{ left: `${percentage}%`, transform: `translate(-50%, 0) scale(${isDragging ? 1.5 : isHovering ? 1.25 : 1})` }}
                >
                    {/* Tooltip */}
                    {showTooltip && isDragging && (
                        <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce-in">
                            <div className="bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                                {value}{unit}
                            </div>
                            {/* Tooltip Arrow */}
                            <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-slate-900"></div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-between mt-1 text-xs text-gray-400 font-medium font-sans">
                <span>{min}{unit}</span>
                <span>{max}{unit}</span>
            </div>
        </div>
    );
}
