import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/my-profile"
            element={<div className="text-center">Profile Page</div>}
          />
          <Route
            path="/about"
            element={<div className="text-center">About Page</div>}
          />
          <Route
            path="/contact"
            element={<div className="text-center">Contact Page</div>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
