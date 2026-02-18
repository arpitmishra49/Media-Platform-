import { useNavigate, useSearchParams } from "react-router-dom";

const Pagination = ({ nextToken }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const currentCursor = searchParams.get("cursor") || "";

  const handleNext = () => {
    if (nextToken) {
      navigate(`/?cursor=${nextToken}`);
    }
  };

  const handlePrevious = () => {
    navigate(-1); // browser back (cursor-based history)
  };

  return (
    <div className="flex justify-center items-center gap-6 mt-12">

      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={!currentCursor}
        className={`px-6 py-2 rounded-full transition ${
          currentCursor
            ? "bg-gray-800 hover:bg-gray-700"
            : "bg-gray-700 text-gray-500 cursor-not-allowed"
        }`}
      >
        ← Previous
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={!nextToken}
        className={`px-6 py-2 rounded-full transition ${
          nextToken
            ? "bg-indigo-600 hover:bg-indigo-700"
            : "bg-gray-700 text-gray-500 cursor-not-allowed"
        }`}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
