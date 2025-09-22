import { motion } from "framer-motion";

const steps = [
  {
    no: 1,
    head: "Erat at semper",
    text: "Choose from our wide selection of premium vehicles that suit your needs and budget.",
  },
  {
    no: 2,
    head: "Urna nec vivamus risus duis arcu",
    text: "Select your pickup and return locations along with your preferred dates.",
  },
  {
    no: 3,
    head: "Lobortis euismod imperdiet tempus",
    text: "Complete your booking with our secure payment process and get instant confirmation.",
  },
  {
    no: 4,
    head: "Cras nulla aliquet nam eleifend amet et",
    text: "Pick up your car and enjoy your journey with our 24/7 roadside assistance.",
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
            src="https://images.pexels.com/photos/12543725/pexels-photo-12543725.jpeg"
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
