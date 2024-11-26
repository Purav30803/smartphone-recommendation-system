import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import SearchInput from "@/components/SearchBar";
import RecommendationList from "@/components/RecommendationList";
import axios from "axios";

const Search = () => {
  const [smartphones, setSmartphones] = useState([]);

  const handleSearch = async (query) => {
    const res = await axios.get(`http://localhost:8080/api/smartphones?query=${query}`);
    const data = await res;
    setSmartphones(data);
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <SearchInput onSearch={handleSearch} />
        <RecommendationList recommendations={smartphones} />
      </div>
    </div>
  );
};

export default Search;
