import Class from "../models/class.js";

export const bookClass = async (req, res) => {
  const { classId } = req.body;

  const gymClass = await Class.findById(classId);

  if (!gymClass) return res.status(404).json({ message: "Class not found" });

  if (gymClass.participants.includes(req.user._id))
    return res.status(400).json({ message: "Already booked" });

  if (gymClass.participants.length >= gymClass.maxParticipants)
    return res.status(400).json({ message: "Class full" });

  gymClass.participants.push(req.user._id);
  await gymClass.save();

  res.json({ message: "Booked successfully" });
};
