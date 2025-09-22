import { motion } from "framer-motion";
import {
  FaHandsHelping,
  FaShieldAlt,
  FaLightbulb,
  FaCar,
  FaMapMarkerAlt,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";

export default function AboutSection() {
  return (
    <>
      <section className="bg-black text-white py-12 px-6 md:px-20">
        {/* Title + Top Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            About Car Rental
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            For over 25 years, we've been providing exceptional car rental
            services, helping millions of customers explore the world with
            confidence and comfort.
          </p>
        </motion.div>

        {/* Car Image + Mission/Vision */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Car Image */}
          <motion.img
            src="https://static.vecteezy.com/system/resources/thumbnails/023/980/938/small_2x/close-up-red-luxury-car-on-black-background-with-copy-space-photo.jpg"
            alt="Car"
            initial={{ x: -80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 object-contain rounded-xl shadow-lg"
          />

          {/* Right Content */}
          <div className="flex flex-col gap-10 w-full md:w-1/2">
            {/* Mission Block */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <button className="bg-yellow-500 text-black font-bold px-6 py-2 rounded mb-3 hover:scale-105 transition-transform">
                OUR MISSION
              </button>
              <p className="text-gray-300 leading-relaxed">
                For over 25 years, we've been providing exceptional car rental
                services, helping millions of customers explore the world with
                confidence and comfort.
              </p>
            </motion.div>

            {/* Vision Block */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <button className="bg-yellow-500 text-black font-bold px-6 py-2 rounded mb-3 hover:scale-105 transition-transform">
                OUR VISION
              </button>
              <p className="text-gray-300 leading-relaxed">
                For over 25 years, we've been providing exceptional car rental
                services, helping millions of customers explore the world with
                confidence and comfort.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-16 px-6 md:px-20">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-xl font-bold text-yellow-500 mb-3">
            Our Core Values
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            For over 25 years, we've been providing exceptional car rental
            services, helping millions of customers explore the world with
            confidence and comfort.
          </p>
        </motion.div>

        {/* Top 3 Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 text-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center bg-gray-900 p-6 rounded-xl shadow-lg"
          >
            <FaHandsHelping className="text-yellow-500 text-4xl mb-3" />
            <h3 className="text-yellow-500 font-bold text-lg mb-2">
              CUSTOMER CARE
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              For over 25 years, we've been providing exceptional car rental
              services, helping millions of customers explore the world with
              confidence and comfort.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center bg-gray-900 p-6 rounded-xl shadow-lg"
          >
            <FaShieldAlt className="text-yellow-500 text-4xl mb-3" />
            <h3 className="text-yellow-500 font-bold text-lg mb-2">SAFETY</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              For over 25 years, we've been providing exceptional car rental
              services, helping millions of customers explore the world with
              confidence and comfort.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center bg-gray-900 p-6 rounded-xl shadow-lg"
          >
            <FaLightbulb className="text-yellow-500 text-4xl mb-3" />
            <h3 className="text-yellow-500 font-bold text-lg mb-2">
              INNOVATION
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              For over 25 years, we've been providing exceptional car rental
              services, helping millions of customers explore the world with
              confidence and comfort.
            </p>
          </motion.div>
        </div>

        {/* Middle Car Image */}
        <div className="flex justify-center mb-16">
          <motion.img
            src="https://imgd.aeplcdn.com/0x0/n/z3uk9hb_1868817.png"
            alt="Car"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-72 md:w-96 object-contain rounded-xl shadow-lg"
          />
        </div>

        {/* Bottom 4 Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-center md:text-left">
          {[
            {
              icon: (
                <FaCar className="text-yellow-500 text-2xl mb-2 mx-auto md:mx-0" />
              ),
              title: "Extensive Fleet Options",
              desc: "Choose Sedans, SUVs, Hatchbacks & more for every occasion.",
            },
            {
              icon: (
                <FaMapMarkerAlt className="text-yellow-500 text-2xl mb-2 mx-auto md:mx-0" />
              ),
              title: "Convenient Locations",
              desc: "Available at major airports, downtown & popular travel hubs.",
            },
            {
              icon: (
                <FaUsers className="text-yellow-500 text-2xl mb-2 mx-auto md:mx-0" />
              ),
              title: "Exceptional Customer Service",
              desc: "24/7 customer support for hassle-free travel experience.",
            },
            {
              icon: (
                <FaCheckCircle className="text-yellow-500 text-2xl mb-2 mx-auto md:mx-0" />
              ),
              title: "Reliability & Safety",
              desc: "Well-maintained cars with top safety standards always.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col items-center md:items-start"
            >
              {feature.icon}
              <h4 className="text-white font-bold mb-2">{feature.title}</h4>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
