'use client';

import React from 'react';
import { Palette } from 'lucide-react';
import { useDesign } from '@/contexts/DesignContext';
import { Label } from '@/components/ui/label';
import { ColorPicker as CustomColorPicker } from '@/components/ui/color-picker';

const predefinedColors = [
  '#FFFFFF', '#F3F4F6', '#E5E7EB', '#9CA3AF', '#6B7280', '#374151', '#111827', '#000000',
  '#FEF2F2', '#FCA5A5', '#EF4444', '#DC2626', '#B91C1C', '#991B1B',
  '#FEF3C7', '#FCD34D', '#F59E0B', '#D97706', '#B45309', '#92400E',
  '#D1FAE5', '#6EE7B7', '#10B981', '#059669', '#047857', '#065F46',
  '#DBEAFE', '#93C5FD', '#3B82F6', '#2563EB', '#1D4ED8', '#1E40AF',
  '#E0E7FF', '#A5B4FC', '#6366F1', '#4F46E5', '#4338CA', '#3730A3',
  '#F3E8FF', '#C4B5FD', '#8B5CF6', '#7C3AED', '#6D28D9', '#5B21B6'
];

export const ColorPicker: React.FC = () => {
  const { tshirtSettings, updateTShirtSettings } = useDesign();

  return (
    <div className="p-4 border-b">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Palette size={20} />
        T-Shirt Color
      </h3>

      <div className="space-y-4">
        <div>
          <Label>Custom Color</Label>
          <div className="mt-2">
            <CustomColorPicker
              color={tshirtSettings.color}
              onChange={(color) => updateTShirtSettings({ color })}
            />
          </div>
        </div>

        <div>
          <Label>Quick Colors</Label>
          <div className="grid grid-cols-8 gap-2 mt-2">
            {predefinedColors.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-md border-2 transition-all hover:scale-110 ${
                  tshirtSettings.color === color 
                    ? 'border-primary shadow-lg' 
                    : 'border-border hover:border-foreground/50'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => updateTShirtSettings({ color })}
                title={color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};