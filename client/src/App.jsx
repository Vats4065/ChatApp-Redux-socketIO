import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

import Chat from "./pages/Chat";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import Register from "./pages/Register";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Chat />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
