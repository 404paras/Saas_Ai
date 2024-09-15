import { GoogleGenerativeAI } from '@google/generative-ai';

export const codeGenerator = async () => {
  try {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_REACT_APP_GEMINI_API);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash', // Trying a different model
    });

    const chat = model.startChat({
      tools: [{ codeExecution: {} }],
    });

    const result = await chat.sendMessage(
      'Write code to perform DFS? Generate and explain code.'
    );

    const response = result.response;
    console.log(result);
    return response.text();
  } catch (error) {
    console.error('Error generating code:', error);
    return 'Code generation failed due to a system policy violation.';
  }
};
