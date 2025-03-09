import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    if (data.url) {
      setAudioUrl(data.url);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Text-to-Speech Converter</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text here..."
            className="w-full p-2 border border-gray-300 rounded-md mb-4 resize-none"
            rows="4"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Convert to Speech
          </button>
        </form>
        {audioUrl && (
          <div className="mt-6">
            <audio controls className="w-full">
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <a
              href={audioUrl}
              download="speech.mp3"
              className="mt-4 block text-center text-blue-500 hover:underline"
            >
              Download Audio
            </a>
          </div>
        )}
      </div>
    </div>
  );
}