'use client';

import { useState } from 'react';
import ChatSidebar from '@/components/ChatSidebar';
import { usePathname } from 'next/navigation';
import { useChats } from '@/hooks/useChats';
import { ChatProvider, useChatContext } from '@/hooks/ChatContext';

interface SidebarLayoutProps {
  children: React.ReactNode;
}

function SidebarLayoutContent({ children }: SidebarLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { selectedChatId, setSelectedChatId, selectedChatTitle } = useChatContext();
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  if (isLandingPage) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <div className="min-h-full flex bg-zinc-50 dark:bg-zinc-950">
      <div
        className={`fixed inset-y-0 left-0 z-40 w-72 transform bg-gray-900 text-white border-r border-gray-700 transition-transform duration-300 md:static md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <span className="text-sm font-semibold">Chats</span>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/10 text-white hover:bg-white/20"
            aria-label="Cerrar sidebar"
          >
            ×
          </button>
        </div>

        <ChatSidebar 
          onSelectChat={(id) => {
            setSelectedChatId(id);
            setSidebarOpen(false);
          }} 
          currentChatId={selectedChatId}
          onClose={() => setSidebarOpen(false)} 
        />
      </div>

      {sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          aria-label="Cerrar overlay"
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <div className="md:hidden border-b border-zinc-200 bg-white/90 backdrop-blur-sm sticky top-0 z-30">
          <div className="mx-4 flex items-center justify-between py-3">
            <span className="text-sm font-semibold text-zinc-900 truncate pr-4">
              {selectedChatTitle}
            </span>
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 shrink-0"
            >
              <span>Chats</span>
              <span className="text-lg">☰</span>
            </button>
          </div>
        </div>

        <main className="flex-1 relative overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const { chats } = useChats();
  
  return (
    <ChatProvider chats={chats}>
      <SidebarLayoutContent>{children}</SidebarLayoutContent>
    </ChatProvider>
  );
}
