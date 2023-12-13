import { useState } from 'react';
import { BrowserRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom';

import DataProvider from './context/DataProvider';


// components 
import Login from './components/account/Login';
import Home from './components/home/Home';
import Header from './components/header/Header';
import CreatePost from './components/create/CreatePost';
import DetailView from './components/details/DetailView';
import UpdatePost from './components/create/UpdatePost';
import About from './components/about/About';
import Contact from './components/contact/Contact';


const PrivateRoute = () => {

  const isAuthenticated = sessionStorage.getItem('accessToken');

  return isAuthenticated ?
    (
      <>
        <Header />
        <Outlet />
      </>
    )
    : <Navigate replace to='/login' />

    ;
}


function App() {

  return (
    <BrowserRouter>
      <DataProvider>
        <div style={{ marginTop: '70px' }}>
          <Routes>
            <Route path='/login' element={<Login />} />

            <Route path='/' element={<PrivateRoute />}>
              <Route path='/' element={<Home />} />
            </Route>

            <Route path='/create' element={<PrivateRoute />}>
              <Route path='/create' element={<CreatePost />} />
            </Route>

            <Route path='/details/:id' element={<PrivateRoute />}>
              <Route path='/details/:id' element={<DetailView />} />
            </Route>

            <Route path='/update/:id' element={<PrivateRoute />}>
              <Route path='/update/:id' element={<UpdatePost />} />
            </Route>

            <Route path='/about' element={<PrivateRoute />}>
              <Route path='/about' element={<About />} />
            </Route>

            <Route path='/contact' element={<PrivateRoute />}>
              <Route path='/contact' element={<Contact />} />
            </Route>

          </Routes>
        </div>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;


//  backend url present in
//  D:\blog-app\client\src\services\api.js
//  D:\blog-app\server\controller\imageController.js
