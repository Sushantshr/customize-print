'use client';

import React from 'react';
import { Layers, Eye, EyeOff, ArrowUp, ArrowDown, Trash2, Copy } from 'lucide-react';
import { useDesign } from '@/contexts/DesignContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export const LayerManager: React.FC = () => {
  const {
    elements,
    selectedElementId,
    selectElement,
    updateElement,
    removeElement,
    moveElementToFront,
    moveElementToBack,
    duplicateElement
  } = useDesign();

  const sortedElements = [...elements].sort((a, b) => b.zIndex - a.zIndex);

  const toggleVisibility = (id: string, visible: boolean) => {
    updateElement(id, { visible: !visible });
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Layers size={20} />
        Layers ({elements.length})
      </h3>

      {elements.length === 0 ? (
        <p className="text-sm text-muted-foreground">No design elements yet</p>
      ) : (
        <div className="space-y-2">
          {sortedElements.map((element, index) => (
            <div
              key={element.id}
              className={`flex items-center gap-2 p-2 rounded-lg border transition-colors ${
                selectedElementId === element.id 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-border/80'
              }`}
              onClick={() => selectElement(element.id)}
            >
              <Button
                variant="ghost"
                size="sm"
                className="p-1 h-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVisibility(element.id, element.visible);
                }}
              >
                {element.visible ? (
                  <Eye size={14} />
                ) : (
                  <EyeOff size={14} className="text-muted-foreground" />
                )}
              </Button>

              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">
                  {element.type === 'text' 
                    ? `Text: ${element.text || 'Empty'}` 
                    : `Image ${index + 1}`
                  }
                </div>
                <div className="text-xs text-muted-foreground">
                  {element.type} • Layer {elements.length - index}
                </div>
              </div>

              {selectedElementId === element.id && (
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 h-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveElementToFront(element.id);
                    }}
                  >
                    <ArrowUp size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 h-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveElementToBack(element.id);
                    }}
                  >
                    <ArrowDown size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 h-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      duplicateElement(element.id);
                    }}
                  >
                    <Copy size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 h-auto text-red-500 hover:text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeElement(element.id);
                    }}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};