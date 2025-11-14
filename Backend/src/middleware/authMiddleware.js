import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-passwordHash");

      return next();
    } catch (error) {
      console.error("Protect error:", error);
      return res.status(401).json({ message: "Token is not valid" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "No user found" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }

  next();
};
