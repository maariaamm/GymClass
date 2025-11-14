import Class from "../models/class.js";

export const getClasses = async (req, res) => {
  const classes = await Class.find().populate("trainerId", "name");
  res.json(classes);
};

export const createClass = async (req, res) => {
  const gymClass = await Class.create(req.body);
  res.json(gymClass);
};
