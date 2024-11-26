import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Smartphone, 
  Search, 
  Filter, 
  TrendingUp, 
  Zap, 
  Cpu, 
  Camera, 
  Battery 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import axios from "axios";
import "../styles/global.css";

const Home = () => {
  const router = useRouter();
  const [filters, setFilters] = useState({
    brand: "",
    priceRange: "",
    camera: "",
    storage: "",
    operatingSystem: "",
    display: "",
    battery: "",
    processor: "",
  });
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Icons mapping for each filter
  const filterIcons = {
    brand: Smartphone,
    priceRange: Filter,
    camera: Camera,
    storage: Battery,
    operatingSystem: Zap,
    display: Cpu,
    battery: Battery,
    processor: Cpu
  };

  // Placeholder suggestions for each filter
  const filterPlaceholders = {
    brand: "e.g., Apple, Samsung",
    priceRange: "e.g., 500-1000",
    camera: "e.g., 48MP",
    storage: "e.g., 128GB",
    operatingSystem: "e.g., Android, iOS",
    display: "e.g., AMOLED, 6.5 inch",
    battery: "e.g., 5000mAh",
    processor: "e.g., Snapdragon 888"
  };

  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("http://localhost:8080/api/smartphones/frequency");
        setSearchHistory(
          Object.entries(res.data)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
        );
      } catch (err) {
        console.error("Failed to fetch search history:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSearchHistory();
  }, []);

  const handleBrandInput = (e) => {
    const value = e.target.value;
    setFilters((prevFilters) => ({ ...prevFilters, brand: value }));

    if (debounceTimer) clearTimeout(debounceTimer);

    const newTimer = setTimeout(async () => {
      if (value) {
        try {
          const autocompleteRes = await axios.get(`http://localhost:8080/api/smartphones/autocomplete?prefix=${value}`);
          setAutocompleteSuggestions(autocompleteRes.data);

          const spellCheckRes = await axios.get(`http://localhost:8080/api/smartphones/spellcheck?query=${value}`);
          const correctedBrand = spellCheckRes.data;

          if (correctedBrand && correctedBrand.toLowerCase() !== value.toLowerCase()) {
            setFilters((prevFilters) => ({ ...prevFilters, brand: correctedBrand }));
          }
        } catch (err) {
          console.error("Autocomplete or spellcheck API error:", err);
        }
      } else {
        setAutocompleteSuggestions([]);
      }
    }, 1500);

    setDebounceTimer(newTimer);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleRecommendation = () => {
    const query = Object.keys(filters)
      .filter((key) => filters[key]?.trim() !== "")
      .map((key) => `${key}=${encodeURIComponent(filters[key].trim())}`)
      .join("&");

    router.push(`/recommendations?${query}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <motion.h1 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-4xl font-extrabold text-gray-900 mb-8 flex items-center"
        >
          Find a Perfect Smartphone for you
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white shadow-2xl rounded-2xl p-8 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.keys(filters).map((filterKey) => {
              const Icon = filterIcons[filterKey];
              return (
                <motion.div 
                  key={filterKey}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {filterKey.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <input
                      type="text"
                      name={filterKey}
                      placeholder={filterPlaceholders[filterKey]}
                      value={filters[filterKey]}
                      onChange={filterKey === "brand" ? handleBrandInput : handleFilterChange}
                      className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm outline-none text-black focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
                    />
                  </div>
                  {filterKey === "brand" && autocompleteSuggestions.length > 0 && (
                    <motion.ul 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute z-10 bg-white border rounded-lg mt-1 w-full max-h-40 overflow-y-auto shadow-lg"
                    >
                      {autocompleteSuggestions.map((suggestion, index) => (
                        <motion.li
                          key={index}
                          whileHover={{ backgroundColor: "#f3f4f6" }}
                          className="p-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setFilters((prevFilters) => ({ ...prevFilters, brand: suggestion }));
                            setAutocompleteSuggestions([]);
                          }}
                        >
                          {suggestion}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </motion.div>
              );
            })}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRecommendation}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center"
          >
            <Search className="mr-2" />
            Find My Perfect Smartphone
          </motion.button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white shadow-xl rounded-2xl p-6"
        >
          <h3 className="text-2xl font-bold mb-4 flex items-center">
            <TrendingUp className="mr-3 text-green-500" />
            Top Searches
          </h3>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1, 
                  ease: "linear" 
                }}
              >
                <Smartphone className="text-blue-500" size={32} />
              </motion.div>
            </div>
          ) : (
            <ul className="space-y-3">
              {searchHistory.map(([query, frequency], index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center border-b pb-3 last:border-b-0"
                >
                  <span className="text-gray-700">{query}</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {frequency} searches
                  </span>
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;