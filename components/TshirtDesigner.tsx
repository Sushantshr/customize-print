'use client';

import React from 'react';
import { TshirtCanvas } from '@/components/TshirtCanvas';
import { ImageUpload } from '@/components/ImageUpload';
import { TextControls } from '@/components/TextControls';
import { ImageControls } from '@/components/ImageControls';
import { TshirtVariantSelector } from '@/components/TshirtVariantSelector';
import { ColorPicker } from '@/components/ColorPicker';
import { LayerManager } from '@/components/LayerManager';
import { useDesign } from '@/contexts/DesignContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const TshirtDesigner: React.FC = () => {
  const { clearDesign, elements } = useDesign();

  return (
    <div className="h-screen flex bg-background">
      {/* Left Sidebar - Tools */}
      <div className="w-80 border-r bg-card flex flex-col overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Design Tools</h2>
        </div>

        <TshirtVariantSelector />
        <ColorPicker />
        <Separator />
        <ImageUpload />
        <TextControls />
        <ImageControls />
        <Separator />
        <LayerManager />
        
        <div className="mt-auto p-4 border-t">
          <Button 
            variant="outline" 
            onClick={clearDesign}
            disabled={elements.length === 0}
            className="w-full"
          >
            Clear Design
          </Button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        <TshirtCanvas />
      </div>
    </div>
  );
};