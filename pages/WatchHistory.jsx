import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import ShimmerCard from "../components/ShimmerCard";

const WatchHistory = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistoryVideos = async () => {
      const history =
        JSON.parse(localStorage.getItem("watchHistory")) || [];

      if (history.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const ids = history.join(",");

        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${ids}&key=${import.meta.env.VITE_RAPID_API_KEY}`
        );

        const data = await res.json();

        if (data.items) {
          // Maintain order of history
          const orderedVideos = history
            .map((id) => data.items.find((v) => v.id === id))
            .filter(Boolean);

          setVideos(orderedVideos);
        }

      } catch (error) {
        console.error("History fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryVideos();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">

      <h1 className="text-3xl font-semibold mb-8">
        Watch History
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <ShimmerCard key={i} />
          ))}
        </div>
      ) : videos.length === 0 ? (
        <p className="text-gray-500">No videos watched yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={{
                id: { videoId: video.id },
                snippet: video.snippet,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchHistory;
