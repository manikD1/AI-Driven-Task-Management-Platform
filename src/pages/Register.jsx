import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/api/auth/register", formData);
      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white py-2 rounded">
          Register
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
      <p className="text-sm">Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-700 hover:underline font-bold">Login</Link></p>
    </div>
  );
};

export default Register;