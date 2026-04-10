const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");

  console.log("AUTH HEADER:", authHeader); // 🔥 ADD THIS

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  const token = authHeader.split(" ")[1];

  console.log("TOKEN:", token);
  console.log("SECRET:", process.env.JWT_SECRET);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED USER:", decoded); // 🔥 VERY IMPORTANT

    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message); // 🔥 DEBUG
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;