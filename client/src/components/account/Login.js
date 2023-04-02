import { useState, useContext } from 'react';

import { Box, Button, styled, TextField, Typography, IconButton, InputAdornment } from '@mui/material'
// import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


import { API } from '../../services/api';
import { DataContext } from '../../context/DataProvider';

import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`

const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px

    }
`

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`

const SignUpButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`

const Error = styled(Typography)`
    font-size: 10px;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const Text = styled(Typography)`
    color: #878787;
    font-size: 16px;
`

const signupInitialValues = {
    name: '',
    username: '',
    password: ''
}

const loginInitialValues = {
    username: '',
    password: ''
}

const Login = () => {

    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    const [userAccount, setUserAccount] = useState('login');
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, setError] = useState('');
    const [login, setLogin] = useState(loginInitialValues);

    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showSignupPassword, setShowSignupPassword] = useState(false);

    const { setAccount } = useContext(DataContext);

    const navigate = useNavigate();


    const handleLoginPassword = () => setShowLoginPassword((show) => !show);
    const handleSignupPassword = () => setShowSignupPassword((show) => !show);


    const toggle = () => {
        userAccount === 'signup' ? setUserAccount('login') : setUserAccount('signup');
    }

    const signupInputChange = (e) => {
        // console.log(e);
        // console.log(e.type);
        // console.log(e.target.name, e.target.value, e.target.type, e.target.className);

        setSignup({ ...signup, [e.target.name]: e.target.value });
        // console.log(signup);

        if (e.target.value) {
            setError('');
        }
    }

    const signupUser = async () => {
        if (!signup.name || !signup.username || !signup.password) {
            setError('Please fill all the fields');
            return;
        }


        let response = await API.userSignup(signup);
        // console.log(response);

        if (response.isSuccess) {
            setError('');
            setSignup(signupInitialValues);
            setUserAccount('login');
        } else {
            if (response.code === 409) {
                setError(response.msg);
            }
            else {
                setError('Something went wrong! Please try again later');
            }
        }
    }

    const loginInputChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });

        if (e.target.value) {
            setError('');
        }
    }

    const loginUser = async () => {
        if (!login.username && !login.password) {
            setError('Please fill the username and password field!');
            return;
        }
        else if (!login.username) {
            setError('Please fill the username field!');
            return;
        }
        else if (!login.password) {
            setError('Please fill the password field!');
            return;
        }

        let response = await API.userLogin(login);

        if (response.isSuccess) {
            setError('');
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);

            console.log('response in login.js ', response);

            setAccount({ username: response.data.username, name: response.data.name });

            navigate('/');
        }
        else {
            if (response.code === 400) {
                setError(response.msg);
            }
            else {
                setError('Something went wrong! Please try again later');
            }
        }
    }



    return (
        <Component>
            <Box>

                <Image src={imageURL} alt="login" />
                {
                    userAccount === 'login' ?
                        (
                            <Wrapper>
                                <TextField variant='standard' value={login.username} label='Enter username' onChange={(e) => loginInputChange(e)}
                                    name='username' />
                                <TextField
                                    variant='standard'
                                    value={login.password}
                                    label='Enter password'
                                    onChange={(e) => loginInputChange(e)}
                                    name='password'
                                    type={showLoginPassword ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" >
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleLoginPassword}
                                                    edge="end"
                                                >
                                                    {showLoginPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />

                                {
                                    error && <Error>{error}</Error>
                                }
                                <LoginButton variant='contained' onClick={() => loginUser()}>Login</LoginButton>
                                <Text style={{ textAlign: 'center' }}>OR</Text>
                                <SignUpButton onClick={() => toggle()}>Create An Account</SignUpButton>
                            </Wrapper>
                        ) :
                        (
                            <Wrapper>
                                <TextField variant='standard' label='Enter Name' value={signup.name} name='name' onChange={(e) => signupInputChange(e)} />
                                <TextField variant='standard' label='Enter Username' value={signup.username} name='username' onChange={(e) => signupInputChange(e)} />
                                <TextField
                                    variant='standard'
                                    label='Enter Password'
                                    value={signup.password}
                                    name='password'
                                    onChange={(e) => signupInputChange(e)}
                                    type={showSignupPassword ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" >
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleSignupPassword}
                                                    edge="end"
                                                >
                                                    {showSignupPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />

                                {
                                    error && <Error>{error}</Error>
                                }
                                <SignUpButton onClick={() => signupUser()}>Signup</SignUpButton>
                                <Text style={{ textAlign: 'center' }}>OR</Text>
                                <LoginButton variant='contained' onClick={() => toggle()}>Already have an account</LoginButton>
                            </Wrapper>
                        )
                }


            </Box>
        </Component>
    )
}

export default Login;