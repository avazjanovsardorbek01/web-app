import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function NewsCard({ article }: { article: any }) {
  const navigate = useNavigate();
  const id = encodeURIComponent(article.title);

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col"
      onClick={() => navigate(`/news/${id}`)}
    >
      {article.urlToImage && (
        <div className="relative pt-[56.25%] overflow-hidden">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            src={article.urlToImage}
            alt={article.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/400x225?text=No+Image";
            }}
          />
        </div>
      )}

      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {article.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {article.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs text-gray-500">
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
          <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
            {article.source?.name}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default NewsCard;
