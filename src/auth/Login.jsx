import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { addUser, getAllUsers, userLogin } from "../../server/server";

export default function LoginRegister() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
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
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
    setError("");
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    console.log("SENDING LOGIN:", email, password);

    if (!email || !password) {
      setError("Enter email & password");
      return;
    }

    setIsLoading(true);
    userLogin(email, password)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("userId", res.data._id);
        console.log("LOGIN RESPONSE:", res.data._id);
        
      window.location.href = "/";
        alert("logi")
      })
      .catch((err) => {
        console.log("LOGIN FAILED:", err.response?.data || err);
        setError("Invalid email or password");
      })

      .finally(() => setIsLoading(false));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    setIsLoading(true);

    try {
      const res = await addUser({

        name,
        email,
        password,
        wallet: 200
      });

      if (!res?.data) {
        setError("Registration failed");
        return;
      }
      const newUser = res.data;
      // Save user in localStorage automatically login
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("userId", newUser._id);
      console.log(newUser.id);

      alert("logi")
      window.location.href = "/";
    } catch (err) {
      console.log(err);
      setError("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (e) => {
    if (mode === "login") return handleLogin(e);
    return handleRegister(e);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0d0d0d] relative overflow-hidden p-4">
      {/* Ambient Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#e50914]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-[#141414] border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-sm relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="text-3xl font-bold text-white mb-2">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="text-gray-400 text-sm">
            {mode === "login" ? "Sign in to continue to GoBudy" : "Sign up to join the action"}
          </motion.p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          {mode === "register" && (
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300 ml-1">Full name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <i className="fa fa-user"></i>
                </div>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-[#1f1f1f] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914] transition-all duration-200"
                  placeholder="Your full name"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <i className="fa fa-envelope"></i>
              </div>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-[#1f1f1f] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914] transition-all duration-200"
                placeholder="you@example.com"
                type="email"
              />
            </div>
          </div>


          {/* Password */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <i className="fa fa-lock"></i>
              </div>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-12 py-3 bg-[#1f1f1f] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914] transition-all duration-200"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white transition-colors"
              >
                <i className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"} />
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">
              {error}
            </motion.div>
          )}

          {/* Buttons */}
          <div className="flex items-center justify-between gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`flex-1 py-3.5 px-4 bg-gradient-to-r from-[#e50914] to-red-700 text-white font-bold rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all duration-300 flex items-center justify-center ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isLoading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (mode === "login" ? "Sign In" : "Create Account")}
            </motion.button>

            <button
              type="button"
              onClick={() => {
                resetForm();
                setMode((m) => (m === "login" ? "register" : "login"));
              }}
              className="text-sm text-gray-400 hover:text-white"
            >
              {mode === "login" ? "Create account" : "Have an account? Sign in"}
            </button>
          </div>

          {/* Footer text */}
          <div className="mt-4 text-center text-sm text-gray-500">By continuing you agree to our <span className="text-[#00e5ff]">Terms</span> and <span className="text-[#00e5ff]">Privacy</span>.</div>

          {/* Socials */}
          <div className="my-5 flex items-center justify-center gap-3">
            <div className="h-[1px] bg-gray-700 flex-1" />
            <div className="text-gray-500 text-sm">Or continue with</div>
            <div className="h-[1px] bg-gray-700 flex-1" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <motion.button whileHover={{ y: -2 }} whileTap={{ y: 0 }} className="flex items-center justify-center py-2.5 border border-gray-700 rounded-lg bg-[#1f1f1f] text-white hover:border-gray-500 transition-colors">
              <i className="fa-brands fa-google text-red-500 mr-2" /> Google
            </motion.button>
            <motion.button whileHover={{ y: -2 }} whileTap={{ y: 0 }} className="flex items-center justify-center py-2.5 border border-gray-700 rounded-lg bg-[#1f1f1f] text-white hover:border-gray-500 transition-colors">
              <i className="fa-brands fa-github mr-2" /> GitHub
            </motion.button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button type="button" onClick={() => { resetForm(); setMode(mode === "login" ? "register" : "login"); }} className="text-[#e50914] font-semibold">
                {mode === "login" ? "Create Account" : "Sign in"}
              </button>
            </p>
          </div>
        </form>
      </motion.div>

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className={`fixed top-6 right-6 z-50 px-4 py-3 rounded-lg text-white ${toast.type === "success" ? "bg-green-600" : toast.type === "error" ? "bg-red-600" : "bg-gray-800"}`}>
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
