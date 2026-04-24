import ChatView from '../../../components/ChatView';

type PageProps = {
  params: {
    id: string;
  };
};

export default function Page({ params }: PageProps) {
  return <ChatView chatId={params.id} />;
}
