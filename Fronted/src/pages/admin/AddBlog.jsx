import React, { useState, useRef, useEffect } from 'react';
import { assets, blogCategories } from '../../srcAssest';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import 'quill-table-ui/dist/index.css'; // table UI styles
import { useAppContext } from '../../components/AppContext';
import { parse } from 'marked';
import toast from 'react-hot-toast';
import '../../components/HorizontalRuleBlot';

// Quill modules
import Table from 'quill/modules/table';
import TableUI from 'quill-table-ui';

// Register modules
Quill.register({
  'modules/table': Table,
  'modules/tableUI': TableUI,
});

const AlignStyle = Quill.import('attributors/style/align');
Quill.register(AlignStyle, true); // for text alignment

const AddBlog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const [isAdding, setIsAdding] = useState(false);
  const { axios } = useAppContext();

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('Lifestyle');
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ align: [] }],
            ['link', 'image'],
            ['table'],
            ['clean']
          ],
          table: true,
          tableUI: true
        }
      });
    }
  }, []);

  const generateContent = async () => {
    if (!title) return toast.error('Title is required');

    try {
      const { data } = await axios.post('/api/blog/generate', { prompt: title });

      if (data.success && data.content && quillRef.current) {
        let html = parse(data.content);

        // Enhance formatting compatibility with Quill
        // html = html
        //   .replace(/<\/p>/g, '</p><p><br></p>') // preserve paragraph spacing
        //   .replace(/<hr\s*\/?>/g, '<p><hr></p>') // wrap <hr>
        //   .replace(/<table>/g, '<div class="table-container"><table>')
        //   .replace(/<\/table>/g, '</table></div>');

        quillRef.current.clipboard.dangerouslyPasteHTML(html);
      } else {
        toast.error(data.message || 'No content returned');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to generate content');
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsAdding(true);

    try {
      const blog = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished
      };

      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog));
      formData.append('image', image);

      const { data } = await axios.post('/api/blog/add', formData);
      if (data.success) {
        toast.success(data.message);
        setTitle('');
        setSubTitle('');
        setImage('');
        setCategory('Lifestyle');
        setIsPublished(false);
        quillRef.current.root.innerHTML = '';
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Submission failed');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className='w-full'>
      <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
        <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded-md'>
          <p>Upload thumbnail</p>
          <label htmlFor="image">
            <img
              src={!image ? assets.upload_area : URL.createObjectURL(image)}
              alt=""
              className='mt-2 h-16 rounded-sm cursor-pointer'
            />
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id='image'
              hidden
              required
            />
          </label>

          <p className='mt-4'>Blog title</p>
          <input
            type="text"
            placeholder='Type here'
            required
            className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />

          <p className='mt-4'>Sub title</p>
          <input
            type="text"
            placeholder='Type here'
            required
            className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
            onChange={(e) => setSubTitle(e.target.value)}
            value={subTitle}
          />

          <p className='mt-4'>Blog Description</p>
          <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
            <div ref={editorRef}></div>
            <button
              type='button'
              onClick={generateContent}
              className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'
            >
              Generate with AI
            </button>
          </div>

          <select
            onChange={e => setCategory(e.target.value)}
            value={category}
            name="category"
            className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'
          >
            <option value="">Select category</option>
            {blogCategories.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>

          <div className='flex gap-2 mt-4'>
            <p>Publish Now</p>
            <input
              type="checkbox"
              checked={isPublished}
              className='scale-125 cursor-pointer'
              onChange={(e) => setIsPublished(e.target.checked)}
            />
          </div>

          <button
            type="submit"
            className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm'
            disabled={isAdding}
          >
            {isAdding ? 'Adding...' : 'Add Blog'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
