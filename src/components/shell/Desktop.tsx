'use client';

import React from 'react';
import { useOSStore } from '@/store/useOSStore';
import Window from './Window';
import CommandBar from './CommandBar';
import Dock from './Dock';
import DesktopIcon from './DesktopIcon';
import AIChat from '@/widgets/ai-chat/AIChat';
import GitHubStatus from '@/widgets/github-status/GitHubStatus';
import { Bot, Github, Cpu, FileText } from 'lucide-react';

const Desktop: React.FC = () => {
    const { windows } = useOSStore();

    return (
        <div className="relative w-screen h-screen overflow-hidden select-none">
            <div className="omnios-bg" />
            <CommandBar />

            {/* Desktop Icons Area */}
            <div className="absolute inset-0 p-8 grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] grid-rows-[repeat(auto-fill,minmax(100px,1fr))] gap-4 pointer-events-none">
                <DesktopIcon
                    id="ai-chat"
                    title="AI Assistant"
                    icon={<Bot size={32} />}
                    content={<AIChat />}
                    emoji="🤖"
                />
                <DesktopIcon
                    id="github"
                    title="GitHub"
                    icon={<Github size={32} />}
                    content={<GitHubStatus />}
                    emoji="🐙"
                />
                <DesktopIcon
                    id="system"
                    title="System Console"
                    icon={<Cpu size={32} />}
                    content={<div>System Statistics</div>}
                    emoji=""
                />
                <DesktopIcon
                    id="readme"
                    title="OmniOS.md"
                    icon={<FileText size={32} />}
                    content={<div>Documentation and Guides</div>}
                    emoji="📄"
                />
            </div>

            {/* Windows Layer */}
            <div className="absolute inset-0 pointer-events-none">
                {windows.filter(w => w.isOpen).map((window) => (
                    <Window key={window.id} window={window} />
                ))}
            </div>

            <Dock />
        </div>
    );
};

export default Desktop;
