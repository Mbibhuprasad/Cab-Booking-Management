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
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full sm:w-[90%] md:w-[45%] lg:w-[40%] bg-yellow-300 m-2 md:m-6 rounded-[0.4rem] shadow-lg overflow-hidden border border-gray-200"
          >
            {/* Images Row */}
            <div className="flex justify-between items-center bg-gray-600">
              {loc.images.map((img, idx) => (
                <div
                  key={idx}
                  className={`flex-1 flex items-center justify-center ${
                    idx === 1 ? "p-3" : ""
                  }`}
                >
                  <img
                    src={img}
                    alt="location"
                    className="w-full h-full  sm:h-36 md:h-40 object-contain rounded-md"
                  />
                </div>
              ))}
            </div>

            {/* Text Content */}
            <div className="p-3  text-center">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                {loc.title}
              </h2>
              <p className="mt-2 text-gray-500 text-lg sm:text-lg flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
                <span className="line-through text-red-500">
                  ₹{loc.originalPrice}
                </span>
                <span className="text-green-600 font-bold">
                  ₹{loc.offerPrice}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-[0.4rem] shadow-md hover:bg-blue-700 mt-2 sm:mt-0"
                >
                  Book Now
                </motion.button>
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
