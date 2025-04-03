import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Post.css'
import Pagination from './Pagination';

const Post = () => {
    const [data, setData] = useState();
    const [pageNo, setPageNo] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`https://picsum.photos/v2/list?page=${pageNo}&limit=5`);

            setData(response.data)
        }
        fetchData();
    }, [pageNo])
    return (
        <div className="container">
            <div className="post-container">
                {data?.map((item) => {
                    return <img className='post-img' src={item?.download_url} alt="post" key={item?.id} />;
                })}
            </div>
            <Pagination pageNo={pageNo} setPageNo={setPageNo} />
        </div>
    )
}

export default Post
