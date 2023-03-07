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
import UserCard from './pages/User/userCard';
import AllUsers from './pages/User/AllUsers';
import Users from './pages/User/users';


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
      <Route path='/card' element={<UserCard/>} />
      <Route path='/allUsers' element={<AllUsers/>} />
      <Route path='/Users' element={<Users/>} />
      <Route path='*' element={<PageNotFound/>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
