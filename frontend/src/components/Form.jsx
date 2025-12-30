import React from "react";
import CustomFormInput, { INPUT_TYPES } from "./common/inputs/CustomFormInput";
import CustomButton, {
  BUTTON_SIZES,
  BUTTON_VARIANTS,
} from "./common/buttons/CustomButton";

const Form = ({ formData, onSubmit, errors, onChange }) => {
  return (
    <div className="w-full grid grid-cols-1">
      <div className="flex items-center justify-center py-10 px-6">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-left text-primary mb-8">
            Create an User
          </h2>
          <p className="text-left text-black mb-6">Enter your details below</p>

          {/* FORM */}
          <form onSubmit={onSubmit} className="flex flex-col gap-5 text-black">
            <CustomFormInput
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={onChange}
              required
              type={INPUT_TYPES.TEXT}
              variant={errors.name ? "error" : "default"}
              errorMessage={errors.name}
            />

            <CustomFormInput
              placeholder="Email or Phone Number"
              name="email"
              value={formData.email}
              onChange={onChange}
              required
              type={INPUT_TYPES.EMAIL}
              variant={errors.email ? "error" : "default"}
              errorMessage={errors.email}
            />

            <CustomFormInput
              placeholder="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              required
              type={INPUT_TYPES.PASSWORD}
              variant={errors.password ? "error" : "default"}
              errorMessage={errors.password}
            />
            <CustomButton
              text="Create User"
              type="submit"
              variant={BUTTON_VARIANTS.PRIMARY}
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
                variant={BUTTON_VARIANTS.TEXT_PRIMARY}
                className="px-0! py-0! max-w-14 cursor-pointer"
                onClick={
                  () => (window.location.href = "/signin") // Redirect to login page
                }
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
