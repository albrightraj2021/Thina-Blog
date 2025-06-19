import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { blog_data } from '../srcAssest';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import moment from 'moment';
import Footer from '../components/Footer';
const Blog = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const fetchBlog = async () => {
        const data = blog_data.find((blog) => blog._id === id);
        setData(data);
    };

    useEffect(() => {
        fetchBlog();
    }, [id]);

    return (
        <div className="">
            <Navbar hideLoginButton="true" />
            {data ? (
                <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-2xl">
                    <div className="flex items-center justify-between gap-3 mb-6">
                        <span className="inline-block bg-primary/20 text-primary px-5 py-2 rounded-full text-sm font-medium">
                            {data.category}
                        </span>
                        <p className="text-gray-500 text-sm">
                            Published on: {moment(data.createdAt).format('Do MMMM YYYY')}
                        </p>
                    </div>
                    <h1 className="text-4xl font-extrabold mb-8 text-gray-900 tracking-tight leading-tight">
                        {data.title}
                    </h1>

                    <div className="mb-8">
                        <img
                            src={data.image}
                            alt={data.title}
                            className="w-full h-auto rounded-xl shadow-md transition-transform hover:scale-105 duration-300"
                        />
                    </div>

                    <article className="prose prose-lg max-w-none">
                        <div
                            className="text-gray-800 space-y-6"
                            dangerouslySetInnerHTML={{
                                __html: data.description.split('\n').map(paragraph => 
                                    `<p class="text-lg leading-relaxed font-normal">${paragraph}</p>`
                                ).join('')
                            }}
                        />
                    </article>
                  
                </div> 
                 
            ) : (
                <Loader />
            )}
            <Footer />
        </div>
    );
}

export default Blog

