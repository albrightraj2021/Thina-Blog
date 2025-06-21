import { blogCategories } from '../srcAssest'
import { motion } from 'framer-motion';
import { useState } from 'react';
import BlogContent from './BlogContent';
import { useAppContext } from './AppContext';
const BlogList = () => {
  const [menu, setMenu] = useState('All');
  const { blogs, input } = useAppContext();

  const filteredBlogs = () => {
    if (input === '') {
      return blogs;
    }
    return blogs.filter((blog) => blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()));
  };

  return (
    <div>
   <div className="grid grid-cols-3 sm:flex justify-center gap-4 sm:gap-8 my-10 px-4 sm:px-0">
  {blogCategories.map((item) => (
    <div key={item} className="relative text-center">
      <button
        onClick={() => setMenu(item)}
        className={`cursor-pointer text-gray-500 w-full ${
          menu === item ? 'text-white px-4 pt-0.5' : ''
        }`}
      >
        {item}
        {menu === item && (
          <motion.div
            layoutId="underline"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full"
          />
        )}
      </button>
    </div>
  ))}
</div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {filteredBlogs()
          .filter((blog) => (menu === "All" ? true : blog.category === menu))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((blog) => (
            <BlogContent key={blog._id} blog={blog} />
          ))}
      </div>

    </div>
  )
}

export default BlogList
