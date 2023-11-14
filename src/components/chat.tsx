import React, { useState, ChangeEvent } from "react";
import {
  Avatar,
  ActionIcon,
  TextInput,
  Card,
  Paper,
  Text,
  Group,
  Center,
  Divider,

  rem,
} from "@mantine/core";
import {
  IconSearch,
  IconArrowRight,

} from "@tabler/icons-react";
import classes from "./Chat.module.css";
import axios from "axios";

interface Message {
  type: "user" | "bot";
  text: string;
}
interface ChatBotProps {
  messages: Message[];
  onSendMessage: (message: Message) => void;
}

const WelcomeMessage: React.FC = () => {
  return (
    <Center>
      <Paper radius="sm" withBorder p="xl">
        <Text size="xl">Welcome to the AI Chatbot!</Text>
        <Text size="md">Start a conversation or try some examples.</Text>

      </Paper>
    </Center>
  );
};

const ChatBot: React.FC<ChatBotProps> = ({ messages, onSendMessage }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.trim()) {
      const trimmedInput = inputValue.trim();
      onSendMessage({ type: "user" as "user", text: trimmedInput });
      setInputValue("");
      setLoading(true);

      try {
        const response = await axios.post("http://127.0.0.1:80/chat/", {
          message: trimmedInput,
        });

        const botResponse = response.data.response;
        console.log("Bot Response:", botResponse);

        if (botResponse) {
          onSendMessage({ type: "bot", text: botResponse });
        } else {
          onSendMessage({ type: "bot", text: "Sorry, I didn't understand that." });
        }
      } catch (error) {
        console.error("Error fetching bot's response:", error);
        onSendMessage({ type: "bot", text: "An error occurred while fetching the response." });
      } finally {
        setLoading(false);
      }
    }
  };
  return (

    <Card
      shadow="sm" padding="lg" radius="md" withBorder
      className={classes.chatwidth}
    >
      {/* Chat messages container */}
      <div className={classes.chatMessagesContainer} style={{ flexGrow: 1 }}>
        {messages.length === 0 && !loading ? (
          <WelcomeMessage />
        ) : (
          messages.map((message, index) => (
            <div key={index} className={message.type === "user" ? classes.userMessage : classes.botMessage}>
              <Paper shadow="xs" radius="lg" withBorder style={{}}

              >
                <Group>
                  <Avatar
                    size={40}
                    color={message.type === "bot" ? "blue" : "teal"}
                  >
                    {message.type === "bot" ? "B" : "U"}
                  </Avatar>
                  <Text>{message.text}</Text>
                </Group>
              </Paper>
              <Divider />
            </div>
          ))
        )}
      </div>

      {/* Input container */}


      <Group>
        <form onSubmit={handleSendMessage}>
          <TextInput
            radius="xl"
            size="md"
            placeholder="Ask a question"
            value={inputValue}
            onChange={handleInputChange}

            rightSectionWidth={40}
            leftSection={
              <IconSearch
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            }
            rightSection={
              <ActionIcon
                type="submit"
                size={32}
                radius="xl"
                color={"red"}
                variant="filled"
              >
                <IconArrowRight
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              </ActionIcon>
            }
            className={
              classes.cinput
            }
          />
        </form>
      </Group>


    </Card>

  );
};

export default ChatBot;
