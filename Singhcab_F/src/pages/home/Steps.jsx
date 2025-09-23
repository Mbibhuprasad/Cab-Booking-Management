import { motion } from "framer-motion";

const steps = [
  {
    no: 1,
    head: "Choose Your Ride",
    text: "Browse through Singh Cab's premium fleet, featuring both chauffeur-driven cabs and self-drive vehicles to match your style and budget.",
  },
  {
    no: 2,
    head: "Select Location & Date",
    text: "Easily select your pickup and drop locations along with your preferred dates for cab booking or self-drive rental.",
  },
  {
    no: 3,
    head: "Secure Your Booking",
    text: "Complete your reservation through our fast and secure online process, and receive instant confirmation for peace of mind.",
  },
  {
    no: 4,
    head: "Enjoy Your Journey",
    text: "Pick up your cab or self-drive vehicle and enjoy a seamless experience with Singh Cab, backed by 24/7 roadside assistance and customer support.",
  },
];


const Steps = () => {
  return (
    <>
      <section className="py-10 px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 bg-black m-auto gap-8 items-center">
        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <img
            src="https://images.pexels.com/photos/31636698/pexels-photo-31636698.jpeg"
            alt="Car"
            className="rounded-lg shadow-lg w-full max-w-md h-[28rem] object-cover"
          />
        </motion.div>

        {/* Right Steps */}
        <div className="w-full max-w-xl">
          {steps.map((s, idx) => (
            <motion.div
              key={s.no}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-8"
            >
              <span className="bg-yellow-400 text-black text-2xl font-bold w-14 h-14 sm:w-22 sm:h-22 flex items-center justify-center rounded-full flex-shrink-0">
                {s.no}
              </span>
              <div>
                <h3 className="text-yellow-300 text-lg font-semibold">
                  {s.head}
                </h3>
                <p className="text-gray-300 text-base">{s.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-yellow-500 text-center py-10 px-4 sm:px-6 rounded-lg w-full sm:w-[80%] mx-auto mt-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
          Experience the road like never before.
        </h2>
        <p className="text-black text-lg md:text-xl max-w-3xl mx-auto">
          Discover freedom with our premium car rental service. From luxury
          sedans to rugged SUVs, find your perfect driving companion.
        </p>
      </motion.section>
    </>
  );
};

export default Steps;
