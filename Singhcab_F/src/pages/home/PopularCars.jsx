import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function PopularCars() {
  const navigate = useNavigate();

  const cars = [
    {
      name: "Mini",
      image:
        "https://i.pinimg.com/736x/b5/09/65/b50965e12ee5394ea1d6a2b8b56b2fe1.jpg",
    },
    {
      name: "Sedan",
      image:
        "https://imgd.aeplcdn.com/642x336/n/cw/ec/139133/aura-exterior-right-front-three-quarter-8.jpeg?isig=0&q=80",
    },
    {
      name: "XL",
      image:
        "https://toyotageneralsantos.com.ph/wp-content/uploads/2016/12/Innova.png",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleNavigate = (carName) => {
    localStorage.setItem("selectedType", carName); // save type for Vehicles page
    navigate("/vehicles");
  };

  return (
    <section className="flex flex-col justify-center items-center my-10 px-4 md:px-8">
      {/* Header */}
      <div className="w-full max-w-6xl mx-auto text-center">
        <motion.h4
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-yellow-400 text-lg md:text-xl font-medium tracking-wide mb-2"
        >
          Car Types
        </motion.h4>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-extrabold text-white mb-12"
        >
          Explore Our Car Collection
        </motion.h2>

        {/* Car Cards */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 px-2 py-10">
          {cars.map((car, idx) => (
            <motion.div
              key={idx}
              className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-l shadow-2xl flex flex-col items-center w-56 md:w-64 h-72 border border-yellow-500/40 hover:border-yellow-300/80 transition-colors duration-300 cursor-pointer"
              whileHover={{
                scale: 1.07,
                y: -10,
                boxShadow: "0px 20px 40px rgba(255, 215, 0, 0.3)",
              }}
              initial={{ scale: 1 }}
              onHoverStart={() => setHoveredIndex(idx)}
              onHoverEnd={() => setHoveredIndex(null)}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => handleNavigate(car.name)}
            >
              {/* Image */}
              <div className="w-full h-36 flex items-center justify-center overflow-hidden rounded-t-2xl bg-black">
                <img
                  src={car.image}
                  alt={car.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <p className="text-white font-bold text-lg mt-3">{car.name}</p>

              {/* See All Cars Button */}
              <motion.button
                transition={{ duration: 0.3 }}
                className="absolute bottom-6  flex items-center justify-center px-2 py-2 bg-yellow-500 text-gray-900 font-bold rounded-[0.5rem] shadow-lg hover:bg-yellow-400 transition-colors duration-300"
              >
                <span>See All Cars</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
