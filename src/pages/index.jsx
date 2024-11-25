import { useState, useEffect } from "react";
import { Search, Sliders, ChevronDown } from "lucide-react";
import "../app/global.css";
import Link from "next/link";

export default function Home() {
  const [smartphones, setSmartphones] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams, setSearchParams] = useState({
    brand: "",
    memory: "",
    camera: "",
    minBudget: "",
    maxBudget: "",
  });

  useEffect(() => {
    // Fetch all smartphones on component mount
    fetchSmartphones();
  }, []);

  const fetchSmartphones = async (query = "") => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8080/api/smartphones${query}`
      );
      if (!response.ok) throw new Error("Failed to fetch smartphones");
      const data = await response.json();
      setSmartphones(data);
    } catch (error) {
      console.error(error.message);
      setSmartphones([]);
    }
  };

  const handleSearch = () => {
    // Build query string from searchParams
    const query = new URLSearchParams(
      Object.fromEntries(
        Object.entries(searchParams).filter(([_, value]) => value.trim() !== "")
      )
    ).toString();
    fetchSmartphones(query ? `?${query}` : "");
  };

  const handleChange = (e) => {
    // Update search parameters and trigger search
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    // Trigger search whenever searchParams change
    handleSearch();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-semibold">Smartphone Finder</h1>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Find Your Perfect Phone</h2>
            <p className="text-gray-400 text-xl">
              Discover the smartphone that matches your lifestyle.
            </p>
          </div>

          {/* Search Bar and Filters */}
          <div className="bg-gray-900 rounded-2xl p-6 mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <input
                  type="text"
                  name="brand"
                  placeholder="Search by brand, model, or features"
                  value={searchParams.brand}
                  onChange={handleChange}
                  className="w-full bg-gray-800 text-white rounded-xl py-3 px-5 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search
                  className="absolute left-4 top-3.5 text-gray-400"
                  size={20}
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-gray-800 px-4 py-3 rounded-xl hover:bg-gray-700 transition-colors"
              >
                <Sliders size={20} />
                Filters
                <ChevronDown
                  size={16}
                  className={`transform transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Expandable Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <select
                  name="memory"
                  value={searchParams.memory}
                  onChange={handleChange}
                  className="bg-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Storage</option>
                  <option value="64GB">64GB</option>
                  <option value="128GB">128GB</option>
                  <option value="256GB">256GB</option>
                  <option value="512GB">512GB</option>
                </select>
                <select
                  name="camera"
                  value={searchParams.camera}
                  onChange={handleChange}
                  className="bg-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Camera</option>
                  <option value="12MP">12MP+</option>
                  <option value="48MP">48MP+</option>
                  <option value="108MP">108MP+</option>
                </select>
                <input
                  type="number"
                  name="minBudget"
                  placeholder="Min Price"
                  value={searchParams.minBudget}
                  onChange={handleChange}
                  className="bg-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="maxBudget"
                  placeholder="Max Price"
                  value={searchParams.maxBudget}
                  onChange={handleChange}
                  className="bg-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          {/* Results Grid */}
{smartphones?.length === 0? <div>
  <h1 className="text-2xl font-semibold text-center">No smartphones found</h1>
</div>:          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {smartphones.map((phone) => (
              <div
                key={phone._id}
                className="bg-gray-900 rounded-2xl p-6 hover:scale-105 transition-transform cursor-pointer"
              >
                <img
                  src={phone.image}
                  alt={phone.model}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{phone.model}</h3>
                <p className="text-gray-400 mb-4">{phone.brand}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">${phone.price}</span>
                  <Link href={`/phone/${phone._id}`}>
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition-colors">
                    Details
                  </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>}
        </div>
      </main>
    </div>
  );
}
