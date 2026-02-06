'use client';

import React, { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { Send, Bot, User } from 'lucide-react';

const AIChat: React.FC = () => {
    const [input, setInput] = useState('');
    const { messages, sendMessage, status } = useChat();
    const isLoading = status !== 'ready';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        sendMessage(input as any);
        setInput('');
    };

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex-1 overflow-auto space-y-4 pr-2">
                {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center opacity-30 gap-2">
                        <Bot size={48} strokeWidth={1} />
                        <p className="text-sm">How can I assist your workflow today?</p>
                    </div>
                ) : (
                    messages.map((m: any) => (
                        <div
                            key={m.id}
                            className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${m.role === 'user' ? 'glass-lighter' : 'glass'
                                }`}>
                                {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                            </div>
                            <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${m.role === 'user' ? 'bg-white/10' : 'glass bg-white/5'
                                }`}>
                                {m.content}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    className="flex-1 glass-lighter rounded-xl px-4 py-2 text-sm outline-none border-none focus:ring-1 focus:ring-white/20 text-white"
                    value={input}
                    placeholder="Type your message..."
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="p-2 glass-lighter rounded-xl hover:bg-white/10 transition-colors disabled:opacity-50"
                >
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
};

export default AIChat;
