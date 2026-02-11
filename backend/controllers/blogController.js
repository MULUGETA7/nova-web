const Blog = require('../models/blog');
const blogValidationSchema = require('../validations/blogValidation'); // Import the validation schema

// Create a new blog post
exports.createBlog = async (req, res) => {
    try {
        // Validate the request body with JOI
        await blogValidationSchema.validateAsync(req.body);

        // If validation passes, proceed to create the blog post
        const { title, content, author, tags } = req.body;
        const blog = new Blog({ title, content, author, tags });
        await blog.save();
        res.status(201).json({ message: 'Blog post created successfully!', blog });
    } catch (err) {
        if (err.isJoi) {
            // JOI validation error
            return res.status(400).json({ message: 'Validation failed', details: err.details });
        }
        // Other errors (e.g., database issues)
        res.status(500).json({ message: 'Error creating blog post', error: err.message });
    }
};

// Get all blog posts
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching blog posts', error: err.message });
    }
};

// Get a single blog post by ID
exports.getBlogById = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching blog post', error: err.message });
    }
};

// Update a blog post
exports.updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, content, author, tags } = req.body;
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { title, content, author, tags, updatedAt: Date.now() },
            { new: true } // Return the updated document
        );
        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.status(200).json(updatedBlog);
    } catch (err) {
        res.status(500).json({ message: 'Error updating blog post', error: err.message });
    }
};

// Delete a blog post
exports.deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.status(200).json({ message: 'Blog post deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting blog post', error: err.message });
    }
};
