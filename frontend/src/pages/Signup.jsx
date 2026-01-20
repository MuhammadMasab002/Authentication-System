import React, { useContext, useState } from "react";
import CustomFormInput, {
  INPUT_TYPES,
} from "../components/common/inputs/CustomFormInput";
import CustomButton, {
  BUTTON_SIZES,
  BUTTON_VARIANTS,
} from "../components/common/buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../services/contextApi/AppContext";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedIn } = useContext(AppContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear individual field error on change
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    const { username, email, password } = formData;
    const newErrors = {};

    // Username validation
    if (!username.trim()) {
      newErrors.username = "User Name is required";
    } else if (username.length < 3) {
      newErrors.username = "User Name must be at least 3 characters";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    }
    // else {
    //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //   if (!emailRegex.test(email)) {
    //     newErrors.email = "Invalid email format";
    //   }
    // }

    // password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    // Submit form data
    // Axios.default.withCredentials = true;
    const response = await axios.post(`${backendUrl}/auth/register`, formData, {
      withCredentials: true,
    });
    console.log("signup response", response);
    if (response.data.success) {
      setIsLoggedIn(true);
      navigate("/signin");
      console.log("Form submitted:", formData);

      alert("Signup successful! Please sign in.");
    } else {
      alert("Signup Failed: " + response.data.message);
    }
    // Reset form
    setFormData({
      username: "",
      email: "",
      password: "",
    });
    setErrors({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="w-full min-h-[80vh] flex flex-col justify-center items-center gap-4 bg-gray-50">
      <div className="w-full grid grid-cols-1">
        <div className="flex items-center justify-center py-10 px-6">
          <div className="w-full max-w-md">
            <h2 className="text-4xl font-bold text-left text-yellow-500 mb-8">
              Create Account
            </h2>
            <p className="text-left text-black mb-6">
              Enter your details below
            </p>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 text-black"
            >
              <CustomFormInput
                placeholder="User Name"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                type={INPUT_TYPES.TEXT}
                variant={errors.username ? "error" : "default"}
                errorMessage={errors.username}
              />

              <CustomFormInput
                placeholder="Email or Phone Number"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                type={INPUT_TYPES.EMAIL}
                variant={errors.email ? "error" : "default"}
                errorMessage={errors.email}
              />

              <CustomFormInput
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                type={INPUT_TYPES.PASSWORD}
                variant={errors.password ? "error" : "default"}
                errorMessage={errors.password}
              />
              <CustomButton
                text="Create User"
                type="submit"
                variant={BUTTON_VARIANTS.SECONDARY}
                className="cursor-pointer"
              />
              {/* if already have account */}
              <div className="flex justify-center flex-col items-center gap-2">
                <p className="text-sm text-center text-gray-600 mt-4 mb-0!">
                  Already have an account?{" "}
                </p>
                <CustomButton
                  text="Sign in"
                  type="button"
                  size={BUTTON_SIZES.SM}
                  variant={BUTTON_VARIANTS.TEXT_SECONDARY}
                  className="px-0! py-0! max-w-14 cursor-pointer"
                  onClick={
                    () => navigate("/signin") // Redirect to signin page
                  }
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
