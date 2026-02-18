import { useState, useEffect, useRef } from "react";
import VideoCard from "../components/VideoCard";
import ShimmerCard from "../components/ShimmerCard";

const Search = () => {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  
  const searchCache = useRef({});

  
  const debounceRef = useRef(null);

  useEffect(() => {
    const savedHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(savedHistory);
  }, []);

  const saveToHistory = (searchTerm) => {
    if (!searchTerm.trim()) return;

    const updatedHistory = [
      searchTerm,
      ...history.filter((item) => item !== searchTerm),
    ].slice(0, 8);

    setHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const performSearch = async (searchTerm) => {
    
    if (searchCache.current[searchTerm]) {
      setVideos(searchCache.current[searchTerm]);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${searchTerm}&type=video&key=${import.meta.env.VITE_RAPID_API_KEY}`
      );

      const data = await res.json();

      if (data.items) {
        setVideos(data.items);

        
        searchCache.current[searchTerm] = data.items;
      }

    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e, customQuery = null) => {
    if (e) e.preventDefault();

    const searchTerm = customQuery || query;
    if (!searchTerm.trim()) return;

    setQuery(searchTerm);
    saveToHistory(searchTerm);

    
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    
    debounceRef.current = setTimeout(() => {
      performSearch(searchTerm);
    }, 500);
  };

  const clearHistory = () => {
    localStorage.removeItem("searchHistory");
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">

     
      <form onSubmit={handleSearch} className="flex justify-center mb-6">
        <div className="flex w-full max-w-2xl bg-gray-900 rounded-full overflow-hidden shadow-lg border border-gray-800">
          <input
            type="text"
            placeholder="Search videos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-6 py-3 bg-transparent outline-none text-white placeholder-gray-400"
          />

          <button
            type="submit"
            className="bg-indigo-600 px-8 hover:bg-indigo-700 transition"
          >
            Search
          </button>
        </div>
      </form>

      
      {history.length > 0 && (
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm text-gray-400">Recent Searches</h2>
            <button
              onClick={clearHistory}
              className="text-xs text-red-400 hover:text-red-500"
            >
              Clear
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {history.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSearch(null, item)}
                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full text-sm transition"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <ShimmerCard key={i} />
            ))
          : videos.map((video) => (
              <VideoCard key={video.id.videoId} video={video} />
            ))}
      </div>
    </div>
  );
};

export default Search;
