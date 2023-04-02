import { Box, Button, TextareaAutosize, styled } from "@mui/material";
import { useContext, useEffect, useState } from "react";


import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../services/api";

// component
import Comment from "./Comment";



const Container = styled(Box)`
    margin-top: 40px;
    display: flex;
`

const Image = styled('img')({
    width: '50px',
    height: '50px',
    borderRadius: '50%'
})

const StyledTextArea = styled(TextareaAutosize)`
    width: 100%;
    margin: 0 20px;
`

const initialValues = {
    name: '',
    postId: '',
    comments: '',
}


const Comments = ({ post }) => {

    const url = 'https://static.thenounproject.com/png/12017-200.png';

    const [comment, setComment] = useState(initialValues);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    const { account } = useContext(DataContext);

    useEffect(() => {
        const getData = async () => {
            // console.log('comments.jsx me hai getdata function me getallcomments call hone wala hai.')
            // console.log('getallcomments call hone wala hai and post ka id ye rha and type bhi ', post._id, typeof post._id);
            // alert('getallcomments function call hone wala hai');

            const response = await API.getAllComments(post._id);

            // alert('getallcomments function call ho chuka hai iske baad detailview.jsx me control jayega sayad');
            // console.log('comments.jsx me hai getdata function me getallcomments ko call ho chuka hai.')
            // console.log('response aa chuka hai function call krne ke baad', response);

            if (response.isSuccess) {
                setComments(response.data);
            }
        }

        getData();
    }, [post, toggle]);

    const handleChange = (e) => {
        setComment({
            'comments': e.target.value,
            'postId': post._id,
            'name': account.username,
        });
    }

    const addComment = async () => {
        // console.log('new comment add hone wala hai time check kr lete hai ', comment.date);
        const response = await API.newComment(comment);

        if (response.isSuccess) {
            setComment(initialValues);
        }

        setToggle(!toggle);
    }




    return (
        <Box>
            <Container>
                <Image src={url} alt='dp' />
                <StyledTextArea
                    minRows={5}
                    placeholder="Whats's on your mind"
                    value={comment.comments}
                    onChange={(e) => handleChange(e)}
                />
                <Button
                    variant="contained"
                    size='medium'
                    style={{ height: '40px' }}
                    onClick={() => addComment()}
                >POST
                </Button>
            </Container>
            <Box>
                {
                    comments && comments.length > 0 && comments.map((comment, ind) => (
                        <Comment key={ind} comment={comment} setToggle={setToggle} />
                    ))
                }
            </Box>
        </Box>
    )
};

export default Comments;