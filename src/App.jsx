import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import EmailVerify from "./pages/EmailVerify.jsx";
import Navbar from "./components/Navbar.jsx";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAuthStatus, getUserData } from "./store/features/authSlice.js";
import TechnologyDtls from "./pages/TechnologyDtls.jsx";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const dispatchFunction = async () => {
      const res = await dispatch(getAuthStatus());
      if (res.payload?.success) {
        dispatch(getUserData());
      }
    };
    dispatchFunction();
  }, [dispatch]);

  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:tech" element={<TechnologyDtls />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/email-verify" element={<EmailVerify />} />
      </Routes>
    </div>
  );
};

export default App;
