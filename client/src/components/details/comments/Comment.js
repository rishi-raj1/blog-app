import { useContext } from "react";

import { Box, Typography, styled } from "@mui/material";
import { Delete } from '@mui/icons-material';

import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../services/api";


const Component = styled(Box)(({ theme }) => ({
    marginTop: '30px',
    backgroundColor: '#F5F5F5',
    padding: '10px',

    [theme.breakpoints.down('sm')]: {
        padding: '10px',
    },
}))

// const Component = styled(Box)`
//     margin-top: 30px;
//     background-color: #F5F5F5;
//     padding: 10px;
// `

const Container = styled(Box)`
    display: flex;
    margin-bottom: 5px;
`

const Name = styled(Typography)(({ theme }) => ({
    fontSize: '18px',
    fontWeight: '600',
    marginRight: '20px',
    wordBreak: 'break-word',

    [theme.breakpoints.down('sm')]: {
        marginRight: '10px',
    },
}))


// const Name = styled(Typography)`
//     font-size: 18px;
//     font-weight: 600;
//     margin-right: 20px;
// `


const StyledDate = styled(Typography)`
    color: #878787;
    font-size: 14px;
    margin-top: 2px;
`

const NameDate = styled(Box)(({ theme }) => ({
    width: '90%',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        // paddingLeft: '20px',
        alignItems: 'center',
    },
}))

const DeleteIcon = styled(Delete)`
    margin-left: auto;
    cursor: pointer;
`

const StyledComment = styled(Typography)`
    white-space: pre-wrap;
    word-break: break-word;
`

const Comment = ({ comment, setToggle }) => {

    const { account } = useContext(DataContext);

    const date = new Date(comment.createdAt).toDateString();
    let time = new Date(comment.createdAt).toLocaleTimeString();
    const ampm = time.slice(-2);
    time = time.substring(0, time.length - 6);


    const removeComment = async () => {
        const response = await API.deleteComment(comment._id);

        if (response.isSuccess) {
            setToggle(prevState => !prevState);
        }
    }

    return (
        <Component>
            <Container>
                <NameDate>
                    <Name>{comment.name}</Name>
                    <StyledDate>
                        {`${date} at ${time} ${ampm}`}
                    </StyledDate>
                </NameDate>

                {
                    comment.name === account.username && <DeleteIcon onClick={() => removeComment()} />
                }
            </Container>
            <Box>
                <StyledComment>{comment.comments}</StyledComment>
            </Box>
        </Component>
    );
}

export default Comment;