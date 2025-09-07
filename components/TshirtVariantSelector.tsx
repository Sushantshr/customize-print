'use client';

import React from 'react';
import { Shirt } from 'lucide-react';
import { useDesign } from '@/contexts/DesignContext';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const variants = [
  // { value: 'tee', label: 'T-Shirt', preview: '/mockups/tee.png' },
  { value: 'tshirt', label: 'T-Shirt 2', preview: '/mockups/tshirt.png' },
  { value: 'polo', label: 'Polo Shirt', preview: '/mockups/polo.png' },
  { value: 'hoodie', label: 'Hoodie', preview: '/mockups/hoodie.png' },
  { value: 'longsleeve', label: 'Long Sleeve', preview: '/mockups/longsleeve.png' },
  // { value: 'tank', label: 'Tank Top', preview: '/mockups/tee.png' }
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

// Helper function to apply color to T-shirt preview
const getColorFilter = (hexColor: string): string => {
  // Convert hex to RGB
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // For white, don't apply any filter
  if (r > 240 && g > 240 && b > 240) {
    return 'brightness(1) saturate(1)';
  }
  
  // For black/dark colors, use brightness
  if (r < 50 && g < 50 && b < 50) {
    return 'brightness(0.3) saturate(1)';
  }
  
  // For colored T-shirts, use a combination of filters
  const brightness = (r + g + b) / 3 / 255;
  const saturation = Math.max(r, g, b) - Math.min(r, g, b);
  
  return `brightness(${Math.max(0.5, brightness)}) saturate(1.5) contrast(1.2)`;
};

export const TshirtVariantSelector: React.FC = () => {
  const { tshirtSettings, updateTShirtSettings } = useDesign();
  
  const selectedVariant = variants.find(v => v.value === tshirtSettings.variant);

  return (
    <div className="p-4 border-b">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Shirt size={20} />
        T-Shirt Options
      </h3>

      {/* Preview Section */}
      {selectedVariant && (
        <div className="mb-4 p-3 bg-muted rounded-lg">
          <Label className="text-sm font-medium mb-2 block">Preview</Label>
          <div className="flex items-center justify-center bg-muted rounded border p-4">
            <div className="relative">
              <div 
                className="w-16 h-20 rounded-lg shadow-lg border-2 border-gray-200"
                style={{ 
                  backgroundColor: tshirtSettings.color,
                  backgroundImage: `url(${selectedVariant.preview})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
                }}
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            {selectedVariant.label} • {tshirtSettings.size}
          </p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <Label htmlFor="variant">Style</Label>
          <Select
            value={tshirtSettings.variant}
            onValueChange={(value: any) => updateTShirtSettings({ variant: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {variants.map((variant) => (
                <SelectItem key={variant.value} value={variant.value}>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded border-2 border-gray-200 flex items-center justify-center"
                      style={{ 
                        backgroundColor: tshirtSettings.color,
                        backgroundImage: `url(${variant.preview})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                      }}
                    />
                    <span>{variant.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};