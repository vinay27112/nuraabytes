import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postLoginData, postSignUpData } from "../api/mediaApi";
import { getUserData, setIsLoggedIn } from "../store/features/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await postLoginData({ email, password });
        if (res.success) {
          toast.success(res.message);
          dispatch(getUserData());
          dispatch(setIsLoggedIn(true));
          navigate("/");
        } else {
          toast.error(res.message);
        }
      } else {
        const res = await postSignUpData({ name, email, password });
        if (res.success) {
          toast.success(res.message);
          dispatch(getUserData());
          dispatch(setIsLoggedIn(true));
          navigate("/");
        } else {
          toast.error(res.message);
        }
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <div
      className="
        relative 
        min-h-[calc(100vh-72px)] 
        pt-24 
        flex items-start justify-center 
        bg-linear-to-br from-slate-50 via-gray-100 to-slate-50 
        overflow-hidden 
        px-4
      "
    >
      {/* Soft center glow */}
      <div className="absolute top-52 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />

      {/* Corner mesh */}
      <div className="absolute -top-32 -left-32 h-125 w-125 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute -bottom-32 -right-32 h-125 w-125 rounded-full bg-indigo-600/20 blur-[120px]" />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Card */}
      <div
        className="
          relative z-10 
          w-full max-w-md 
          rounded-2xl 
          bg-white 
          border border-gray-200 
          shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] 
          p-8
        "
      >
        {/* Accent bar */}
        <div className="absolute inset-x-0 top-0 h-1.5 rounded-t-2xl bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600" />

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            {isLogin ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            {isLogin
              ? "Sign in to access your workspace"
              : "Join thousands building smarter products"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={(e) => onSubmitHandler(e)} className="space-y-4">
          {!isLogin && (
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Full name"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition"
            />
          )}

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email address"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition"
          />

          {isLogin && (
            <Link to="/reset-password">
              <div className="text-right mb-3 text-xs text-indigo-600 hover:underline cursor-pointer">
                Forgot password?
              </div>
            </Link>
          )}

          {/* CTA */}
          <button
            type="submit"
            className="
              w-full rounded-lg 
              bg-linear-to-r from-blue-600 to-indigo-600 
              text-white py-2.5 text-sm font-semibold 
              hover:from-blue-700 hover:to-indigo-700 
              shadow-md hover:shadow-lg transition-all
            "
          >
            {isLogin ? "Sign in" : "Create account"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Google */}
        <button className="w-full rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
          Continue with Google
        </button>

        {/* Toggle */}
        <p className="text-center text-sm text-gray-500 mt-6">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 font-medium cursor-pointer hover:underline"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
