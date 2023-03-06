import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageNotFound from './pages/Common/pageNotFound';
import HomeLayout from './layouts/homeLayout';
import Login from './pages/User/login';
import Register from './pages/User/Register';
import SignOut from './pages/User/signOut';
import UserProfile from './pages/User/userProfile';
import UserProfileLayout from './pages/User/userProfileLayout';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomeLayout/>} />
      <Route path='/login/*' element={<Login/>} />
      {/* this route match /register or /register/any_thing_here ..  */}
      <Route path='/register/*' element={<Register/>} />
      <Route path='/signOut/*' element={<SignOut/>} />
      <Route path='/profile/:userId' element={<UserProfile/>} />
      <Route path='/userProfile/*' element={<UserProfileLayout/>} />
      <Route path='*' element={<PageNotFound/>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
