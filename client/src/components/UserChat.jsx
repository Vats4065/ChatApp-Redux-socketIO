import useFetchRecipent from "../hooks/useFetchRecipent";
import { Stack } from "react-bootstrap";
import avatar from "../assets/avatar.svg";
const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipent(chat, user);

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card  align-items-center p-2 justify-content-between"
      role="button"
    >
      <div className="d-flex">
        <div className="me-2">
          <img src={avatar} alt="" height="45px" />
        </div>

        <div className="text-content">
          <div className="name text-capitalize">{recipientUser?.name}</div>
          <div className="text">Text Message</div>
        </div>
        <div className="d-flex flex-column align-items-end">
          <div className="date">30/7/24</div>
          <div className="this-user-notifications">2</div>
          <span className="user-online"></span>
        </div>
      </div>
    </Stack>
  );
};

export default UserChat;
