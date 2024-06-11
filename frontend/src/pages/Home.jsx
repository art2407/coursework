import React, { useEffect, useState } from 'react';
import Blogcard from '../components/Blogcard';
import { getBlogs } from '../api/Api';
import { useSearchParams } from "react-router-dom";

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const allBlogs = await getBlogs(searchParams.get('category'));
                setBlogs(allBlogs.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        }
        fetchData();
    }, [searchParams]);

    return (
        <div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                {blogs.length > 0 ? (
                    blogs.map((blog, i) => (
                        <Blogcard key={i} blogdata={blog} />
                    ))
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    );
};

export default Home;
