import { useParams } from "react-router-dom";

export const Watch = () => {
  const { id } = useParams();

  return (
    <div className="flex justify-center">
      <iframe
        width="800"
        height="450"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        allowFullScreen
      ></iframe>
    </div>
  );
};
