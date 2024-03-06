const jwt = require("jsonwebtoken");
const User = require("../model/user-model");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      // console.log(token);
      return res
        .status(401)
        .json({ message: "Unauthorized HTTP, Token not provided" });
    }

    const jwtToken = token.replace("Bearer", "").trim();
    // console.log("JWT Token:", jwtToken);

    // Verify the token
    const isVerified = jwt.verify(jwtToken, process.env.JWT_CODE_KEY);

    // getting the complete user details & also we don't want password to be sent
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    // console.log("User Data:", userData);

    // Attach user information to the request object
    req.token = token;
    req.user = userData;
    req.userID = userData._id;

    // Move on to the next middleware or route handler
    next();
  } catch (error) {
    // console.error("Error in authentication middleware:", error);
    return res.status(401).json({ message: "Unauthorized, Invalid token." });
  }
};

module.exports = authMiddleware;
