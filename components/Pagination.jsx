const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
      <div className="flex justify-center items-center gap-3 mt-10 flex-wrap">
        
        
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          Prev
        </button>
  
        
        {Array.from({ length: totalPages }).map((_, index) => {
          const page = index + 1;
  
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === page
                  ? "bg-indigo-600"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {page}
            </button>
          );
        })}
  
        
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;
  