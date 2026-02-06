import { create } from 'zustand';

export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  content: React.ReactNode;
  icon?: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface OSState {
  windows: WindowState[];
  activeWindowId: string | null;
  openWindow: (id: string, title: string, content: React.ReactNode, icon?: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  updateWindowSize: (id: string, width: number, height: number) => void;
}

export const useOSStore = create<OSState>((set) => ({
  windows: [],
  activeWindowId: null,

  openWindow: (id, title, content, icon) => set((state) => {
    const existing = state.windows.find((w) => w.id === id);
    if (existing) {
      return { ...state, activeWindowId: id, windows: state.windows.map(w => w.id === id ? { ...w, isOpen: true, isMinimized: false } : w) };
    }
    const maxZ = Math.max(0, ...state.windows.map(w => w.zIndex));
    const newWindow: WindowState = {
      id,
      title,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: maxZ + 1,
      content,
      icon,
      x: 100 + state.windows.length * 40,
      y: 100 + state.windows.length * 40,
      width: 600,
      height: 400,
    };
    return { windows: [...state.windows, newWindow], activeWindowId: id };
  }),

  closeWindow: (id) => set((state) => ({
    windows: state.windows.filter((w) => w.id !== id),
    activeWindowId: state.activeWindowId === id ? (state.windows.length > 1 ? state.windows[state.windows.length - 2].id : null) : state.activeWindowId,
  })),

  focusWindow: (id) => set((state) => {
    const maxZ = Math.max(0, ...state.windows.map(w => w.zIndex));
    return {
      activeWindowId: id,
      windows: state.windows.map((w) => w.id === id ? { ...w, zIndex: maxZ + 1 } : w),
    };
  }),

  minimizeWindow: (id) => set((state) => ({
    windows: state.windows.map((w) => w.id === id ? { ...w, isMinimized: true } : w),
  })),

  maximizeWindow: (id) => set((state) => ({
    windows: state.windows.map((w) => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w),
  })),

  updateWindowPosition: (id, x, y) => set((state) => ({
    windows: state.windows.map((w) => w.id === id ? { ...w, x, y } : w),
  })),

  updateWindowSize: (id, width, height) => set((state) => ({
    windows: state.windows.map((w) => w.id === id ? { ...w, width, height } : w),
  })),
}));
