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
      {/* Main chat item button */}
      <button
        onClick={onSelect}
        className="w-full text-left px-3 py-2 flex items-center gap-2 truncate"
        title={chatTitle}
      >
        <span className="flex-1 truncate text-sm">{chatTitle}</span>
        <span className="text-xs text-gray-500 flex-shrink-0">{formattedDate}</span>
      </button>

      {/* Delete button - appears on hover */}
      {isHovering && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          {showConfirm ? (
            <div className="flex gap-1">
              <button
                onClick={() => handleDelete()}
                disabled={isDeleting}
                className="p-1 text-red-400 hover:text-red-300 disabled:text-gray-500"
                title="Confirm delete"
              >
                ✓
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                disabled={isDeleting}
                className="p-1 text-gray-400 hover:text-gray-300 disabled:text-gray-500"
                title="Cancel"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirm(true)}
              className="p-1 text-gray-400 hover:text-red-400 transition-colors"
              title="Delete chat"
            >
              🗑️
            </button>
          )}
        </div>
      )}
    </div>
  );
}
