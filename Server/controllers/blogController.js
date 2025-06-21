import imageKit from "../config/imageKit.js";
import fs from 'fs';
import Blog from '../models/Blog.js';
import Comment from '../models/comments.js';
import {main}  from '../config/gemini.js';

export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
        const imageFile = req.file;

        if (!title || !subTitle || !description || !category || !imageFile) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imageKit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blog",
        });

        const optimizedImageUrl = imageKit.url({
            path: response.filePath,
            transformation: [
                { quality: "auto" },
                { format: "webp" },
                { width: 1280 }
            ]
        });

        const image = optimizedImageUrl;
        await Blog.create({
            title,
            subTitle,
            description,
            category,
            image,
            isPublished: isPublished || false,
        });

        res.status(201).json({ success: true, message: "Blog added successfully" });

    } catch (error) {
        console.error("Error adding blog:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true });
        res.status(200).json({ success: true, blogs });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params; // Assuming it's req.params based on typical route structures for fetching by ID
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.json({ success: false, message: "Blog not found" });
        }
        res.json({ success: true, blog });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error deleting blog by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const togglePublish = async (req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({ success: true, message: 'Blog status updated' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    await Comment.create({ blog, name, content });
    res.json({ success: true, message: 'Comment added for review' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;
    
    
    const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });
 
    
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    const content = await main(prompt
        
        +"Generate a blog content for this topic in simple text format");
        console.log(content);
        


    res.json({ success: true, content });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
