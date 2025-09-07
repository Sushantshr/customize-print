'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Text, Transformer, Group, Rect, Path } from 'react-konva';
import Konva from 'konva';
import { useDesign } from '@/contexts/DesignContext';
import useImage from 'use-image';
import { Button } from '@/components/ui/button';

const TShirtBackground: React.FC<{ variant: string; color: string; stageSize: { width: number; height: number } }> = ({ variant, color, stageSize }) => {
  const [image] = useImage(`/mockups/${variant}.png`);
  
  return (
    <Group>
      {/* T-shirt mockup image */}
      <KonvaImage
        image={image}
        x={0}
        y={0}
        width={stageSize.width}
        height={stageSize.height}
        listening={false}
        globalCompositeOperation="source-over"
        shadowColor="rgba(0, 0, 0, 0.3)"
        shadowBlur={12}
        shadowOffset={{ x: 2, y: 2 }}
        shadowOpacity={0.4}
      />
      
      {/* Color overlay using multiply blend mode for correct colors */}
      <Rect
        x={0}
        y={0}
        width={stageSize.width}
        height={stageSize.height}
        fill={color}
        listening={false}
        globalCompositeOperation="multiply"
        opacity={0.8}
      />
      
      {/* T-shirt image as mask to preserve shape */}
      <KonvaImage
        image={image}
        x={0}
        y={0}
        width={stageSize.width}
        height={stageSize.height}
        listening={false}
        globalCompositeOperation="destination-in"
        opacity={1}
      />
    </Group>
  );
};

const DesignImage: React.FC<{ element: any; isSelected: boolean; onSelect: () => void }> = ({
  element,
  isSelected,
  onSelect
}) => {
  const [image] = useImage(element.src);
  const imageRef = useRef<any>(null);
  const { updateElement } = useDesign();

  const handleDragEnd = (e: any) => {
    updateElement(element.id, {
      x: e.target.x(),
      y: e.target.y()
    });
  };

  const handleTransformEnd = (e: any) => {
    const node = imageRef.current;
    if (!node) return;

    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    
    updateElement(element.id, {
      x: node.x(),
      y: node.y(),
      scaleX,
      scaleY,
      rotation: node.rotation()
    });
  };

  return (
    <KonvaImage
      ref={imageRef}
      image={image}
      x={element.x}
      y={element.y}
      width={element.width}
      height={element.height}
      scaleX={element.scaleX * (element.flipX ? -1 : 1)}
      scaleY={element.scaleY * (element.flipY ? -1 : 1)}
      rotation={element.rotation}
      draggable
      visible={element.visible}
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={handleDragEnd}
      onTransformEnd={handleTransformEnd}
    />
  );
};

const DesignText: React.FC<{ element: any; isSelected: boolean; onSelect: () => void }> = ({
  element,
  isSelected,
  onSelect
}) => {
  const textRef = useRef<any>(null);
  const { updateElement } = useDesign();

  const handleDragEnd = (e: any) => {
    updateElement(element.id, {
      x: e.target.x(),
      y: e.target.y()
    });
  };

  const handleTransformEnd = (e: any) => {
    const node = textRef.current;
    if (!node) return;
    
    updateElement(element.id, {
      x: node.x(),
      y: node.y(),
      scaleX: node.scaleX(),
      scaleY: node.scaleY(),
      rotation: node.rotation()
    });
  };

  return (
    <Text
      ref={textRef}
      text={element.text}
      x={element.x}
      y={element.y}
      fontSize={element.fontSize}
      fontFamily={element.fontFamily}
      fill={element.fill}
      fontStyle={element.fontStyle}
      textDecoration={element.textDecoration}
      scaleX={element.scaleX}
      scaleY={element.scaleY}
      rotation={element.rotation}
      draggable
      visible={element.visible}
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={handleDragEnd}
      onTransformEnd={handleTransformEnd}
    />
  );
};

export const TshirtCanvas: React.FC = () => {
  const stageRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);
  const [stageSize, setStageSize] = useState({ width: 400, height: 500 });
  const [canvasBackground, setCanvasBackground] = useState('#F3F4F6');
  
  const {
    elements,
    selectedElementId,
    tshirtSettings,
    selectElement,
    updateElement
  } = useDesign();

  // Background color options
  const backgroundColors = [
    '#FFFFFF', '#F5F5F5', '#E5E5E5', '#D4D4D4', '#A3A3A3', '#737373',
    '#000000', '#1F2937', '#374151', '#4B5563', '#6B7280', '#9CA3AF',
    '#EF4444', '#F97316', '#F59E0B', '#EAB308', '#84CC16', '#22C55E',
    '#10B981', '#14B8A6', '#06B6D4', '#0EA5E9', '#3B82F6', '#6366F1',
    '#8B5CF6', '#A855F7', '#D946EF', '#EC4899', '#F43F5E', '#FF6B6B'
  ];

  const selectedElement = elements.find(el => el.id === selectedElementId);

  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById('canvas-container');
      if (container) {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const scale = Math.min(containerWidth / 400, containerHeight / 500) * 0.95;
        setStageSize({
          width: 400 * scale,
          height: 500 * scale
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (selectedElementId && transformerRef.current && stageRef.current) {
      const selectedNode = stageRef.current.findOne('#' + selectedElementId);
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode]);
        transformerRef.current.getLayer()?.batchDraw();
      }
    } else if (transformerRef.current) {
      transformerRef.current.nodes([]);
    }
  }, [selectedElementId]);

  const handleStageClick = (e: any) => {
    if (e.target === e.target.getStage()) {
      selectElement(null);
    }
  };

  const exportDesign = () => {
    if (!stageRef.current) return;
    
    const uri = stageRef.current.toDataURL({
      mimeType: 'image/png',
      quality: 1,
      pixelRatio: 2
    });
    
    const link = document.createElement('a');
    link.download = 'tshirt-design.png';
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Canvas</h2>
        <div className="flex items-center gap-3">
          {/* Background Color Grid */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Background:</label>
            <div className="flex gap-1">
              {backgroundColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setCanvasBackground(color)}
                  className={`w-6 h-6 rounded border-2 ${
                    canvasBackground === color 
                      ? 'border-foreground scale-110' 
                      : 'border-border hover:border-foreground/50'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
          
          <Button onClick={exportDesign} variant="outline">
            Export Design
          </Button>
        </div>
      </div>
      
      <div 
        id="canvas-container" 
        className="flex-1 flex items-center justify-center bg-muted p-4"
      >
        <div className="relative">
          <Stage
            ref={stageRef}
            width={stageSize.width}
            height={stageSize.height}
            onClick={handleStageClick}
            onTap={handleStageClick}
            className="border border-border bg-card rounded-lg shadow-lg"
          >
            {/* Background Layer */}
            <Layer>
              <Rect
                x={0}
                y={0}
                width={stageSize.width}
                height={stageSize.height}
                fill={canvasBackground}
                listening={false}
              />
              {/* Subtle gradient overlay for depth */}
              <Rect
                x={0}
                y={0}
                width={stageSize.width}
                height={stageSize.height}
                fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                fillLinearGradientEndPoint={{ x: stageSize.width, y: stageSize.height }}
                fillLinearGradientColorStops={[0, 'rgba(255,255,255,0.1)', 1, 'rgba(0,0,0,0.1)']}
                listening={false}
              />
            </Layer>
            
            {/* T-shirt Layer */}
            <Layer>
              <TShirtBackground 
                variant={tshirtSettings.variant} 
                color={tshirtSettings.color}
                stageSize={stageSize}
              />
              
              {elements
                .sort((a, b) => a.zIndex - b.zIndex)
                .map((element) => (
                  element.type === 'image' ? (
                    <DesignImage
                      key={element.id}
                      element={element}
                      isSelected={element.id === selectedElementId}
                      onSelect={() => selectElement(element.id)}
                    />
                  ) : (
                    <DesignText
                      key={element.id}
                      element={element}
                      isSelected={element.id === selectedElementId}
                      onSelect={() => selectElement(element.id)}
                    />
                  )
                ))}
              
              <Transformer
                ref={transformerRef}
                boundBoxFunc={(oldBox, newBox) => {
                  if (newBox.width < 5 || newBox.height < 5) {
                    return oldBox;
                  }
                  return newBox;
                }}
              />
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
};