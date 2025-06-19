import express from 'express';
import {addBlog,addComment,deleteBlogById,getAllBlogs,getBlogById, getBlogComments, togglePublish} from '../controllers/blogController.js'; // Add .js extension and import default
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

const blogRouter = express.Router();

blogRouter.post('/add', upload.single('image'), auth, addBlog);
blogRouter.get('/all',getAllBlogs); // Get all blogs
blogRouter.get('/:blogId', getBlogById); 
blogRouter.post('/delete',auth,deleteBlogById);
blogRouter.post('/toggle-publish',auth,togglePublish) 
// Get blog by ID
blogRouter.post('add-comment',addComment);
blogRouter.get('/comments',getBlogComments) // Add comment to a blog
export default blogRouter;