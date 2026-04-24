'use client';

import { useState, useEffect, useCallback } from 'react';

export interface ChatMessage {
  id: string;
  chatId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: string;
}

interface UseChatMessagesReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  addMessages: (messages: Array<Pick<ChatMessage, 'role' | 'content'>>) => Promise<boolean>;
}

export function useChatMessages(chatId?: string): UseChatMessagesReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    if (!chatId) {
      setMessages([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/chats/${chatId}`);
      if (!response.ok) {
        throw new Error(`Failed to load chat messages: ${response.status}`);
      }

      const data = await response.json();
      setMessages(Array.isArray(data?.messages) ? data.messages : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error loading messages');
      console.error('useChatMessages error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [chatId]);

  const addMessages = useCallback(
    async (newMessages: Array<Pick<ChatMessage, 'role' | 'content'>>) => {
      if (!chatId) {
        setError('Chat ID is required to save messages.');
        return false;
      }

      try {
        const response = await fetch('/api/chats', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chatId,
            messages: newMessages,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to save messages: ${response.status}`);
        }

        const data = await response.json();
        setMessages(Array.isArray(data?.messages) ? data.messages : []);
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error saving messages');
        console.error('useChatMessages error:', err);
        return false;
      }
    },
    [chatId],
  );

  useEffect(() => {
    void fetchMessages();
  }, [fetchMessages]);

  return {
    messages,
    isLoading,
    error,
    refetch: fetchMessages,
    addMessages,
  };
}
