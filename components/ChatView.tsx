'use client';

import { useChat } from '@ai-sdk/react';
import { isToolUIPart } from 'ai';
import { useState, useEffect, useRef } from 'react';
import ThemeToggle from '@/components/ThemeToggle';

const WeatherCard = ({ data }: { data: any }) => {
  if (!data) return null;
  return (
    <div className="mt-4 p-5 bg-linear-to-br from-blue-600 to-indigo-700 text-white rounded-2xl shadow-xl border border-white/10 overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-30 transition-opacity">
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.42 0s.39-1.03 0-1.42L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.42 0s.39-1.03 0-1.42l-1.06-1.06zm1.06-12.37a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.42s1.03.39 1.42 0l1.06-1.06zM7.05 18.37a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.42s1.03.39 1.42 0l1.06-1.06z" />
        </svg>
      </div>
      <div className="flex justify-between items-start z-10 relative">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100/80">Weather Report</span>
          <h3 className="text-xl font-bold mt-1">{data.location ?? 'Unknown'}</h3>
        </div>
        <div className="text-3xl">☀️</div>
      </div>
      <div className="mt-4 flex items-end gap-2 z-10 relative">
        <div className="text-4xl font-black tracking-tight">{data.temperature ?? '--'}°</div>
        <div className="text-lg font-medium text-blue-100 mb-1">Fahrenheit</div>
      </div>
      <div className="mt-1 text-sm font-medium text-blue-100/70 z-10 relative">
        {data.condition ?? 'Conditions are optimal'} • Humidity 45%
      </div>
    </div>
  );
};

export default function ChatView() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat();
  const isLoading = status === 'submitted' || status === 'streaming';
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const text = input;
    setInput('');
    await sendMessage({ text });
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased selection:bg-blue-100 dark:selection:bg-blue-900/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-500/5 dark:bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-500/5 dark:bg-indigo-600/5 rounded-full blur-[120px]" />
      </div>

      <header className="h-16 flex items-center border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl sticky top-0 z-20 transition-colors">
        <div className="max-w-4xl mx-auto w-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-linear-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-black text-xs">AI</span>
            </div>
            <div>
              <h1 className="font-bold text-sm tracking-tight text-zinc-800 dark:text-zinc-100">NextGen AI</h1>
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-blue-500 animate-pulse' : 'bg-emerald-500'}`} />
                <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
                  {isLoading ? 'Processing request...' : 'Online & Ready'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors text-zinc-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-none relative">
        <div className="max-w-3xl mx-auto px-6 py-10 min-h-full flex flex-col">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 py-20">
              <div className="relative">
                <div className="w-24 h-24 bg-linear-to-tr from-blue-600 to-indigo-600 rounded-3xl rotate-12 flex items-center justify-center shadow-2xl shadow-blue-500/40 relative z-10">
                  <svg className="w-10 h-10 text-white -rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-blue-500 rounded-3xl blur-2xl opacity-20 animate-pulse" />
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">¿Cómo puedo ayudarte hoy?</h2>
                <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto text-sm leading-relaxed">
                  Soy tu asistente inteligente de última generación. Pregúntame sobre el clima, código o cualquier otra cosa.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg pt-4">
                {[
                  '¿Cómo está el clima en Madrid?',
                  'Explícame qué es una PWA',
                  'Dame una receta de pasta',
                  'Escribe un script en Python',
                ].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => setInput(prompt)}
                    className="p-4 text-left text-xs font-semibold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/5 transition-all text-zinc-600 dark:text-zinc-300"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8 pb-32">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} group animate-in slide-in-from-bottom-2 duration-300`}
                >
                  <div className={`flex flex-col max-w-[85%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`relative px-5 py-3.5 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20'
                        : 'bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-800 dark:text-zinc-200 shadow-sm'
                    }`}>
                      <div className="space-y-4">
                        {message.parts.map((part, i) => (
                          <div key={i}>
                            {part.type === 'text' && (
                              <p className="whitespace-pre-wrap leading-relaxed text-[15px]">{part.text}</p>
                            )}
                            {isToolUIPart(part) && (
                              <div className="mt-4">
                                {part.type === 'tool-weather' && part.state === 'output-available' && (
                                  <WeatherCard data={part.output} />
                                )}
                                {(part.state === 'input-streaming' || part.state === 'input-available') && (
                                  <div className="flex items-center gap-3 px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-700">
                                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                                      Checking tool...
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    <span className="mt-2 px-1 text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      {message.role === 'user' ? 'Tú' : 'AI Assistant'}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-pulse">
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-5 py-3 rounded-2xl flex gap-1.5 items-center">
                    <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <div className="p-6 bg-linear-to-t from-zinc-50 via-zinc-50 to-transparent dark:from-zinc-950 dark:via-zinc-950 fixed bottom-0 left-0 right-0 z-30">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative group">
          <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-indigo-500 rounded-2xl opacity-0 group-focus-within:opacity-15 blur-md transition-all duration-500" />
          <div className="relative flex items-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl transition-all group-focus-within:border-blue-500/50">
            <input
              className="flex-1 bg-transparent text-zinc-900 dark:text-zinc-100 px-6 py-4.5 outline-none text-[15px] placeholder:text-zinc-400"
              value={input}
              placeholder="Pregúntame lo que quieras..."
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="pr-2 flex items-center gap-2">
              <button
                type="button"
                className="p-2.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                title="Subir archivo"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 p-2.5 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          <p className="mt-2.5 text-center text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">
            NextGen AI puede cometer errores. Considera verificar la información importante.
          </p>
        </form>
      </div>
    </div>
  );
}
