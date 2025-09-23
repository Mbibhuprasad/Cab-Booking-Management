import { motion } from "framer-motion";
import location from "../../assets/location-location-route-wavy_78370-4227-Photoroom.png";

export default function LocationCards() {
  const locations = [
    {
      id: 1,
      title: "Bhubaneswar to Puri",
      images: [
        "https://www.avis.co.in/blog/wp-content/uploads/2024/03/image1-4.jpg", // Bhubaneswar
        location, // location icon
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Shri_Jagannatha_Temple.jpg/1200px-Shri_Jagannatha_Temple.jpg", // Puri
      ],
      originalPrice: 2000,
      offerPrice: 1600,
    },
    {
      id: 2,
      title: "Bhubaneswar to Konark",
      images: [
        "https://www.avis.co.in/blog/wp-content/uploads/2024/03/image1-4.jpg", // Bhubaneswar
        location, // location icon
        "https://i0.wp.com/thewanderingcore.com/wp-content/uploads/2017/03/img_3367.jpg?fit=4032%2C3024&ssl=1", // Konark
      ],
      originalPrice: 1900,
      offerPrice: 1500,
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
              scale: 1.05,
              rotateY: 5,
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
            }}
            transition={{
              duration: 0.6,
              hover: { duration: 0.3 },
            }}
            viewport={{ once: true }}
            className="w-full sm:w-[90%] md:w-[45%] lg:w-[40%] bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-200 m-2 md:m-6 rounded-2xl shadow-2xl overflow-hidden border-2 border-yellow-500 cursor-pointer"
          >
            {/* Images Row */}
            <div className="flex justify-between items-center bg-gradient-to-r from-gray-700 to-gray-900 p-2">
              {loc.images.map((img, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`flex-1 flex items-center justify-center ${
                    idx === 1 ? "p-3" : ""
                  }`}
                >
                  <img
                    src={img}
                    alt="location"
                    className="w-full h-full sm:h-36 md:h-40 object-cover rounded-lg shadow-md"
                  />
                </motion.div>
              ))}
            </div>

            {/* Text Content */}
            <div className="p-4 text-center bg-white/80 backdrop-blur-sm">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3"
              >
                {loc.title}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row justify-center items-center gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="line-through text-red-500 text-xl font-semibold">
                    ₹{loc.originalPrice}
                  </span>
                  <span className="text-green-600 font-bold text-2xl">
                    ₹{loc.offerPrice}
                  </span>
                </div>

                <motion.button
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#1e40af",
                    boxShadow: "0 10px 20px rgba(37, 99, 235, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg transition-all duration-200"
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
              </motion.div>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-4 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
