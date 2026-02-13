const Page = require("../models/page");

// ✅ Create or Update Page
const createOrUpdatePage = async (req, res) => {
    try {
        const { title, slug, content, sectionImages } = req.body;

        let page = await Page.findOne({ slug });

        if (page) {
            // Update existing page
            page.title = title || page.title;
            page.content = content || page.content;
            if (sectionImages) page.sectionImages = sectionImages;
            await page.save();
            return res.status(200).json({ message: "Page updated successfully", page });
        } else {
            // Create new page
            page = new Page({
                title,
                slug,
                content,
                sectionImages: sectionImages || []
            });
            await page.save();
            return res.status(201).json({ message: "Page created successfully", page });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get All Pages
const getAllPages = async (req, res) => {
    try {
        const pages = await Page.find().sort({ title: 1 });
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get Page by Slug
const getPageBySlug = async (req, res) => {
    try {
        const page = await Page.findOne({ slug: req.params.slug });
        if (!page) {
            return res.status(404).json({ error: "Page not found" });
        }
        res.status(200).json(page);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Delete Page
const deletePage = async (req, res) => {
    try {
        const page = await Page.findByIdAndDelete(req.params.id);
        if (!page) {
            return res.status(404).json({ error: "Page not found" });
        }
        res.status(200).json({ message: "Page deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createOrUpdatePage,
    getAllPages,
    getPageBySlug,
    deletePage,
};
