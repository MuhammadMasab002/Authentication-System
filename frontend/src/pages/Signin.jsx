import React, { useState } from "react";
import CustomFormInput, {
  INPUT_TYPES,
} from "../components/common/inputs/CustomFormInput";
import CustomButton, {
  BUTTON_SIZES,
  BUTTON_VARIANTS,
} from "../components/common/buttons/CustomButton";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
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
    const { email, password } = formData;
    const newErrors = {};

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
      newErrors.password = "password is required";
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
    console.log("Form submitted:", formData);

    // Reset form
    setFormData({
      email: "",
      password: "",
    });
    setErrors({
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
              Sign In
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
                placeholder="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                type={INPUT_TYPES.PASSWORD}
                variant={errors.password ? "error" : "default"}
                errorMessage={errors.password}
              />
              <CustomButton
                text="Sign In"
                type="submit"
                variant={BUTTON_VARIANTS.SECONDARY}
                className="cursor-pointer"
              />
              {/* if already have account */}
              <div className="flex justify-center flex-col items-center gap-2">
                <p className="text-sm text-center text-gray-600 mt-4 mb-0!">
                  Don't have an account?{" "}
                </p>
                <CustomButton
                  text="Sign up"
                  type="button"
                  size={BUTTON_SIZES.SM}
                  variant={BUTTON_VARIANTS.TEXT_SECONDARY}
                  className="px-0! py-0! max-w-14 cursor-pointer"
                  onClick={
                    () => (window.location.href = "/signup") // Redirect to signup page
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

export default SignIn;
