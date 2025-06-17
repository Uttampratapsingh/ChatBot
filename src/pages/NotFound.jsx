import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  // Log the 404 route for debugging
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="text-center max-w-md">
        {/* Optional SVG icon */}
        <div className="mb-6">
          <svg
            className="mx-auto h-24 w-24 text-blue-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 
              9-9 9 4.03 9 9z"
            />
          </svg>
        </div>

        {/* 404 heading */}
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>

        {/* Message */}
        <p className="text-lg text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>

        {/* Return button using Link */}
        <Link
          to="/"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
