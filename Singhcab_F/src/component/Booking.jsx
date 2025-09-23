import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function BookingForm({ selectedCar, onBookingSuccess }) {
  const [showSelfDriveForm, setShowSelfDriveForm] = useState(false);
  const [cars, setCars] = useState([]);
  const [carTypes, setCarTypes] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [selectedCarData, setSelectedCarData] = useState(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [formData, setFormData] = useState({
    carType: "",
    carModel: "",
    pickup: "",
    drop: "",
    km: "",
    name: "",
    email: "",
    phone: "",
    startDate: "",
    endDate: "",
    duration: "",
    license: "",
    dob: "",
    adhar: "",
    location: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    const mode = localStorage.getItem("bookingMode");
    if (mode === "selfdrive") {
      setShowSelfDriveForm(true);
    } else {
      setShowSelfDriveForm(false);
    }

    // Pre-fill pickup & drop if saved from LocationCards
    const pickup = localStorage.getItem("pickup");
    const drop = localStorage.getItem("drop");
    if (pickup || drop) {
      setFormData((prev) => ({
        ...prev,
        pickup: pickup || "",
        drop: drop || "",
      }));

      // clear after using once
      localStorage.removeItem("pickup");
      localStorage.removeItem("drop");
    }

    // Auto-fill car type and model from selected car
    const savedCar = localStorage.getItem("selectedCar");
    if (savedCar) {
      const carData = JSON.parse(savedCar);
      setFormData((prev) => ({
        ...prev,
        carType: carData.carType || "",
        carModel: carData.carModel || "",
      }));
      localStorage.removeItem("selectedCar");
    }
  }, []);

  // Fetch all cars once
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/cars`);
        const data = await response.json();
        setCars(data);

        const types = [...new Set(data.map((car) => car.type))];
        setCarTypes(types);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    const mode = localStorage.getItem("bookingMode");

    if (mode === "selfdrive") {
      setShowSelfDriveForm(true);
      const savedSelfDrive = localStorage.getItem("selfDriveBooking");
      if (savedSelfDrive) {
        setFormData(JSON.parse(savedSelfDrive));
      }
    } else {
      setShowSelfDriveForm(false);
      const savedBooking = localStorage.getItem("bookingData");
      if (savedBooking) {
        setFormData(JSON.parse(savedBooking));
      }
    }

    // Clear localStorage after reading if needed
    localStorage.removeItem("bookingData");
    localStorage.removeItem("selfDriveBooking");
  }, []);

  useEffect(() => {
    if (formData.carType) {
      const models = cars
        .filter((car) => car.type === formData.carType)
        .map((car) => car.model);
      setCarModels(models);
    } else {
      setCarModels([]);
    }
  }, [formData.carType, cars]);

  useEffect(() => {
    if (formData.carModel) {
      const car = cars.find(
        (c) => c.type === formData.carType && c.model === formData.carModel
      );
      setSelectedCarData(car || null);
    } else {
      setSelectedCarData(null);
    }
  }, [formData.carModel, formData.carType, cars]);

  useEffect(() => {
    if (selectedCar) {
      setFormData((prev) => ({
        ...prev,
        carType: selectedCar.type,
        carModel: selectedCar.model,
      }));
    }
  }, [selectedCar]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const endpoint = showSelfDriveForm
        ? `${API_BASE_URL}/bookings/self-drive`
        : `${API_BASE_URL}/bookings/cab`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetch(`${API_BASE_URL}/email/send`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: `New booking for ${JSON.stringify(formData)} `,
          }),
        });

        setShowSuccessPopup(true);
        setTimeout(() => setShowSuccessPopup(false), 3000); // hide after 3 sec

        // Clear the saved car data after successful booking
        localStorage.removeItem("selectedCar");

        if (onBookingSuccess) onBookingSuccess();
        setFormData({
          carType: "",
          carModel: "",
          pickup: "",
          drop: "",
          km: "",
          name: "",
          email: "",
          phone: "",
          startDate: "",
          endDate: "",
          duration: "",
          license: "",
          dob: "",
          adhar: "",
          location: "",
        });
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <>
        <h1 className="text-white text-center text-[1.5rem] mb-4">
          Fill the Full details.
        </h1>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full flex justify-center items-center py-4"
        >
          <div
            className="w-[600px] p-8 m-8 h-auto rounded-xl shadow-2xl border border-yellow-400 
            bg-black/40 backdrop-blur-lg overflow-y-auto"
          >
            {/* Tabs */}
            <div className="flex justify-between mb-6 text-white font-bold text-lg">
              <h3
                className={`cursor-pointer ${
                  !showSelfDriveForm ? "text-yellow-400 underline" : ""
                }`}
                onClick={() => setShowSelfDriveForm(false)}
              >
                Book Your Cab
              </h3>
              <h3
                className={`cursor-pointer ${
                  showSelfDriveForm ? "text-yellow-400 underline" : ""
                }`}
                onClick={() => setShowSelfDriveForm(true)}
              >
                Self Drive Car
              </h3>
            </div>

            {/* Conditional Forms */}
            {!showSelfDriveForm ? (
              <form
                className="grid grid-cols-2 gap-4 text-white"
                onSubmit={handleSubmit}
              >
                {/* Column 1 */}
                <div className="flex flex-col gap-3">
                  <label className="text-sm">Car Type</label>
                  <select
                    name="carType"
                    onChange={handleChange}
                    value={formData.carType}
                    className="p-2 rounded border border-gray-400 bg-black"
                    required
                  >
                    <option value="">Select Car Type</option>
                    {carTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>

                  <label className="text-sm">Pickup Location</label>
                  <input
                    type="text"
                    name="pickup"
                    onChange={handleChange}
                    value={formData.pickup}
                    placeholder="Enter Pickup Location"
                    className="p-2 rounded bg-transparent border border-gray-400"
                    required
                  />

                  {/* <label className="text-sm">Know Before You Go</label>
                  <div className="p-2 rounded bg-transparent border border-gray-400">
                    *Best Price ₹70/km
                  </div>
                  <div className="p-2 mt-3 rounded bg-transparent border border-gray-400">
                    *Best Price ₹28/km
                  </div> */}

                  {/* Dynamic Pricing Info */}
                  {selectedCarData && (
                    <div className="col-span-2 mt-4 p-3 border border-yellow-400 rounded bg-black/60 text-yellow-300">
                      <p>
                        <b>Price Per Km:</b> ₹{selectedCarData.pricePerKm}
                      </p>
                    </div>
                  )}

                  <label className="text-sm">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    onChange={handleChange}
                    value={formData.startDate}
                    className="p-2 rounded border border-gray-400 bg-gray-200 text-black"
                    required
                  />

                  <label className="text-sm">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    onChange={handleChange}
                    value={formData.endDate}
                    className="p-2 rounded border border-gray-400 bg-gray-200 text-black"
                    required
                  />
                  <label className="text-sm">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                    placeholder="Your Name"
                    className="p-2 rounded bg-transparent border border-gray-400"
                    required
                  />
                </div>

                {/* Column 2 */}
                <div className="flex flex-col gap-3">
                  <label className="text-sm">Car Model</label>
                  <select
                    name="carModel"
                    onChange={handleChange}
                    value={formData.carModel}
                    className="p-2 rounded border border-gray-400 bg-black"
                    required
                  >
                    <option value="">Select Car Model</option>
                    {carModels.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>

                  <label className="text-sm">Drop Location</label>
                  <input
                    type="text"
                    name="drop"
                    onChange={handleChange}
                    value={formData.drop}
                    placeholder="Enter Drop Location"
                    className="p-2 rounded bg-transparent border border-gray-400"
                    required
                  />

                  <label className="text-sm">Choose kilometre</label>
                  <input
                    type="number"
                    name="km"
                    onChange={handleChange}
                    value={formData.km}
                    className="p-2 rounded bg-transparent border border-gray-400"
                    required
                  />

                  <label className="text-sm">Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    placeholder="Your Email"
                    className="p-2 rounded bg-transparent border border-gray-400"
                    required
                  />

                  <label className="text-sm">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    onChange={handleChange}
                    value={formData.phone}
                    placeholder="Phone Number"
                    className="p-2 rounded bg-transparent border border-gray-400"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="col-span-2 bg-yellow-400 text-black font-bold py-2 rounded-lg mt-2 disabled:opacity-50"
                >
                  {isLoading ? "Processing..." : "BOOK NOW"}
                </button>
              </form>
            ) : (
              <form
                className="grid grid-cols-2 gap-4 text-white"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-3">
                  <label className="text-sm">Car Type</label>
                  <select
                    name="carType"
                    onChange={handleChange}
                    value={formData.carType}
                    className="p-2 rounded border border-gray-400 bg-black"
                    required
                  >
                    <option value="">Select Car Type</option>
                    {carTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>

                  <label className="text-sm">Rental Duration (hours)</label>
                  <input
                    type="number"
                    name="duration"
                    onChange={handleChange}
                    value={formData.duration}
                    placeholder="Enter Hours"
                    className="p-2 rounded bg-transparent border border-gray-400"
                    min={1}
                    required
                  />

                  <label className="text-sm">Driving License No.</label>
                  <input
                    type="text"
                    maxLength={16}
                    name="license"
                    onChange={handleChange}
                    value={formData.license}
                    placeholder="Enter License No."
                    className="p-2 rounded bg-transparent border border-gray-400"
                    required
                  />

                  <label className="text-sm">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                    placeholder="Your Name"
                    className="p-2 rounded bg-transparent border border-gray-400"
                    required
                  />

                  <label className="text-sm">Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    placeholder="Your Email"
                    className="p-2 rounded bg-transparent border border-gray-400"
                    required
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-sm">Car Model</label>
                  <select
                    name="carModel"
                    onChange={handleChange}
                    value={formData.carModel}
                    className="p-2 rounded border border-gray-400 bg-black"
                    required
                  >
                    <option value="">Select Car Model</option>
                    {carModels.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>

                  {selectedCarData && (
                    <div className="col-span-2 mt-4 p-3 border border-yellow-400 rounded bg-black/60 text-yellow-300">
                      <p>
                        <b>Price Per Hour:</b> ₹{selectedCarData.pricePerHour}
                      </p>
                    </div>
                  )}
                  <label className="text-sm">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    onChange={handleChange}
                    value={formData.dob}
                    className="p-2 rounded border border-gray-400 bg-gray-200 text-black"
                    required
                  />

                  <label className="text-sm">Aadhar Number</label>
                  <input
                    type="text"
                    name="adhar"
                    maxLength={12}
                    onChange={handleChange}
                    value={formData.adhar}
                    placeholder="Enter Aadhar No."
                    className="p-2 rounded bg-transparent border border-gray-400"
                    required
                  />

                  <label className="text-sm">Phone Number</label>
                  <input
                    type="number"
                    name="phone"
                    onChange={handleChange}
                    value={formData.phone}
                    placeholder="Your Phone no."
                    className="p-2 rounded bg-transparent border border-gray-400"
                    required
                  />

                  <label className="text-sm">Location</label>
                  <input
                    type="text"
                    name="location"
                    onChange={handleChange}
                    value={formData.location}
                    placeholder="Your Location"
                    className="p-2 rounded bg-transparent border border-gray-400"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="col-span-2 bg-yellow-400 text-black font-bold py-2 rounded-lg mt-2 disabled:opacity-50"
                >
                  {isLoading ? "Processing..." : "BOOK SELF DRIVE"}
                </button>
              </form>
            )}
            <p
              className="col-span-2 text-sm text-blue-400 underline cursor-pointer mt-2"
              onClick={() => setShowTermsModal(true)}
            >
              Read Terms & Conditions
            </p>
          </div>
        </motion.div>
        {showTermsModal && (
          <div className="fixed inset-0  flex justify-center items-center z-50">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="bg-white rounded-lg p-6 w-[500px] max-h-[80vh] overflow-y-auto relative"
            >
              <h2 className="text-xl font-bold mb-4">Terms & Conditions</h2>
              <p className="text-l mb-4">
                {/* Add your full terms & conditions here */}
                1.All toll, highway, and bridge fees incurred during the rental
                period are the responsibility of the customer.
                <br></br>
                2. The car must be returned in the same condition as rented.
                <br />
                3. Driver must follow traffic rules.
                <br />
                4. Cancellation must be done 24 hours before booking.
                <br />
                5. Customer is responsible for any damage during rental.
                <br />
                6. Payments must be completed before pickup.
                <br />
                7. Any violation of terms may result in fines or penalties.
                <br />
                8. Additional terms may apply based on rental agreement.
              </p>
              <button
                onClick={() => setShowTermsModal(false)}
                className="absolute top-2 right-2 text-red-500 font-bold"
              >
                X
              </button>
            </motion.div>
          </div>
        )}

        <AnimatePresence>
          {showSuccessPopup && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
              className="fixed top-5 right-5 bg-gradient-to-r from-green-400 to-green-600 
                 text-white px-5 py-4 rounded-2xl shadow-2xl z-50 
                 flex items-center gap-2 border-2 border-white/30"
            >
              <span className="w-5 h-5 bg-white rounded-full flex justify-center items-center text-green-600 font-bold animate-bounce">
                ✓
              </span>
              <span className="font-semibold text-sm md:text-base">
                Booking Successful!
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    </>
  );
}
