import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  trainer: String,
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: String,
  time: String,
  maxParticipants: Number,
  imageUrl: String,
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

export default mongoose.model("Class", classSchema);
