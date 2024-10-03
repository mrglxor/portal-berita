"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Auth() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    image: "",
    profession: "",
  });

  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const nameRef = useRef(null);
  const professionRef = useRef(null);
  const imageRef = useRef(null);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.{6,})/.test(password);

  const handleInputChange = (setter, validator, errorMessage, ref) => (e) => {
    const value = e.target.value;
    setter(value);
    if (!validator(value)) {
      setErrors((prev) => ({ ...prev, [ref.current.name]: errorMessage }));
    } else {
      setErrors((prev) => ({ ...prev, [ref.current.name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const validFormats = ["image/jpeg", "image/png"];
    const maxSize = 200 * 1024;
    setErrors((prev) => ({
      ...prev,
      image:
        file && validFormats.includes(file.type) && file.size <= maxSize
          ? ""
          : "Gambar tidak valid (format .jpg/.png, max 200KB).",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setSuccessMessage("");

    if (!email) {
      emailRef.current.focus();
      setTimeout(() => setApiError("Email tidak boleh kosong."), 5000);
      return;
    }
    if (!password) {
      passwordRef.current.focus();
      setTimeout(() => setApiError("Password tidak boleh kosong."), 5000);
      return;
    }
    if (isRegister) {
      if (!confirmPassword) {
        confirmPasswordRef.current.focus();
        setTimeout(
          () => setApiError("Konfirmasi password tidak boleh kosong."),
          5000
        );
        return;
      }
      if (!name) {
        nameRef.current.focus();
        setTimeout(() => setApiError("Nama tidak boleh kosong."), 5000);
        return;
      }
      if (!profession) {
        professionRef.current.focus();
        setTimeout(() => setApiError("Profesi tidak boleh kosong."), 5000);
        return;
      }
      if (!image) {
        imageRef.current.focus();
        setTimeout(() => setApiError("Gambar tidak boleh kosong."), 5000);
        return;
      }
    }

    setIsLoading(true);

    const data = {
      email,
      password,
      ...(isRegister && { name, profession, image: await getBase64(image) }),
    };

    try {
      if (isRegister) {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setApiError(
            errorData.message || "Terjadi kesalahan saat Registrasi."
          );
          setTimeout(() => setApiError(""), 5000);
        } else {
          const responseData = await response.json();
          setSuccessMessage(responseData.message);
          resetForm();
          setTimeout(() => setSuccessMessage(""), 5000);
        }
      } else {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setApiError(errorData.message);
          setTimeout(() => setApiError(""), 5000);
        } else {
          window.location.href = "/dashboard";
        }
      }
    } catch (error) {
      setApiError("Periksa Jaringan dan coba lagi!");
      setTimeout(() => setApiError(""), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
    });
  };

  const switchToRegister = () => {
    setIsRegister(true);
    resetForm();
  };

  const switchToLogin = () => {
    setIsRegister(false);
    resetForm();
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setProfession("");
    setImage(null);
    setErrors({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      image: "",
      profession: "",
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-full max-w-xs">
        {apiError && (
          <div className="bg-red-100 border border-red-500 text-red-700 px-4 py-2 rounded-md shadow-md mb-2">
            <strong>PESAN:</strong> <span>{apiError}</span>
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 border border-green-500 text-green-700 px-4 py-2 rounded-md shadow-md">
            <strong>PESAN:</strong> <span>{successMessage}</span>
          </div>
        )}
      </div>
      <div className="w-[350px] p-5 h-auto border border-border rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col text-center">
          <Link href="/">
            <Image src={"/logo.svg"} width={150} height={50} className="mb-5" />
          </Link>
          <h1 className="text-2xl mb-3">{isRegister ? "Register" : "Login"}</h1>
          {isRegister && (
            <>
              <input
                type="text"
                placeholder="Nama Lengkap"
                name="name"
                className={`input-form ${
                  errors.name ? "border border-red-500" : ""
                }`}
                value={name}
                ref={nameRef}
                onChange={handleInputChange(
                  setName,
                  (v) => v !== "",
                  "Nama tidak boleh kosong.",
                  nameRef
                )}
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
              <input
                type="text"
                placeholder="Profesi"
                name="profession"
                className={`input-form ${
                  errors.profession ? "border-red-500" : ""
                }`}
                value={profession}
                ref={professionRef}
                onChange={handleInputChange(
                  setProfession,
                  (v) => v !== "",
                  "Profesi tidak boleh kosong.",
                  professionRef
                )}
              />
              {errors.profession && (
                <p className="text-red-500">{errors.profession}</p>
              )}
            </>
          )}
          <input
            type="text"
            placeholder="Email"
            name="email"
            className={`input-form ${
              errors.email ? "border-red-600" : "border-border"
            }`}
            value={email}
            ref={emailRef}
            onChange={handleInputChange(
              setEmail,
              validateEmail,
              "Email tidak valid.",
              emailRef
            )}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <input
            type="password"
            placeholder="Password"
            name="password"
            className={`input-form ${errors.password ? "border-red-500" : ""}`}
            value={password}
            ref={passwordRef}
            onChange={handleInputChange(
              setPassword,
              validatePassword,
              "Password minimal 6 karakter, harus ada 1 huruf besar, 1 angka dan 1 simbol.",
              passwordRef
            )}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          {isRegister && (
            <>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                className={`input-form ${errors.image ? "border-red-500" : ""}`}
                onChange={handleImageChange}
                ref={imageRef}
              />
              {errors.image && <p className="text-red-500">{errors.image}</p>}
              <input
                type="password"
                placeholder="Konfirmasi Password"
                name="confirmPassword"
                className={`input-form ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                value={confirmPassword}
                ref={confirmPasswordRef}
                onChange={handleInputChange(
                  setConfirmPassword,
                  (v) => v === password,
                  "Password tidak cocok.",
                  confirmPasswordRef
                )}
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword}</p>
              )}
            </>
          )}
          <button
            type="submit"
            className="bg-primary rounded-lg text-white py-2 mt-4 hover:bg-opacity-90 transition duration-300"
          >
            {isLoading ? "Loading..." : isRegister ? "Daftar" : "Masuk"}
          </button>
          <button
            type="button"
            className="text-primary mt-2 border border-hint py-2 rounded-lg"
            onClick={isRegister ? switchToLogin : switchToRegister}
          >
            {isRegister ? "Masuk" : "Daftar"}
          </button>
        </form>
      </div>
    </div>
  );
}
