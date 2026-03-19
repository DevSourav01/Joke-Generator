// Fixed Vercel deployment - dist output directory
import { useEffect, useState } from "react";

function App() {
  const [joke, setJoke] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 

  async function fetchJoke() {
    setLoading(true); 
    try {
      const res = await fetch("https://api.chucknorris.io/jokes/random");
      const data = await res.json();
      console.log(data);
      setJoke(data.value);
    } catch (error) {
      console.log("Fetching an error while getting jokes....", error);
    } finally {
      setLoading(false); 
    }
  }

  // only run fetchJoke once on mount
  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Joke Generator</h1>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md w-full mb-4">
          {loading ? (
            <p className="text-gray-500">Loading joke...</p>
          ) : (
            <h2 className="text-lg text-gray-700">{joke}</h2>
          )}
        </div>
        <button
          className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition cursor-pointer"
          onClick={fetchJoke}
        >
          New Joke
        </button>
      </div>
    </>
  );
}

export default App;
