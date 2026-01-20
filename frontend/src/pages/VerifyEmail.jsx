import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import CustomButton, {
  BUTTON_VARIANTS,
} from "../components/common/buttons/CustomButton";
import { AppContext } from "../services/contextApi/AppContext";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();

  const { backendUrl, userData, setUserData } = useContext(AppContext);

  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [status, setStatus] = useState("");
  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const inputsRef = useRef([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const setDigitAt = (index, value) => {
    const v = value.replace(/\D/g, "");
    if (v.length === 0) {
      const next = [...digits];
      next[index] = "";
      setDigits(next);
      return;
    }
    if (v.length === 1) {
      const next = [...digits];
      next[index] = v;
      setDigits(next);
      if (index < 5) inputsRef.current[index + 1]?.focus();
      return;
    }
    const merged = v.split("").slice(0, 6);
    const next = [...digits];
    for (let i = 0; i < merged.length; i++) next[i] = merged[i];
    for (let i = merged.length; i < 6; i++) next[i] = "";
    setDigits(next);
    const lastFilled = Math.min(merged.length - 1, 5);
    inputsRef.current[lastFilled]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && digits[index] === "") {
      if (index > 0) inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0)
      inputsRef.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < 5)
      inputsRef.current[index + 1]?.focus();
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!text) return;
    const merged = text.slice(0, 6).split("");
    const next = [...digits];
    for (let i = 0; i < merged.length; i++) next[i] = merged[i];
    for (let i = merged.length; i < 6; i++) next[i] = "";
    setDigits(next);
    inputsRef.current[Math.min(merged.length - 1, 5)]?.focus();
  };

  const code = digits.join("");
  const canVerify = code.length === 6;

  const sendOtp = async () => {
    try {
      setStatus("");
      setLoadingSend(true);
      const res = await axios.post(
        `${backendUrl}/auth/send-verify-otp`,
        {},
        { withCredentials: true },
      );
      if (res.data?.success) {
        setStatus("OTP sent to your email.");
        alert("OTP sent to your email.");
      } else {
        setStatus(res.data?.message || "Failed to send OTP.");
        alert(res.data?.message || "Failed to send OTP.");
      }
    } catch (err) {
      setStatus(err.response?.data?.message || "Failed to send OTP.");
      alert(err.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoadingSend(false);
    }
  };

  const verifyAccount = async () => {
    if (!canVerify) return;
    try {
      setStatus("");
      setLoadingVerify(true);
      const res = await axios.post(
        `${backendUrl}/auth/verify-account`,
        { otp: code },
        { withCredentials: true },
      );
      if (res.data?.success) {
        setStatus("Email verified successfully.");
        navigate("/");
        alert("Email verified successfully.");
        if (userData) setUserData({ ...userData, isAccountVerified: true });
      } else {
        setStatus(res.data?.message || "Verification failed.");
        alert(res.data?.message || "Verification failed.");
      }
    } catch (err) {
      setStatus(err.response?.data?.message || "Verification failed.");
      alert(err.response?.data?.message || "Verification failed.");
    } finally {
      setLoadingVerify(false);
    }
  };

  return (
    <div className="w-full min-h-[80vh] flex flex-col justify-center items-center gap-6 bg-gray-50">
      <div className="w-full grid grid-cols-1">
        <div className="flex items-center justify-center py-10 px-6">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-left text-yellow-500 mb-2">
              Verify Email
            </h2>
            <p className="text-left text-black mb-6">
              Enter 6 digit code sent to your email id.
            </p>

            <div className="flex gap-3 justify-between mb-6">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  value={d}
                  onChange={(e) => setDigitAt(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onPaste={handlePaste}
                  maxLength={1}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="w-12 h-12 text-center text-xl font-semibold rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white"
                />
              ))}
            </div>

            <CustomButton
              text={loadingVerify ? "Verifying..." : "Verify Account"}
              type="button"
              variant={BUTTON_VARIANTS.SECONDARY}
              className={`cursor-pointer w-full ${!canVerify ? "opacity-90 cursor-not-allowed" : ""}`}
              onClick={verifyAccount}
              disabled={!canVerify || loadingVerify}
            />
            <div className="w-32 mx-auto mt-6">
              <CustomButton
                text={loadingSend ? "Sending..." : "Resend Code"}
                type="button"
                variant={BUTTON_VARIANTS.TEXT_SECONDARY}
                className="cursor-pointer"
                onClick={sendOtp}
              />
            </div>
            {/* {status && (
              <p className="text-sm text-gray-700 text-center pt-6">{status}</p>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
