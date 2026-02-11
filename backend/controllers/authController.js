const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { registerValidation, loginValidation } = require("../validations/authValidation");

// Register New User
exports.signup = async (req, res) => {
  try {
    console.log("Received signup request:", req.body); // Log incoming request data

    // Validate request body
    const { error } = registerValidation.validate(req.body, { abortEarly: false });
    if (error) {
      console.log("Validation Errors:", error.details);
      return res.status(400).json({ errors: error.details.map((err) => err.message) });
    }

    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      console.log("Signup attempt with existing email:", email);
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = new User({ name, email, password, role });
    await user.save();

    console.log("User registered successfully:", email);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    console.log("Received login request:", req.body); // Log incoming request data

    const { error } = loginValidation.validate(req.body, { abortEarly: false });
    if (error) {
      console.log("Validation Errors:", error.details);
      return res.status(400).json({ errors: error.details.map((err) => err.message) });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    console.log("User found:", user ? user.email : "No user found"); // Log user existence
    if (!user) return res.status(400).json({message: "Invalid Credentials"});
    
    const matchedPassword = await bcrypt.compare(password, user.password);
    
    console.info(matchedPassword, password, user.password, user)
    if (!matchedPassword) {
      console.log("Invalid email or password attempt for:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log("Login successful. Token generated."); // Log success

    // Return token and user data (without password)
    res.status(200).json({ 
      message: "Login successful", 
      token,
      role: user.role, // Add role at top level for frontend
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Get User Profile
exports.getProfile = async (req, res) => {
  try {
    console.log("Fetching profile for user ID:", req.user.id);

    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      console.log("User profile not found");
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Profile Fetch Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Update User Profile
exports.updateProfile = async (req, res) => {
  try {
    console.log("Updating profile for user ID:", req.user.id, "with data:", req.body);

    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');

    if (!user) {
      console.log("User profile not found for update");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Profile updated successfully for user:", user.email);
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Profile Update Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Delete User Account
exports.deleteAccount = async (req, res) => {
  try {
    console.log("Deleting account for user ID:", req.user.id);

    const user = await User.findByIdAndDelete(req.user.id);
    
    if (!user) {
      console.log("User account not found for deletion");
      return res.status(404).json({ message: "User not found" });
    }

console.log("Account deleted successfully for user:", user.email);
    res.status(200).json({ message: "Account deleted successfully!" });
  } catch (error) {
    console.error("Account Deletion Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};