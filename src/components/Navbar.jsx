import React from "react";
import { motion } from "framer-motion";
import { 
  Smartphone, 
  Home, 
  Settings, 
  HelpCircle 
} from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
    <motion.nav 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-700 text-white p-4 shadow-lg fixed w-full z-[1000]"
    >
      <link rel="icon" type="image/x-icon" href="logo.png" />
      <title>Smartphone Recommendation System</title>
      {/* insert favicon */}
      <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <Smartphone className="mr-2 text-white" size={32} />
            <h1 className="text-2xl font-extrabold tracking-tight">
              Smart Smartphone Finder
            </h1>
          </motion.div>
        </Link>

        <div className="flex items-center space-x-6">
          <Link href="/">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center hover:text-blue-200 transition-colors"
            >
              <Home className="mr-2" size={20} />
              Home
            </motion.div>
          </Link>

          <Link href="/comparePhone">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center hover:text-blue-200 transition-colors"
            >
              <Smartphone className="mr-2" size={20} />
              Compare
            </motion.div>
          </Link>

         
        </div>
      </div>
    </motion.nav>
    <br></br><br></br><br></br>
    </>
  );
};

export default Navbar;