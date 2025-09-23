import { motion } from "framer-motion";
import { MapPin, Car, DollarSign } from "lucide-react"; // SVG Icons

const features = [
  {
    title: "Availability",
    desc: "Find available cars at any location with our extensive network of rental stations.",
    icon: <MapPin size={40} className="text-yellow-400" />,
  },
  {
    title: "Comfort",
    desc: "Find available cars at any location with our extensive network of rental stations.",
    icon: <Car size={40} className="text-yellow-400" />,
  },
  {
    title: "Savings",
    desc: "Find available cars at any location with our extensive network of rental stations.",
    icon: <DollarSign size={40} className="text-yellow-400" />,
  },
];

export default function Features() {
  return (
    <section className="py-16 px-6 md:px-24 flex flex-col md:flex-row justify-around text-center bg-black gap-12 md:gap-0">
      {features.map((f, i) => (
        <motion.div
          key={i}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.3 }}
          className="w-full md:w-1/4 flex flex-col items-center"
        >
          {/* Icon with black circle */}
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#111] mb-4 shadow-md shadow-yellow-500/30">
            {f.icon}
          </div>

          {/* Title */}
          <h3 className="text-yellow-400 text-2xl font-semibold">{f.title}</h3>

          {/* Description */}
          <p className="mt-2 text-gray-300 text-base">{f.desc}</p>
        </motion.div>
      ))}
    </section>
  );
}
