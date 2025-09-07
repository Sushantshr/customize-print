'use client';

import React from 'react';
import { RotateCw, FlipHorizontal, FlipVertical, Move, Trash2 } from 'lucide-react';
import { useDesign } from '@/contexts/DesignContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

export const ImageControls: React.FC = () => {
  const { 
    selectedElementId, 
    elements, 
    updateElement, 
    removeElement 
  } = useDesign();
  
  const selectedElement = elements.find(el => el.id === selectedElementId);
  const isImageSelected = selectedElement?.type === 'image';

  if (!isImageSelected || !selectedElement) {
    return (
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Move size={20} />
          Image Controls
        </h3>
        <p className="text-sm text-muted-foreground">Select an image to edit</p>
      </div>
    );
  }

  const rotateImage = (degrees: number) => {
    updateElement(selectedElement.id, {
      rotation: (selectedElement.rotation + degrees) % 360
    });
  };

  const flipImage = (axis: 'horizontal' | 'vertical') => {
    if (axis === 'horizontal') {
      updateElement(selectedElement.id, {
        flipX: !selectedElement.flipX
      });
    } else {
      updateElement(selectedElement.id, {
        flipY: !selectedElement.flipY
      });
    }
  };

  const updateSize = (scale: number) => {
    updateElement(selectedElement.id, {
      scaleX: scale,
      scaleY: scale
    });
  };

  return (
    <div className="p-4 border-b">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Move size={20} />
        Image Controls
      </h3>

      <div className="space-y-4">
        <div>
          <Label>Size: {Math.round((selectedElement.scaleX || 1) * 100)}%</Label>
          <Slider
            min={0.1}
            max={3}
            step={0.1}
            value={[selectedElement.scaleX || 1]}
            onValueChange={(value) => updateSize(value[0])}
            className="mt-2"
          />
        </div>

        <div>
          <Label>Rotation: {Math.round(selectedElement.rotation || 0)}°</Label>
          <Slider
            min={0}
            max={360}
            step={1}
            value={[selectedElement.rotation || 0]}
            onValueChange={(value) => updateElement(selectedElement.id, { rotation: value[0] })}
            className="mt-2"
          />
        </div>

        <div>
          <Label>Transform</Label>
          <div className="flex gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => rotateImage(90)}
              className="flex-1"
            >
              <RotateCw size={16} />
            </Button>
            <Button
              variant={selectedElement.flipX ? 'default' : 'outline'}
              size="sm"
              onClick={() => flipImage('horizontal')}
              className="flex-1"
            >
              <FlipHorizontal size={16} />
            </Button>
            <Button
              variant={selectedElement.flipY ? 'default' : 'outline'}
              size="sm"
              onClick={() => flipImage('vertical')}
              className="flex-1"
            >
              <FlipVertical size={16} />
            </Button>
          </div>
        </div>

        <Button
          variant="destructive"
          size="sm"
          onClick={() => removeElement(selectedElement.id)}
          className="w-full"
        >
          <Trash2 size={16} className="mr-2" />
          Delete Image
        </Button>
      </div>
    </div>
  );
};