import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import SmartphoneCard from "@/components/SmartphoneCard";
import { useRouter } from "next/router";
import axios from "axios";
import { AlertTriangle, Smartphone } from "lucide-react";
import '../styles/global.css';

const Recommendations = () => {
  const router = useRouter();
  const [smartphones, setSmartphones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { 
    brand, 
    priceRange, 
    camera, 
    storage, 
    display, 
    battery, 
    processor, 
    operatingSystem 
  } = router.query;

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);
      try {
        const query = {
          brand: brand || "",
          priceRange: priceRange || "",
          camera: camera || "",
          storage: storage || "",
          display: display || "",
          battery: battery || "",
          processor: processor || "",
          operatingSystem: operatingSystem || "",
        };
        const res = await axios.get("http://localhost:8080/api/smartphones/recommendations", {
          params: query,
        });
        setSmartphones(res.data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setError("Unable to fetch smartphone recommendations. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (Object.keys(router.query).length > 0) {
      fetchRecommendations();
    }
  }, [
    brand, 
    priceRange, 
    camera, 
    storage, 
    display, 
    battery, 
    processor, 
    operatingSystem, 
    router.query
  ]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-[50vh]">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Smartphone 
              className="text-blue-500" 
              size={64} 
            />
          </motion.div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6">
          <AlertTriangle 
            className="text-red-500 mb-4" 
            size={64} 
          />
          <p className="text-xl text-gray-700 mb-4">{error}</p>
          <button 
            onClick={() => router.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (smartphones.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6">
          <Smartphone 
            className="text-gray-400 mb-4" 
            size={64} 
          />
          <p className="text-xl text-gray-700">
            No smartphones found matching your criteria
          </p>
          <p className="text-gray-500 mt-2">
            Try adjusting your search filters
          </p>
        </div>
      );
    }

    return (
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
        >
          {smartphones.map((smartphone, index) => (
            <motion.div
              key={smartphone._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.5 
              }}
            >
              <SmartphoneCard smartphone={smartphone} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold text-gray-900 mb-6"
        >
          Smartphone Recommendations
        </motion.h2>
        {renderContent()}
      </div>
    </div>
  );
};

export default Recommendations;