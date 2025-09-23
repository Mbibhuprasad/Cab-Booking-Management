import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bgImage from "../../assets/603bf261-5d35-45ad-910b-0f2aa855bd2f.png";

export default function Hero() {
  const navigate = useNavigate();
  const [showSelfDriveForm, setShowSelfDriveForm] = useState(false);

  // Handle normal booking form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      carType: formData.get("carType"),
      pickup: formData.get("pickup"),
      return: formData.get("return"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
    };
    // Save to localStorage for BookingForm auto-fill
    localStorage.setItem("bookingData", JSON.stringify(data));
    localStorage.setItem("bookingMode", "cab"); // open Cab tab
    navigate("/bookingForm");
  };

  // Handle self drive form submit
  const handleSelfDriveSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      license: formData.get("license"),
      dob: formData.get("dob"),
      carModel: formData.get("carModel"),
      duration: formData.get("duration"),
    };
    localStorage.setItem("selfDriveBooking", JSON.stringify(data));
    localStorage.setItem("bookingMode", "selfdrive"); // open SelfDrive tab
    navigate("/bookingForm");
  };

  // Handle input changes to save in localStorage in real-time
  const handleChange = (e) => {
    const form = e.target.form;
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (!showSelfDriveForm) {
      localStorage.setItem("bookingData", JSON.stringify(data));
    } else {
      localStorage.setItem("selfDriveBooking", JSON.stringify(data));
    }
  };

  // 🔥 Motion variants
  const fadeInLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1 } },
  };
  const fadeInRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1 } },
  };

  return (
    <section
      className="relative min-h-[90vh] flex flex-col md:flex-row items-center justify-between 
                 px-6 md:px-20 bg-black bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Left text */}
      <motion.div
        variants={fadeInLeft}
        initial="hidden"
        animate="visible"
        className="w-full md:w-[45%] text-center md:text-left"
      >
        <h2 className="text-4xl md:text-5xl font-bold leading-tight text-yellow-400">
          Experience the road <br /> like never before.
        </h2>
        <p className="mt-6 md:mt-10 text-gray-300 text-base md:text-[1.3rem]">
          Discover freedom with our premium car rental service. From luxury
          sedans to rugged SUVs, find your perfect driving companion.
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/vehicles")}
          className="mt-8 md:mt-14 px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg"
        >
          View All Cars
        </motion.button>
      </motion.div>

      {/* Right booking form */}
      <motion.div
        variants={fadeInRight}
        initial="hidden"
        animate="visible"
        className="w-full md:w-1/2 flex justify-center relative mt-10 md:mt-0"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="w-full max-w-[450px] p-8 md:p-10 rounded-xl shadow-lg border border-yellow-400 bg-black/30 backdrop-blur-lg"
        >
          <div className="flex justify-between mb-6 text-white font-bold text-lg">
            <h3
              className={`cursor-pointer transition ${
                !showSelfDriveForm ? "text-yellow-400 underline" : ""
              }`}
              onClick={() => setShowSelfDriveForm(false)}
            >
              Book Your Cab
            </h3>
            <h3
              className={`cursor-pointer transition ${
                showSelfDriveForm ? "text-yellow-400 underline" : ""
              }`}
              onClick={() => setShowSelfDriveForm(true)}
            >
              Self Drive Car
            </h3>
          </div>

          {/* Conditional Rendering */}
          {!showSelfDriveForm ? (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-3 text-white"
              onSubmit={handleSubmit}
            >
              <label className="text-sm">Car Type</label>
              <select
                name="carType"
                onChange={handleChange}
                className="p-2 rounded border border-gray-400 text-white"
              >
                <option className="text-black">Select Car Type</option>
                <option className="text-black">Mini</option>
                <option className="text-black">Sedan</option>
                <option className="text-black">XL</option>
              </select>

              <label className="text-sm">Pickup Location</label>
              <input
                type="text"
                name="pickup"
                onChange={handleChange}
                placeholder="Enter Pickup Location"
                className="p-2 rounded bg-transparent border border-gray-400"
              />

              <label className="text-sm">Drop Location</label>
              <input
                type="text"
                name="return"
                onChange={handleChange}
                placeholder="Enter Drop Location"
                className="p-2 rounded bg-transparent border border-gray-400"
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                type="submit"
                className="bg-yellow-400 text-black font-bold py-2 rounded-lg mt-4"
              >
                BOOK NOW
              </motion.button>
            </motion.form>
          ) : (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-3 text-white"
              onSubmit={handleSelfDriveSubmit}
            >
              <label className="text-sm">Driving License No.</label>
              <input
                type="text"
                name="license"
                onChange={handleChange}
                placeholder="Enter License No."
                className="p-2 rounded bg-transparent border border-gray-400"
              />

              <label className="text-sm">Dob</label>
              <input
                type="date"
                name="dob"
                onChange={handleChange}
                className="p-2 rounded border border-gray-400 bg-gray-200 text-black"
              />

              <label className="text-sm">Rental Duration (Hours)</label>
              <input
                type="number"
                name="duration"
                onChange={handleChange}
                placeholder="Enter Hours"
                className="p-2 rounded bg-transparent border border-gray-400"
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                type="submit"
                className="bg-yellow-400 text-black font-bold py-2 rounded-lg mt-4"
              >
                BOOK SELF DRIVE
              </motion.button>
            </motion.form>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
