import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import SignUp from "./pages/Signup";
import SignIn from "./pages/SignIn";

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
