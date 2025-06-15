import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todo from "./pages/Todo.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Logout from "./pages/Logout.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute><Todo /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;