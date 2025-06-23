import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets } from '../srcAssest';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import Moment from 'moment';
import Footer from '../components/Footer';
import { useAppContext } from '../components/AppContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const Blog = () => {
    const { id } = useParams();
    const { axios } = useAppContext();
    const [data, setData] = useState(null);
    const [comments, setComments] = useState([]);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    const fetchBlogData = async () => {
        try {
            const { data } = await axios.get(`/api/blog/${id}`);
            if (data.success) {
                setData(data.blog);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching blog:', error);
        }
    };

    const addComment = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`/api/blog/add-comment`, { blog: id, name, content });
            if (data.success) {
                toast.success(data.message);
                setName('');
                setContent('');
                fetchComments(); // refresh after new comment
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Error posting comment");
        }
    };

    const fetchComments = async () => {
        try {
            const { data } = await axios.post(`/api/blog/comments`, { blogId: id });
            if (data.success) {
                setComments(data.comments);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        fetchBlogData();
        fetchComments();
    }, []);

    const stripHtml = (html) => html.replace(/<[^>]+>/g, '');

    return (
        <div className="">
            <Navbar hideLoginButton="true" />

            {data && (
                <Helmet>
                    {/* Page Title */}
                    <title>{data.title} | Thina Blog</title>
                    <link rel="icon" type="image/svg+xml" href="./src/assets/logoWoText.svg" />
                    {/* SEO Meta Tags */}
                    <meta name="keywords" content={data.title} />
                    <meta name="description" content={stripHtml(data.description).slice(0, 100)} />

                    {/* Open Graph / Facebook / LinkedIn */}
                    <meta property="og:type" content="article" />
                    <meta property="og:title" content={data.title} />
                    <meta property="og:description" content={stripHtml(data.description).slice(0, 100)} />
                    <meta property="og:image" content={data.image} />
                    <meta property="og:url" content={`https://yourdomain.com/blog/${id}`} />
                    <meta property="og:site_name" content="Thina Blog" />

                    {/* Twitter */}
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={data.title} />
                    <meta name="twitter:description" content={stripHtml(data.description).slice(0, 100)} />
                    <meta name="twitter:image" content={data.image} />
                    <meta name="twitter:site" content="@YourTwitterHandle" />
                    <meta name="twitter:creator" content="@YourTwitterHandle" />

                    {/* Pinterest */}
                    <meta name="pinterest-rich-pin" content="true" />

                    {/* WhatsApp uses Open Graph tags */}
                </Helmet>
            )}

            {data ? (
                <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-2xl">
                    <div className="flex items-center justify-between gap-3 mb-6">
                        <span className="inline-block bg-primary/20 text-primary px-5 py-2 rounded-full text-sm font-medium">
                            {data.category}
                        </span>
                        <p className="text-gray-500 text-sm">
                            Published on: {Moment(data.createdAt).format('Do MMMM YYYY')}
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
                            className="text-gray-800 space-y-6
                        [&_p]:text-lg [&_p]:leading-relaxed [&_p]:font-normal
                        [&_table]:w-full [&_table]:text-left [&_table]:border [&_table]:border-gray-300
                        [&_th]:border [&_th]:bg-gray-100 [&_th]:text-gray-800 [&_th]:font-semibold
                        [&_td]:border [&_td]:p-2
                        [&_thead]:bg-gray-100
                        [&_table>tbody>tr:first-child]:bg-gray-50"
                            dangerouslySetInnerHTML={{
                                __html: data.description,
                            }}
                        />
                    </article>

                    <div className='mt-14 mb-10 max-w-3xl mx-auto'>
                        <p className='font-semibold mb-2'>Comments ({comments.length})</p>
                        <div className='flex flex-col gap-4'>
                            {comments.map((item, index) => (
                                <div key={index} className='relative bg-primary/5 border border-primary/10 max-w-xl p-4 rounded text-gray-600'>
                                    <div className='flex items-center gap-2 mb-2'>
                                        <img src={assets.user_icon} alt="" className='w-6' />
                                        <p className='font-medium'>{item.name}</p>
                                    </div>
                                    <p className='text-sm max-w-md ml-8'>{item.content}</p>
                                    <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>{Moment(item.createdAt).fromNow()}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='max-w-3xl mx-auto'>
                        <p className='font-semibold mb-4'>Add your comment</p>
                        <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                type="text"
                                placeholder='Name'
                                required
                                className='w-full p-2 border border-gray-300 rounded outline-none'
                            />
                            <textarea
                                onChange={(e) => setContent(e.target.value)}
                                value={content}
                                placeholder='Comment'
                                required
                                className='w-full p-2 border border-gray-300 rounded outline-none h-48'
                            ></textarea>
                            <button type="submit" className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer'>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <Loader />
            )}

            <Footer />
        </div>
    );
};

export default Blog;
