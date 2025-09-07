'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { useDesign } from '@/contexts/DesignContext';
import { Button } from '@/components/ui/button';

export const ImageUpload: React.FC = () => {
  const { addElement, canvasSize } = useDesign();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          // Create a temporary image to get dimensions
          const img = new window.Image();
          img.onload = () => {
            const maxWidth = canvasSize.width * 0.3;
            const maxHeight = canvasSize.height * 0.3;
            
            let width = img.width;
            let height = img.height;
            
            // Scale down if too large
            if (width > maxWidth || height > maxHeight) {
              const scale = Math.min(maxWidth / width, maxHeight / height);
              width *= scale;
              height *= scale;
            }
            
            addElement({
              type: 'image',
              src: result,
              x: (canvasSize.width - width) / 2,
              y: (canvasSize.height - height) / 2,
              width,
              height,
              rotation: 0,
              scaleX: 1,
              scaleY: 1,
              visible: true,
              flipX: false,
              flipY: false
            });
          };
          img.src = result;
        }
      };
      
      reader.readAsDataURL(file);
    });
  }, [addElement, canvasSize]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.svg', '.gif']
    },
    multiple: true
  });

  return (
    <div className="p-4 border-b">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <ImageIcon size={20} />
        Images
      </h3>
      
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200 ${
          isDragActive 
            ? 'border-primary bg-primary/5' 
            : 'border-border hover:border-primary hover:bg-muted'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
        {isDragActive ? (
          <p className="text-sm text-primary">Drop images here...</p>
        ) : (
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Drag & drop images here
            </p>
            <Button variant="outline" size="sm">
              Browse Files
            </Button>
          </div>
        )}
      </div>
      
      <p className="text-xs text-muted-foreground mt-2">
        Supports: PNG, JPG, SVG, GIF
      </p>
    </div>
  );
};