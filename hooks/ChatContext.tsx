'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface Chat {
  id: string;
  title?: string | null;
}

interface ChatContextType {
  selectedChatId: string;
  setSelectedChatId: (id: string) => void;
  selectedChatTitle: string;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children, chats }: { children: ReactNode; chats: Chat[] }) {
  const [selectedChatId, setSelectedChatId] = useState<string>('');
  
  const selectedChat = chats.find(c => c.id === selectedChatId);
  const selectedChatTitle = selectedChat?.title || 'NextGen AI';

  return (
    <ChatContext.Provider value={{ selectedChatId, setSelectedChatId, selectedChatTitle }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}
