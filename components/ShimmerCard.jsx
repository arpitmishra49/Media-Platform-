const ShimmerCard = () => {
    return (
      <div className="bg-gray-800 rounded-xl overflow-hidden animate-pulse">
        
        {/* Thumbnail */}
        <div className="h-40 bg-gray-700"></div>
  
        {/* Text section */}
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
  
      </div>
    );
  };
  
  export default ShimmerCard;
  