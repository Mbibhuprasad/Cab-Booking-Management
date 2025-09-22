import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const API_BASE_URL = "http://localhost:5000/api";

export default function BookingForm({ selectedCar, onBookingSuccess }) {
  const [showSelfDriveForm, setShowSelfDriveForm] = useState(false);
  const [cars, setCars] = useState([]); // store full cars data
  const [carTypes, setCarTypes] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [selectedCarData, setSelectedCarData] = useState(null); // to display price dynamically
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

  // Fetch all cars once
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/cars`);
        const data = await response.json();
        setCars(data);

        // Extract unique car types
        const types = [...new Set(data.map((car) => car.type))];
        setCarTypes(types);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  // Update models when type changes
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

  // Update selected car data when model changes
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

  // If a car is pre-selected
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
      // Corrected endpoints to match the new backend routes
      const endpoint = showSelfDriveForm
        ? `${API_BASE_URL}/bookings/self-drive`
        : `${API_BASE_URL}/bookings/cab`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const emailResponse = await fetch(`${API_BASE_URL}/email/send`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: `New booking for ${JSON.stringify(formData)} `,
          }),
        });
     
        alert("Booking successful!");
        if (onBookingSuccess) onBookingSuccess();
        // Reset form
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
                      <b>Price Per Hour:</b> ₹{selectedCarData.pricePerHour}
                    </p>
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
                  className="p-2 rounded bg-transparent border border-gray-400"
                  required
                />

                <label className="text-sm">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  onChange={handleChange}
                  value={formData.endDate}
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
                    <p>
                      <b>Price Per Km:</b> ₹{selectedCarData.pricePerKm}
                    </p>
                  </div>
                )}
                <label className="text-sm">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  onChange={handleChange}
                  value={formData.dob}
                  className="p-2 rounded border border-gray-400 bg-white text-black"
                  required
                />

                <label className="text-sm">Aadhar Number</label>
                <input
                  type="text"
                  name="adhar"
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
        </div>
      </motion.div>
    </>
  );
}
