import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { addUser, userLogin } from "../../server/server";

export default function LoginRegister() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // login | register
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "info" });
  const [error, setError] = useState("");

  const showToast = (msg, type = "info", ms = 2500) => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "info" }), ms);
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", password: "" });
    setError("");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setError("Enter email & password");
      return;
    }

    setIsLoading(true);

    try {
      const res = await userLogin(email, password);

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", user._id);

      navigate("/");
    } catch (err) {
      console.log("LOGIN FAILED:", err.response?.data || err);
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    setIsLoading(true);

    try {
      const res = await addUser({ name, email, password });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", user._id);

      navigate("/");
    } catch (err) {
      console.log("REGISTER FAILED:", err);
      setError("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  // MAIN SUBMIT HANDLER
  const onSubmit = (e) => {
    if (mode === "login") return handleLogin(e);
    return handleRegister(e);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0d0d0d] relative overflow-hidden p-4">

      {/* Ambient BG */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#e50914]/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-[#141414] border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10"
      >

        {/* HEADER */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-gray-400 text-sm">
            {mode === "login" ? "Sign in to continue to GoBudy" : "Sign up to join the action"}
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={onSubmit} className="space-y-5">

          {/* NAME (only for register) */}
          {mode === "register" && (
            <div>
              <label className="text-sm text-gray-300 ml-1">Full name</label>
              <div className="relative">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-[#1f1f1f] border border-gray-700 rounded-xl text-white"
                  placeholder="Your full name"
                />
                <i className="fa fa-user absolute left-3 top-3 text-gray-500" />
              </div>
            </div>
          )}

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-300 ml-1">Email</label>
            <div className="relative">
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-[#1f1f1f] border border-gray-700 rounded-xl text-white"
                placeholder="you@example.com"
                type="email"
              />
              <i className="fa fa-envelope absolute left-3 top-3 text-gray-500" />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-300 ml-1">Password</label>
            <div className="relative">
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-12 py-3 bg-[#1f1f1f] border border-gray-700 rounded-xl text-white"
                placeholder="Enter your password"
              />
              <i className="fa fa-lock absolute left-3 top-3 text-gray-500" />

              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                <i className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"} />
              </button>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">
              {error}
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <div className="flex items-center justify-between gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`flex-1 py-3.5 bg-gradient-to-r from-[#e50914] to-red-700 text-white font-bold rounded-xl shadow-lg ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : mode === "login" ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </motion.button>

            <button
              type="button"
              onClick={() => {
                resetForm();
                setMode((prev) => (prev === "login" ? "register" : "login"));
              }}
              className="text-sm text-gray-400 hover:text-white"
            >
              {mode === "login" ? "Create account" : "Have an account? Sign in"}
            </button>
          </div>
        </form>
      </motion.div>

      {/* TOAST */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`fixed top-6 right-6 px-4 py-3 rounded-lg text-white ${
              toast.type === "success"
                ? "bg-green-600"
                : toast.type === "error"
                ? "bg-red-600"
                : "bg-gray-800"
            }`}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
