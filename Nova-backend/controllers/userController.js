const User = require("../models/user");

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

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};

