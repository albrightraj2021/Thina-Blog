import imageKit from "../config/imageKit.js";
import fs from 'fs';
import Blog from '../models/Blog.js';

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
                {quality: "auto"},
                {format: "webp"},
                {width: 1280}
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
        
        res.status(201).json({ message: "Blog added successfully" });

    } catch (error) {
        console.error("Error adding blog:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find( {isPublished: true  });
        res.status(200).json(blogs);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json(blog);
    } catch (error) {
        console.error("Error fetching blog by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteBlogById = async (req, res) => {
    try {
        const {id}=req.body;
        const blog= await Blog.findByIdAndDelete(id);
        await Comment.deleteMany({ blog: id }); // Delete associated comments

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error deleting blog by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const togglePublish= async (req, res) => {
    try {
        const {id}=req.body;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.status(200).json({ message: `Blog ${blog.isPublished ? 'published' : 'unpublished'} successfully` });
    } catch (error) {
        console.error("Error toggling publish status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const addComment = async (req, res) => {
    try{
  const{blog,name,console}=req.body;
  await Comment.create({
    blog,
    name,
    content

    });
} catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.body;
        const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 }); // Populate name field with user name
        if (!comments) {
            return res.status(404).json({ message: "No comments found for this blog" });
        }
        res.status(200).json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

