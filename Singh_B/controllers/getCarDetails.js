import Car from "../Models/Car.js";

export const getCarDetails = async (req, res) => {
    try {
        const cars = await Car.find();
        console.log(cars);
        res.status(200).json(cars);
    } catch (error) {
        console.error("Error fetching car details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
