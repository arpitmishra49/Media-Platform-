import { useSearchParams, useNavigate } from "react-router-dom";

const Pagination = ({ hasNext }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = Number(searchParams.get("page")) || 1;

  const goToPage = (pageNumber) => {
    navigate(`/?page=${pageNumber}`);
  };

  return (
    <div className="flex justify-center items-center gap-6 mt-12">

      
      <button
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        className={`px-6 py-2 rounded-lg transition ${
          currentPage === 1
            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
            : "bg-gray-800 hover:bg-gray-700"
        }`}
      >
        ← Prev
      </button>

      
      <div className="px-6 py-2 bg-indigo-600 rounded-lg font-medium">
        Page {currentPage}
      </div>

      
      <button
        disabled={!hasNext}
        onClick={() => goToPage(currentPage + 1)}
        className={`px-6 py-2 rounded-lg transition ${
          !hasNext
            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
            : "bg-gray-800 hover:bg-gray-700"
        }`}
      >
        Next →
      </button>

    </div>
  );
};

export default Pagination;
