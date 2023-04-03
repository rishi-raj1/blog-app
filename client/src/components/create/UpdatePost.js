import { Box, Button, FormControl, InputBase, styled, TextareaAutosize } from "@mui/material";
import { AddCircle } from '@mui/icons-material';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


import { API } from "../../services/api";


const Container = styled(Box)(({ theme }) => ({
    margin: '20px 30px',

    [theme.breakpoints.down('sm')]: {
        margin: '5px',
    }
}))

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
})

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;

`


const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`

const TextArea = styled(TextareaAutosize)`
    width: 100%;
    margin-top: 50px;
    font-size: 18px;
    border: none;
    &:focus-visible{
        outline: none;
    }
`

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
};


const UpdatePost = () => {

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');


    const navigate = useNavigate();
    const params = useParams();

    const id = params.id;


    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';


    useEffect(() => {
        const fetchData = async () => {
            const response = await API.getPostById(id);

            if (response.isSuccess) {
                setPost(response.data);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        const getImage = async () => {
            // console.log('createpost.jsx me hai ');
            // console.log(file);
            // console.log(file.name);

            if (file) {
                const data = new FormData();
                data.append('name', file.name);
                data.append('file', file);

                // console.log(data);

                // API call
                // console.log(API);

                const response = await API.uploadFile(data);
                // console.log('createpost.jsx me hai ', response);

                // console.log(post);

                // post.picture = response.data; 
                // upar wale code se post ka picture change krne se change reflect nhi hota hai niche wala code shi hai apne mn se likhe hai

                setPost({ ...post, 'picture': response.data });

                // console.log(post);

            }
        }

        // console.log('getImage function call hone wala hai');

        getImage();

        // console.log('getImage function call ho gya hai');


        setFile('');  // video me ye code nhi hai iske bina file input reset nhi ho pata hai jiske wajah se ek hi input file bina select kiye baar baar database me save ho rha hai bs is CreatePost.jsx file ko baar baar save krne se

        // console.log(post);

    }, [file])


    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    const updateBlogPost = async () => {
        let response = await API.updatePost(post);
        // console.log(response);

        if (response.isSuccess) {
            navigate(`/details/${id}`);
        }
    }


    return (
        <Container>
            <Image src={url} alt='image' />
            <StyledFormControl>
                <label htmlFor='fileInput'>
                    <AddCircle fontSize="large" color='action' />
                </label>
                <input
                    type='file'
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <InputTextField placeholder='Title' value={post.title} onChange={(e) => handleChange(e)} name='title' />

                <Button variant='contained' onClick={() => updateBlogPost()}>Update</Button>
            </StyledFormControl>

            <TextArea
                minRows={5}
                placeholder='Tell your story...'
                onChange={(e) => handleChange(e)}
                name='description'
                value={post.description}
            />


        </Container>
    )
}

export default UpdatePost