import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';


const Banner = styled(Box)`
    background-image: url(/about.jpg);
    width: 100%;
    height: 50vh;
    background-position: right 0px top 0px;
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

const About = () => {

    return (
        <Box>
            <Banner />
            <Wrapper>
                <Heading variant="h3">About Us</Heading>
                <Text variant="h5">
                    Welcome to our blog website, where we strive to create a community for anyone who loves to read or write blogs. Our platform is built on the idea that everyone has a unique perspective, and we believe that sharing our stories and experiences can help us connect and learn from one another.
                    <br />  <br />
                    Our website is designed to be user-friendly, making it easy for you to explore a variety of topics and find the blogs that interest you. Whether you're looking for tips on cooking, travel stories, or want to learn about the latest technology trends, we've got you covered.
                    <br /> <br />
                    One of the best things about our blog website is that anyone can become a contributor. Whether you're an experienced writer or just starting, we welcome all voices and perspectives. By sharing your stories and insights with our community, you can help inspire, educate, and connect with others who share your interests.

                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;
