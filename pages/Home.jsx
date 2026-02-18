import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import ShimmerCard from "../components/ShimmerCard";
import Pagination from "../components/Pagination";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [nextToken, setNextToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const cursor = searchParams.get("cursor") || "";

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=12&q=react&pageToken=${cursor}&key=${import.meta.env.VITE_RAPID_API_KEY}`
        );

        const data = await res.json();

        if (data.items) {
          setVideos(data.items);
          setNextToken(data.nextPageToken || null);
        }

      } catch (error) {
        console.error("Cursor pagination error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [cursor]);

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

      
      {!loading && (
        <Pagination nextToken={nextToken} />
      )}

    </div>
  );
};

export default Home;
