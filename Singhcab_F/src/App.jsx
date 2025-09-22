import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Contact from "./pages/Contact";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Vehicles from "./pages/Vehicles";

import About from "./pages/About";
import AdminPanel from "./component/admin/adminpanel";
import BookingForm from "./component/Booking";
import FloatingButtons from "./component/Floatingbuttons";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicles" element={<Vehicles />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin route */}
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/bookingform" element={<BookingForm />} />
      </Routes>
      <FloatingButtons />
      <Footer />
    </>
  );
}

export default App;
