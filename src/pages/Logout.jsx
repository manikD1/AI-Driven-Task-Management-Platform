import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token"); // 🧹 Clear token
    localStorage.removeItem("todos");  // 🧹 Remove leftover local todos
    localStorage.removeItem("user");  // 🧹 Remove leftover local user
    navigate("/login"); // 🚪 Redirect to login
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">You have been logged out.</h1>
      <p className="mb-4">Redirecting you to login...</p>
    </div>
  );
};

export default Logout;
