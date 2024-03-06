const User = require("../model/user-model");
const bcrypt = require("bcryptjs");

// This is for home route

const home = async (req, res) => {
  try {
    res.status(200).send("This is a home page!! from controller");
  } catch (error) {
    console.log(error);
  }
};

// This is for register router

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userHave = await User.findOne({ email });

    if (userHave) {
      return res.status(400).json({ message: "Email already exist" });
    }

    const userCreate = await User.create({ username, email, phone, password });

    res.status(200).json({
      msg: "Ragistration successfully",

      // This is for generate web Token to identify every uniq user.

      token: await userCreate.generateToken(),
      userId: userCreate._id.toString(),
    });
  } catch (error) {
    res.status(400).json({ message: "Page not found" });
  }
};

// This is for login router.

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    console.log(userExist);

    if (!userExist) {
      return res.status(400).json({ message: "You are not signup" });
    }

    const user = await bcrypt.compare(password, userExist.password);

    if (user) {
      res.status(200).json({
        message: "Login Connect Successfully",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: " invalid email or password " });
    }
  } catch (error) {
    // res.status(404).json({ msg: "internal server error" });
    next(error);
  }
};

const userInfo = async (req, res) => {
  try {
    // const userData = await User.find({});
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ msg: userData });
  } catch (error) {
    console.log(` error from user route ${error}`);
  }
};

module.exports = { home, register, login, userInfo };
