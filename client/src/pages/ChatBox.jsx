import { Stack } from "react-bootstrap";
import useFetchRecipent from "../hooks/useFetchRecipent";
import usePotentialChat from "../hooks/usePotentialChat";
import moment from "moment";
const ChatBox = (chat, user) => {
  const { messages, isMessageLoading, currentChat } = usePotentialChat();

  const { recipientUser } = useFetchRecipent(currentChat, chat, user);

  if (!recipientUser) {
    return (
      <p className="text-center w-100">No conversation selected yet....</p>
    );
  }

  if (isMessageLoading) {
    return <p className="text-center w-100">Loading Chat....</p>;
  }
  return (
    <Stack gap={4} className="chat-box">
      <div className="chat-header">
        <strong>{recipientUser?.name}</strong>
      </div>
      <Stack gap={3} className="messages">
        {messages &&
          messages.map((msg, i) => (
            <Stack key={i}>
              <span>{msg.text}</span>
              <span className="message-footer">
                {moment(msg.createdAt).calendar()}
              </span>
            </Stack>
          ))}
      </Stack>
    </Stack>
  );
};

export default ChatBox;
