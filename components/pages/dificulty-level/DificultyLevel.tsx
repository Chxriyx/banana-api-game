import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="flex flex-col items-center min-h-screen bg-center justify-around"
      style={{ backgroundImage: "url('/images/banana-game-bg-img.png')" }}
    >
      <Link href="/user-name">
        <Button className="absolute top-4 left-4 border border-gray-500 rounded-full p-2">
          <span className="sr-only">Go back</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Button>
      </Link>
      <h1 className="text-6xl font-bold bg-[#D9D9D9] bg-opacity-60 rounded-2xl p-6">
      Choose a Difficulty Level
      </h1>
        <div className="grid">
            <Link href={{ pathname: "/banana-game", query: { difficulty: "Easy" } }}>
                <Button className="bg-orange-500 px-24 py-12 rounded-full text-black font-bold mb-8">
                <span className="text-5xl">Easy</span>
                </Button>
            </Link>
            <Link href={{ pathname: "/banana-game", query: { difficulty: "Medium" } }}>
                <Button className="bg-orange-500 px-16 py-12 rounded-full text-black font-bold my-8">
                <span className="text-5xl">Medium</span>
                </Button>
            </Link>
            <Link href={{ pathname: "/banana-game", query: { difficulty: "Hard" } }}>
                <Button className="bg-orange-500 px-24 py-12 rounded-full text-black font-bold my-8">
                <span className="text-5xl">Hard</span>
                </Button>
            </Link>
        </div>
    </div>
  );
}

