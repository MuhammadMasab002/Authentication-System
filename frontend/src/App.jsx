import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/signin"
            element={<div className="text-center">Signin Page</div>}
          />
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
