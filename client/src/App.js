import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import Policy from "./pages/Policy";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddRestaurant from "./pages/admin/AddRestaurant";
import AllRestaurants from "./pages/admin/AllRestaurants";
import AllUsers from "./pages/admin/AllUsers";
import Profile from "./pages/user/Profile";
import Reviews from "./pages/user/Reviews";
import CreateCategory from "./pages/admin/CreateCategory";
import UpdateRestaurant from "./pages/admin/UpdateRestaurant";
import Search from "./pages/Search";
import RestaurantDetails from "./pages/RestaurantDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/restaurant/:slug" element={<RestaurantDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/reviews" element={<Reviews />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/add-restaurant" element={<AddRestaurant />} />
          <Route path="admin/all-restaurant" element={<AllRestaurants />} />
          <Route path="admin/all-users" element={<AllUsers />} />
          <Route path="admin/add-category" element={<CreateCategory />} />
          <Route path="admin/restaurant/:slug" element={<UpdateRestaurant />} />

        </Route>

      </Routes>
    </>
  );
}

export default App;
