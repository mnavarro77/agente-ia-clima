'use client';

import { useState, useEffect } from 'react';

interface Chat {
  id: string;
  title?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface UseChatsReturn {
  chats: Chat[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createChat: (title?: string) => Promise<Chat | null>;
  deleteChat: (chatId: string) => Promise<boolean>;
}

export function useChats(): UseChatsReturn {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChats = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/chats');
      if (!response.ok) {
        throw new Error(`Failed to fetch chats: ${response.status}`);
      }

      const data = await response.json();
      setChats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching chats:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const createChat = async (title: string = 'New Chat'): Promise<Chat | null> => {
    try {
      const response = await fetch('/api/chats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create chat: ${response.status}`);
      }

      const newChat = await response.json();
      setChats(prev => [newChat, ...prev]); // Add to beginning of list
      return newChat;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create chat');
      console.error('Error creating chat:', err);
      return null;
    }
  };

  const deleteChat = async (chatId: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/chats/${chatId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete chat: ${response.status}`);
      }

      setChats(prev => prev.filter(chat => chat.id !== chatId));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete chat');
      console.error('Error deleting chat:', err);
      return false;
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return {
    chats,
    isLoading,
    error,
    refetch: fetchChats,
    createChat,
    deleteChat,
  };
}
