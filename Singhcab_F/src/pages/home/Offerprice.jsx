import { motion } from "framer-motion";

export default function LocationCards() {
  const locations = [
    {
      id: 1,
      title: "Bhubaneswar to Puri",
      image:
        "https://cdnl.iconscout.com/lottie/premium/thumb/pesquisa-de-localizacao-animation-gif-download-4623980.gif", // Puri Temple
      originalPrice: 2000,
      offerPrice: 1600,
      distance: "65 km",
      duration: "1.5 hrs",
    },
    {
      id: 2,
      title: "Bhubaneswar to Konark",
      image:
        "https://cdnl.iconscout.com/lottie/premium/thumb/pesquisa-de-localizacao-animation-gif-download-4623980.gif", // Konark Sun Temple
      originalPrice: 1900,
      offerPrice: 1500,
      distance: "85 km",
      duration: "2.0 hrs",
    },
    {
      id: 3,
      title: "Bhubaneswar to Sambalpur",
      image:
        "https://cdnl.iconscout.com/lottie/premium/thumb/pesquisa-de-localizacao-animation-gif-download-4623980.gif", // Sambalpur
      originalPrice: 3999,
      offerPrice: 3699,
      distance: "260 km",
      duration: "5.6 hrs",
    },
  ];

  return (
    <>
      <h1 className="text-white text-center text-3xl sm:text-4xl md:text-[2.5rem] mt-14 font-bold">
        Special Offers
      </h1>
      <div className="flex flex-col md:flex-row flex-wrap justify-center items-center p-4 md:p-6 mt-8 gap-6">
        {locations.map((loc) => (
          <motion.div
            key={loc.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              scale: 1.02,
              y: -10,
              boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
            }}
            transition={{
              duration: 0.6,
              hover: { duration: 0.3 },
            }}
            viewport={{ once: true }}
            className="w-full sm:w-[90%] md:w-[45%] lg:w-[400px] bg-gray-900 rounded-[0.6rem] shadow-xl overflow-hidden border border-gray-100 cursor-pointer"
          >
            {/* Main Image */}
            <div className="relative overflow-hidden">
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
                src={loc.image}
                alt={loc.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {Math.round(
                  ((loc.originalPrice - loc.offerPrice) / loc.originalPrice) *
                    100
                )}
                % OFF
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <div className="flex items-center text-white text-sm">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="mr-4">{loc.distance}</span>
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{loc.duration}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-white mb-4"
              >
                {loc.title}
              </motion.h2>

              {/* Price Section */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="line-through text-gray-300 text-lg">
                    ₹{loc.originalPrice}
                  </span>
                  <span className="text-green-600 font-bold text-2xl">
                    ₹{loc.offerPrice}
                  </span>
                </div>
                <div className="text-sm text-gray-300">per trip</div>
              </div>

              {/* Features */}
              <div className="flex items-center gap-4 mb-6 text-sm text-sky-500">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1 text-blue-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  AC Cab
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1 text-blue-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Expert Driver
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1 text-blue-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Safe Travel
                </div>
              </div>

              {/* Book Now Button */}
              <motion.button
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "#1e40af",
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-2 py-4 bg-[#FDC700] text-white font-bold text-lg rounded-[0.4rem] shadow-lg transition-all duration-200 hover:shadow-xl"
                onClick={() => {
                  const [pickup, drop] = loc.title.split(" to ");
                  localStorage.setItem("pickup", pickup || "");
                  localStorage.setItem("drop", drop || "");
                  localStorage.setItem("bookingMode", "cab");
                  window.location.href = "/bookingform";
                }}
              >
                Book Now
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
