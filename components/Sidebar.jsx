const Sidebar = () => {
    return (
      <div className="w-60 bg-gray-800 p-4 hidden md:block">
        <ul className="space-y-4">
          <li className="hover:text-red-400 cursor-pointer">Trending</li>
          <li className="hover:text-red-400 cursor-pointer">Music</li>
          <li className="hover:text-red-400 cursor-pointer">Gaming</li>
          <li className="hover:text-red-400 cursor-pointer">News</li>
        </ul>
      </div>
    );
  };
  
  export default Sidebar;
  