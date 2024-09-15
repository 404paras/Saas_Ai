import React, { useState } from 'react';
import { Sumariser } from '../Functions/sumariser';
import { codeGenerator } from '../Functions/CodeGenrater';

const Home = () => {
  const [text, setText] = useState('');
  const [sumarisedText, setSumarisedText] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handler = async () => {
    setIsLoading(true);
    try {
      const summary = await Sumariser(text);
      setSumarisedText(summary);

      const code = await codeGenerator();
      setGeneratedCode(code);

    } catch (error) {
      console.error("Error during the process:", error);
      setSumarisedText('An error occurred while summarizing the text.');
      setGeneratedCode('An error occurred while generating the code.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '1em', fontFamily: 'Arial, sans-serif' }}>
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Enter text to summarize" 
        style={{ width: '100%', padding: '0.5em', marginBottom: '1em' }} 
      />
      <button onClick={handler} disabled={isLoading} style={{ padding: '0.5em 1em', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>
        {isLoading ? 'Processing...' : 'Summarize & Generate Code'}
      </button>

      <div style={{ marginTop: '2em' }}>
        <h3>Summarized Text:</h3>
        <p>{sumarisedText}</p>
      </div>

      <div style={{ marginTop: '2em' }}>
        <h3>Generated Code:</h3>
        <pre style={{
          backgroundColor: '#f4f4f4',
          padding: '1em',
          borderRadius: '5px',
          overflowX: 'auto'
        }}>
          <code>
            {generatedCode}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default Home;
