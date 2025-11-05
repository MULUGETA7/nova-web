const User = require("../models/user");
const bcrypt = require("bcrypt");

// ✅ Get User Profile
exports.getProfile = async (req, res) => {
  try {
    console.log('Fetching profile for user ID:', req.user.id);
    const user = await User.findById(req.user.id).select("-password");
    
    if (!user) {
      console.error('User not found with ID:', req.user.id);
      return res.status(404).json({ message: "User not found" });
    }

    console.log('Profile fetched successfully:', user.email);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update User Profile (Email, Name, Bio, Profile Picture)
exports.updateProfile = async (req, res) => {
  try {
    console.log('Updating profile for user ID:', req.user.id, 'with data:', req.body);
    const { name, email, bio, profilePicture } = req.body;

    // ✅ Validate required fields
    if (!name && !email && !bio && !profilePicture) {
      return res.status(400).json({ message: "At least one field is required to update" });
    }

    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (bio) updates.bio = bio;
    if (profilePicture) updates.profilePicture = profilePicture;

    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select("-password");
    if (!user) {
      console.error('User not found for update with ID:', req.user.id);
      return res.status(404).json({ message: "User not found" });
    }

    console.log('Profile updated successfully');
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Change Password (with currentPassword, newPassword, and confirmPassword validation)
exports.changePassword = async (req, res) => {
  try {
    console.log('Changing password for user ID:', req.user.id);
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // ✅ Validate required fields
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Check if newPassword matches confirmPassword
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "New password and confirm password do not match" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      console.error('User not found for password change with ID:', req.user.id);
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Compare current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      console.log('Current password incorrect for user:', user.email);
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // ✅ Check if new password is the same as the current password
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({ message: "New password cannot be the same as the current password" });
    }

    // ✅ Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // ✅ Update password
    await User.findByIdAndUpdate(req.user.id, { password: hashedPassword });

    console.log('Password updated successfully for user:', user.email);
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ error: error.message });
  }
};