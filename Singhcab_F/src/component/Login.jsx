import { useState } from "react";

export default function Login({ close, openRegister, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed!");
        return;
      }

      // Save user and token
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      setUser(data.user);
      close();
      alert("Login Successful!");
    } catch (err) {
      alert("Server error!");
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-900 p-8 rounded-xl w-[400px] relative text-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded bg-gray-800 border border-gray-600"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded bg-gray-800 border border-gray-600"
            required
          />
          <button
            type="submit"
            className="bg-yellow-400 text-black font-bold py-2 rounded mt-2"
          >
            Login
          </button>
        </form>
        <p className="mt-3 text-gray-300">
          Don't have an account?{" "}
          <span
            onClick={openRegister}
            className="text-yellow-400 cursor-pointer underline"
          >
            Sign Up
          </span>
        </p>
        <button
          onClick={close}
          className="absolute top-3 right-3 text-gray-400 hover:text-white font-bold"
        >
          X
        </button>
      </div>
    </div>
  );
}
