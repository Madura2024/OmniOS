'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Github, MessageSquare, Settings, LayoutGrid } from 'lucide-react';
import { useOSStore } from '@/store/useOSStore';
import AIChat from '@/widgets/ai-chat/AIChat';
import GitHubStatus from '@/widgets/github-status/GitHubStatus';

const Dock: React.FC = () => {
    const { openWindow } = useOSStore();

    const apps = [
        { id: 'system', title: 'System', icon: <Cpu size={24} />, content: <div>System Stats</div>, emoji: '' },
        { id: 'ai-chat', title: 'AI Chat', icon: <MessageSquare size={24} />, content: <AIChat />, emoji: '🤖' },
        { id: 'github', title: 'GitHub', icon: <Github size={24} />, content: <GitHubStatus />, emoji: '🐙' },
        { id: 'apps', title: 'All Apps', icon: <LayoutGrid size={24} />, content: <div>Apps Gallery</div>, emoji: '📱' },
        { id: 'settings', title: 'Settings', icon: <Settings size={24} />, content: <div>Settings</div>, emoji: '⚙️' },
    ];

    return (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-end gap-2 px-4 py-2 glass rounded-2xl z-50">
            {apps.map((app) => (
                <motion.button
                    key={app.id}
                    whileHover={{ y: -10, scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => openWindow(app.id, app.title, app.content, app.emoji)}
                    className="p-3 glass-lighter rounded-xl hover:bg-white/20 transition-colors group relative"
                >
                    {app.icon}
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 glass rounded-md text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {app.title}
                    </span>
                </motion.button>
            ))}
        </div>
    );
};

export default Dock;
