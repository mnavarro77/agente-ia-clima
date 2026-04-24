import ChatView from '@/components/ChatView';

interface ChatPageProps {
  params: {
    id: string;
  };
}

export default function ChatPage({ params }: ChatPageProps) {
  return <ChatView chatId={params.id} />;
}
