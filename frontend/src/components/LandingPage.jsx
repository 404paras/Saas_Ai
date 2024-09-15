import React, { useState, useEffect } from 'react';

const LandingPage = () => {
  const features = ['Summariser', 'Code Generator', 'Document Processing', 'Audio Processing'];
  const [displayText, setDisplayText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

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
          setDisplayText('');
          setCharIndex(0);
          setIsTyping(true);
          setCurrentWordIndex((prev) => (prev + 1) % features.length);
        }, 1200);
      }

      return () => clearInterval(typingInterval);
    }
  }, [isTyping, charIndex, currentWordIndex]);

  return (
    <div className='bg-gradient-to-br from-black via-gray-900 to-black min-h-screen w-screen text-white overflow-hidden'>
      <header className="fixed top-0 left-0 right-0 p-6 bg-black bg-opacity-80 shadow-lg z-10 flex justify-between items-center">
        <div className="text-3xl font-bold text-yellow-400">Logo</div>
        <div className="text-lg cursor-pointer bg-white text-black rounded-full py-2 px-6 hover:bg-gray-200 transition-colors duration-300 shadow-md transform hover:scale-105">
          Get Started
        </div>
      </header>
      <main className="flex flex-col items-center justify-center min-h-screen pt-24 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-center text-gray-100 shadow-lg">
          Make Your Life Easy Through AI
        </h1>
        <div className="text-3xl md:text-4xl mb-6 font-semibold text-fuchsia-400 relative ">
          {displayText}&nbsp;&nbsp;
          <span className="absolute top-0 right-0 text-gray-300">!</span>
        </div>
        <div className='text-sm font-semibold mb-8'>Increase you productivity by 10X</div>
        <button className="px-8 py-4 rounded-2xl text-xl shadow-lg text-white font-semibold transition-all duration-300 transform hover:scale-105"
                style={{ 
                  background: 'linear-gradient(to right, rgb(241, 11, 190) 22.2%, rgb(126, 32, 207) 69.1%, rgb(215, 128, 37) 98.9%)'
                }}>
          Start Generating for Free
        </button>
        <div className="mt-6 text-gray-400 text-lg">
          No credit card required!!
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
