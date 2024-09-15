import React, { useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { MessageSquareText, Code, BookText, Headphones } from 'lucide-react';

const LeftBar = () => {
  const [used, setUsed] = useState(33);
  const [selectedOption, setSelectedOption] = useState('Summariser');

  const options = [
    { icon: <MessageSquareText color='#f7872b' />, label: 'Summariser' },
    { icon: <Code color='#b4d411' />, label: 'Code Generator' },
    { icon: <BookText color='#df2ac7' />, label: 'Document Processor' },
    { icon: <Headphones color="#bc0618" />, label: 'Audio Processor' },
  ];

  return (
    <div className="w-1/4 min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <div className="p-6 bg-gray-800 border-b border-gray-700 flex items-center justify-center">
        <div className="text-2xl font-bold text-yellow-400">Logo</div>
      </div>

      <ul className="flex-1 p-4 space-y-2">
        {options.map((option) => (
          <li
            key={option.label}
            className={`flex items-center p-3 rounded-md cursor-pointer transition-all duration-300 ease-in-out 
              ${selectedOption === option.label ? 'bg-gray-700 text-yellow-400' : 'bg-gray-800 text-gray-300'}
              hover:bg-gray-700 hover:text-yellow-300`}
            onClick={() => setSelectedOption(option.label)}
          >
            <div className="mr-3">{option.icon}</div>
            {option.label}
          </li>
        ))}
      </ul>

      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="flex flex-col items-center">
          <div className="w-full mb-2 text-sm text-gray-400">
            Progress
          </div>
          <div className="w-full mb-2">
            <Progress value={used} color='white' />
          </div>
          <button 
            className="w-full py-2 bg-yellow-500 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition-all duration-300 ease-in-out"
            onClick={() => alert('Upgrade clicked')}
          >
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
