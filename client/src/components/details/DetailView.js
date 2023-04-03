import { useEffect, useState, useContext } from "react";

import { Box, Typography, styled } from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Link, useNavigate, useParams } from 'react-router-dom';

import { API } from "../../services/api";
import { DataContext } from '../../context/DataProvider';

// components
import Comments from "./comments/Comments";

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 90px',
    [theme.breakpoints.down('sm')]: {
        margin: '3px 10px'
    },
    [theme.breakpoints.between('sm', 'md')]: {
        margin: '50px 40px',
    }
}))


const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
    word-break: break-word;
`

const Edit = styled(EditIcon)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`

const Delete = styled(DeleteIcon)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
    cursor: pointer;
`

const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    margin: '20px 0',
    display: 'flex',
    justifyContent: 'space-between',

    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '10px',
        marginBottom: '20px',
    },
}))

// const Author = styled(Box)`
//     color: #878787;
//     margin: 20px 0;
//     display: flex;
// `

const Description = styled(Typography)`
    word-break: break-word;
    white-space: pre-wrap;
`


const DetailView = () => {

    const [post, setPost] = useState({});
    const params = useParams();
    const navigate = useNavigate();

    const id = params.id;

    const date = new Date(post.createdAt).toDateString();
    let time = new Date(post.createdAt).toLocaleTimeString();
    const ampm = time.slice(-2);
    time = time.substring(0, time.length - 6);



    const { account } = useContext(DataContext);

    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    // jis post me picture upload nhi kiye hai uss post me detailview wale page me by default  jo image 
    // open ho rha hai aur post.jsx me jo by default picture dikh rha hai chota sa, dono alag alag hai.
    // lekin jis post me picture upload kiye hai usme dono jagah same image dikhega.   

    useEffect(() => {
        const fetchData = async () => {
            // console.log('detailview.jsx file me fetchdata me getpostbyid call hone wala hai')
            let response = await API.getPostById(id);
            // console.log('detailview.jsx file me fetchdata me getpostbyid call ho chuka hai')
            // console.log('getpostbyid function call hone ke baad response ', response);


            if (response.isSuccess) {
                setPost(response.data);
            }
        }

        fetchData();
    }, []);

    const deleteBlog = async () => {
        const response = await API.deletePost(id);

        if (response.isSuccess) {
            navigate('/');
        }
    }

    return (
        <Container>
            <Image src={url} alt='blog image' />
            <Box style={{ float: 'right' }}>
                {
                    account.username === post.username && (
                        <>
                            <Link to={`/update/${post._id}`}>
                                <Edit color="primary" />
                            </Link>
                            <Delete color="error" onClick={() => deleteBlog()} />
                        </>
                    )
                }
            </Box>

            <Heading>{post.title}</Heading>

            <Author>
                <Typography>Author: <Box component='span' style={{ fontWeight: 600, wordBreak: 'break-word' }}>{post.username}</Box> </Typography>
                <Typography
                >
                    {`${date} at ${time} ${ampm}`}
                </Typography>
            </Author>

            <Description>{post.description}</Description>
            <Comments post={post} />
        </Container>
    )
}

export default DetailView;