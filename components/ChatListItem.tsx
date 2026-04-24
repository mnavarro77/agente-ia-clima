'use client';

import { useState } from 'react';

interface Chat {
  id: string;
  title?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface ChatListItemProps {
  chat: Chat;
  isActive?: boolean;
  onSelect?: () => void;
  onDelete?: () => void;
}

export default function ChatListItem({
  chat,
  isActive = false,
  onSelect,
  onDelete,
}: ChatListItemProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/chats/${chat.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDelete?.();
      } else {
        console.error('Failed to delete chat');
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  const chatTitle = chat.title || 'Untitled Chat';
  const formattedDate = new Date(chat.createdAt).toLocaleDateString('es-ES', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`relative group rounded-md transition-colors ${
        isActive
          ? 'bg-gray-700 text-white'
          : 'bg-transparent text-gray-300 hover:bg-gray-800'
      }`}
    >
      {/* Sidebar item content */}
      <div className="flex items-center w-full px-3 py-2 gap-2 relative h-10 group-hover:pr-12 transition-all">
        <button
          onClick={onSelect}
          className="flex-1 text-left truncate text-sm outline-none"
          title={chatTitle}
        >
          {chatTitle}
        </button>

        {/* Action / Date area */}
        <div className="flex items-center justify-end w-12 h-full absolute right-2">
          {isHovering ? (
            <div className="flex items-center justify-end animate-in fade-in slide-in-from-right-1 duration-200">
              {showConfirm ? (
                <div className="flex gap-1 bg-gray-800 rounded px-1">
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="p-1 text-red-500 hover:text-red-400 font-bold"
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    disabled={isDeleting}
                    className="p-1 text-gray-400 hover:text-gray-200"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowConfirm(true)}
                  className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-md transition-all"
                  title="Borrar chat"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          ) : (
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
              {formattedDate}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
