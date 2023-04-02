
import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';

import { API } from '../../../services/api';

// components
import Post from './Post';

const Posts = () => {

    const [posts, setPosts] = useState([]);

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    // console.log(searchParams);
    // console.log(category);

    useEffect(() => {
        const fetchData = async () => {
            const response = await API.getAllPosts({ category: category || '' });
            if (response.isSuccess) {
                setPosts(response.data);
            }
        }

        fetchData();

    }, [category]);

    return (

        <>
            {
                posts && posts.length > 0 ? posts.map((post, ind) => (
                    <Grid item lg={3} sm={4} xs={12} key={ind}>
                        <Link to={`/details/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Post post={post} />
                        </Link>
                    </Grid>
                )) : <Box style={{ color: '#878787', margin: '30px 80px', fontSize: 18 }}>No data available to display</Box>
            }
        </>
    )
}

export default Posts