import { useState } from 'react'
import reactLogo from "../assets/react.svg"
import viteLogo from '/vite.svg'
import '../App.css'
import Header from "../components/Header";
import Footer from "../components/Footer"; 

function Main() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-[#FAF7F0] min-h-screen w-full overflow-x-hidden flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center text-gray-800">
        <div className="flex flex-col items-center justify-center">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="h-24" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="h-24 mt-4" alt="React logo" />
          </a>
        </div>

        <h1 className="text-gray-700 text-4xl mt-6">Vite + React</h1>

        <div className="mt-6">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="bg-black text-white px-4 py-2 rounded-md"
          >
            count is {count}
          </button>
          <p className="mt-2 text-sm">
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Main
