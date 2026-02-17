"use client";

import { CoralSlider } from "@/components/ui/CoralSlider";
import { useState } from "react";

export default function SliderDemoPage() {
    const [density, setDensity] = useState(50);
    const [depth, setDepth] = useState(12);
    const [growth, setGrowth] = useState(7.5);
    const [temp, setTemp] = useState(26);

    return (
        <div className="flex flex-col gap-12 max-w-3xl mx-auto py-12">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Slider Component Demo</h1>
                <p className="text-slate-500">Custom interactive sliders for parameter configuration.</p>
            </div>

            <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-100 space-y-12">
                <CoralSlider
                    label="Coral Density"
                    value={density}
                    onChange={setDensity}
                    unit="%"
                />

                <CoralSlider
                    label="Water Depth"
                    value={depth}
                    min={0}
                    max={50}
                    onChange={setDepth}
                    unit="m"
                />

                <CoralSlider
                    label="Growth Rate"
                    value={growth}
                    min={1}
                    max={15}
                    step={0.5}
                    onChange={setGrowth}
                    unit=" cm/yr"
                />

                <CoralSlider
                    label="System Temperature"
                    value={temp}
                    min={20}
                    max={35}
                    onChange={setTemp}
                    unit="°C"
                    disabled
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-500">
                <div className="flex flex-col gap-2 p-4 bg-slate-50 rounded-xl">
                    <h3 className="font-bold text-slate-900">Color Palette</h3>
                    <div className="flex items-center gap-2">
                        <div className="size-4 rounded-full bg-[#088396]"></div>
                        <span>Primary: #088396</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2 p-4 bg-slate-50 rounded-xl">
                    <h3 className="font-bold text-slate-900">Dimensions</h3>
                    <p>Thumb: 20px (base)</p>
                    <p>Track: 4px</p>
                </div>
                <div className="flex flex-col gap-2 p-4 bg-slate-50 rounded-xl">
                    <h3 className="font-bold text-slate-900">Interactions</h3>
                    <p>Hover: 1.25x</p>
                    <p>Drag: 1.5x + Tooltip</p>
                </div>
            </div>
        </div>
    );
}
