import React, { useState, useEffect } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);
  const [cabBookings, setCabBookings] = useState([]);
  const [selfDriveBookings, setSelfDriveBookings] = useState([]);
  const [carCategories] = useState(["Mini", "Sedan", "XL"]);
  const [newCar, setNewCar] = useState({
    type: "",
    model: "",
    name: "",
    bodyType: "",
    fuel: "",
    seats: "",
    transmission: "",
    engine: "",
    mileage: "",
    price: "",
    pricePerKm: "", // New field added
    pricePerHour: "", // New field added
    fullDetails: "",
    images: [],
  });
  const [selectedFile, setSelectedFile] = useState([]);
  const [activeTab, setActiveTab] = useState("cab-bookings"); // Start on cab bookings tab
  const [editingCar, setEditingCar] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
      fetchData(storedToken);
    }
  }, []);

  const fetchData = async (authToken) => {
    try {
      const usersRes = await axios.get(
        `${API_BASE_URL}/admin/cars/users`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setUsers(usersRes.data);

      const carsRes = await axios.get(
        `${API_BASE_URL}/admin/cars`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setCars(carsRes.data);

      const cabBookingsRes = await axios.get(
        `${API_BASE_URL}/bookings/cab/all`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setCabBookings(cabBookingsRes.data);

      const selfDriveBookingsRes = await axios.get(
        `${API_BASE_URL}/bookings/self-drive/all`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setSelfDriveBookings(selfDriveBookingsRes.data);
    } catch (err) {
      console.error("Failed to fetch data", err);
      if (err.response && err.response.status === 401) {
        handleLogout();
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      if (res.data.user.role === "admin") {
        const adminToken = res.data.token;
        setToken(adminToken);
        setIsLoggedIn(true);
        localStorage.setItem("adminToken", adminToken);
        fetchData(adminToken);
      } else {
        setLoginError("You are not authorized to access this panel.");
      }
    } catch (err) {
      setLoginError("Invalid email or password.");
    }
  };

  const handleLogout = () => {
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem("adminToken");
    setUsers([]);
    setCars([]);
    setEmail("");
    setPassword("");
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${API_BASE_URL}/admin/cars/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(users.filter((user) => user._id !== userId));
        setSuccess("User deleted successfully.");
        setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
        setError("Failed to delete user.");
        setTimeout(() => setError(""), 3000);
      }
    }
  };

  const handleDeleteCabBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to delete this cab booking?")) {
      try {
        await axios.delete(`${API_BASE_URL}/bookings/cab/${bookingId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCabBookings(
          cabBookings.filter((booking) => booking._id !== bookingId)
        );
        setSuccess("Cab booking deleted successfully.");
        setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
        setError("Failed to delete cab booking.");
        setTimeout(() => setError(""), 3000);
      }
    }
  };

  const handleDeleteSelfDriveBooking = async (bookingId) => {
    if (
      window.confirm("Are you sure you want to delete this self-drive booking?")
    ) {
      try {
        await axios.delete(`${API_BASE_URL}/bookings/self-drive/${bookingId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSelfDriveBookings(
          selfDriveBookings.filter((booking) => booking._id !== bookingId)
        );
        setSuccess("Self-drive booking deleted successfully.");
        setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
        setError("Failed to delete self-drive booking.");
        setTimeout(() => setError(""), 3000);
      }
    }
  };

  const handleNewCarChange = (e) => {
    const { name, value } = e.target;
    setNewCar({ ...newCar, [name]: value });
  };

  const handleImageChange = (e) => {
    setSelectedFile(e.target.files);
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newCar.type === "") {
      setError("Please select a car category.");
      return;
    }

    const formData = new FormData();
    for (const key in newCar) {
      formData.append(key, newCar[key]);
    }
    for (let i = 0; i < selectedFile.length; i++) {
      formData.append("images", selectedFile[i]);
    }

    try {
      await axios.post(`${API_BASE_URL}/admin/cars`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      fetchData(token);
      setNewCar({
        type: "",
        model: "",
        name: "",
        bodyType: "",
        fuel: "",
        seats: "",
        transmission: "",
        engine: "",
        mileage: "",
        price: "",
        pricePerKm: "",
        pricePerHour: "",
        fullDetails: "",
      });
      setSelectedFile([]);
      setSuccess("Car added successfully!");
      setTimeout(() => setSuccess(""), 3000);
      setActiveTab("view-cars");
    } catch (err) {
      setError("Failed to add car. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleEditCarClick = (car) => {
    setEditingCar(car);
    setNewCar(car);
    setActiveTab("add-car");
  };

  const handleUpdateCar = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData();
    for (const key in newCar) {
      formData.append(key, newCar[key]);
    }
    for (let i = 0; i < selectedFile.length; i++) {
      formData.append("images", selectedFile[i]);
    }

    try {
      await axios.put(
        `${API_BASE_URL}/admin/cars/${editingCar._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchData(token);
      setEditingCar(null);
      setNewCar({
        type: "",
        model: "",
        name: "",
        bodyType: "",
        fuel: "",
        seats: "",
        transmission: "",
        engine: "",
        mileage: "",
        price: "",
        pricePerKm: "",
        pricePerHour: "",
        fullDetails: "",
      });
      setSelectedFile([]);
      setSuccess("Car updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
      setActiveTab("view-cars");
    } catch (err) {
      setError("Failed to update car. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleDeleteCar = async (carId) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await axios.delete(`${API_BASE_URL}/admin/cars/${carId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCars(cars.filter((car) => car._id !== carId));
        setSuccess("Car deleted successfully.");
        setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
        setError("Failed to delete car.");
        setTimeout(() => setError(""), 3000);
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Admin Login
          </h2>
          {loginError && (
            <p className="bg-red-100 text-red-700 p-3 rounded-md text-sm mb-4 text-center">
              {loginError}
            </p>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 flex">
      <nav className="w-64 bg-white rounded-xl shadow-lg p-6 flex flex-col items-start gap-4 mr-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Navigation</h2>
        <button
          onClick={() => setActiveTab("cab-bookings")}
          className={`w-full px-4 py-3 font-semibold rounded-lg text-left transition-colors ${
            activeTab === "cab-bookings"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Cab Bookings
        </button>
        <button
          onClick={() => setActiveTab("self-drive-bookings")}
          className={`w-full px-4 py-3 font-semibold rounded-lg text-left transition-colors ${
            activeTab === "self-drive-bookings"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Self-Drive Bookings
        </button>
        <button
          onClick={() => {
            setActiveTab("add-car");
            setEditingCar(null);
            setNewCar({
              type: "",
              model: "",
              name: "",
              bodyType: "",
              fuel: "",
              seats: "",
              transmission: "",
              engine: "",
              mileage: "",
              price: "",
              pricePerKm: "",
              pricePerHour: "",
              fullDetails: "",
            });
          }}
          className={`w-full px-4 py-3 font-semibold rounded-lg text-left transition-colors ${
            activeTab === "add-car"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Add New Car
        </button>
        <button
          onClick={() => setActiveTab("view-cars")}
          className={`w-full px-4 py-3 font-semibold rounded-lg text-left transition-colors ${
            activeTab === "view-cars"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          View All Cars
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`w-full px-4 py-3 font-semibold rounded-lg text-left transition-colors ${
            activeTab === "users"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Manage Users
        </button>
        <button
          onClick={handleLogout}
          className="mt-auto w-full bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </nav>

      <div className="flex-1">
        <header className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Admin Panel 🚗</h1>
        </header>

        <main className="min-h-[calc(100vh-250px)]">
          {error && (
            <p className="bg-red-100 text-red-700 p-3 rounded-md text-sm mb-4 text-center">
              {error}
            </p>
          )}
          {success && (
            <p className="bg-green-100 text-green-700 p-3 rounded-md text-sm mb-4 text-center">
              {success}
            </p>
          )}

          <AnimatePresence mode="wait">
            {activeTab === "cab-bookings" && (
              <motion.section
                key="cab-bookings"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-inner"
              >
                <h2 className="text-xl font-bold mb-4">Cab Bookings 🚕</h2>
                {cabBookings.length === 0 ? (
                  <p className="text-gray-500">No cab bookings found.</p>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {cabBookings.map((booking) => (
                      <li
                        key={booking._id}
                        className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
                      >
                        <div className="mb-2 sm:mb-0">
                          <p className="font-bold text-gray-800">
                            {booking.name} ({booking.email})
                          </p>
                          <p className="text-sm text-gray-600">
                            {booking.carType} - {booking.carModel}
                          </p>
                          <p className="text-xs text-gray-500">
                            <strong>Phone:</strong> {booking.phone}
                          </p>
                          <p className="text-xs text-gray-500">
                            <strong>Trip:</strong> {booking.pickup} to{" "}
                            {booking.drop} ({booking.km} km)
                          </p>
                          <p className="text-xs text-gray-500">
                            <strong>Dates:</strong>{" "}
                            {new Date(booking.startDate).toLocaleDateString()}{" "}
                            to {new Date(booking.endDate).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteCabBooking(booking._id)}
                          className="bg-red-500 text-white font-bold py-1 px-3 rounded-md hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.section>
            )}

            {activeTab === "self-drive-bookings" && (
              <motion.section
                key="self-drive-bookings"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-inner"
              >
                <h2 className="text-xl font-bold mb-4">
                  Self-Drive Bookings 🚙
                </h2>
                {selfDriveBookings.length === 0 ? (
                  <p className="text-gray-500">No self-drive bookings found.</p>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {selfDriveBookings.map((booking) => (
                      <li
                        key={booking._id}
                        className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
                      >
                        <div className="mb-2 sm:mb-0">
                          <p className="font-bold text-gray-800">
                            {booking.name} ({booking.email})
                          </p>
                          <p className="text-sm text-gray-600">
                            {booking.carType} - {booking.carModel}
                          </p>
                          <p className="text-xs text-gray-500">
                            <strong>Phone:</strong> {booking.phone}
                          </p>
                          <p className="text-xs text-gray-500">
                            <strong>Duration:</strong> {booking.duration} hours
                          </p>
                          <p className="text-xs text-gray-500">
                            <strong>Location:</strong> {booking.location}
                          </p>
                          <p className="text-xs text-gray-500">
                            <strong>License:</strong> {booking.license}
                          </p>
                          <p className="text-xs text-gray-500">
                            <strong>Aadhar:</strong> {booking.adhar}
                          </p>
                          <p className="text-xs text-gray-500">
                            <strong>DOB:</strong>{" "}
                            {new Date(booking.dob).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            handleDeleteSelfDriveBooking(booking._id)
                          }
                          className="bg-red-500 text-white font-bold py-1 px-3 rounded-md hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.section>
            )}

            {activeTab === "add-car" && (
              <motion.section
                key="add-car"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-inner"
              >
                <h2 className="text-xl font-bold mb-4">
                  {editingCar ? "Edit Car" : "Add New Car"} ✍️
                </h2>
                <form
                  onSubmit={editingCar ? handleUpdateCar : handleAddCar}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">
                        Car Category
                      </label>
                      <select
                        name="type"
                        value={newCar.type}
                        onChange={handleNewCarChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Category</option>
                        {carCategories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">
                        Model
                      </label>
                      <input
                        type="text"
                        name="model"
                        value={newCar.model}
                        onChange={handleNewCarChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={newCar.name}
                        onChange={handleNewCarChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">
                        Body Type
                      </label>
                      <input
                        type="text"
                        name="bodyType"
                        value={newCar.bodyType}
                        onChange={handleNewCarChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">
                        Fuel
                      </label>
                      <input
                        type="text"
                        name="fuel"
                        value={newCar.fuel}
                        onChange={handleNewCarChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">
                        Seats
                      </label>
                      <input
                        type="text"
                        name="seats"
                        value={newCar.seats}
                        onChange={handleNewCarChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">
                        Transmission
                      </label>
                      <input
                        type="text"
                        name="transmission"
                        value={newCar.transmission}
                        onChange={handleNewCarChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">
                        Engine
                      </label>
                      <input
                        type="text"
                        name="engine"
                        value={newCar.engine}
                        onChange={handleNewCarChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">
                        Mileage
                      </label>
                      <input
                        type="text"
                        name="mileage"
                        value={newCar.mileage}
                        onChange={handleNewCarChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">
                        Price
                      </label>
                      <input
                        type="text"
                        name="price"
                        value={newCar.price}
                        onChange={handleNewCarChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">
                        Price per Km
                      </label>
                      <input
                        type="number"
                        name="pricePerKm"
                        value={newCar.pricePerKm}
                        onChange={handleNewCarChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-1">
                        Price per Hour
                      </label>
                      <input
                        type="number"
                        name="pricePerHour"
                        value={newCar.pricePerHour}
                        onChange={handleNewCarChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">
                      Full Details
                    </label>
                    <textarea
                      name="fullDetails"
                      value={newCar.fullDetails}
                      onChange={handleNewCarChange}
                      rows="4"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">
                      Upload Images
                    </label>
                    <input
                      type="file"
                      multiple
                      onChange={handleImageChange}
                      className="w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {editingCar ? "Update Car" : "Add Car"}
                  </button>
                </form>
              </motion.section>
            )}

            {activeTab === "view-cars" && (
              <motion.section
                key="view-cars"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-inner"
              >
                <h2 className="text-xl font-bold mb-4">All Cars 🚘</h2>
                {cars.length === 0 ? (
                  <p className="text-gray-500">No cars found.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cars.map((car) => (
                      <div
                        key={car._id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                      >
                        {car.images && car.images.length > 0 && (
                          <img
                            src={`http://localhost:5000/uploads/cars/${car.images[0]}`}
                            alt={car.name}
                            className="w-full h-48 object-cover"
                          />
                        )}
                        <div className="p-4">
                          <h4 className="text-lg font-bold text-gray-900 truncate">
                            {car.name}{" "}
                            <span className="text-sm text-gray-500">
                              ({car.model})
                            </span>
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            <strong>Type:</strong> {car.type}
                          </p>
                          <p className="text-lg font-semibold text-blue-600 mt-2">
                            ${car.price}
                          </p>
                          <div className="flex justify-between mt-4">
                            <button
                              onClick={() => handleEditCarClick(car)}
                              className="bg-green-500 text-white font-bold py-1 px-3 rounded-md hover:bg-green-600 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteCar(car._id)}
                              className="bg-red-500 text-white font-bold py-1 px-3 rounded-md hover:bg-red-600 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.section>
            )}

            {activeTab === "users" && (
              <motion.section
                key="users"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-inner"
              >
                <h2 className="text-xl font-bold mb-4">Registered Users 👥</h2>
                {users.length === 0 ? (
                  <p className="text-gray-500">No users found.</p>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <li
                        key={user._id}
                        className="flex justify-between items-center py-3"
                      >
                        <span className="text-gray-800 font-medium">
                          {user.name}{" "}
                          <span className="text-sm text-gray-500">
                            ({user.email})
                          </span>
                        </span>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="bg-red-500 text-white font-bold py-1 px-3 rounded-md hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.section>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
