import { useCallback, useEffect, useState } from 'react';
import type { UIMessage } from 'ai';

export type UseChatMessagesResult = {
  messages: UIMessage[];
  isLoading: boolean;
  error: Error | null;
  reload: () => Promise<void>;
};

export function useChatMessages(chatId?: string): UseChatMessagesResult {
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadMessages = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const url = chatId ? `/api/chat?chatId=${encodeURIComponent(chatId)}` : '/api/chat';
      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Error cargando mensajes: ${response.status} ${response.statusText}`);
      }

      const data = (await response.json()) as UIMessage[];
      setMessages(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error cargando mensajes'));
    } finally {
      setIsLoading(false);
    }
  }, [chatId]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  return {
    messages,
    isLoading,
    error,
    reload: loadMessages,
  };
}
