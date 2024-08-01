import { useEffect } from "react";
import { Container, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import UserChat from "../components/UserChat";
import { getUserById } from "../redux/auth/authSlice";
import { getChat } from "../redux/auth/chatSlice";
import PotentialChat from "../components/PotentialChat";
import usePotentialChat from "../hooks/usePotentialChat";
import ChatBox from "./ChatBox";

const Chat = () => {
  const dispatch = useDispatch();
  const userID = localStorage.getItem("login_token"); //userId
  const user = useSelector((state) => state?.auth?.userById); // user
  const chat = useSelector((state) => state?.chat);
  const { updateCurrentChat, currentChat } = usePotentialChat();
  useEffect(() => {
    if (userID) {
      dispatch(getChat(userID));
      dispatch(getUserById(userID));
    }
  }, []);
  return (
    <>
      <Container>
        <PotentialChat user={user} chat={chat} />
        {chat?.chat?.chats?.length < 1 ? null : (
          <>
            <Stack
              direction="horizontal"
              gap={4}
              className="align-items-center text-white"
            >
              <Stack className="messages-box flex-glow-0 pe-3 w-25" gap={3}>
                {chat.loading && <p>Loading</p>}
                {user &&
                  chat &&
                  chat?.chat?.chats?.map((chat, i) => {
                    return (
                      <div key={i} onClick={() => updateCurrentChat(chat)}>
                        <UserChat chat={chat} user={user}></UserChat>
                      </div>
                    );
                  })}
              </Stack>
              <ChatBox
                user={user}
                currentChat={currentChat}
                chat={chat}
              ></ChatBox>
            </Stack>
          </>
        )}
      </Container>
    </>
  );
};

export default Chat;
