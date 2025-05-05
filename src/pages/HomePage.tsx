import { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaCalendarAlt, FaNewspaper, FaFilter } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import NewsCard from "../components/NewsCard";
import ReactPaginate from "react-paginate";

const API_KEY = "5f4b8088efe942638119cd296a9b51d6";

function HomePage() {
  const [news, setNews] = useState<any[]>([]);
  const [query, setQuery] = useState("world");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [filters, setFilters] = useState({
    sortBy: "publishedAt",
    language: "en",
    date: "",
    source: "",
  });

  const newsPerPage = 9;
  const pagesVisited = currentPage * newsPerPage;
  const pageCount = Math.ceil(news.length / newsPerPage);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${query}&sortBy=${filters.sortBy}&language=${filters.language}&apiKey=${API_KEY}`
        );
        setNews(response.data.articles);
      } catch (err) {
        console.error("Ошибка при получении новостей:", err);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchNews();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [query, filters]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(0);
  };

  const displayedNews = news
    .slice(pagesVisited, pagesVisited + newsPerPage)
    .filter(
      (article) =>
        (filters.date ? article.publishedAt.includes(filters.date) : true) &&
        (filters.source ? article.source.name.includes(filters.source) : true)
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Будьте в курсе событий
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
          >
            Самые свежие новости со всего мира в одном месте
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="relative max-w-2xl mx-auto"
          >
            <span className="absolute left-4 top-3.5 text-gray-300">
              <FaSearch size={20} />
            </span>
            <input
              type="text"
              placeholder="Поиск новостей..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(0);
              }}
              className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-white border border-white/30 placeholder-gray-200 text-white"
            />
          </motion.div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md -mt-10 mb-10 p-6 relative z-10 mx-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FaFilter className="text-blue-500" /> Фильтры
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Сортировка
              </label>
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="publishedAt">По дате</option>
                <option value="relevancy">По релевантности</option>
                <option value="popularity">По популярности</option>
              </select>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Язык
              </label>
              <select
                name="language"
                value={filters.language}
                onChange={handleFilterChange}
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">Английский</option>
                <option value="ru">Русский</option>
                <option value="de">Немецкий</option>
                <option value="fr">Французский</option>
              </select>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Дата
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="date"
                  value={filters.date}
                  onChange={handleFilterChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Источник
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="source"
                  placeholder="Название источника"
                  value={filters.source}
                  onChange={handleFilterChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaNewspaper className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <AnimatePresence>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedNews.map((article, index) => (
                  <motion.div
                    key={`${article.url}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    layout
                  >
                    <NewsCard article={article} />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>

            {/* Pagination */}
            {news.length > 0 && (
              <div className="mt-10 flex justify-center">
                <ReactPaginate
                  previousLabel={"←"}
                  nextLabel={"→"}
                  pageCount={pageCount}
                  onPageChange={handlePageChange}
                  containerClassName={"flex items-center gap-1"}
                  previousLinkClassName={
                    "px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100"
                  }
                  nextLinkClassName={
                    "px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100"
                  }
                  pageLinkClassName={
                    "px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100"
                  }
                  activeLinkClassName={"bg-blue-500 text-white border-blue-500"}
                  disabledLinkClassName={"opacity-50 cursor-not-allowed"}
                  forcePage={currentPage}
                />
              </div>
            )}
          </>
        )}

        {!isLoading && news.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium text-gray-700">
              Новости не найдены
            </h3>
            <p className="text-gray-500 mt-2">
              Попробуйте изменить параметры поиска
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
