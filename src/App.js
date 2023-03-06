import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageNotFound from './pages/Common/pageNotFound';
import HomeLayout from './layouts/homeLayout';
import Login from './pages/User/login';
import Register from './pages/User/Register';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomeLayout/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='*' element={<PageNotFound/>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
