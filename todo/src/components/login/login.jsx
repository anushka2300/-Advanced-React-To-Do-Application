import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirection

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for redirection

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // **Signup API Call**
  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:8000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!data.success) {
        setError(data.message);
        return;
      }

      alert("Signup successful! You can now log in.");
      setIsLogin(true); // Switch to login form
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Please try again.");
    }
  };

  // **Login API Call**
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await response.json();
      if (!data.success) {
        setError(data.message);
        return;
      }

      sessionStorage.setItem("token", data.jwtToken);
      sessionStorage.setItem("user", JSON.stringify({ name: data.name, email: data.email }));

      navigate("/dashboard");  
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Please try again.");
    }
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6">{isLogin ? "Login" : "Sign Up"}</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Username"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <p className="text-red-800">min 4 characters</p>

          <button type="submit" className="w-full bg-green-600 hover:bg-green-500 py-2 rounded-lg font-bold transition">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-green-500 hover:underline ml-1">
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
