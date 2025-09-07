'use client';

import React from 'react';
import { Type, Bold, Italic, Underline } from 'lucide-react';
import { useDesign } from '@/contexts/DesignContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ColorPicker } from '@/components/ui/color-picker';
import { Slider } from '@/components/ui/slider';

const fonts = [
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Courier New',
  'Georgia',
  'Verdana',
  'Impact',
  'Comic Sans MS',
  'Trebuchet MS',
  'Arial Black'
];

export const TextControls: React.FC = () => {
  const { addElement, selectedElementId, elements, updateElement, canvasSize } = useDesign();
  
  const selectedElement = elements.find(el => el.id === selectedElementId);
  const isTextSelected = selectedElement?.type === 'text';

  const addText = () => {
    addElement({
      type: 'text',
      text: 'Your Text Here',
      x: canvasSize.width / 2 - 50,
      y: canvasSize.height / 2,
      width: 100,
      height: 30,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      visible: true,
      fontSize: 24,
      fontFamily: 'Arial',
      fill: '#FFFFFF',
      fontStyle: 'normal',
      textDecoration: ''
    });
  };

  const updateTextProperty = (property: string, value: any) => {
    if (selectedElementId && isTextSelected) {
      updateElement(selectedElementId, { [property]: value });
    }
  };

  const toggleStyle = (style: 'bold' | 'italic' | 'underline') => {
    if (!selectedElement || !isTextSelected) return;

    switch (style) {
      case 'bold':
        const newFontStyle = selectedElement.fontStyle?.includes('bold') 
          ? selectedElement.fontStyle.replace('bold', '').trim() || 'normal'
          : (selectedElement.fontStyle === 'normal' ? 'bold' : `${selectedElement.fontStyle} bold`);
        updateTextProperty('fontStyle', newFontStyle);
        break;
      case 'italic':
        const newFontStyleItalic = selectedElement.fontStyle?.includes('italic') 
          ? selectedElement.fontStyle.replace('italic', '').trim() || 'normal'
          : (selectedElement.fontStyle === 'normal' ? 'italic' : `${selectedElement.fontStyle} italic`);
        updateTextProperty('fontStyle', newFontStyleItalic);
        break;
      case 'underline':
        const newTextDecoration = selectedElement.textDecoration === 'underline' ? '' : 'underline';
        updateTextProperty('textDecoration', newTextDecoration);
        break;
    }
  };

  return (
    <div className="p-4 border-b">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Type size={20} />
        Text
      </h3>

      <Button onClick={addText} className="w-full mb-4">
        Add Text
      </Button>

      {isTextSelected && selectedElement && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="text-content">Text Content</Label>
            <Input
              id="text-content"
              value={selectedElement.text || ''}
              onChange={(e) => updateTextProperty('text', e.target.value)}
              placeholder="Enter your text"
            />
          </div>

          <div>
            <Label htmlFor="font-family">Font Family</Label>
            <Select 
              value={selectedElement.fontFamily || 'Arial'} 
              onValueChange={(value) => updateTextProperty('fontFamily', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fonts.map((font) => (
                  <SelectItem key={font} value={font}>
                    {font}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="font-size">Font Size: {selectedElement.fontSize}px</Label>
            <Slider
              id="font-size"
              min={8}
              max={72}
              step={1}
              value={[selectedElement.fontSize || 24]}
              onValueChange={(value) => updateTextProperty('fontSize', value[0])}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Text Color</Label>
            <div className="mt-2">
              <ColorPicker
                color={selectedElement.fill || '#FFFFFF'}
                onChange={(color) => updateTextProperty('fill', color)}
              />
            </div>
          </div>

          <div>
            <Label>Text Style</Label>
            <div className="flex gap-2 mt-2">
              <Button
                variant={selectedElement.fontStyle?.includes('bold') ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleStyle('bold')}
              >
                <Bold size={16} />
              </Button>
              <Button
                variant={selectedElement.fontStyle?.includes('italic') ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleStyle('italic')}
              >
                <Italic size={16} />
              </Button>
              <Button
                variant={selectedElement.textDecoration === 'underline' ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleStyle('underline')}
              >
                <Underline size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};