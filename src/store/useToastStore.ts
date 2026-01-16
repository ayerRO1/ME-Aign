import { create } from 'zustand';

interface Toast {
  id: string;
  message: string;
}

interface ToastState {
  toasts: Toast[];
  push: (message: string) => void;
  remove: (id: string) => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  push: (message) => {
    const id = crypto.randomUUID();
    set((state) => ({ toasts: [...state.toasts, { id, message }] }));
    window.setTimeout(() => {
      get().remove(id);
    }, 2400);
  },
  remove: (id) => set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }))
}));
