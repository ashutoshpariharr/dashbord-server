const Contact = require("../model/contact-model");
const User = require("../model/user-model");

// Get all user data
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    // const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).json({
        message: "They are not a any user inside the registration and login",
      });
    }

    return res.status(200).json(users);
  } catch (error) {
    res.status(501).json({ message: "Get user does not working" });
    next(error);
  }
};

//* This is for update user data
const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    // Validate that updateData is defined and is an object
    if (!updateData || typeof updateData !== "object") {
      return res.status(400).json({ message: "Invalid update data" });
    }

    const result = await User.updateOne({ _id: id }, { $set: updateData });

    res.status(200).json({ message: "User data updated successfully" });
  } catch (error) {
    console.log(`Error updating user data: ${error}`);
    res.status(500).json({ message: "Error updating user data" });
  }
};

//? Edit user data by information

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id, { password: 0 });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(`Error fetching user by ID: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete User by admin in the database
const DeleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await User.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

// Delete contact data from admin panel
const deleteContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Contact.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

// Get all the contact Admin Data

const getAllContacts = async (req, res) => {
  try {
    const users = await Contact.find();

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ message: "There are no contact inside the admin panel" });
    }

    return res.status(200).json(users);
  } catch (error) {
    res.status(501).json({ message: "Get user does not working" });
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getAllContacts,
  DeleteUser,
  deleteContact,
  getUserById,
  updateUserById,
};
