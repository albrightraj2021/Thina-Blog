import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../components/AppContext';
import BlogTableList from '../../components/admin/BlogTableList';
const ListBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const {axios} = useAppContext();
    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/admin/blogs');
            if (data.success) {
                setBlogs(data.blogs);
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } 
    }  
    
    useEffect(() => {
        fetchBlogs();
    }, []);
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 '>
        <h1>All Blog</h1>

       <div className="relative h-4/5 m-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
                    <table className="w-full text-sm text-gray-500">
                        <thead className="text-xs text-gray-600 text-left uppercase">
                            <tr>
                                <th scope="col" className="px-2 py-4 xl:px-6">#</th>
                                <th scope="col" className="px-2 py-4">Date</th>
                                <th scope="col" className="px-2 py-4 max-sm:hidden">Status</th>
                                <th scope="col" className="px-2 py-4 max-sm:hidden">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        
                            {blogs.map((blog, index) => (
                                <BlogTableList
                                    key={blog._id}
                                    blog={blog}
                                    fetchBlogs={fetchBlogs}
                                    index={index + 1}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
    </div>
  )
}

export default ListBlog
