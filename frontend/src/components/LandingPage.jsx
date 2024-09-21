import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { server } from "../../server";

const LandingPage = () => {
  const features = [
    "Summariser",
    "Code Generator",
    "Document Processing",
    "Audio Processing",
  ];
  const [displayText, setDisplayText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [strtBtn, setStrtBtn] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handlerLogin = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (isSignIn) {
if(!formData.email || !formData.password){
  toast.error('Please fill the details!!')
  return
}

      if (formData.email && formData.password) {
        try {
          const response = await axios.post(`${server}/login`, {
            email: formData.email,
            password: formData.password,
          });
          setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });

          localStorage.setItem("token", response.data.token);
          toast.success(response.data.message);
          navigate('/dashboard');
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
      //login
    } else {

      if(!formData.email || !formData.password || !formData.name || !formData.confirmPassword){
        toast.error('Please fill the details!!')
        return
      }
      if(formData.password != formData.confirmPassword){
        toast.error('Passwords do not match')
        return 
      }

      if (
        formData.email &&
        formData.password &&
        formData.name &&
        formData.password === formData.confirmPassword
      )
      
      {
        try{
        const response = await axios.post(`${server}/newUser`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        toast.success(response.data.message);
        setIsSignIn(true)}
        catch(error){
          toast.error(error.response.data.message);
        }
      }
    }
  };

  const startingBtnHandler = () => {
    setStrtBtn(true);
  };

  useEffect(() => {
    if (isTyping) {
      const currentWord = features[currentWordIndex];
      const typingInterval = setInterval(() => {
        setDisplayText((prev) => prev + currentWord[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 100);

      if (charIndex >= currentWord.length) {
        clearInterval(typingInterval);
        setIsTyping(false);
        setTimeout(() => {
          setDisplayText("");
          setCharIndex(0);
          setIsTyping(true);
          setCurrentWordIndex((prev) => (prev + 1) % features.length);
        }, 1200);
      }

      return () => clearInterval(typingInterval);
    }
  }, [isTyping, charIndex, currentWordIndex]);

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black min-h-screen w-screen text-white overflow-hidden">
      <header className="fixed top-0 left-0 right-0 p-6 bg-black bg-opacity-80 shadow-lg z-10 flex justify-between items-center">
        <div className="text-3xl font-bold text-yellow-400">Logo</div>
        {!strtBtn && (
          <div
            className="text-lg cursor-pointer bg-white text-black rounded-full py-2 px-6 hover:bg-gray-200 transition-colors duration-300 shadow-md transform hover:scale-105"
            onClick={startingBtnHandler}
          >
            Get Started
          </div>
        )}
      </header>
      {strtBtn ? (
        <div className="flex justify-center items-center min-h-screen bg-red-100">
          <form
            className="bg-black bg-opacity-80 text-black flex justify-center items-center flex-col m-4 p-6 rounded-3xl"
            onSubmit={handlerLogin}
          >
            <div className="m-4 p-4 flex justify-between items-center w-full">
              <button
                type="button"
                onClick={() => setIsSignIn(true)}
                className={`border-none ${isSignIn ? "font-bold" : ""}`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsSignIn(false)}
                className={`${!isSignIn ? "font-bold" : ""}`}
              >
                Sign Up
              </button>
              <button
                type="button"
                className="bg-red-600 text-white border-none"
                onClick={() => setStrtBtn(false)}
              >
                Close
              </button>
            </div>
            {isSignIn ? (
              <div className="flex justify-center items-center flex-col w-full">
                <input
                  type="text"
                  placeholder="Email Id"
                  className="block mb-2 p-3 w-full rounded-xl"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="block mb-4 p-3 w-full rounded-xl"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Sign In
                </button>
              </div>
            ) : (
              <div className="flex justify-center items-center flex-col w-full">
                <input
                  type="text"
                  placeholder="Name"
                  className="block mb-2 p-3 w-full rounded-xl"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Email Id"
                  className="block mb-2 p-3 w-full rounded-xl"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="block mb-2 p-3 w-full rounded-xl"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="block mb-4 p-3 w-full rounded-xl"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded"
                >
                  Sign Up
                </button>
              </div>
            )}
          </form>
        </div>
      ) : (
        <>
          <main className="flex flex-col items-center justify-center min-h-screen pt-24 px-6">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-center text-gray-100 shadow-lg">
              Make Your Life Easy Through AI
            </h1>
            <div className="text-3xl md:text-4xl mb-6 font-semibold text-fuchsia-400 relative">
              {displayText}&nbsp;&nbsp;
              <span className="absolute top-0 right-0 text-gray-300">!</span>
            </div>
            <div className="text-sm font-semibold mb-8">
              Increase your productivity by 10X
            </div>
            <button
              className="px-8 py-4 rounded-2xl text-xl shadow-lg text-white font-semibold"
              style={{
                background:
                  "linear-gradient(to right, rgb(241, 11, 190) 22.2%, rgb(126, 32, 207) 69.1%, rgb(215, 128, 37) 98.9%)",
                border: "none",
              }}
              onClick={startingBtnHandler}
            >
              Start Generating for Free
            </button>
            <div className="mt-6 text-gray-400 text-lg">
              No credit card required!!
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default LandingPage;
