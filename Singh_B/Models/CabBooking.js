// import mongoose from "mongoose";

// const cabBookingSchema = new mongoose.Schema(
//   {
//     carType: { type: String, required: true },
//     carModel: { type: String, required: true },
//     pickup: { type: String, required: true },
//     drop: { type: String, required: true },
//     km: { type: Number, required: true },
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     startDate: { type: Date, required: true },
//     endDate: { type: Date, required: true },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("CabBooking", cabBookingSchema);


import mongoose from "mongoose";

const cabBookingSchema = new mongoose.Schema(
  {
    carType: { type: String, required: true },
    carModel: { type: String, required: true },
    pickup: { type: String, required: true },
    drop: { type: String, required: true },
    km: { type: Number, required: true },
    pricePerKm: { type: Number }, // Added field
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("CabBooking", cabBookingSchema);
