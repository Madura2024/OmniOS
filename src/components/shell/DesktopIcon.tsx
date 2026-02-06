'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '@/store/useOSStore';

interface DesktopIconProps {
    id: string;
    title: string;
    icon: React.ReactNode;
    content: React.ReactNode;
    emoji: string;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ id, title, icon, content, emoji }) => {
    const { openWindow } = useOSStore();

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openWindow(id, title, content, emoji)}
            className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl hover:bg-white/5 cursor-pointer pointer-events-auto group"
        >
            <div className="w-14 h-14 glass-lighter rounded-2xl flex items-center justify-center text-2xl group-hover:bg-white/10 transition-colors shadow-lg">
                {icon}
            </div>
            <span className="text-[10px] font-medium text-white/70 group-hover:text-white transition-colors text-center px-1 drop-shadow-md">
                {title}
            </span>
        </motion.div>
    );
};

export default DesktopIcon;
