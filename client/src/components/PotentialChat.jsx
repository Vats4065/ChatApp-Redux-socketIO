import usePotentialChat from "../hooks/usePotentialChat";

const PotentialChat = (user, chat) => {
  // const [allChats, setAllChats] = useState([]);
  const { potentialChat, ChatCreate } = usePotentialChat(user, chat);

  // console.log(potentialChat);
  // useEffect(() => {
  //   setCreateChat((prev) => [...prev, potentialChat]);
  // }, [potentialChat]);

  return (
    <div className="all-users">
      {potentialChat &&
        potentialChat.map((u, i) => {
          return (
            <div
              className="single-user"
              key={i}
              onClick={() => ChatCreate(user?.user?._id, u?._id)}
            >
              {u.name}
              <span className="user-online"></span>
            </div>
          );
        })}
    </div>
  );
};

export default PotentialChat;
