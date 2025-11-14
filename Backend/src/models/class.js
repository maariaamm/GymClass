import mongoose from "mongoose";


const classSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  trainer: String,
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date },
  time: String,
  maxParticipants: Number,
  imageUrl: String,
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

classSchema.methods.toJSON = function () {
  const obj = this.toObject();

  // converts to swedish time zone
  if (obj.createdAt) {
    obj.createdAt = new Date(obj.createdAt).toLocaleString("sv-SE", {
      timeZone: "Europe/Stockholm",
    });
  }

  if (obj.updatedAt) {
    obj.updatedAt = new Date(obj.updatedAt).toLocaleString("sv-SE", {
      timeZone: "Europe/Stockholm",
    });
  }

  return obj;
};

export default mongoose.model("Class", classSchema);
