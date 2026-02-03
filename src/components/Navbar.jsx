import { useState, useEffect, useRef } from "react";
import { ChevronDown, Globe, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiLogOut, FiMail } from "react-icons/fi";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const menus = {
    BookShell: [
      "Learn Course Name",
      "Technology",
      "Projects",
      "Online Resources",
    ],
    "Money Map": [
      "Course Price",
      "Analytic Price",
      "DS Price",
      "Cyber Price",
      "Web Price",
      "Cloud Price",
    ],
    Community: ["Events", "Leading Stories"],
  };

  const handleToggle = (item) => {
    setOpenMenu(openMenu === item ? null : item);
  };
  const { userData } = useSelector((state) => state.auth);

  const initials = userData?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const [open, setOpen] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const hoverTimer = useRef(null);
  const closeTimer = useRef(null);
  const menuRef = useRef(null);

  /* ---------------- Hover Logic ---------------- */
  const handleMouseEnter = () => {
    clearTimeout(closeTimer.current);
    hoverTimer.current = setTimeout(() => setOpen(true), 600);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 1800);
  };

  /* ---------------- Outside Click ---------------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- Placeholder Actions ---------------- */
  const handleVerify = () => {
    // TODO: connect to your verify email logic
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setOpen(false);
    }, 1000);
  };

  const handleLogout = () => {
    // TODO: connect to your logout logic
    setOpen(false);
  };

  return (
    <div>
      <header className="sticky top-0 z-40 w-full max-w-full border-b border-gray-200 bg-white/90 backdrop-blur-sm shadow-sm overflow-visible">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          {/* ---------- Left: Logo ---------- */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="https://ui-avatars.com/api/?name=Hunting&background=6366f1&color=fff&size=128"
              alt="Logo"
              className="h-11 w-11 rounded-full shadow-sm transition-transform duration-200 group-hover:scale-105"
            />
            <span className="text-lg font-semibold tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">
              Hunting
            </span>
          </Link>

          {/* ---------- Middle: Navigation ---------- */}
          <div className="hidden md:flex items-center gap-10">
            {/* Search Input */}
            <div className="group flex items-center gap-2 w-72 px-4 py-2 rounded-full border border-gray-300 bg-white shadow-sm transition-all duration-200 focus-within:border-indigo-500 focus-within:shadow-md">
              <Search className="h-4 w-4 text-gray-400 group-focus-within:text-indigo-500" />
              <input
                type="text"
                placeholder="Search topics, roadmaps..."
                className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
              />
            </div>

            {/* Menu Buttons */}
            <div className="flex items-center gap-4">
              {Object.keys(menus).map((item) => (
                <div key={item} className="relative group">
                  <button
                    onClick={() => handleToggle(item)}
                    className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors py-2"
                  >
                    {item}
                    <ChevronDown
                      className={`h-4 w-4 opacity-70 transition-transform ${
                        openMenu === item ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {openMenu === item && (
                    <ul className="absolute left-0 top-full mt-1 w-50 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-9999">
                      {menus[item].map((route) => (
                        <li key={route}>
                          <Link
                            to={`/${route.toLowerCase().replace(/\s+/g, "-")}`}
                            onClick={() => setOpenMenu(null)}
                            className="block px-4 py-2 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                          >
                            {route}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ---------- Right: User Actions ---------- */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
              <Globe className="h-4 w-4" />
              EN
            </button>

            {/* If Logged In */}
            {userData ? (
              <div
                ref={menuRef}
                className="relative inline-block select-none"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Avatar */}
                <button
                  className="w-10 h-10 rounded-full bg-linear-to-br from-sky-400 to-indigo-500 
                           text-white font-semibold text-sm flex items-center justify-center 
                           hover:ring-2 hover:ring-sky-400/40 transition-all duration-300 shadow-md"
                >
                  {initials}
                </button>

                {/* Dropdown */}
                {open && (
                  <div
                    className="absolute top-12 right-0 w-56 rounded-xl border border-gray-200 
                             bg-white/95 backdrop-blur-sm shadow-2xl py-3 animate-fadeIn z-50"
                  >
                    <div className="px-4 pb-2 text-xs uppercase tracking-wide text-gray-400">
                      Account Actions
                    </div>

                    {/* Verify Email */}
                    <button
                      onClick={handleVerify}
                      disabled={verifying}
                      className={`flex items-center gap-2 w-full text-left px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                        verifying
                          ? "bg-sky-100 text-sky-600 cursor-not-allowed"
                          : "text-gray-700 hover:bg-sky-50 hover:text-sky-600"
                      }`}
                    >
                      <FiMail className="text-lg" />
                      {verifying ? "Sending..." : "Verify Email"}
                    </button>

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm font-medium text-red-600 
                               hover:bg-red-50 rounded-md transition-all duration-200"
                    >
                      <FiLogOut className="text-lg" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="rounded-full px-5 py-2 text-sm font-semibold text-white 
                         bg-linear-to-r from-indigo-500 to-purple-600 
                         hover:from-indigo-600 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
