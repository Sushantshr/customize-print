'use client';

import React, { createContext, useContext, useCallback } from 'react';
import { create } from 'zustand';

export interface DesignElement {
  id: string;
  type: 'image' | 'text';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  visible: boolean;
  zIndex: number;
  // Image specific
  src?: string;
  flipX?: boolean;
  flipY?: boolean;
  // Text specific
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fill?: string;
  fontStyle?: string;
  textDecoration?: string;
}

export interface TShirtSettings {
  variant: 'tee' | 'polo' | 'hoodie' | 'longsleeve' | 'tank';
  color: string;
  size: string;
}

interface DesignStore {
  elements: DesignElement[];
  selectedElementId: string | null;
  tshirtSettings: TShirtSettings;
  canvasSize: { width: number; height: number };
  
  // Actions
  addElement: (element: Omit<DesignElement, 'id' | 'zIndex'>) => void;
  updateElement: (id: string, updates: Partial<DesignElement>) => void;
  removeElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  moveElementToFront: (id: string) => void;
  moveElementToBack: (id: string) => void;
  updateTShirtSettings: (updates: Partial<TShirtSettings>) => void;
  clearDesign: () => void;
  duplicateElement: (id: string) => void;
}

const useDesignStore = create<DesignStore>((set, get) => ({
  elements: [],
  selectedElementId: null,
  tshirtSettings: {
    variant: 'tee',
    color: '#EF4444',
    size: 'M'
  },
  canvasSize: { width: 400, height: 500 },

  addElement: (element) => {
    const newElement: DesignElement = {
      ...element,
      id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      zIndex: get().elements.length
    };
    set((state) => ({
      elements: [...state.elements, newElement],
      selectedElementId: newElement.id
    }));
  },

  updateElement: (id, updates) => {
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id ? { ...el, ...updates } : el
      )
    }));
  },

  removeElement: (id) => {
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
      selectedElementId: state.selectedElementId === id ? null : state.selectedElementId
    }));
  },

  selectElement: (id) => {
    set({ selectedElementId: id });
  },

  moveElementToFront: (id) => {
    const elements = get().elements;
    const maxZ = Math.max(...elements.map(el => el.zIndex));
    get().updateElement(id, { zIndex: maxZ + 1 });
  },

  moveElementToBack: (id) => {
    const elements = get().elements;
    const minZ = Math.min(...elements.map(el => el.zIndex));
    get().updateElement(id, { zIndex: minZ - 1 });
  },

  updateTShirtSettings: (updates) => {
    set((state) => ({
      tshirtSettings: { ...state.tshirtSettings, ...updates }
    }));
  },

  clearDesign: () => {
    set({
      elements: [],
      selectedElementId: null
    });
  },

  duplicateElement: (id) => {
    const element = get().elements.find(el => el.id === id);
    if (element) {
      const duplicate = {
        ...element,
        x: element.x + 20,
        y: element.y + 20
      };
      get().addElement(duplicate);
    }
  }
}));

const DesignContext = createContext<typeof useDesignStore | null>(null);

export const DesignProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <DesignContext.Provider value={useDesignStore}>
      {children}
    </DesignContext.Provider>
  );
};

export const useDesign = () => {
  const store = useContext(DesignContext);
  if (!store) {
    throw new Error('useDesign must be used within a DesignProvider');
  }
  return store();
};