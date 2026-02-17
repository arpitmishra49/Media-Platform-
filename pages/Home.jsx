import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShimmerCard from "../components/ShimmerCard";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=react&type=video&key=${import.meta.env.VITE_RAPID_API_KEY}`
        );
        const data = await res.json();

        if (data.items) {
          setVideos(data.items);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      
      {loading
        ? Array.from({ length: 9 }).map((_, index) => (
            <ShimmerCard key={index} />
          ))
        : videos.map((video) => (
            <Link
              key={video.id.videoId}
              to={`/watch/${video.id.videoId}`}
              className="bg-gray-800 rounded-xl overflow-hidden hover:scale-105 transition"
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-full"
              />
              <div className="p-4">
                <h2 className="text-sm font-semibold">
                  {video.snippet.title}
                </h2>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default Home;
