import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from './Routes/HomePage';
import { Layout } from './Layout/MainLayout';
import { GenerateShortUrl } from './Routes/GenerateShortUrl';
import { Login } from './Routes/Login';
import { Register } from './Routes/Register';
import ProtectedComponent from './Components/PrivateComponent/ProtectedComponent';
import AuthComponent from './Components/PrivateComponent/AuthComponent';
import { TopBarLayout } from './Layout/TopBarLayout';
import { GetActualUrl } from './Routes/GetActualUrl';
import { ShortenedUrl } from './Routes/ShortenedUrl';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/:id' element={<ShortenedUrl/>}></Route>
      <Route element={<Layout/>}>
        <Route path='/' element={<HomePage/>}></Route>
        <Route element={<ProtectedComponent/>}>
        <Route element={<TopBarLayout/>}>

        <Route path='/generate-short-url' element={<GenerateShortUrl/>}></Route>
        <Route path='/get-actual-url' element={<GetActualUrl/>}></Route>
        </Route>
        </Route>
      </Route>
      <Route element={<AuthComponent/>}>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>

      </Route>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
