import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPanel() {
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("admin")) || null
  );
  const [token, setToken] = useState(
    localStorage.getItem("adminToken") || null
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selfDriveBookings, setSelfDriveBookings] = useState([]);
  const [activeSection, setActiveSection] = useState("users");
  const [editingCarId, setEditingCarId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [carForm, setCarForm] = useState({
    type: "",
    model: "",
    name: "",
    bodyType: "",
    fuel: "",
    seats: "",
    transmission: "",
    engine: "",
    mileage: "",
    pricePerKm: "",
    pricePerHour: "",
    pricePerDay: "",
    fullDetails: "",
    available: true,
    images: [],
  });

  // Configure axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  // Fetch all data
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/admin/users");
      // Validate that the data is an array before setting the state
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        setUsers([]);
        console.error("API response for users is not an array:", data);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
      alert("Failed to fetch users");
      setUsers([]);
    }
  };

  const fetchCars = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/admin/cars");
      if (Array.isArray(data)) {
        setCars(data);
      } else {
        setCars([]);
        console.error("API response for cars is not an array:", data);
      }
    } catch (err) {
      console.error("Failed to fetch cars:", err);
      alert("Failed to fetch cars");
      setCars([]);
    }
  };

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/admin/bookings"
      );
      if (Array.isArray(data)) {
        setBookings(data);
      } else {
        setBookings([]);
        console.error("API response for bookings is not an array:", data);
      }
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      alert("Failed to fetch bookings");
      setBookings([]);
    }
  };

  const fetchSelfDriveBookings = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/admin/self-drive-bookings"
      );
      if (Array.isArray(data)) {
        setSelfDriveBookings(data);
      } else {
        setSelfDriveBookings([]);
        console.error(
          "API response for self-drive bookings is not an array:",
          data
        );
      }
    } catch (err) {
      console.error("Failed to fetch self-drive bookings:", err);
      alert("Failed to fetch self-drive bookings");
      setSelfDriveBookings([]);
    }
  };

  useEffect(() => {
    if (admin && token) {
      fetchUsers();
      fetchCars();
      fetchBookings();
      fetchSelfDriveBookings();
    }
  }, [admin, token]);

  // Admin login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/admin/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("admin", JSON.stringify(data.admin));
      localStorage.setItem("adminToken", data.token);
      setAdmin(data.admin);
      setToken(data.token);
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    setAdmin(null);
    setToken(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
      setUsers(users.filter((u) => u._id !== id));
      alert("User deleted successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to delete user");
    }
  };

  // Add or edit car
  const handleAddOrEditCar = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(carForm).forEach((key) => {
        if (key !== "images") {
          formData.append(key, carForm[key]);
        }
      });

      if (carForm.images.length > 0) {
        for (let i = 0; i < carForm.images.length; i++) {
          formData.append("images", carForm.images[i]);
        }
      }

      if (editingCarId) {
        await axios.put(
          `http://localhost:5000/api/admin/cars/${editingCarId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setEditingCarId(null);
        alert("Car updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/admin/cars/add", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Car added successfully!");
      }

      setCarForm({
        type: "",
        model: "",
        name: "",
        bodyType: "",
        fuel: "",
        seats: "",
        transmission: "",
        engine: "",
        mileage: "",
        pricePerKm: "",
        pricePerHour: "",
        pricePerDay: "",
        fullDetails: "",
        available: true,
        images: [],
      });
      fetchCars();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to save car");
    } finally {
      setLoading(false);
    }
  };

  // Delete car
  const handleDeleteCar = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/cars/${id}`);
      alert("Car deleted successfully");
      fetchCars();
    } catch (err) {
      console.log(err);
      alert("Failed to delete car");
    }
  };

  // Edit car
  const handleEditCar = (car) => {
    setEditingCarId(car._id);
    setCarForm({
      type: car.type,
      model: car.model,
      name: car.name,
      bodyType: car.bodyType || "",
      fuel: car.fuel || "",
      seats: car.seats || "",
      transmission: car.transmission || "",
      engine: car.engine || "",
      mileage: car.mileage || "",
      pricePerKm: car.pricePerKm || "",
      pricePerHour: car.pricePerHour || "",
      pricePerDay: car.pricePerDay || "",
      fullDetails: car.fullDetails || "",
      available: car.available,
      images: [],
    });
    setActiveSection("addcar");
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCarForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    setCarForm((prev) => ({
      ...prev,
      images: Array.from(e.target.files),
    }));
  };

  // Render Admin Panel
  if (admin) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -250 }}
          animate={{ x: 0 }}
          className="w-64 bg-gray-900 text-white p-6 flex flex-col gap-4"
        >
          <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
          <button
            className={`p-2 rounded hover:bg-gray-700 text-left ${
              activeSection === "users" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveSection("users")}
          >
            Users
          </button>
          <button
            className={`p-2 rounded hover:bg-gray-700 text-left ${
              activeSection === "bookings" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveSection("bookings")}
          >
            Cab Bookings
          </button>
          <button
            className={`p-2 rounded hover:bg-gray-700 text-left ${
              activeSection === "selfDriveBookings" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveSection("selfDriveBookings")}
          >
            Self-Drive Bookings
          </button>
          <button
            className={`p-2 rounded hover:bg-gray-700 text-left ${
              activeSection === "addcar" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveSection("addcar")}
          >
            {editingCarId ? "Edit Car" : "Add Car"}
          </button>
          <button
            className={`p-2 rounded hover:bg-gray-700 text-left ${
              activeSection === "cars" ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveSection("cars")}
          >
            Manage Cars
          </button>
          <button
            onClick={handleLogout}
            className="mt-auto bg-red-500 px-4 py-2 rounded font-bold"
          >
            Logout
          </button>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          {/* USERS */}
          {activeSection === "users" && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Registered Users</h2>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded font-bold text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {users.length === 0 && (
                  <p className="p-4 text-gray-600">No users found.</p>
                )}
              </div>
            </>
          )}

          {/* CAB BOOKINGS */}
          {activeSection === "bookings" && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Cab Bookings</h2>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Car Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pickup Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Drop Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr key={booking._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {booking.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {booking.carType} - {booking.carModel}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {booking.pickup}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {booking.drop}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(booking.startDate).toLocaleDateString()} -{" "}
                          {new Date(booking.endDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {bookings.length === 0 && (
                  <p className="p-4 text-gray-600">No bookings found.</p>
                )}
              </div>
            </>
          )}

          {/* SELF-DRIVE BOOKINGS */}
          {activeSection === "selfDriveBookings" && (
            <>
              <h2 className="text-2xl font-semibold mb-4">
                Self-Drive Bookings
              </h2>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Car Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration (hours)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        License No.
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Booking Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selfDriveBookings.map((booking) => (
                      <tr key={booking._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {booking.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {booking.carType} - {booking.carModel}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {booking.duration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {booking.license}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {selfDriveBookings.length === 0 && (
                  <p className="p-4 text-gray-600">
                    No self-drive bookings found.
                  </p>
                )}
              </div>
            </>
          )}

          {/* ADD/EDIT CAR */}
          {activeSection === "addcar" && (
            <>
              <h2 className="text-2xl font-semibold mb-4">
                {editingCarId ? "Edit Car" : "Add Car"}
              </h2>
              <form
                onSubmit={handleAddOrEditCar}
                className="bg-white p-6 rounded-lg shadow"
                encType="multipart/form-data"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Car Type
                    </label>
                    <select
                      name="type"
                      value={carForm.type}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Mini">Mini</option>
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Car Model
                    </label>
                    <input
                      type="text"
                      name="model"
                      value={carForm.model}
                      onChange={handleInputChange}
                      placeholder="e.g. Alto, Ertiga, etc."
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Car Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={carForm.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Alto 2024, Ertiga 2024, etc."
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Body Type
                    </label>
                    <input
                      type="text"
                      name="bodyType"
                      value={carForm.bodyType}
                      onChange={handleInputChange}
                      placeholder="e.g. Hatchback, Sedan, SUV"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fuel Type
                    </label>
                    <input
                      type="text"
                      name="fuel"
                      value={carForm.fuel}
                      onChange={handleInputChange}
                      placeholder="e.g. Petrol, Diesel"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Seats
                    </label>
                    <input
                      type="number"
                      name="seats"
                      value={carForm.seats}
                      onChange={handleInputChange}
                      placeholder="Number of seats"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Transmission
                    </label>
                    <input
                      type="text"
                      name="transmission"
                      value={carForm.transmission}
                      onChange={handleInputChange}
                      placeholder="e.g. Manual, Automatic"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Engine
                    </label>
                    <input
                      type="text"
                      name="engine"
                      value={carForm.engine}
                      onChange={handleInputChange}
                      placeholder="e.g. 1.2L, 1.5L"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mileage
                    </label>
                    <input
                      type="text"
                      name="mileage"
                      value={carForm.mileage}
                      onChange={handleInputChange}
                      placeholder="e.g. 18.97 km/l"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price per Km (₹)
                    </label>
                    <input
                      type="number"
                      name="pricePerKm"
                      value={carForm.pricePerKm}
                      onChange={handleInputChange}
                      placeholder="e.g. 28"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price per Hour (₹)
                    </label>
                    <input
                      type="number"
                      name="pricePerHour"
                      value={carForm.pricePerHour}
                      onChange={handleInputChange}
                      placeholder="e.g. 70"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price per Day (₹)
                    </label>
                    <input
                      type="number"
                      name="pricePerDay"
                      value={carForm.pricePerDay}
                      onChange={handleInputChange}
                      placeholder="e.g. 1200"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Details
                    </label>
                    <textarea
                      name="fullDetails"
                      value={carForm.fullDetails}
                      onChange={handleInputChange}
                      placeholder="Detailed description of the car"
                      className="w-full p-2 border border-gray-300 rounded"
                      rows="3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Images
                    </label>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      accept="image/*"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Select multiple images (JPEG, PNG, GIF)
                    </p>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="available"
                      checked={carForm.available}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      Available for booking
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-500 text-white px-4 py-2 rounded font-bold disabled:opacity-50"
                >
                  {loading
                    ? "Saving..."
                    : editingCarId
                    ? "Update Car"
                    : "Add Car"}
                </button>

                {editingCarId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingCarId(null);
                      setCarForm({
                        type: "",
                        model: "",
                        name: "",
                        bodyType: "",
                        fuel: "",
                        seats: "",
                        transmission: "",
                        engine: "",
                        mileage: "",
                        pricePerKm: "",
                        pricePerHour: "",
                        pricePerDay: "",
                        fullDetails: "",
                        available: true,
                        images: [],
                      });
                    }}
                    className="ml-4 bg-gray-500 text-white px-4 py-2 rounded font-bold"
                  >
                    Cancel Edit
                  </button>
                )}
              </form>
            </>
          )}

          {/* CAR LIST */}
          {activeSection === "cars" && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Car List</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                  <div
                    key={car._id}
                    className="bg-white rounded-lg shadow overflow-hidden"
                  >
                    {car.images && car.images.length > 0 && (
                      <img
                        src={`/uploads/${car.images[0]}`}
                        alt={car.name}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-bold">{car.name}</h3>
                      <p className="text-gray-600">
                        {car.type} • {car.model}
                      </p>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <p className="text-sm">
                          <span className="font-semibold">Fuel:</span>{" "}
                          {car.fuel || "N/A"}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Seats:</span>{" "}
                          {car.seats || "N/A"}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Transmission:</span>{" "}
                          {car.transmission || "N/A"}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Mileage:</span>{" "}
                          {car.mileage || "N/A"}
                        </p>
                      </div>
                      <div className="mt-4 flex justify-between">
                        <button
                          onClick={() => handleEditCar(car)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCar(car._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {cars.length === 0 && (
                <p className="text-gray-600">No cars found.</p>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  // LOGIN FORM
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded font-bold disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Default credentials: admin@admin.com / admin123
        </p>
      </div>
    </div>
  );
}
