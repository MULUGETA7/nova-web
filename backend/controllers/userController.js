const User = require("../models/user");
const bcrypt = require("bcrypt");

// ✅ Get All Users (Admin only)
const getAllUsers = async (req, res) => {
  try {
    console.log('Fetching all users...');
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    console.log(`Found ${users.length} users`);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Single User by ID (Admin only)
const getUserById = async (req, res) => {
  try {
    console.log('Fetching user by ID:', req.params.id);
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update User (Admin only)
const updateUser = async (req, res) => {
  try {
    console.log('Updating user:', req.params.id, 'with data:', req.body);
    const { name, email, role, bio } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (bio !== undefined) user.bio = bio;

    await user.save();

    const updatedUser = await User.findById(req.params.id).select('-password');
    console.log('User updated successfully:', updatedUser);

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete User (Admin only)
const deleteUser = async (req, res) => {
  try {
    console.log('Deleting user:', req.params.id);
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(req.params.id);
    console.log('User deleted successfully');

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Create User (Admin only)
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log('Creating new user:', { name, email, role });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Identity already exists in vault" });
    }

    // Role is already handled by the model enum and validation
    const user = new User({
      name,
      email,
      password, // Password hashing is handled by the model's pre-save hook? Wait, let me check user model.
      role
    });

    // Let me check if hashing is in the model. If not I should hash here.
    // Looking at user.js again... it doesn't have a pre-save hook!
    // I should hash the password before saving.
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const createdUser = await User.findById(user._id).select('-password');
    res.status(201).json({ message: "Identity initialized successfully", user: createdUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
};

