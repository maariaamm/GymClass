import Booking from "../models/booking.js";
import Class from "../models/class.js";


export const createBooking = async (req, res) => {
  try {
    const { classId } = req.body;

    if (!classId) return res.status(400).json({ message: "classId is required" });

    const exists = await Booking.findOne({ userId: req.user._id, classId });
    if (exists) return res.status(400).json({ message: "Already booked" });


    const gymClass = await Class.findById(classId);
    if (!gymClass) return res.status(404).json({ message: "Class not found" });

    const bookingCount = await Booking.countDocuments({ classId });
    if (gymClass.maxParticipants && bookingCount >= gymClass.maxParticipants) {
      return res.status(400).json({ message: "Class is full" });
    }

    const booking = await Booking.create({ userId: req.user._id, classId });
    res.status(201).json(booking);
  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id }).populate("classId");
    res.json(bookings);
  } catch (error) {
    console.error("Get my bookings error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });


    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await booking.remove();
    res.json({ message: "Booking cancelled" });
  } catch (error) {
    console.error("Delete booking error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
