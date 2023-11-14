// src/components/index.tsx
import { useState } from 'react';
import { Affix, ActionIcon } from '@mantine/core';
import ChatBot from "./chat"; // Import the Message type


interface Message {
  type: "user" | "bot";
  text: string;
}

export const ChatWidget = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleChatButtonClick = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };
  

  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }}>     
        <ActionIcon variant="filled" size="xl" radius="xl" aria-label="Chat" onClick={handleChatButtonClick}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" style={{width: 20,height: 30}} className="h-6 w-6 text-white"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"></path></svg>

        </ActionIcon>
      </Affix>
      {isChatOpen && <ChatBot messages={messages} onSendMessage={handleSendMessage} />}
    </>
  );
}
