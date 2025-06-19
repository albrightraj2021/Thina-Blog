import React, { useEffect } from 'react'
import { blog_data } from '../../srcAssest';

const ListBlog = () => {
    const [blogs, setBlogs] = React.useState([]);
    const fetchBlogs = async () => {
        try {
            // const response = await fetch('https://api.example.com/blogs'); // Replace with your API endpoint
            // const data = await response.json();
            setBlogs(blog_data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } 
    }  
    useEffect(() => {
        fetchBlogs();
    }, []);
    
  return (
    <div>
      
    </div>
  )
}

export default ListBlog
