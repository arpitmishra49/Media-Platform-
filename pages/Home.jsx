import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import ShimmerCard from "../components/ShimmerCard";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [tokens, setTokens] = useState([""]); 
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = Number(searchParams.get("page")) || 1;

  const fetchVideos = async (pageNumber) => {
    setLoading(true);

    try {
      const pageToken = tokens[pageNumber - 1] || "";

      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=12&q=react&pageToken=${pageToken}&key=${import.meta.env.VITE_RAPID_API_KEY}`
      );

      const data = await res.json();

      if (data.items) {
        setVideos(data.items);
      }

      
      if (data.nextPageToken) {
        setTokens((prev) => {
          if (!prev[pageNumber]) {
            const newTokens = [...prev];
            newTokens[pageNumber] = data.nextPageToken;
            return newTokens;
          }
          return prev;
        });
      }

    } catch (error) {
      console.error("Pagination error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(page);
  }, [page]);

  const goToPage = (pageNumber) => {
    navigate(`/?page=${pageNumber}`);
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

      
      <div className="flex justify-center gap-4 mt-12">

        <button
          disabled={page === 1}
          onClick={() => goToPage(page - 1)}
          className={`px-6 py-2 rounded-lg ${
            page === 1
              ? "bg-gray-700 text-gray-500"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          Prev
        </button>

        <span className="px-6 py-2 bg-indigo-600 rounded-lg">
          Page {page}
        </span>

        <button
          disabled={!tokens[page]}
          onClick={() => goToPage(page + 1)}
          className={`px-6 py-2 rounded-lg ${
            !tokens[page]
              ? "bg-gray-700 text-gray-500"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          Next
        </button>

      </div>
    </div>
  );
};

export default Home;
