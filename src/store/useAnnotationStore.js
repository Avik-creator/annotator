import { create } from 'zustand';

export const useAnnotationStore = create((set) => ({
  text: '',
  setText: (text) => set({ text }),
  annotations: [],
  addAnnotation: (annotation) =>
    set((state) => ({
      annotations: [...state.annotations, annotation],
    })),
  removeAnnotation: (id) =>
    set((state) => ({
      annotations: state.annotations.filter((a) => a.id !== id),
    })),
  entityTypes: [],
  addEntityType: (entityType) =>
    set((state) => ({
      entityTypes: [...state.entityTypes, entityType],
    })),
  removeEntityType: (name) =>
    set((state) => ({
      entityTypes: state.entityTypes.filter((et) => et.name !== name),
    })),
}));