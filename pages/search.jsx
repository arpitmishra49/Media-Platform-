import { useState } from "react";
import VideoCard from "../components/VideoCard";
import ShimmerCard from "../components/ShimmerCard";

const Search = () => {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${query}&type=video&key=${import.meta.env.VITE_RAPID_API_KEY}`
      );

      const data = await res.json();

      if (data.items) {
        setVideos(data.items);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      
      {/* Search Input */}
      <form
        onSubmit={handleSearch}
        className="flex justify-center mb-10"
      >
        <div className="flex w-full max-w-2xl shadow-lg rounded-full overflow-hidden bg-white">
          <input
            type="text"
            placeholder="Search videos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-6 py-3 outline-none text-gray-700"
          />

          <button
            type="submit"
            className="bg-indigo-600 text-white px-8 hover:bg-indigo-700 transition"
          >
            Search
          </button>
        </div>
      </form>

     
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
