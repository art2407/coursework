import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { uploadFile, createBlog } from '../api/Api';

const Createblog = () => {
    
    const blankBlog = {
        "title": "",
        "image": "",
        "post": "<p><br></p>",
        "category": ""
    }

    const [newblog, setNewblog] = useState(blankBlog);

    const handleUpload = async (event) => {
        let uploadedFile = await uploadFile(event.target.files[0]);
        if (uploadedFile.path) {
            setNewblog({ ...newblog, image: uploadedFile.path });
        }
    }

    const handleSubmit = async () => {
        let createdBlog = await createBlog(newblog);
        if (createdBlog.desc == 1) {
            setNewblog(blankBlog);
            // alert("Блог добавлен успешно!");
        }
    }

    const menu = [
        { text: 'Природа', path: '/' },
        { text: 'Путешествия', path: '/' },
        { text: 'Технологии', path: '/' },
        { text: 'Политика', path: '/' },
    ]
    return (
        <div className='flex w-full items-center justify-center'>
            <div className="bg-slate-200 w-[60%] p-5 rounded-xl">
                {/* <small>{JSON.stringify(newblog)}</small> */}
                <h1 className='text-2xl mb-5'>Создать блог-пост</h1>
                <div className="flex flex-col">
                    <label htmlFor="" className='ml-1 text-gray-500'>Заголовок</label>
                    <input type="text" value={newblog.title} onChange={(e) => setNewblog({ ...newblog, title: e.target.value })} className='h-10 border border-gray-300 rounded my-2 p-2' />
                    <label htmlFor="" className='ml-1 text-gray-500'>Категория</label>
                    <select value={newblog.category} onChange={(e) => setNewblog({ ...newblog, category: e.target.value })} name="" id="" className='h-10 border border-gray-300 rounded my-2 p-2'>
                        <option value="" default disabled>Выберите категорию</option>
                        {menu.map(x => {
                            return <option value={x.text}>{x.text}</option>
                        })}
                    </select>
                    <label htmlFor="" className='ml-1 text-gray-500'>Изображение</label>
                    <input onChange={(e) => handleUpload(e)} type="file" className='  border-gray-300 rounded my-2 p-2' />
                    <label htmlFor="" className='ml-1 text-gray-500'>Пост</label>
                    <ReactQuill className='bg-white rounded mb-2 mt-2 editingarea' theme="snow" value={newblog.post} onChange={(e) => { setNewblog({ ...newblog, post: e }) }} />

                    <hr />
                    <button onClick={() => handleSubmit()} className='bg-slate-500 text-white h-8 w-[100px] mt-2 rounded'>Отправить</button>

                </div>
            </div>
        </div>
    );
}

export default Createblog;
