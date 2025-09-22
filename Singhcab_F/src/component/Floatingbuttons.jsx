import React from "react";
import { MessageCircle, Phone } from "lucide-react";

export default function  FloatingButtons() {
  const phoneNumber = "+919876543210"; // Replace with your actual number
  const whatsappMessage =
    "Hi, I would like to get a quote for vehicle insurance.";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
      {/* Call Button */}
      <a
        href={`tel:${phoneNumber}`}
        className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
        aria-label="Call us"
      >
        <Phone className="h-6 w-6 group-hover:animate-pulse" />
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${phoneNumber.replace(
          "+",
          ""
        )}?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6 group-hover:animate-pulse" />
      </a>

      {/* Tooltip for mobile users */}
      <div className="hidden sm:block absolute right-16 bottom-2 text-sm text-gray-600 whitespace-nowrap">
        <div className="bg-white px-3 py-1 rounded-lg shadow-md border mb-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
          Call Now
        </div>
        <div className="bg-white px-3 py-1 rounded-lg shadow-md border opacity-0 hover:opacity-100 transition-opacity duration-300">
          Chat on WhatsApp
        </div>
      </div>
    </div>
  );
};

