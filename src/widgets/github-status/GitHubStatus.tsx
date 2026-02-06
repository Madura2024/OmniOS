'use client';

import React from 'react';
import { Github, Star, GitBranch, GitPullRequest, Circle } from 'lucide-react';

const GitHubStatus: React.FC = () => {
    // Mock data for demo
    const repos = [
        { name: 'omnios-core', stars: 124, status: 'Active', color: 'bg-green-500' },
        { name: 'plugin-sdk', stars: 45, status: 'Idle', color: 'bg-yellow-500' },
        { name: 'ai-adapters', stars: 89, status: 'Building', color: 'bg-blue-500' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-2 glass rounded-lg">
                        <Github size={20} />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold">GitHub Activity</h3>
                        <p className="text-[10px] opacity-50">Connected as @dev_user</p>
                    </div>
                </div>
                <div className="flex items-center gap-1 glass p-1 px-2 rounded-md scale-75">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-[10px] font-bold">258</span>
                </div>
            </div>

            <div className="space-y-3">
                {repos.map((repo) => (
                    <div key={repo.name} className="glass bg-white/5 p-3 rounded-xl flex items-center justify-between group hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className={`${repo.color} w-1.5 h-1.5 rounded-full animate-pulse`} />
                            <div>
                                <p className="text-xs font-medium">{repo.name}</p>
                                <div className="flex items-center gap-2 mt-1 opacity-40 text-[10px]">
                                    <span className="flex items-center gap-1"><GitBranch size={10} /> main</span>
                                    <span className="flex items-center gap-1"><GitPullRequest size={10} /> 2 open</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] opacity-40 uppercase tracking-tighter font-bold">{repo.status}</span>
                            <div className="p-1.5 glass-lighter rounded-md group-hover:bg-white/20 transition-colors">
                                <Star size={10} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] opacity-40 font-bold uppercase">Contributions</span>
                    <span className="text-[10px] text-green-500 font-bold">+12% this week</span>
                </div>
                <div className="flex gap-1">
                    {Array.from({ length: 24 }).map((_, i) => (
                        <div
                            key={i}
                            className={`flex-1 h-3 rounded-[2px] ${Math.random() > 0.5 ? 'bg-green-500/40' : Math.random() > 0.8 ? 'bg-green-500' : 'bg-white/5'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GitHubStatus;
