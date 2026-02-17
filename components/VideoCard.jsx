import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  if (!video?.id?.videoId) return null;

  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;

  return (
    <Link
      to={`/watch/${video.id.videoId}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300"
    >
      
      <div className="relative overflow-hidden">
        <img
          src={thumbnails?.medium?.url}
          alt={title}
          className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      
      <div className="p-5">
        <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">
          {title}
        </h2>

        <div className="mt-3 text-xs text-gray-500">
          <p>{channelTitle}</p>
          <p>{new Date(publishedAt).toLocaleDateString()}</p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
