import { useEffect, useState } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("login_token");
    setUserData(null);
    window.reload();
  };
  const fetchUserData = async () => {
    const data = localStorage.getItem("login_token");

    if (data) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/user/user/${data}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const res = await response.json();
        setUserData(res);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
      <Container>
        <Link to="/" className="link-light text-decoration-none fw-bolder">
          <h2>Chat App</h2>
        </Link>

        {loading ? (
          <span className="text-warning fs-5 fw-bolder">Loading...</span>
        ) : !userData ? (
          <span className="text-warning fs-5 fw-bolder">
            You have not login, So login first
          </span>
        ) : (
          <span className="text-warning fs-5 fw-bolder">
            Logged in as {userData?.user?.name}
          </span>
        )}

        <Nav className="fw-bolder">
          {!userData ? (
            <Stack direction="horizontal" gap={3}>
              <Link to="/login" className="link-light text-decoration-none">
                Login
              </Link>
              <Link to="/signup" className="link-light text-decoration-none">
                Signup
              </Link>
            </Stack>
          ) : (
            <Stack>
              <Link
                className="link-light text-decoration-none"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </Stack>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
