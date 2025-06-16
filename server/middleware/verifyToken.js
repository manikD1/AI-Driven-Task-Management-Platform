import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  // 1. Get the authorization header
  const authHeader = req.headers.authorization;

  // 2. Check if token exists and has correct format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  // 3. Extract the token (remove "Bearer " prefix)
  const token = authHeader.split(" ")[1];

  // 4. Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;  // Store user ID for later use
    next(); // Continue to the next middleware/route
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default verifyToken;

