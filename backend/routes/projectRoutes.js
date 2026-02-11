const express = require('express');
const projectController = require('../controllers/projectController'); 
const { protect, admin } = require("../middleware/auth"); // Import auth middleware

const router = express.Router();

// Public Routes (Anyone can view projects)
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);

// Admin Routes (Only admins can manage projects)
router.post('/', protect, admin, projectController.createProject);
router.put('/:id', protect, admin, projectController.updateProject);
router.delete('/:id', protect, admin, projectController.deleteProject);

module.exports = router;
