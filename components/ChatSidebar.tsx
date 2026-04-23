'use client';

import { useState } from 'react';
import ChatListItem from './ChatListItem';
import { useChats } from '../hooks/useChats';

interface Chat {
  id: string;
  title?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface ChatSidebarProps {
  onSelectChat?: (chatId: string) => void;
  currentChatId?: string;
}

export default function ChatSidebar({
  onSelectChat,
  currentChatId,
}: ChatSidebarProps) {
  const { chats, isLoading, error, createChat, deleteChat } = useChats();
  const [isCreatingChat, setIsCreatingChat] = useState(false);

  const handleNewChat = async () => {
    setIsCreatingChat(true);
    try {
      const newChat = await createChat();
      if (newChat) {
        onSelectChat?.(newChat.id);
      }
    } catch (error) {
      console.error('Error creating new chat:', error);
    } finally {
      setIsCreatingChat(false);
    }
  };

  const handleDeleteChat = async (chatId: string) => {
    const success = await deleteChat(chatId);
    if (success && currentChatId === chatId) {
      // If we deleted the current chat, select the first available chat
      const remainingChats = chats.filter(chat => chat.id !== chatId);
      if (remainingChats.length > 0) {
        onSelectChat?.(remainingChats[0].id);
      } else {
        onSelectChat?.(''); // No chats left
      }
    }
  };

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen flex flex-col border-r border-gray-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <button
          onClick={handleNewChat}
          disabled={isCreatingChat}
          className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-md font-medium transition-colors"
        >
          {isCreatingChat ? 'Creating...' : '+ New Chat'}
        </button>
        {error && (
          <p className="text-red-400 text-sm mt-2">{error}</p>
        )}
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 text-gray-400 text-sm">Loading chats...</div>
        ) : chats.length === 0 ? (
          <div className="p-4 text-gray-400 text-sm">No chats yet. Create one to start!</div>
        ) : (
          <nav className="space-y-2 p-2">
            {chats.map((chat) => (
              <ChatListItem
                key={chat.id}
                chat={chat}
                isActive={chat.id === currentChatId}
                onSelect={() => onSelectChat?.(chat.id)}
                onDelete={() => handleDeleteChat(chat.id)}
              />
            ))}
          </nav>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 text-xs text-gray-500">
        <p>Chat App</p>
      </div>
    </aside>
  );
}
