import React, { useContext } from "react";
import { AppContext } from "../services/contextApi/AppContext";
import CustomButton, {
  BUTTON_SIZES,
  BUTTON_VARIANTS,
} from "../components/common/buttons/CustomButton";

function Home() {
  const { userData } = useContext(AppContext);

  return (
    <div className="w-full min-h-[80vh] flex flex-col justify-center items-center gap-4 bg-gray-50">
      <h1 className="text-xl font-bold text-gray-900">
        Hi {userData ? userData?.username : "Developer"}!
      </h1>
      <h1 className="text-4xl font-bold text-gray-900">Welcome to Auth.</h1>
      <p className="text-lg text-gray-700 max-w-lg text-center">
        Let's start with a quick product tour and we will have you up and
        running in no time.
      </p>
      {/* get started button */}
      <div className="mt-4">
        <CustomButton
          text="Get Started"
          variant={BUTTON_VARIANTS.OUTLINE}
          type="button"
          size={BUTTON_SIZES.SM}
          onClick={() => alert("Get Started clicked!")}
          className="cursor-pointer rounded-full px-5"
        />
      </div>
    </div>
  );
}

export default Home;
