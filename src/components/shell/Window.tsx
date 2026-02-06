'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Square, X } from 'lucide-react';
import { useOSStore, WindowState } from '@/store/useOSStore';

interface WindowProps {
    window: WindowState;
}

const Window: React.FC<WindowProps> = ({ window }) => {
    const { focusWindow, closeWindow, minimizeWindow, maximizeWindow, updateWindowPosition } = useOSStore();

    if (window.isMinimized) return null;

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            drag
            dragMomentum={false}
            onDragEnd={(_, info) => {
                updateWindowPosition(window.id, window.x + info.offset.x, window.y + info.offset.y);
            }}
            onClick={() => focusWindow(window.id)}
            style={{
                zIndex: window.zIndex,
                position: 'absolute',
                left: window.x,
                top: window.y,
                width: window.isMaximized ? '100vw' : window.width,
                height: window.isMaximized ? 'calc(100vh - 64px)' : window.height,
                ...(window.isMaximized && { left: 0, top: 0 }),
            }}
            className={`glass rounded-xl flex flex-col pointer-events-auto overflow-hidden ${window.isMaximized ? 'rounded-none' : ''
                }`}
        >
            {/* Title Bar */}
            <div
                className="h-10 flex items-center justify-between px-4 glass-lighter cursor-move"
                onDoubleClick={() => maximizeWindow(window.id)}
            >
                <div className="flex items-center gap-2">
                    {window.icon && <span className="text-sm">{window.icon}</span>}
                    <span className="text-sm font-medium opacity-80">{window.title}</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); minimizeWindow(window.id); }}
                        className="p-1 hover:bg-white/10 rounded-md transition-colors"
                    >
                        <Minus size={14} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); maximizeWindow(window.id); }}
                        className="p-1 hover:bg-white/10 rounded-md transition-colors"
                    >
                        <Square size={12} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); closeWindow(window.id); }}
                        className="p-1 hover:bg-red-500/50 rounded-md transition-colors"
                    >
                        <X size={14} />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto p-4 bg-black/20">
                {window.content}
            </div>
        </motion.div>
    );
};

export default Window;
