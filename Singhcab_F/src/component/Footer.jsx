// Footer.jsx
import { Facebook, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../assets/b8a09045-7604-44aa-b27a-eb4703716f9a.png";

export default function Footer() {
  const navigate = useNavigate();

  // Route map for quick links and resources
  const quickLinks = {
    Home: "/",
    "About Us": "/about",
    Cars: "/vehicles",
    "Contact Us": "/contact",
  };

  const resourcesLinks = {
    "Term & Conditions": "/terms",
    "Privacy Policy": "/privacy",
    "Cancelation Policy": "/cancelation",
    Feedback: "/feedback",
  };

  return (
    <footer className="bg-black text-gray-300 py-12 px-6 md:px-20">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Left Section */}
        <motion.div
          className="flex flex-col"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-lg font-semibold text-white mb-6">
            Experience premium car rental services with our modern fleet and
            exceptional customer support.
          </p>

          {/* Address */}
          <div className="mt-6 text-sm space-y-1">
            <p>Roshan Homes, Mahadev Nagar, Jharpada-751006</p>
            <p>absara8794@gmail.com</p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4 mt-6">
            <motion.a
              href="#"
              className="bg-yellow-500 p-2 rounded-full text-black hover:bg-yellow-400"
              whileHover={{ scale: 1.2 }}
            >
              <Facebook size={18} />
            </motion.a>
            <motion.a
              href="#"
              className="bg-yellow-500 p-2 rounded-full text-black hover:bg-yellow-400"
              whileHover={{ scale: 1.2 }}
            >
              <Instagram size={18} />
            </motion.a>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
          <h3 className="text-white font-bold text-lg mb-4">Quick Link</h3>
          <ul className="space-y-3 text-gray-300">
            {Object.keys(quickLinks).map((link, idx) => (
              <li
                key={idx}
                className="hover:text-yellow-400 cursor-pointer transition-colors"
                onClick={() => navigate(quickLinks[link])}
              >
                {link}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Resources */}
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
          <h3 className="text-white font-bold text-lg mb-4">Resources</h3>
          <ul className="space-y-3 text-gray-300">
            {Object.keys(resourcesLinks).map((item, idx) => (
              <li
                key={idx}
                className="hover:text-yellow-400 cursor-pointer transition-colors"
                onClick={() => navigate(resourcesLinks[item])}
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right Side Image */}
        <motion.div
          className="flex justify-center md:justify-end mt-8 md:mt-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src={logo}
            alt="Car"
            className="w-60 md:w-80 object-contain rounded-lg shadow-lg"
          />
        </motion.div>
      </motion.div>

      {/* Mobile Bottom Credit */}
      <motion.div
        className="mt-12 text-center text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        © 2025 Premium Car Rental. All rights reserved.
      </motion.div>
    </footer>
  );
}
