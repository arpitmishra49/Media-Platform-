import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";

export const Watch = () => {
  const { id } = useParams();

  const [videoData, setVideoData] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const videoCache = useRef({});
  const channelCache = useRef({});

  // ✅ Save to Watch History
  const saveToHistory = (videoId) => {
    const existing =
      JSON.parse(localStorage.getItem("watchHistory")) || [];

    const updated = [
      videoId,
      ...existing.filter((vid) => vid !== videoId),
    ].slice(0, 20); // keep only last 20

    localStorage.setItem("watchHistory", JSON.stringify(updated));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // ✅ Check video cache first
        if (videoCache.current[id]) {
          const cachedVideo = videoCache.current[id];
          setVideoData(cachedVideo);
          saveToHistory(id);

          const channelId = cachedVideo.snippet.channelId;

          if (channelCache.current[channelId]) {
            setRelatedVideos(channelCache.current[channelId]);
            setLoading(false);
            return;
          }
        }

        // ✅ Fetch video details
        const videoRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${import.meta.env.VITE_RAPID_API_KEY}`
        );

        const videoJson = await videoRes.json();

        if (!videoJson.items?.length) {
          setLoading(false);
          return;
        }

        const video = videoJson.items[0];

        videoCache.current[id] = video;
        setVideoData(video);

        // 🔥 Save history here
        saveToHistory(id);

        const channelId = video.snippet.channelId;

        // ✅ Fetch related (channel-based)
        if (!channelCache.current[channelId]) {
          const relatedRes = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&channelId=${channelId}&maxResults=8&key=${import.meta.env.VITE_RAPID_API_KEY}`
          );

          const relatedJson = await relatedRes.json();

          if (relatedJson.items) {
            const filtered = relatedJson.items.filter(
              (item) => item.id.videoId !== id
            );

            channelCache.current[channelId] = filtered;
            setRelatedVideos(filtered);
          }
        } else {
          setRelatedVideos(channelCache.current[channelId]);
        }

      } catch (error) {
        console.error("Error fetching watch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (!videoData) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        Video not found
      </div>
    );
  }

  const { snippet, statistics } = videoData;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2">
          <div className="aspect-video w-full rounded-xl overflow-hidden border border-gray-800">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${id}`}
              title={snippet.title}
              allowFullScreen
            />
          </div>

          <h1 className="text-2xl font-semibold mt-6">
            {snippet.title}
          </h1>

          <p className="text-sm text-gray-400 mt-2">
            {Number(statistics.viewCount).toLocaleString()} views •{" "}
            {new Date(snippet.publishedAt).toLocaleDateString()}
          </p>

          <div className="mt-6 bg-gray-900 p-5 rounded-xl text-sm text-gray-300 whitespace-pre-line border border-gray-800">
            {snippet.description}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            More from this Channel
          </h2>

          {relatedVideos.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No related videos.
            </p>
          ) : (
            relatedVideos.map((video) => (
              <Link
                key={video.id.videoId}
                to={`/watch/${video.id.videoId}`}
                className="flex gap-4 bg-gray-900 p-3 rounded-lg hover:bg-gray-800 transition"
              >
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  className="w-32 h-20 object-cover rounded-md"
                />
                <div>
                  <p className="text-sm font-medium line-clamp-2">
                    {video.snippet.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {video.snippet.channelTitle}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
