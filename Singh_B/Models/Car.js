// import mongoose from "mongoose";

// const carSchema = new mongoose.Schema(
//   {
//     type: {
//       type: String,
//       enum: ["Mini", "Sedan", "SUV"],
//       required: true,
//     },
//     model: {
//       type: String,
//       required: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     bodyType: String,
//     fuel: String,
//     seats: String,
//     transmission: String,
//     engine: String,
//     mileage: String,
//     price: String,
//     images: [String],
//     fullDetails: String,
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Car", carSchema);


import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Mini", "Sedan", "XL"],
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    bodyType: String,
    fuel: String,
    seats: String,
    transmission: String,
    engine: String,
    mileage: String,
    price: String,
    pricePerKm: {
      type: Number,
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    images: [String],
    fullDetails: String,
  },
  { timestamps: true }
);

export default mongoose.model("Car", carSchema);
