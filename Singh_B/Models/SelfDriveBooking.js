// import mongoose from "mongoose";

// const selfDriveBookingSchema = new mongoose.Schema(
//   {
//     carType: { type: String, required: true },
//     carModel: { type: String, required: true },
//     duration: { type: Number, required: true },
//     license: { type: String, required: true },
//     dob: { type: Date, required: true },
//     adhar: { type: String, required: true },
//     location: { type: String, required: true },
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("SelfDriveBooking", selfDriveBookingSchema);


import mongoose from "mongoose";

const selfDriveBookingSchema = new mongoose.Schema(
  {
    carType: { type: String, required: true },
    carModel: { type: String, required: true },
    duration: { type: Number, required: true },
    license: { type: String, required: true },
    dob: { type: Date, required: true },
    adhar: { type: String, required: true },
    location: { type: String, required: true },
    pricePerHour: { type: Number },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("SelfDriveBooking", selfDriveBookingSchema);
