import { Box, styled, Typography, Link, Button } from '@mui/material';
import { LinkedIn, Email } from '@mui/icons-material';



const Banner = styled(Box)`
    background-image: url(/about.jpg) ;
    width: 100%;
    height: 50vh;
    background-position: left 0px top -100px;
    background-repeat: no-repeat;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Heading = styled(Typography)`
    text-align: center;
`

const Text = styled(Typography)`
    color: #878787;
`;


const Contact = () => {
    return (
        <Box>
            <Banner />
            <Wrapper>
                <Heading variant="h3">Getting in touch is easy!</Heading>
                <Text
                    variant="h5"
                >
                    Thank you for visiting our blog website. We're always happy to hear from our readers and contributors, and we encourage you to reach out to us with any questions, feedback, or suggestions you may have.
                    <br />  <br />
                    If you have any questions about our website, please don't hesitate to reach out to us. We're happy to help and answer any questions you may have. You can contact us by sending an email to our team at
                    <Button>
                        <Link
                            href="mailto:rr8804035172@gmail.com?Subject=This is a subject"
                            target="_blank"
                            color="inherit"
                        >
                            <Email style={{ width: '50px' }} />
                        </Link>
                    </Button>
                </Text>
            </Wrapper>
        </Box>
    );
}

export default Contact;