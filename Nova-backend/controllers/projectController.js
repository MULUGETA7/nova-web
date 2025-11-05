const Project = require('../models/project');
const projectValidationSchema = require('../validations/projectValidation'); // Import the validation schema

// Create a new project
exports.createProject = async (req, res) => {
    try {
        // Validate the request body with JOI
        await projectValidationSchema.validateAsync(req.body);

        // If validation passes, proceed to create the project
        const { title, description, tags, files, status } = req.body;
        const project = new Project({ title, description, tags, files, status });
        await project.save();
        res.status(201).json({ message: "Project created successfully!", project });
    } catch (err) {
        if (err.isJoi) {
            // JOI validation error
            return res.status(400).json({ message: 'Validation failed', details: err.details });
        }
        // Other errors (e.g., database issues)
        res.status(500).json({ message: 'Error creating project', error: err.message });
    }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching projects', error: err.message });
    }
};

// Get a single project by ID
exports.getProjectById = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching project', error: err.message });
    }
};

// Update a project
exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const { title, description, tags, files, status } = req.body;
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            id, 
            { title, description, tags, files, status, updatedAt: Date.now() }, 
            { new: true }
        );
        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(updatedProject);
    } catch (err) {
        res.status(500).json({ message: 'Error updating project', error: err.message });
    }
};

// Delete a project
exports.deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json({ message: 'Project deleted successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting project', error: err.message });
    }
};
