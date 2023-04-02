import { Alert, Box, Button, FormControl, IconButton, InputBase, styled, TextareaAutosize } from "@mui/material";
import { AddCircle, Close } from '@mui/icons-material';
import { useState, useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";



import { DataContext } from "../../context/DataProvider";
import { API } from "../../services/api";


const Container = styled(Box)(({ theme }) => ({
    margin: '20px 30px',
    [theme.breakpoints.down('md')]: {
        margin: '2px',
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


const CreatePost = () => {

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const [searchParams] = useSearchParams();

    const { account } = useContext(DataContext);

    const navigate = useNavigate();

    const category = searchParams.get('category');


    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';


    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    const handleFile = (e) => {
        setFile(e.target.files[0]);

        // console.log(e.target);
        // console.log(e.target.files);

        // Below code is  for change the value of the input value of type 'file' so that we can select and upload same file again and again.

        let list = new DataTransfer();
        let file = new File(["content"], "filename.xyz");
        list.items.add(file);

        let myFileList = list.files;

        e.target.files = myFileList;
    }

    let timerid;

    const removeAlert = () => {
        timerid = setTimeout(() => {
            setShowAlert(false);
        }, 5000);
    }


    useEffect(() => {

        const getImage = async () => {
            // console.log('createpost.jsx me hai ');
            console.log(file);

            const type = ['image/png', 'image/jpg', 'image/jpeg'];
            const maxAllowedFileSize = 5 * 1024 * 1024;

            if (file) {
                if (file.size > maxAllowedFileSize) {
                    setShowAlert(true);
                    setAlertMessage('File size should not exceed 5 MB!');
                    removeAlert();
                    setFile('');
                    return;
                }

                if (type.indexOf(file.type) === -1) {
                    // console.log('invalid type of file');
                    setShowAlert(true);
                    setAlertMessage('Invalid file type. Only jpg, png and jpeg image files are allowed.');
                    removeAlert();
                    setFile('');
                    return;
                }

                const data = new FormData();
                data.append('name', file.name);
                data.append('file', file);

                // API call

                const response = await API.uploadFile(data);
                console.log('createpost.jsx me hai ', response);

                // post.picture = response.data; 
                // upar wale code se post ka picture change krne se change reflect nhi hota hai niche wala code shi hai apne mn se likhe hai

                setPost({ ...post, 'picture': response.data });
            }
        }

        getImage();

        post.categories = category || 'All';
        post.username = account.username;

    }, [file])


    const savePost = async () => {

        let response = await API.createPost(post);
        console.log(response);

        if (response.isSuccess) {
            navigate('/');
        }
    }


    return (
        <Container>
            {
                showAlert ? (
                    <Container
                        style={{ display: 'flex' }}
                    >
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setShowAlert(false);
                                    }}
                                >
                                    <Close fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ width: 'auto', margin: 'auto', height: '40px' }}
                        >
                            {
                                alertMessage
                            }
                        </Alert>
                    </Container>
                ) : <></>
            }

            <Image src={url} alt='image' />
            <StyledFormControl>
                <label htmlFor='fileInput'>
                    <AddCircle fontSize="large" color='action' />
                </label>

                <input
                    type='file'
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFile(e)}
                />

                <InputTextField placeholder='Title' onChange={(e) => handleChange(e)} name='title' />

                <Button variant='contained' onClick={() => savePost()}>Publish</Button>
            </StyledFormControl>

            <TextArea
                minRows={5}
                placeholder='Tell your story...'
                onChange={(e) => handleChange(e)}
                name='description'
            />


        </Container>
    )
}

export default CreatePost