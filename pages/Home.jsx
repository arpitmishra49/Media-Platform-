import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import ShimmerCard from "../components/ShimmerCard";
import Pagination from "../components/Pagination";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [tokens, setTokens] = useState([""]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async (pageIndex) => {
    setLoading(true);

    try {
      const pageToken = tokens[pageIndex - 1] || "";

      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=12&q=react&pageToken=${pageToken}&key=${import.meta.env.VITE_RAPID_API_KEY}`
      );

      const data = await res.json();

      if (data.items) {
        setVideos(data.items);
      }

      
      if (data.nextPageToken && !tokens.includes(data.nextPageToken)) {
        setTokens((prev) => [...prev, data.nextPageToken]);
      }

    } catch (error) {
      console.error("Pagination error:", error);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchVideos(1);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchVideos(page);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">

      <h1 className="text-3xl font-semibold mb-8">
        Explore Videos
      </h1>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <ShimmerCard key={i} />
            ))
          : videos.map((video) => (
              <VideoCard key={video.id.videoId} video={video} />
            ))}
      </div>

      
      <Pagination
        currentPage={currentPage}
        totalPages={tokens.length}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
