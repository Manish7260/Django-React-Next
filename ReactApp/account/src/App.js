import SignUpForm from "./page/auth/SignUp";
import LoginForm from "./page/auth/LogIn";
import ChangePassword from "./page/auth/ChangePassword";
import ForgetPassword from "./page/auth/ForgetPassword";
import VerifyOtp from "./page/auth/VerifyOtp";
import Dashboard from "./page/MovieDB/Dashboard";
import LogOut from "./page/auth/Logout";
import { Route, Routes } from 'react-router-dom';
import NewPassword from "./page/auth/NewPassword";
import MovieDetail from "./page/MovieDB/MovieDetail";
import FavouriteMovies from "./page/MovieDB/FavouriteMovies";
// import { error } from "jquery";

let IsAuthenticated = localStorage.getItem('access_token')

function App() {
  // localStorage.setItem('favoriteMovies',JSON.stringify([]));
  return (
    <main>
    <Routes >
      <Route path="/" Component={SignUpForm} exact/>
      <Route path="/login" Component={LoginForm}/>
      <Route path="/changepassword" Component={IsAuthenticated ? ChangePassword : LoginForm} />
      <Route path="/forgetpassword" Component={ForgetPassword} />
      <Route path="/verifyotp" Component={VerifyOtp} />
      <Route path="/newpassword" Component={NewPassword} />
      <Route path="/dashboard" Component={IsAuthenticated ? Dashboard : LoginForm} />
      <Route path="/detail/:id" Component={IsAuthenticated ? MovieDetail : LoginForm} />
      <Route path="/favourite" Component={IsAuthenticated ? FavouriteMovies : LoginForm} />
      <Route path="/logout" Component={IsAuthenticated ? LogOut : LoginForm} />
    </Routes>
    </main>
  );

}

export default App;