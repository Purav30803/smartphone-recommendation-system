import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  CpuChipIcon,
  CameraIcon,
  DeviceTabletIcon,
  Battery50Icon,
  BoltIcon,
  ChartBarSquareIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Navbar from "@/components/Navbar";
import "../styles/global.css";

const ComparePhone = () => {
  const [smartphones, setSmartphones] = useState([]);
  const [phone1, setPhone1] = useState(null);
  const [phone2, setPhone2] = useState(null);
  const [phone1Details, setPhone1Details] = useState(null);
  const [phone2Details, setPhone2Details] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch list of smartphones
  useEffect(() => {
    const fetchSmartphones = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("http://localhost:8080/api/smartphones");
        if (res.data && Array.isArray(res.data)) {
          setSmartphones(res.data);
        } else {
          console.error("Invalid response format:", res.data);
        }
      } catch (err) {
        console.error("Error fetching smartphones:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSmartphones();
  }, []);

  // Fetch details for selected phones
  useEffect(() => {
    const fetchPhoneDetails = async (id, setDetails) => {
      try {
        if (!id) return; // Skip if no ID
        setIsLoading(true);
        const res = await axios.get(`http://localhost:8080/api/smartphones/${id}`);
        if (res.data) {
          setDetails(res.data);
        } else {
          console.error(`Invalid details for phone ID ${id}:`, res.data);
        }
      } catch (err) {
        console.error("Error fetching phone details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (phone1) fetchPhoneDetails(phone1, setPhone1Details);
    if (phone2) fetchPhoneDetails(phone2, setPhone2Details);
  }, [phone1, phone2]);

  const renderDetailSection = (icon, label, value) => (
    <div className="flex items-center space-x-4 pt-8">
      {icon}
      <div>
        <p className="font-medium text-gray-600">{label}</p>
        <p className="font-semibold truncate max-w-[600px]">{value || "N/A"}</p>
      </div>
    </div>
  );

  const phoneDetailComparison = (details) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 border rounded-2xl bg-white shadow-lg space-y-4"
    >
      <h3 className="text-xl font-bold text-center mb-4">
        {details.brand} - {details.model}
      </h3>

      <img src={details.image} alt={details.model} className="w-full h-[300px] object-cover" />

      <div className=" gap-4">
        {renderDetailSection(
          <CpuChipIcon className="h-6 w-6 text-blue-500" />,
          "Processor",
          details.processor
        )}
        {renderDetailSection(
          <CameraIcon className="h-6 w-6 text-green-500" />,
          "Camera",
          details.camera
        )}
        {renderDetailSection(
          <DeviceTabletIcon className="h-6 w-6 text-purple-500" />,
          "Storage & RAM",
          details.storageAndRam
        )}
        {renderDetailSection(
          <ChartBarSquareIcon className="h-6 w-6 text-indigo-500" />,
          "Display",
          details.display
        )}
        {renderDetailSection(
          <Battery50Icon className="h-6 w-6 text-red-500" />,
          "Battery",
          details.batteryAndCharging
        )}
        {renderDetailSection(
          <BoltIcon className="h-6 w-6 text-yellow-500" />,
          "Operating System",
          details.operatingSystem
        )}
        <div className="col-span-2 text-center">
          <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
            Price: ${details.price || "N/A"}
          </span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-black">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-6"
      >
        <motion.h1
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-4xl font-extrabold text-gray-900 mb-8 flex items-center"
        >
          <InformationCircleIcon className="mr-4 h-10 w-10 text-blue-600" />
          Compare Smartphones
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white shadow-2xl rounded-2xl p-8 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone1" className="block text-lg font-medium mb-2">
                Select First Phone
              </label>
              <select
                id="phone1"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all p-3"
                value={phone1 || ""}
                onChange={(e) => setPhone1(e.target.value)}
              >
                <option value="" disabled>
                  Select a smartphone
                </option>
                {smartphones.map((phone) => (
                  <option key={phone._id} value={phone._id}>
                    {phone.brand} - {phone.model}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="phone2" className="block text-lg font-medium mb-2">
                Select Second Phone
              </label>
              <select
                id="phone2"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all p-3"
                value={phone2 || ""}
                onChange={(e) => setPhone2(e.target.value)}
              >
                <option value="" disabled>
                  Select a smartphone
                </option>
                {smartphones.map((phone) => (
                  <option key={phone._id} value={phone._id}>
                    {phone.brand} - {phone.model}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "linear",
              }}
            >
              <InformationCircleIcon className="h-10 w-10 text-blue-500" />
            </motion.div>
          </div>
        ) : (
          phone1Details &&
          phone2Details && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {phoneDetailComparison(phone1Details)}
              {phoneDetailComparison(phone2Details)}
            </motion.div>
          )
        )}
      </motion.div>
    </div>
  );
};

export default ComparePhone;
