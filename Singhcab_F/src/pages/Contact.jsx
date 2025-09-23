import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactCard = ({ icon, title, content }) => {
  return (
    <motion.div
      className="flex flex-col items-center text-center p-6 md:p-8 rounded-xl bg-gray-900 shadow-lg"
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-20 h-20 rounded-full border-2 border-yellow-400 flex items-center justify-center mb-4 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-yellow-400 mb-2">{title}</h3>
      <div className="space-y-2 text-gray-400">
        {content.map((item, index) =>
          typeof item === "string" ? (
            <p key={index}>{item}</p>
          ) : (
            <div key={index}>{item}</div>
          )
        )}
      </div>
    </motion.div>
  );
};

const ContactAndBooking = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    pickupPoint: "",
    timeDate: "",
    cabType: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking submitted:", formData);

    // Store in localStorage
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    storedBookings.push(formData);
    localStorage.setItem("bookings", JSON.stringify(storedBookings));

    // Reset form
    setFormData({
      name: "",
      contactNumber: "",
      pickupPoint: "",
      timeDate: "",
      cabType: "",
      termsAccepted: false,
    });

    alert("Booking submitted successfully!");
  };

  const inputIcon = (icon) => (
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-yellow-400">
      {icon}
    </div>
  );

  // Icons
  const phoneIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-10 text-yellow-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );

  const emailIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-10 text-yellow-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );

  const chatIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-10 text-yellow-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 4v-4z"
      />
    </svg>
  );

  return (
    <div className="bg-black text-white">
      {/* Contact Section */}
      <div className="py-16 px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto mb-10">
          <h2 className="text-4xl font-bold mb-4">CONTACT US</h2>
          <p className="text-gray-400 text-lg">
            Have questions or need assistance? We're here to help! Reach out to
            us through any of the channels below.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-6xl mx-auto">
          <ContactCard
            icon={phoneIcon}
            title="CALL US"
            content={["+91-8971686464", "24/7 Support Available"]}
          />
          <ContactCard
            icon={emailIcon}
            title="EMAIL US"
            content={["absara8794@gmail.com", "Response within 2 hours"]}
          />
          <ContactCard
            icon={chatIcon}
            title="LIVE CHAT"
            content={[
              "Instant Support",
              <button
                key="chat-button"
                className="mt-2 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg shadow-lg transition-all transform hover:scale-105"
              >
                Start Chat
              </button>,
            ]}
          />
        </div>
      </div>

      {/* Cab Booking Section */}
      <div className="p-6 md:p-12 antialiased">
        <motion.div
          className="max-w-6xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-gray-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="md:grid md:grid-cols-2">
            {/* Booking Form */}
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-8">
                Online Cab Booking
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="relative">
                  {inputIcon(
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  )}
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Sejal"
                    className="w-full pl-12 pr-4 py-3 bg-gray-800 text-gray-200 rounded-lg border-b-2 border-gray-700 focus:outline-none focus:border-yellow-400 transition-all duration-300"
                  />
                </div>
                {/* Contact */}
                <div className="relative">
                  {inputIcon(
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  )}
                  <input
                    type="text"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="Contact Number"
                    className="w-full pl-12 pr-4 py-3 bg-gray-800 text-gray-200 rounded-lg border-b-2 border-gray-700 focus:outline-none focus:border-yellow-400 transition-all duration-300"
                  />
                </div>
                {/* Pickup */}
                <div className="relative">
                  {inputIcon(
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 1 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                  <input
                    type="text"
                    name="pickupPoint"
                    value={formData.pickupPoint}
                    onChange={handleChange}
                    placeholder="Pickup Point"
                    className="w-full pl-12 pr-4 py-3 bg-gray-800 text-gray-200 rounded-lg border-b-2 border-gray-700 focus:outline-none focus:border-yellow-400 transition-all duration-300"
                  />
                </div>
                {/* Time */}
                <div className="relative">
                  {inputIcon(
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                  <input
                    type="datetime-local"
                    name="timeDate"
                    value={formData.timeDate}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-gray-800 text-gray-200 rounded-lg border-b-2 border-gray-700 focus:outline-none focus:border-yellow-400 transition-all duration-300"
                  />
                </div>
                {/* Cab Type */}
                <div className="relative">
                  {inputIcon(
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 17L11 20 22 20 22 17 9 17z" />
                      <path d="M22 17L12 17 12 12 10 12 10 9 12 9 12 5 16 5 16 9 20 9 20 12 22 12 22 17z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M22 17L12 17 12 12 10 12 10 9 12 9 12 5 16 5 16 9 20 9 20 12 22 12 22 17z"
                      />
                    </svg>
                  )}
                  <select
                    name="cabType"
                    value={formData.cabType}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-gray-800 text-gray-200 rounded-lg border-b-2 border-gray-700 focus:outline-none focus:border-yellow-400 transition-all duration-300"
                  >
                    <option value="">Cab Type</option>
                    <option value="Mini">Mini</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                  </select>
                </div>

                {/* Terms */}
                <div>
                  <p className="text-sm font-bold text-gray-400 mb-2">
                    Terms and conditions
                  </p>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleChange}
                      className="form-checkbox h-5 w-5 text-yellow-400 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-yellow-400"
                    />
                    <label htmlFor="termsAccepted" className="text-gray-400">
                      I agree above terms and conditions
                    </label>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-4 bg-yellow-400 text-gray-900 font-bold rounded-lg shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  disabled={!formData.termsAccepted}
                >
                  Book Now
                </motion.button>
              </form>
            </div>

            {/* Car Image */}
            <motion.div
              className="relative bg-yellow-400 w-[100%]  flex items-center justify-center p-8 md:p-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="absolute top-0 bottom-0 left-0 w-full bg-black md:bg-transparent md:w-full md:bg-transparent transform skew-y-12 origin-bottom-right"></div>
              <img
                src="https://i.pinimg.com/originals/db/d3/b1/dbd3b1e13599dbaf83e0d88b4a35367c.jpg"
                alt="Red Ford Mustang"
                className="absolute w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactAndBooking;
