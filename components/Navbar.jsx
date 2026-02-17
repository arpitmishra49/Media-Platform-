import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-gray-800">
      <Link to="/" className="text-xl font-bold text-red-500">
        Media Platform
      </Link>

      <div className="flex gap-6">
        <Link to="/" className="hover:text-red-400">Home</Link>
        <Link to="/upload" className="hover:text-red-400">Upload</Link>
        <Link to="/profile" className="hover:text-red-400">Profile</Link>
      </div>
    </div>
  );
};

export default Navbar;
