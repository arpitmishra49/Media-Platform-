import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const linkClasses = (path) =>
    `block px-4 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-indigo-600 text-white"
        : "hover:bg-gray-700 text-gray-300"
    }`;

  return (
    <div className="w-60 bg-gray-900 p-6 hidden md:block border-r border-gray-800 min-h-screen">
      <ul className="space-y-3">

        <li>
          <Link to="/" className={linkClasses("/")}>
            Home
          </Link>
        </li>

        <li>
          <Link to="/upload" className={linkClasses("/upload")}>
            Upload
          </Link>
        </li>

        <li>
          <Link to="/profile" className={linkClasses("/profile")}>
            Profile
          </Link>
        </li>

        <li>
          <Link to="/history" className={linkClasses("/history")}>
            Watch History
          </Link>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;
