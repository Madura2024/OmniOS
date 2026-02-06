'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, Cpu, Github, MessageSquare, Settings } from 'lucide-react';
import { useOSStore } from '@/store/useOSStore';
import AIChat from '@/widgets/ai-chat/AIChat';
import GitHubStatus from '@/widgets/github-status/GitHubStatus';

const CommandBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const { openWindow } = useOSStore();

    const handleOpen = (id: string, title: string, content: React.ReactNode, icon: string) => {
        openWindow(id, title, content, icon);
        setIsOpen(false);
    };

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((open) => !open);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: -20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: -20 }}
                        className="w-full max-w-2xl glass-darker rounded-2xl overflow-hidden border border-white/20 shadow-2xl z-10"
                    >
                        <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-white/5">
                            <Search className="text-white/40" size={20} />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search commands, widgets, or ask AI..."
                                className="bg-transparent border-none outline-none flex-1 text-lg placeholder:text-white/20"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <div className="flex items-center gap-1 glass p-1 px-2 rounded-md scale-90">
                                <Command size={12} className="opacity-50" />
                                <span className="text-[10px] font-bold opacity-50">K</span>
                            </div>
                        </div>

                        <div className="max-h-[400px] overflow-auto p-2">
                            <div className="text-[10px] font-bold opacity-30 px-3 py-2 uppercase tracking-widest">Suggestions</div>

                            <CommandItem
                                icon={<Cpu size={16} />}
                                label="System Dashboard"
                                shortcut="S"
                                onClick={() => handleOpen('system', 'System Dashboard', <div>System Stats (Coming Soon)</div>, '')}
                            />
                            <CommandItem
                                icon={<MessageSquare size={16} />}
                                label="AI Chat"
                                shortcut="C"
                                onClick={() => handleOpen('ai-chat', 'AI Chat Assistant', <AIChat />, '🤖')}
                            />
                            <CommandItem
                                icon={<Github size={16} />}
                                label="GitHub Status"
                                shortcut="G"
                                onClick={() => handleOpen('github', 'GitHub Activity', <GitHubStatus />, '🐙')}
                            />
                            <CommandItem
                                icon={<Settings size={16} />}
                                label="Settings"
                                shortcut=","
                                onClick={() => handleOpen('settings', 'Settings', <div>Settings (Coming Soon)</div>, '⚙️')}
                            />
                        </div>

                        <div className="p-3 bg-black/40 border-t border-white/10 flex items-center justify-between text-[10px] opacity-40">
                            <div className="flex gap-4">
                                <span>↑↓ to navigate</span>
                                <span>Enter to select</span>
                            </div>
                            <div>OmniOS v0.1.0</div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const CommandItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    shortcut?: string;
    onClick?: () => void;
}> = ({ icon, label, shortcut, onClick }) => (
    <div
        onClick={onClick}
        className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 cursor-pointer transition-colors group"
    >
        <div className="flex items-center gap-3">
            <div className="p-2 glass rounded-lg group-hover:bg-white/20 transition-colors">
                {icon}
            </div>
            <span className="text-sm font-medium">{label}</span>
        </div>
        {shortcut && (
            <span className="text-[10px] glass p-1 px-2 rounded opacity-30 group-hover:opacity-60 transition-opacity">
                {shortcut}
            </span>
        )}
    </div>
);

export default CommandBar;
